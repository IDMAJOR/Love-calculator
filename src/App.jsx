import React, { useState } from "react";
import "./FlamesCalculator.css"; // Make sure to create this CSS file

const FlamesCalculator = () => {
  const [name1, setName1] = useState("");
  const [name2, setName2] = useState("");
  const [result, setResult] = useState("");

  const calculateFlames = () => {
    if (name1.trim() === "" || name2.trim() === "") return;
    const flames = ["F", "L", "A", "M", "E", "S"];

    const processNames = (name) =>
      name
        .toLowerCase()
        .replace(/\s+/g, "")
        .split("")
        .reduce((acc, letter) => {
          acc[letter] = (acc[letter] || 0) + 1;
          return acc;
        }, {});

    const countFlames = (count) => {
      let index = 0;
      while (flames.length > 1) {
        index = (index + count - 1) % flames.length;
        flames.splice(index, 1);
      }
      return flames[0];
    };

    const name1Count = processNames(name1);
    const name2Count = processNames(name2);

    const totalCount = Object.keys(name1Count).reduce((acc, letter) => {
      if (name2Count[letter]) {
        acc += Math.abs(name1Count[letter] - name2Count[letter]);
      } else {
        acc += name1Count[letter];
      }
      return acc;
    }, 0);

    setResult(countFlames(totalCount));
  };

  return (
    <>
      <div className="floating-emojis">
        <span className="emoji">❤️</span>
      </div>
      <div className="app">
        <div className="flames-container">
          <h1 className="flames-title">💖 FLAMES Calculator 💖</h1>
          <p className="flames-description">
            Enter two names to find out your compatibility!
          </p>
          <input
            type="text"
            value={name1}
            onChange={(e) => setName1(e.target.value)}
            placeholder="Enter first name"
            className="flames-input"
          />
          <input
            type="text"
            value={name2}
            onChange={(e) => setName2(e.target.value)}
            placeholder="Enter second name"
            className="flames-input"
          />
          <button onClick={calculateFlames} className="flames-button">
            Calculate
          </button>
          {result && (
            <div className="flames-result">
              <h2>Your FLAMES Result:</h2>
              <p className={`flames-result-text flames-${result}`}>
                {getResultDescription(result)}
              </p>
            </div>
          )}
          <div className="flames-emoji">❤️</div>
        </div>
      </div>
    </>
  );
};

// Helper function to get result description
const getResultDescription = (result) => {
  switch (result) {
    case "F":
      return "Friends";
    case "L":
      return "Lovers";
    case "A":
      return "Admirers";
    case "M":
      return "Marriage";
    case "E":
      return "Enemies";
    case "S":
      return "Secret Lovers";
    default:
      return "";
  }
};

export default FlamesCalculator;
