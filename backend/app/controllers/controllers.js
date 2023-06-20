const db = require('../firebase/index');

const moment = require('moment');
require('moment-timezone');
moment.locale('th');

const nodemailer = require('nodemailer');
const {v4 : uuidv4} = require('uuid');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {
    const { username, password, email, firstname, lastname } = req.body;
    const snapshot = await db.collection('user').where('email', '==', email).get();

    if (snapshot.empty) {
        var addData = {
            username: username,
            password: bcrypt.hashSync(password, 8),
            email: email,
            firstname: firstname,
            lastname: lastname,
            role: "user",
            signuptimestampstring: moment.tz("Asia/Bangkok").format('DD/MM/YYYY HH:mm:ss'),
            signuptimestamp: moment().valueOf(),
        }
        await db.collection('user').add(addData);
        return res.status(200).send({ status: "ok", message: "สมัครสมาชิกสำเร็จ!" });
    }
    else{
        console.log('No matching documents.');
        return res.status(400).send({ status: "failed", message: "อีเมลมีในระบบแล้ว!" });
    }

}

exports.signin = async (req, res) =>{
    const { email, password } = req.body;

    // const snapshot = await db.collection('user').where('email', '==', email).where('password', '==', password).get();
    const snapshot = await db.collection('user').where('email', '==', email).get();

    if (snapshot.empty) {
        console.log('No matching user.');
        return res.status(400).send({ status: "failed", message: "ไม่พบข้อมูล!" });
    }
    let result = [];
    snapshot.forEach(doc => {
        result.push(doc.data());
        result.push(doc.id);
    })

    var passwordIden = bcrypt.compareSync(
        password,
        result[0].password
    )
    if (!passwordIden) {
        console.log('No matching password.');
        return res.status(400).send({ status: "failed", message: "รหัสผ่านไม่ถูกต้อง!" });
    }
    else{
        return res.status(200).send({ 
            // status: "ok", 
            username: result[0].username,
            firstname: result[0].firstname,
            lastname: result[0].lastname,
            email: result[0].email,
            password: result[0].password,
            role: result[0].role,
            doc_id: result[1],
    
        });
    }
}

exports.update = async (req, res) =>{
    const uid = req.body.doc_id;
    const { username, password, email, firstname, lastname } = req.body;

    await db.collection('user').doc(uid).update({
        username: username,
        password: bcrypt.hashSync(password),
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
    return res.status(200).send({status: "ok", result});
}

exports.findEmail = async (req, res) => {
    const email = req.body.email;

    const snapshot = await db.collection('user').where('email', '==', email).get();
    if (snapshot.empty) {
        console.log('No email.');
        return res.status(400).send({ status: "failed", message: "ไม่พบอีเมลนี้ในระบบ!" });
    }
    var addData = {
        email: email,
        id: uuidv4(),
        status: 0,
        datetimeSubmit: null,
        datatimeSubmitString: null,
        
    }

    await db.collection('repassword').add(addData);

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: "worachitzaza411@gmail.com", // your email
          pass: 'hdaxjkokokopyqxj' // your email password
        }
    });
    
    var mailOptions = {
        from: 'admin somchun <admin@gmail.com>',
        to: 'ksribanjong@gmail.com',
        subject: 'Reset your password WEB',
        html: `<h1>Click a button to reset your password</h1> 
        <button><a href="http://localhost:8080/resetPassword/${addData.id}">reset</a></button>`
    }

    transporter.sendMail(mailOptions, (err, info) => {
        if(err){
            console.log(err);
        }
    })
    return res.status(200).send(addData);
}

exports.checkToken = async (req, res) => {
    const { id } = req.params;
    
    const snapshot = await db.collection('repassword').where("id", "==", id).get();
    let result = [];
    snapshot.forEach(doc => {
        result.push(doc.data());
    })

    if (snapshot.empty) {
        return res.status(400).send({ status: "Token_not_found", message: "ลิ้งค์ไม่ถูกต้อง!" });
    }
    else{
        if(result[0].status == 1){
            return res.status(400).send({ status: "Token_timeout", message: "ลิ้งค์ถูกใช้งานแล้ว!" });
        }
        else{
            return res.status(200).send({ status: "ok"});
        }
    }
}
exports.rePassword = async (req, res) => {
    const password = req.body.password1;
    const { id } = req.params;

    const snapshot = await db.collection('repassword').where("id", "==", id).get();
    let result = [];
    snapshot.forEach(doc => {
        result.push(doc.data());
    })
    
    const slowshot = await db.collection('user').where("email", "==", result[0].email).get();
    slowshot.forEach(doc => {
        doc.ref.update({
            password: password,
        }) 
    })

    if(slowshot){
        snapshot.forEach(doc => {
            doc.ref.update({
                status: 1,
                datetimeSubmit: moment().valueOf(),
                datatimeSubmitString: moment.tz("Asia/Bangkok").format('DD/MM/YYYY HH:mm:ss'),
            }) 
        })
        return res.status(200).send({ status: "ok", message: "แก้ไขรหัสผ่านสำเร็จ!" });
    }
    else{
        return res.status(400).send({ status: "failed", message: "ล้มเหลว!" });
    }
    
}