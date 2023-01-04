import React, { useState } from "react";
import "./App.css";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";

import { useNavigate } from "react-router-dom";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [userExist, setUserExist] = useState(false);

  const navigate = useNavigate();

  const handleVisibility = (e) => {
    e.preventDefault();
    setShowPassword((prev) => !prev);
  };

  const apiCall = async (email, password) => {
    let url = "https://apptesting.docsumo.com/api/v1/eevee/login/";
    let payload = JSON.stringify({
      email: email,
      password: password,
    });

    let response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: payload,
    });

    let data = await response.json();
    if (data.status_code === 200) {
      sessionStorage.setItem("userDetail", JSON.stringify(data.data.user));
      navigate("/user");
      setLoading(false);
      return;
    } else {
      setUserExist(true);
      setLoading(false);
      return;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email && password) {
      setUserExist(false);
      setLoading(true);
      apiCall(email, password);

      return;
    } else {
      if (password) {
        setUserExist(false);
        return setEmailError((prev) => !prev);
      } else if (email) {
        setUserExist(false);
        return setPasswordError((prev) => !prev);
      } else {
        setEmailError((prev) => !prev);
        setPasswordError((prev) => !prev);
        return;
      }
    }
  };
  return (
    <div className="App">
      <div className="logo">
        <img src="asserts/logo.png" alt="Logo" width={170} />
      </div>
      <div className="container">
        <form className="container--box" onSubmit={handleSubmit}>
          <div className="container--box--header">
            Login to your Docsumo account
          </div>
          {userExist && (
            <div className="container--box--error--msg">User doesn't exist</div>
          )}
          <div className="container--box--fields">
            <label htmlFor="email" className="container--box--label">
              Work Email
            </label>
            <input
              type="email"
              name="email"
              className={
                "container--box--input " + (emailError ? "invalid" : "")
              }
              placeholder="janedoe@abc.com"
              onChange={(e) => setEmail(e.target.value)}
            />
            {emailError && (
              <span className="container--box--error">
                Please enter a valid email address
              </span>
            )}
            <label htmlFor="password" className="container--box--label">
              Password
            </label>
            <div className="container--box--passwordBox">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                className={
                  "container--box--input " + (passwordError ? "invalid" : "")
                }
                placeholder="Enter password here"
                onChange={(e) => setPassword(e.target.value)}
              />

              <span
                className="container--box--iconButton"
                onClick={handleVisibility}
              >
                {showPassword ? (
                  <IoEyeOutline size={27} />
                ) : (
                  <IoEyeOffOutline size={27} />
                )}
              </span>
            </div>
            {passwordError && (
              <span className="container--box--error">
                Please enter a password
              </span>
            )}
            <div className="container--box--forgot">
              <a href="#" className="container--box-forgotText">
                Forgot Password?
              </a>
            </div>
          </div>
          <div className="container--box--button--container">
            <button className="container--box--button">
              {isLoading ? (
                <div className="loading--box">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 200 200"
                    color="#ffffff"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <defs>
                      <linearGradient id="spinner-secondHalf">
                        <stop
                          offset="0%"
                          stop-opacity="0"
                          stop-color="currentColor"
                        />
                        <stop
                          offset="100%"
                          stop-opacity="0.5"
                          stop-color="currentColor"
                        />
                      </linearGradient>
                      <linearGradient id="spinner-firstHalf">
                        <stop
                          offset="0%"
                          stop-opacity="1"
                          stop-color="currentColor"
                        />
                        <stop
                          offset="100%"
                          stop-opacity="0.5"
                          stop-color="currentColor"
                        />
                      </linearGradient>
                    </defs>

                    <g stroke-width="8">
                      <path
                        stroke="url(#spinner-secondHalf)"
                        d="M 4 100 A 96 96 0 0 1 196 100"
                      />
                      <path
                        stroke="url(#spinner-firstHalf)"
                        d="M 196 100 A 96 96 0 0 1 4 100"
                      />

                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        d="M 4 100 A 96 96 0 0 1 4 98"
                      />
                    </g>

                    <animateTransform
                      from="0 0 0"
                      to="360 0 0"
                      attributeName="transform"
                      type="rotate"
                      repeatCount="indefinite"
                      dur="1300ms"
                    />
                  </svg>
                  Loggin in
                </div>
              ) : (
                "Login"
              )}
            </button>
            <div className="container--box--button--subContianer">
              <span>Don't have an account? </span>
              <a href="#" className="spanHover">
                Sign Up
              </a>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;
