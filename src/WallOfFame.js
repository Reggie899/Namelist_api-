import React, { useEffect, useState } from "react";
import axios from "axios";

export default function WallofFame() {
    const [listNames, setListNames] = useState([])
  const fetchDataWallOfFame = async () => {
    const response = await axios.get(
      "https://namelist.herokuapp.com/walloffame/newname"
    );
    // console.log(
    //   "here",
    //   response.data,
    // ); 
    setListNames(response.data)
  };

  useEffect(() => {
    // fetchData();
    fetchDataWallOfFame();
  }, []);

  return <div>
      <ul>
      {listNames.map(function (names, index) {
        return (
          <li key={index}>
            <div className={index % 2 ? "even" : "odd"}  >
              {index + 1}. {" "}
              {names}
            </div>
          </li>
        );
      })}
    </ul>
  </div>;
}
