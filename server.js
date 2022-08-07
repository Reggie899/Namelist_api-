const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const importData = require("./data.json");
const PORT = process.env.PORT || 5002;

const wallOfFame = [];

app.use(
  cors({
    origin: "*",
  })
);

app.use(bodyParser.json());
app.use(
  express.json({
    type: ["application/json", "text/plain"],
  })
);

app.get("/", (req, res) => {
  res.status(200).send("Server is working!");
});

app.get("/namelist", (req, res) => {
  res.send(importData);
});

app.post("/namelist/adjective", (req, res) => {
  console.log("Got body:", req.body);
  if (importData[0].adjective.indexOf(req.body.msg.newWord) === -1) {
    importData[0].adjective.push(req.body.msg.newWord);
    res.status(200).json({ message: ` ${req.body.msg.newWord} was added 💪` });
  } /*test*/ else {
    res.json({ message: ` ${req.body.msg.newWord} already exists!` });
  }
});

app.post("/namelist/noun", (req, res) => {
  console.log("Got body:", req.body);
  if (importData[0].noun.indexOf(req.body.msg.newWord) === -1) {
    importData[0].noun.push(req.body.msg.newWord);
    res.status(200).json({ message: ` ${req.body.msg.newWord} was added 💪` });
  } else {
    res.json({ message: ` ${req.body.msg.newWord} already exists!` });
  }
});

app.get("/walloffame/newname", (req, res) => {
  res.send(JSON.stringify(wallOfFame));
});

app.post("/walloffame/newname", (req, res) => {
  console.log("Got body:", req.body);
  wallOfFame.push(req.body.msg.yourName);
});

// additional code for axios training:

// PUT

let number = importData[0].noun.length;
console.log("number:", number);
app.put("/namelist/noun", async (req, res) => {
  try {
    let liNumber = await req.body.msg.number;
    let luNumber = liNumber - 1;
    let indexWord = importData[0].noun[luNumber];
    let changedWord = req.body.msg.newWord;
    importData[0].noun[luNumber] = req.body.msg.newWord;
    console.log(changedWord);
    console.log(`${indexWord} turned to:`, importData[0].noun[luNumber]);
    res.status(200).json(indexWord);
  } catch (err) {
    // Handle Error Here
    console.error(err);
  }
});

// DELETE

app.delete("/namelist/noun", async (req, res) => {
  try {
    let reqNumber = await req.body.msg.number;
    console.log(req.body);
    let luNumber = reqNumber - 1;
    let removed = importData[0].noun[luNumber];
    importData[0].noun.splice(luNumber, 1);
    console.log("removed:", removed);
    res
      .status(200)
      .json({ message: `${removed} was removed 🗑`, list: importData[0].noun });
  } catch (err) {
    // Handle Error Here
    console.error(err);
  }
});

app.listen(PORT, () => console.log(`it's alive on ${PORT}`));
