const controller = require("../controllers/controllers");

module.exports = function (app) {
    app.post('/signup', controller.signup);
    app.post('/signin', controller.signin);

    app.get('/showAll', controller.showAll);
    app.get('/showUser/:username', controller.showUser);
    app.post('/delete', controller.delete);
    app.post('/update', controller.update);

    app.post('/resetPassword', controller.rePassword);
}