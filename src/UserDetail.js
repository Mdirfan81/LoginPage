import React from "react";
import "./App.css";

const UserDetail = () => {
  let data = JSON.parse(sessionStorage.getItem("userDetail"));
  //   console.log(JSON.parse(data));
  return (
    <div className="App">
      <div className="container">
        <div className="container--box">
          {data ? (
            <div className="container--box---user--header">
              Hello "{data.full_name}"
            </div>
          ) : (
            <div className="container--box--header">Loading...</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDetail;
