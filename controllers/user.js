const { v4: uuidv4 } = require('uuid');
const Users = require('../models/User');
const {setUser} = require('../service/auth');


async function handleUserSignup(req, res) {
    const { name, email, password } = req.body;
    await Users.create({
        name: name,
        email: email,
        password: password
    });
    return res.redirect('/');
}

async function handleUserLogin(req, res) {
    const { email, password } = req.body;
    const user = await Users.findOne({ email, password });
    if (!user) return res.render('login', {
        error: 'Invalid username or password'
    });
    const sessionId = uuidv4();
    setUser(sessionId,user)
    res.cookie('uid',sessionId);
    return res.redirect('/');
}


module.exports = {
    handleUserSignup,
    handleUserLogin
}