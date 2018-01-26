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
    this.getScoreComment = this.getScoreComment.bind(this);
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

  getScoreComment() {
    const {returnedScore} = this.state

    if (returnedScore >= 200 )
      return {comment: "Github Elite!", color: 'blue'}
    if (returnedScore >= 100 )
      return {comment: "Great job!", color: 'green'}
    if (returnedScore >= 50 )
      return {comment: "Doing good!", color: 'black'}
    if (returnedScore >= 20 )
      return {comment: "A decent start!", color: 'orange'}
    if (returnedScore > 0 )
      return {comment: "Needs work!", color: 'red'}
    
    return {comment: "You really should just give up!", color: 'purple'}
  }

  render() {
    let scoreDisplay = <div className="scoreDisplay"></div>
    let scoreComment = <div className="scoreComment"></div>
    if (this.state.returnedScore === 0 || this.state.returnedScore) {
      if (this.state.returnedScore === "NotFound") {
        scoreDisplay = <div className="scoreDisplay">Not Found</div>
      } else {
        scoreDisplay = <div className="scoreDisplay">Your Score: {this.state.returnedScore}</div>
        scoreComment = <div style={{color: this.getScoreComment().color}} className="scoreComment">{this.getScoreComment().comment}</div>
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
