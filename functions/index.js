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
        var dataContainer = [];

        

        for(var i = 0; i< obj.length; i++){
            const hrmData = {
                date: obj[i].date,
                heartRate: obj[i].heartRate
            }
            dataContainer.push(hrmData);
            
            
        
        }
        const completeData = {
            data: dataContainer
        }
        
        db.collection('HeartRate').doc(docRef.id).set(completeData);
        
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });

});

app.get("/getdata", async (req,res) => {

    const hrmData = db.collection('HeartRate');
    const snapshot = await hrmData.get();
    if (snapshot.empty) {
    console.log('No matching documents.');
    return;
    }  
    var dataContainer = [];
    snapshot.forEach(doc => {
     dataContainer.push(doc.data());
    });

    res.send(dataContainer);

});

exports.app = functions.https.onRequest(app);

