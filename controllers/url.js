const shortid = require("shortid");
const URL = require('../models/url');

async function handleGenerateNewShortURL(req, res) {
    const body = req.body;
    if (!body.url) return res.status(400).json({ err: 'url is required' });
    const shId = shortid();

    const url = await URL.create({
        shortId: shId,
        redirectUrl: body.url,
        visitHistory: [],
        createdBy: req.user._id,
    });
    return res.render('Home',{
        id:shId
    });
    
}


async function handleGetShortURL(req, res) {
    const shId = req.params.shortId;
    const entry = await URL.findOneAndUpdate(
        { shortId: shId },
        {
            $push: {
                visitHistory: {
                    timestamp: Date.now()
                }
            }
        }
    );
    return res.redirect(entry.redirectUrl);
}

async function handleGetAnalystics(req, res) {
    const shId = req.params.shortId;
    const result = await URL.findOne({ shortId: shId });
    return res.json({
        totalClicks: result.visitHistory.length,
        analytics: result.visitHistory
    });
}


module.exports = {
    handleGenerateNewShortURL,
    handleGetShortURL,
    handleGetAnalystics,

}