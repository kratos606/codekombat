const Solution = require('../models/solutions');

// get solution by user and game

const getSolution = async (req, res) => {
    let user = req.user.id;
    let game = req.params.id;
    const solution = await Solution.findOne({ user: user, game: game });
    res.json(solution);
}

// create a new solution

const createSolution = async (user, game, solution) => {
    const newSolution = new Solution({
        user,
        game,
        solution
    });
    await newSolution.save();
}

// update a solution

const updateSolution = async (user, game, solution) => {
    await Solution.findOneAndUpdate({ user, game }, { solution });
}

module.exports = { createSolution, updateSolution, getSolution };