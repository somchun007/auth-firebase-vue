const controller = require("../controllers/controllers");
const auth = require("../middlewares/auth");

module.exports = function (app) {
    app.use((req, res, next) => {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    })

    app.post('/signup', controller.signup);
    app.post('/signin', controller.signin);

    app.get('/showAll', controller.showAll);
    app.get('/showUser/:username', controller.showUser);
    app.post('/delete', controller.delete);
    app.post('/update', controller.update);

    app.post('/findEmail', controller.findEmail);
    app.post('/checkToken/:id', controller.checkToken);
    app.post('/resetPassword/:id', controller.rePassword);

    app.post('/jai', auth.verifyToken );
}