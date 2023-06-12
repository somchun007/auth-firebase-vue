const db = require('../firebase/index');

const moment = require('moment');
require('moment-timezone');
moment.locale('th');

exports.signup = async (req, res) => {
    const { username, password, email, firstname, lastname } = req.body;
    const snapshot = await db.collection('user').where('email', '!=', email).get();
    if (snapshot.empty) {
        console.log('No matching documents.');
        return res.status(400).send({ status: "failed", message: "อีเมล์มีในระบบแล้ว!" });
    }
    var addData = {
        username: username,
        password: password,
        email: email,
        firstname: firstname,
        lastname: lastname,
        role: "user",
        signuptimestampstring: moment.tz("Asia/Bangkok").format('DD/MM/YYYY HH:mm:ss'),
        signuptimestamp: moment().valueOf(),
        
    }
    await db.collection('user').add(addData);
    return res.status(200).send({ status: "ok", message: "สมัครสมาชิกสำเร็จ!" });

    // const snapshot = await db.collection('user').where('username', '==', username).get();
    // snapshot.forEach(async doc => {
    //     if(doc.data().username != username){
    //         await db.collection('user').add(addData);
    //         // console.log("ทำรายการไม่สำเร็จ!")
    //         // return res.status(400).send({ status: "failed", message: "ทำรายการไม่สำเร็จ!" });
    //     }        
    //     else{
    //         await db.collection('user').add(addData);
    //         console.log("สมัครสมาชิกสำเร็จ!")
    //     }
    // });
}

exports.signin = async (req, res) =>{
    const { email, password } = req.body;
    const snapshot = await db.collection('user').where('email', '==', email).where('password', '==', password).get();

    // const doc_id = 
    if (snapshot.empty) {
        console.log('No matching user.');
        return res.status(400).send({ status: "failed", message: "ไม่พบข้อมูล!" });
    }
    let result = [];
    snapshot.forEach(doc => {
        result.push(doc.data());
        result.push(doc.id);
        // index = doc.id;
    })
    // console.log(result[0].firstname);
    // localStorage.setItem("user", JSON.stringify(result[0]));
    return res.status(200).send({ 
        // status: "ok", 
        username: result[0].username,
        firstname: result[0].firstname,
        lastname: result[0].lastname,
        email: result[0].email,
        password: result[0].password,
        role: result[0].role,
        doc_id: result[1],

        // result,
        // index
    });

}

// exports.signout = async (req, res) =>{
//     const { email, password } = req.body;
    
// }
exports.update = async (req, res) =>{
    const uid = req.body.doc_id;
    const { username, password, email, firstname, lastname } = req.body;

    await db.collection('user').doc(uid).update({
        username: username,
        password: password,
        email: email,
        firstname: firstname,
        lastname: lastname,
    })

    const snapshot = await db.collection('user').where('email', '==', email).get();
    let result = [];
    snapshot.forEach(doc => {
        result.push(doc.data());
    })

    return res.status(200).send({
        username: result[0].username,
        firstname: result[0].firstname,
        lastname: result[0].lastname,
        email: result[0].email,
        password: result[0].password,
        role: result[0].role,
        doc_id: uid,
    });  
}

exports.delete = async (req, res) =>{
    const email = req.body.email;
    
    const snapshot = await db.collection('user').where('email', '==', email).get();
    snapshot.forEach(doc => {
        doc.ref.delete();
        console.log("delete complesse");
    });
    return res.status(200).send({ status: "ok", message: "ลบสมาชิกสำเร็จ!" });
}

exports.showAll = async (req, res) =>{
    const snapshot = await db.collection('user').where('role', '==', 'user').get();
    
    if (snapshot.empty) {
        console.log('No matching documents.');
        return res.status(400).send({ status: "failed", message: "ไม่พบข้อมูล!" });
    }
    let result = [];
    let index = [];
    snapshot.forEach(doc => {
        result.push(doc.data());
        index.push(doc.id);
    })
    // console.log(result)
    return res.status(200).send({
        // status: "ok", 
        result, 
        index
    });
}

exports.showUser = async (req, res) =>{
    const { username } = req.params;
    const snapshot = await db.collection('user').where('username', '==', username).get();
    
    if (snapshot.empty) {
        console.log('No matching documents.');
        return res.status(400).send({ status: "failed", message: "ไม่พบข้อมูล!" });
    }
    let result = [];
    snapshot.forEach(doc => {
        result.push(doc.data());
    })
    // console.log(result);
    return res.status(200).send({status: "ok", result});
}