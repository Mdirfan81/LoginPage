import React from "react";
import "./App.css";
import { BiArrowBack } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

const UserDetail = () => {
  const navigate = useNavigate();

  let data = JSON.parse(sessionStorage.getItem("userDetail"));
  const handleBack = (e) => {
    e.preventDefault();
    sessionStorage.clear();
    navigate("/");
  };
  return (
    <div className="App">
      <div className="container">
        <div className="container--box">
          {data ? (
            <div className="container--box---user--header">
              Hello "{data}"
              <button
                className="container--box--back--button"
                onClick={handleBack}
              >
                Back
              </button>
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
