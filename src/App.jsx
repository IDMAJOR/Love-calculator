import React, { useState } from "react";
import "./FlamesCalculator.css"; // Ensure this file exists

const FlamesCalculator = () => {
  const [name1, setName1] = useState("");
  const [name2, setName2] = useState("");
  const [result, setResult] = useState("");

  const calculateFlames = () => {
    if (name1.trim() === "" || name2.trim() === "") return;

    const flames = ["F", "L", "A", "M", "E", "S"];

    // Helper function to count occurrences of each letter in a name
    const processNames = (name) => {
      return name
        .toLowerCase()
        .replace(/\s+/g, "")
        .split("")
        .reduce((acc, letter) => {
          acc[letter] = (acc[letter] || 0) + 1;
          return acc;
        }, {});
    };

    // Calculate the difference in letter counts
    const countDifference = (count1, count2) => {
      let difference = 0;
      for (const letter in count1) {
        difference += Math.abs(count1[letter] - (count2[letter] || 0));
      }
      for (const letter in count2) {
        if (!(letter in count1)) {
          difference += count2[letter];
        }
      }
      return difference;
    };

    const name1Count = processNames(name1);
    const name2Count = processNames(name2);

    // Calculate total count of different letters
    const totalCount = countDifference(name1Count, name2Count);

    // Function to count FLAMES result based on the total count
    const countFlames = (count) => {
      let index = 0;
      const flamesList = [...flames]; // Create a copy of the flames array
      while (flamesList.length > 1) {
        index = (index + count - 1) % flamesList.length;
        flamesList.splice(index, 1);
      }
      return flamesList[0];
    };

    setResult(countFlames(totalCount));
  };

  // Reset the result when input changes
  const handleName1Change = (e) => {
    setName1(e.target.value);
    setResult(""); // Reset result on input change
  };

  const handleName2Change = (e) => {
    setName2(e.target.value);
    setResult(""); // Reset result on input change
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
            onChange={handleName1Change}
            placeholder="Enter first name"
            className="flames-input"
          />
          <input
            type="text"
            value={name2}
            onChange={handleName2Change}
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
      {/* Google AdSense scripts */}
      <script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
        crossOrigin="anonymous"
      ></script>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-2585127744782561"
        data-ad-slot="6992761366"
        data-ad-format="fluid"
        data-ad-layout-key="-gw-3+1f-3d+2z"
      ></ins>
      <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-2585127744782561"
        data-ad-slot="9235781325"
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
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
