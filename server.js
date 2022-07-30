
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express();
const importData = require("./data.json");
const PORT = process.env.PORT || 5002;

const wallOfFame = [];

app.use(cors({
    origin: '*'
}))

app.use(bodyParser.json());
app.use(express.json({
    type: ['application/json', 'text/plain']
  }))

app.get('/', (req, res) => {
res.status(200).send(
    "Server is working!"
)
})

app.get("/namelist", (req, res) => {
    res.send(importData);
})

app.post("/namelist/adjective", (req, res) => {
    console.log('Got body:', req.body);
    if (importData[0].adjective.indexOf(req.body.msg.newWord) === -1) { importData[0].adjective.push(req.body.msg.newWord); 
        res.status(200).json({"message": ` ${req.body.msg.newWord} was added 💪`});
    }  /*test*/
    else {res.send("not working")
}
});


// app.post("/namelist/adjective", (req, res) => {
//     console.log('Got body:', req.body);
//     if (importData[0].adjective.indexOf(req.body.msg.newWord) === -1) { importData[0].adjective.push(req.body.msg.newWord); 
//         res.status(200).json({"message": "it worked"});
//     }  /*test*/
//     else {res.send("not working")
// }
// });

// app.post('/namelist/adjective',  (req, res) => {
//     // try {
//       const request = req.body.msg.newWord;
//       if (importData[0].adjective.indexOf(request) === -1) { importData[0].adjective.push(req.body.msg.newWord)}; 
      
//     res.json(request)
//     // } catch (error) {
//     //   console.log(error)
//     // }
//   })



app.post("/namelist/noun", (req, res) => {
    console.log('Got body:', req.body);
    if (importData[0].noun.indexOf(req.body.msg.newWord) === -1) { importData[0].noun.push(req.body.msg.newWord); 
        res.json(req.body.msg.newWord)
    }  
    else {res.send("not working")
}
});

app.get("/walloffame/newname", (req, res) => {
    res.send(JSON.stringify(wallOfFame));
})

app.post("/walloffame/newname", (req, res) => {
    console.log('Got body:', req.body);
//     if (importData[0].noun.indexOf(req.body.msg.newWord) === -1) { importData[0].noun.push(req.body.msg.newWord); 
//         res.send("it worked")
//     }  
//     else {res.send("not working")
// }
 wallOfFame.push(req.body.msg.yourName)
});


app.listen(
    PORT, 
    () => console.log(`it's alive on ${PORT}`)
)

