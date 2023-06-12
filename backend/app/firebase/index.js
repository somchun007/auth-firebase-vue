var admin = require("firebase-admin");
var serviceAccount = require("./todo-firebase-d24a4-firebase-adminsdk-c3mrp-6d86d0235b.json");
var FirebaseApp = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

var dbFirebase = FirebaseApp.firestore()

module.exports = dbFirebase;