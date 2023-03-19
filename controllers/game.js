const Game = require('../models/games');
const User = require('../models/users');
const { increaseUserPoints } = require('./user');
var fs = require('fs');
const PythonShell = require('python-shell').PythonShell;
const { exec } = require('child_process');

// Get All Games

const getAllGames = async (req, res) => {
  try {
    const games = await Game.find();
    res.status(200).json(games);
  } catch (err) {
    res.status(500).json({ error: err });
  }
}

// Get Game By Id

const getGameById = async (req, res) => {
  try {
    const game = await Game.findById(req.params.id);
    let tester = '';
    if (fs.existsSync(game.tester)) {
      tester = fs.readFileSync(game.tester, 'utf8');
    }
    res.status(200).json({ ...game._doc, tester: tester });
  } catch (err) {
    res.status(500).json({ error: err });
  }
}

// Get random Game

const getRandomGame = async (req, res) => {
  try {
    const lst = await User.findOne({ _id: req.user.id });
    const game = await Game.aggregate([{ $match: { _id: { $nin: lst.games } } }, { $sample: { size: 1 } }]);
    res.status(200).json(game);
  } catch (err) {
    res.status(500).json({ error: err });
  }
}

// create a new game

const create = async (req, res) => {
  const { name, description, pts, codeBase, tester, testCases } = req.body;
  if (!name || !pts || !codeBase || !tester || !testCases) return res.json({ error: "You must fill all required fields" })
  const game = new Game({
    name,
    description,
    pts,
    codeBase,
    tester: tester,
    testCases
  });
  try {
    await game.save();
    res.status(201).json({ success: "Game created successfully" });
  } catch (err) {
    res.status(500).json({ error: err });
  }
}

// update a game

const update = async (req, res) => {
  const { name, description, pts, codeBase, tester, testCases } = req.body;
  if (!name || !pts || !codeBase || !tester || !testCases) return res.json({ error: "You must fill all required fields" })
  try {
    const game = await Game.findById(req.params.id);
    game.name = name;
    game.description = description;
    game.pts = pts;
    game.codeBase = codeBase;
    game.tester = tester;
    game.testCases = testCases;
    await game.save();
    res.status(200).json({ success: "Game updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err });
  }
}

// delete a game

const remove = async (req, res) => {
  try {
    await Game.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: "Game deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err });
  }
}

// submit the game

const submit = async (req, res) => {
  const { code } = req.body;
  const game = await Game.findById(req.params.id);
  if (!game) return res.json({ error: "Game not found" });
  const tester = `test/test_${new Date().getTime()}.py`;
  fs.writeFileSync(tester, game.tester);
  const filename = `test/temp/program.py`;
  fs.writeFileSync(filename, code, function (err) {
    if (err) {
      return res.json({ error: err });
    }
  });
  const promises = [];
  const testCaseResults = [];
  game.testCases.map(test => {
    promises.push(
      new Promise((resolve, reject) => {
        exec(`docker run -v %cd%/test:/test python-runner python ${tester.replace(/^test\//, "")} ${test.join(' ')}`, (error, stdout, stderr) => {
          if (error) {
            return res.json([JSON.stringify({ passed: false, message: error.message })]);
          }
          stdout.split(/\r?\n/).map((result) => {
            testCaseResults.push(result);
          })
          resolve(true);
        });
      })
    );
  });
  Promise.all(promises).then(() => {
    testCaseResults.pop()
    testCaseResults.every(result => {
      return JSON.parse(result)['passed']
    }) ?
      (
        increaseUserPoints(req.user.id, game._id, game.pts, code)
      )
      :
      null;
    res.json(testCaseResults);
  });
}

module.exports = { getAllGames, getGameById, getRandomGame, create, update, remove, submit };