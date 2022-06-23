import axios from "axios";
import imageImport from "./fortune-teller.jpg";
import React, { useEffect, useState } from "react";

export default function SearchSection({ addWordClick }) {
  const [adjective, setAdjective] = useState("");
  const [noun, setNoun] = useState("");
  const [seeResult, setSeeResult] = useState(false);
  const [yourName, setYourName] = useState("");

  const fetchData = async () => {
    const response = await axios.get("https://namelist.herokuapp.com/namelist");
    // console.log(
    // "here",
    // response.data[0].adjective,
    // "length",
    // response.data[0].adjective.length
    // );
    setAdjective(
      response.data[0].adjective[
        Math.floor(Math.random() * response.data[0].adjective.length)
      ]
    );
    setNoun(
      response.data[0].noun[
        Math.floor(Math.random() * response.data[0].noun.length)
      ]
    );
  };

  const sendToWallOfFame = () => {
    // fetch("http://localhost:5002/walloffame/newname", {
    fetch("https://namelist.herokuapp.com/walloffame/newname", {
      method: "POST",
      header: { "Content-Type": "application/json" },
      body: JSON.stringify({
        msg: { yourName },
      }),
    }).then(() => {
      console.log("Your name was added to the Wall of Fame:", JSON.stringify(yourName));
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    let arrayOne = [adjective];
    let arrayTwo = [noun];
    let arrayThree = [...arrayOne, ...arrayTwo];
    setYourName(arrayThree[0] + " " + arrayThree[1]);
    // console.log(arrayThree[0] + " " + arrayThree[1]);
  }, [adjective]);

  return (
    <div className="container">
      <img src={imageImport} className="fortuneTeller" alt="fortune-teller" />
      <div className="ResultSection">
        Your iCoder nickname is:
        {seeResult ? (
          <div>
            <div className="Result">
              {adjective} {noun}
            </div>
            <div className="addNameButton">
              <button className="padding"
                onClick={() => {
                  addWordClick(1);
                  sendToWallOfFame();
                }}
              >
                Add name to Wall of Fame
              </button>
            </div>
          </div>
        ) : (
          <button onClick={() => setSeeResult(true)}>Enlighten Me</button>
        )}
      </div>
    </div>
  );
}
