import React, { useEffect, useState } from "react";

export default function AddWords() {
  const [adjective, setAdjective] = useState(null);
  const [noun, setNoun] = useState(null);
  const [newWord, setNewWord] = useState("");
  const [sendReady, setSendReady] = useState(false);
  const [data, setData] = useState({});

  const makePost = () => {
      if (adjective) {
    // fetch("http://localhost:5002/namelist/adjective", {
      fetch("https://namelist.herokuapp.com/namelist/adjective", {
      method: "POST",
      header: { "Content-Type": "application/json" },
      body: JSON.stringify({
        msg: { newWord },
      }),
    }).then(() => {
      console.log("new adjective added:", JSON.stringify(newWord));
    })
    .then(() => setSendReady(false))
    .then(() => setNewWord(""))
}
if (noun) {
    fetch("http://localhost:5002/namelist/noun", {
      // fetch("https://namelist.herokuapp.com/namelist/noun", {
      method: "POST",
      header: { "Content-Type": "application/json" },
      body: JSON.stringify({
        msg: { newWord },
      }),
    }).then((response) => {
      console.log("new noun added:", JSON.stringify(newWord));
      setData(response);
    })
    .then(() => setSendReady(false))
    .then(() => setNewWord(""))
  };
}

  useEffect(() => {
    if (sendReady) {
      makePost();
    }
  }, [sendReady]);

  return (
    <div className="container">
      <h4> I want to add: </h4>

      <div className="buttonAddBox">
        <div
          onClick={() => {
            setAdjective(true, setNoun(false));
          }}
        >
          {" "}
          <div
            className={
              adjective || adjective === null ? "buttonAdd" : "buttonAddNo"
            }
          >
            an adjective
          </div>
        </div>
        <div
          onClick={() => {
            setNoun(true, setAdjective(false));
          }}
        >
          {" "}
          <div className={noun || noun === null ? "buttonAdd" : "buttonAddNo"}>
            a noun
          </div>
        </div>
      </div>

      {noun || adjective ? 
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setSendReady(true);
        }}
      >
        <input value={newWord}
          onChange={(e) => setNewWord(e.target.value)}
          placeholder={adjective ? "Enter <adjective> here" : "Enter <noun> here"}
        ></input>
        <input className="sendInput" value="Send" type="submit"></input>
      </form>
: null}

      {/* {newWord} */}
    </div>
  );
}
