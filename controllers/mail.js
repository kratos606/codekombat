const Mail = require('../models/mail');

// Get All mails

const getMails = async (req, res) => {
    try {
        const mails = await Mail.find().sort({ createdAt: -1 });
        res.status(200).json(mails);
    } catch (err) {
        res.status(500).json(err);
    }
}

// create a new Mail

const createMail = (req, res) => {
    if (!req.body.username || !req.body.email || !req.body.subject || !req.body.message) return res.json({ error: 'You must fill all required fields' });
    const newMail = new Mail({
        username: req.body.username,
        email: req.body.email,
        subject: req.body.subject,
        message: req.body.message
    });
    newMail.save()
        .then(
            mail => {
                res.json({
                    message: 'Mail sent successfully',
                    mail: mail
                });
            }
        )
        .catch(
            err => {
                res.json({
                    error: err
                });
            }
        );
}

const deleteMail = async (req, res) => {
    try {
        const mail = await Mail.findById(req.params.id);
        if (!mail) return res.status(404).json({ error: 'Mail not found' });
        mail.remove();
        res.json({ message: 'Mail deleted successfully' });
    } catch (err) {
        res.status(500).json(err);
    }
}

const clearMail = async (req, res) => {
    try {
        await Mail.deleteMany();
        res.json({ message: 'All mails deleted successfully' });
    } catch (err) {
        res.status(500).json(err);
    }
}

module.exports = { getMails, createMail };