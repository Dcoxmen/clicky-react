import React, { Component } from 'react';
import Navbar from "./components/Navbar";
import Container from "./components/Container";
import Banner from "./components/Banner";
import Footer from "./components/Footer";
import images from "./images";
// import logo from './logo.svg';
// import './App.css';

class ClickyApp extends Component {
  state = {
    score: 0,
    highScore: 0,

    // class value message color based on user click.
    clickMsgColor: "",

    // class value for welcome, success, and failure message.
    navMessage: "Sonic a photo to begin!",

    // class value for image array
    allImages: this.shuffleArray(),

    // class value to track each clicked element
    wasClicked: [],

    // class value to shake container on incorrect click
    shake: false
    };

    // binds access to this keyword
    clickEvent = this.checkClicked.bind(this);

    // function to shuffle images every time one is clicked
    shuffleArray() {
      // creates a copy of current image array so it can be modified by value
      const newArray = images.slice();
      // stores array after shuffled
      const shuffleArr = [];
      
      // loops through array
      // randomize array based on length
      // pushes new array each time it is spliced
      while (newArray.length > 0) { 
        shuffleArr.push(
          newArray.splice(Math.floor(Math.random()* newArray.length), 1)[0]
        );
      }

      return this.shuffleArr;
    }
  
  checkClicked(clickedElem) {
    // allows us to modify the was clicked array
    const prevState = this.state.wasClicked.slice();

    //shuffles images
    const shuffled = this.shuffleArray();

    //tracks the score
    let score = this.state.score;
    let highScore = this.state.highScore;

    // If item clicked has not been registered in wasClick add to score by 1
    if (!this.state.wasClicked.includes(clickedElem)) {
      // If score is exactly equal to highScore, increase highScore
      if (score === highScore) {
        score++;
        highScore++;
      // else, only increase score
      } else {
        score++;
      }

      // adds click item to wasClicked to keep score
      prevState.push(clickedElem);
    }

    // if element wasClicked, reset score
    if (this.state.wasClicked.includes(clickedElem)) {
      let score = 0;
      
      return this.setState({
        score: score,
        highScore: highScore,
        clickMsgColor: "incorrect",
        navMessage: "Only works once! Incorrect!",
        allImages: shuffled,
        wasClicked: [],
        shake: true
      });
    }

    // upsate state if element is a new click and increase score
    this.setState({
      score: score,
      highScore: highScore,
      clickMsgColor: "correct",
      navMessage: "Super sonic skills!",
      allImages: shuffled,
      wasClicked: prevState,
      shake: false
    });

    // setTimeout for correct color
    return setTimeout(() => this.setState({ clickMsgColor: ""}, 500));
  }

  render() {
    const state = this.state;
    return (
      <React.Fragment>
        <Navbar
          score={state.score}
          highScore={state.highScore}
          navMessage={state.navMessage}
          clickMsgColor={state.clickMsgColor}
        />
        <Banner />
        <Container 
          shake={state.shake}
          imageCharacters={state.allImages}
          clickEvent={this.clickEvent}
        />
        <Footer />
      </React.Fragment>
    )
  }
  
// }
  // render() {
  //   return (
  //     <React.Fragment>
  //       <div className="App">
  //         <header className="App-header">
  //           <img src={logo} className="App-logo" alt="logo" />
  //           <p>
  //             Edit <code>src/App.js</code> and save to reload.
  //         </p>
  //           <a
  //             className="App-link"
  //             href="https://reactjs.org"
  //             target="_blank"
  //             rel="noopener noreferrer"
  //           >
  //             Learn React
  //         </a>
  //         </header>
  //       </div>
  //     </React.Fragment>
  //   );
  // }
}

export default ClickyApp;
