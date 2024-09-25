import React, { useState, useRef } from "react";
import html2canvas from "html2canvas";
import "./FlamesCalculator.css";

const LoveCalculator = () => {
  const [name1, setName1] = useState("");
  const [name2, setName2] = useState("");
  const [percentage, setPercentage] = useState(null);
  const [message, setMessage] = useState("");
  const resultRef = useRef(null);

  const cheiroNumerologyMap = {
    A: 1,
    I: 1,
    J: 1,
    Q: 1,
    Y: 1,
    B: 2,
    K: 2,
    R: 2,
    C: 3,
    G: 3,
    L: 3,
    S: 3,
    D: 4,
    M: 4,
    T: 4,
    E: 5,
    H: 5,
    N: 5,
    X: 5,
    U: 6,
    V: 6,
    W: 6,
    O: 7,
    Z: 7,
    F: 8,
    P: 8,
  };

  const calculateNumerologyValue = (name) => {
    return name
      .toUpperCase()
      .split("")
      .reduce((acc, letter) => {
        return acc + (cheiroNumerologyMap[letter] || 0);
      }, 0);
  };

  const reduceToSingleDigit = (num) => {
    while (num > 9 && num !== 11 && num !== 22) {
      num = num
        .toString()
        .split("")
        .reduce((acc, digit) => acc + parseInt(digit), 0);
    }
    return num;
  };

  const calculateLovePercentage = () => {
    if (name1.trim() === "" || name2.trim() === "") return;

    const name1Value = calculateNumerologyValue(name1);
    const name2Value = calculateNumerologyValue(name2);

    const totalValue = name1Value + name2Value;

    const reducedValue = reduceToSingleDigit(totalValue);

    const lovePercentage = (reducedValue / 9) * 100;
    setPercentage(lovePercentage.toFixed(2));
    setMessage(getLoveMessage(lovePercentage.toFixed(2)));
  };

  const handleName1Change = (e) => {
    setName1(e.target.value);
    setPercentage(null);
    setMessage("");
  };

  const handleName2Change = (e) => {
    setName2(e.target.value);
    setPercentage(null);
    setMessage("");
  };

  const captureScreenshotAndDownload = () => {
    html2canvas(document.body).then((canvas) => {
      const imageUrl = canvas.toDataURL("image/png");

      // Create a downloadable link for the screenshot
      const link = document.createElement("a");
      link.href = imageUrl;
      link.download = "love-calculator-result.png";
      document.body.appendChild(link); // Append the link to the body
      link.click();
      document.body.removeChild(link); // Remove the link after clicking
    });
  };

  const shareOnWhatsApp = () => {
    // Share the result text via WhatsApp
    const whatsappUrl = `https://wa.me/?text=Check%20out%20our%20love%20compatibility%20result%21%0A${name1}%20%26%20${name2}%20have%20a%20compatibility%20of%20${percentage}%25.%20Check%20yours%20(Is%20she/him%20meant%20for%20you%3F)%0A${window.location.href}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <>
      <div className="floating-emojis">
        <span className="emoji">❤️</span>
      </div>
      <div className="app">
        <div className="love-container">
          <h1 className="love-title">💖 Love Calculator 💖</h1>
          <p className="love-description">
            Enter two names to find out your compatibility using Cheiro
            Numerology!
          </p>
          <input
            type="text"
            value={name1}
            onChange={handleName1Change}
            placeholder="Enter first name"
            className="love-input"
          />
          <input
            type="text"
            value={name2}
            onChange={handleName2Change}
            placeholder="Enter second name"
            className="love-input"
          />
          <button onClick={calculateLovePercentage} className="love-button">
            Calculate
          </button>
          {percentage && (
            <div ref={resultRef} className="love-result">
              <h2>Love Compatibility: {percentage}%</h2>
              <p>{message}</p>
              <div className="share-section">
                <button
                  onClick={captureScreenshotAndDownload}
                  className="share-button"
                  style={{
                    backgroundColor: "#1a191981",
                    padding: 7,
                    border: "none",
                    borderRadius: 7,
                    color: "whitesmoke",
                    marginRight: 5,
                  }}
                >
                  Download Screenshot
                </button>
                <button
                  onClick={shareOnWhatsApp}
                  className="share-button"
                  style={{
                    backgroundColor: "#1a191981",
                    padding: 7,
                    border: "none",
                    borderRadius: 7,
                    color: "whitesmoke",
                  }}
                >
                  Share on WhatsApp
                </button>
              </div>
            </div>
          )}
          <div className="love-emoji">❤️</div>
        </div>
      </div>
    </>
  );
};

const getLoveMessage = (percentage) => {
  if (percentage > 80) {
    return "Wow! You two are meant to be. A very strong connection!";
  } else if (percentage > 60) {
    return "There’s a good chance this could turn into something special.";
  } else if (percentage > 40) {
    return "Not bad! There’s potential for a strong friendship or relationship.";
  } else if (percentage > 20) {
    return "You may need to work on things, but there’s a possibility.";
  } else {
    return "The connection is weak, but who knows, miracles can happen!";
  }
};

export default LoveCalculator;
