const homeController = (req, res) => {
    res.render('home.ejs')
}

const userController = (req, res) => {
    res.render('user.ejs')
}

module.exports = {
    homeController,
    userController,
}
