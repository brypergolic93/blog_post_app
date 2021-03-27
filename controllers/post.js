module.exports = (req,res) => {
    userid = req.session.userId,
    res.render('post')
}