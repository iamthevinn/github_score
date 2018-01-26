import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class App extends Component {
  render() {
    return (
      <div className="app">
        <div className="appBox">
          <div className="leftSide">
            <div className="header">
              GitHub Score
            </div>
            <div className="inputContainer">
              <div className="userInputLabel">
                GitHub Username:
              </div>
              <input type='text' className="userInput" placeholder="Enter a GitHub Username" >
              </input>
            </div>
            <div className="buttonContainer">
              <button className="calculateScoreButton">
                Calculate my GitHub Score
              </button>
            </div>
          </div>
          <div className="rightSide">
            <div className="scoreDisplay">
              Your Score: 135
            </div>
            <div className="scoreComment">
              Great Job!
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
