import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import SearchSection from "./SearchSection";
import AddWords from "./AddWords";
import WallofFame from "./WallOfFame";

function App() {
  const [search, setSearch] = useState(true);
  const [addWords, setAddWords] = useState(false);
  const [wall, setWall] = useState(false);

  const addWordClick = num => {
    if (num === 1) { setWall(true); setSearch(false)}  
  }

  return (
    <div className="App">
          <div className="App2">
      {search ? (
        <div>
          <div className="buttons">
            <button onClick={() => {setAddWords(true); setSearch(false)}}>Add words</button>
            <button onClick={() => {setWall(true); setSearch(false)}}>Wall of Fame</button>
          </div>
          <SearchSection addWordClick={addWordClick}/>
        </div>
      ) : null}
      {addWords ? (
        <div>
          <div className="buttons">
            <button onClick={() => {setSearch(true); setAddWords(false)}}>Your name</button>
            <button onClick={() => {setWall(true); setAddWords(false)}}>Wall of Fame</button>
          </div>
          <AddWords />
        </div>
      ) : null}
      {wall ? (
        <div>
          <div className="buttons">
            <button onClick={() => {setSearch(true); setWall(false)}}>Your name</button>
            <button onClick={() => {setAddWords(true); setWall(false)}}>Add words</button>
          </div>
          <WallofFame />
        </div>
      ) : null}
    </div>
    </div>
  );
}

export default App;
