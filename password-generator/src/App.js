import "./App.css";
import { useState } from "react";
import React from "react";
export default function App() {
  const [value, setValue] = useState(0);
  const [password, setPassword] = useState("");
  const [passwordLength, setPasswordLength] = useState(value);
  const [useSymbols, setUseSymbols] = useState(true);
  const [useNumbers, setUseNumbers] = useState(true);
  const [useLowerCase, setUseLowerCase] = useState(true);
  const [useUpperCase, setUseUpperCase] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");

  const GeneratePassword = () => {
    let charset = "";
    let newPassword = "";
    if (useSymbols) charset += "!@#$%^&*()";
    if (useNumbers) charset += "0123456789";
    if (useLowerCase) charset += "abcdefghijklmnopqrstuvwxyz";
    if (useUpperCase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    for (let i = 0; i < passwordLength; i++) {
      newPassword += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    setPassword(newPassword);
  };

  const copyToClipBoard = () => {
    const el = document.createElement("textarea");
    el.value = password;
    document.body.appendChild(el);
    el.select(); // Call the select method on the el element
    document.execCommand("copy");
    document.body.removeChild(el);
    setSuccessMessage("Password copied to clipboard!");
    setTimeout(() => setSuccessMessage(""), 2000);
  };
  return (
    <div className="main">
      <h1> Generate Password</h1>
      <input
  type="range"
  value={passwordLength} // use passwordLength instead of value
  min="5"
  max="40"
  onChange={(event) => {
    setValue(event.target.value);
    setPasswordLength(event.target.value); // update passwordLength
  }}
/>
      <p className="value">Length: {value}</p>
      <div className="checkBox">
        <label className="ABC">
          <input
            type="checkbox"
            checked={useUpperCase}
            onChange={() => setUseUpperCase(!useUpperCase)}
          />
          ABC
        </label>
        <label className="abc">
          <input
            type="checkbox"
            checked={useLowerCase}
            onChange={() => setUseLowerCase(!useLowerCase)}
          />
          abc
        </label>
        <label className="numbers">
          <input
            type="checkbox"
            checked={useNumbers}
            onChange={() => setUseNumbers(!useNumbers)}
          />
          123
        </label>
        <label className="symbols">
          <input
            type="checkbox"
            checked={useSymbols}
            onChange={() => setUseSymbols(!useSymbols)}
          />
          #€%
        </label>
      </div>
      <button className="generate" onClick={GeneratePassword}>
        Generate Password
      </button>
      {password && (
        <div className="inputContainer">
          <label className="password2">Your password: </label>
          <input type="text" value={password} readOnly />
          <button onClick={copyToClipBoard}>Copy</button>
        </div>
      )}
      {successMessage && (<p>{successMessage}</p>)}
    </div>
  );
}
