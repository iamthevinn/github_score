import React, { Component } from 'react';
import './App.css';
import axios from 'axios';



class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      returnedScore: null
    }
    this.handleUserNameChange = this.handleUserNameChange.bind(this);
    this.getGitHubScore = this.getGitHubScore.bind(this);
  }

  handleUserNameChange(event) {
    this.setState({username: event.target.value})
  }

  getGitHubScore (event) {
    const promise = axios.get("https://api.github.com/users/" + this.state.username);
    
    promise.then( data => {
      this.setState({returnedScore: data.data.public_repos + data.data.followers})
      }, () => {}
    )
    
    promise.catch( data => {
      this.setState({returnedScore: "NotFound"})
      }
    )
  }

  render() {
    let scoreDisplay = <div className="scoreDisplay"></div>
    let scoreComment = <div className="scoreComment"></div>
    if (this.state.returnedScore === 0 || this.state.returnedScore) {
      if (this.state.returnedScore === "NotFound") {
        scoreDisplay = <div className="scoreDisplay">Not Found</div>
      } else {
        scoreDisplay = <div className="scoreDisplay">Your Score: {this.state.returnedScore}</div>
        scoreComment = <div className="scoreComment">Great Job!</div>
      }
    }

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
              <input type='text' className="userInput" placeholder="Enter a GitHub Username" onChange={this.handleUserNameChange} >
              </input>
            </div>
            <div className="buttonContainer">
              <button className="calculateScoreButton" onClick={this.getGitHubScore} >
                Calculate my GitHub Score
              </button>
            </div>
          </div>
          <div className="rightSide">
            {scoreDisplay}
            {scoreComment}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
