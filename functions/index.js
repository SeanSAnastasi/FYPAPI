const functions = require("firebase-functions");
const admin = require("firebase-admin");
const express = require('express');
var cors = require('cors');
const app = express();
var bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.json());

admin.initializeApp(functions.config().firebase);

const db = admin.firestore();

app.get("/hello", (req,res) => {
    res.send('Hello World!!!!!!');
});

app.post("/data", (req, res) => {
    
    var filteredObj = req.body;
    const obj = JSON.parse(filteredObj);
    console.log(obj);

    db.collection("HeartRate").add({})
    .then(function(docRef) {
        for(var i = 0; i< obj.length; i++){
            const hrmData = {
                date: obj[i].date,
                heartRate: obj[i].heartRate
            }
            console.log(hrmData);
            console.log(obj[i]);
            console.log(JSON.stringify(obj[i]));
            db.collection('HeartRate').doc(JSON.stringify(obj[i].date)).set({hrmData},{merge: true});
        
        }


        console.log("Document written with ID: ", docRef.id);
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
    

    

    // obj.forEach((newObj, index, array) => {
    //     const hrmData = {
    //         date: newobj.date,
    //         heartRate: newobj.heartRate
    //     }
        
    // });
    
    
    

    
});

exports.app = functions.https.onRequest(app);

