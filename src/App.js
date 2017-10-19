import React, { Component } from 'react';
// import logo from './logo.svg';
import ball from './basketball.svg'
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {

    }
  }

  onHover() {

  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={ball} className="App-logo" alt="logo" />
          <h2>Welcome to Fantasy Matchups</h2>
        </div>
        
        <div className="display">
          <p className="App-intro">
            Click to compare teams
          </p>

          <div className="main">
            <div className="nav">
              <span className="nav-item" onMouseOver={this.onHover()}>Some Data</span>
              <span className="nav-item">MOOOOOOOOOOOOARRRRRRR DATA</span>
            </div>
            <div className="stats">
              <TopRow/>
              <Row/>
              <Row/>
              <Row/>
              <Row/>
              <Row/>
              <Row/>
              <Row/>
              <Row/>
              <Row/>
              <Row/>
              <Row/>
              <Row/>
            </div>
          </div>
        </div>
        
        
      </div>
    );
  }
}

export default App;

class Row extends Component {
  constructor() {
    super();
    this.state = {
      name : "random name",
      fg : Math.random().toFixed(3),
      ft : Math.random().toFixed(3),
      points : (Math.floor(Math.random() * 100) + (Math.random() * 200) + (Math.random()*200) + (Math.random()*100)).toFixed(0),
      threes : (Math.random() * 10).toFixed(0),
      rebounds : ((Math.random() * 50) + (Math.random() * 50) + (Math.random() * 50)).toFixed(0),
      assists : ((Math.random() * 50) + (Math.random() * 50) + (Math.random() * 50)).toFixed(0),
      steals : ((Math.random() * 10) + (Math.random() * 10) + (Math.random() * 10) + (Math.random() * 20)).toFixed(0),
      blocks : ((Math.random() * 10) + (Math.random() * 10) + (Math.random() * 10) + (Math.random() * 10)).toFixed(0),
      turnovers : (15 + 3*((Math.random() * 10) + (Math.random() * 10) + (Math.random() * 10) + (Math.random() * 10) + (Math.random() * 10))).toFixed(0)
    }
  }

  render () {
    let nameData = <TeamData teamname={this.state.name}/>;

    return (
      <div className="">
        <ul className="row">
          <li>
            <img className="portrait" src="https://i.imgur.com/uC04caG.png" alt="img"/>
          </li>
          <li className="cat-player">
            {nameData}
          </li>
          <li className="cat">
            <span className="percent">{this.state.fg}</span>
          </li>
          <li className="cat">
            <span className="percent">{this.state.ft}</span>
          </li>
          <li className="cat">
            <span className="potato">{this.state.threes}</span>
          </li>
          <li className="cat">
            <span className="potato">{this.state.points}</span>
          </li>
          <li className="cat">
            <span className="potato">{this.state.assists}</span>
          </li>
          <li className="cat">
            <span className="potato">{this.state.rebounds}</span>
          </li>
          <li className="cat">
            <span className="potato">{this.state.steals}</span>
          </li>
          <li className="cat">
            <span className="potato">{this.state.blocks}</span>
          </li>
          <li className="cat">
            <span className="potato">{this.state.turnovers}</span>
          </li>
        </ul>
      </div>
    );
  }
}


const TeamData = (props) => (
  <div className="tdName">
    <div className="standing">
      <span>12</span>
    </div>

    <div className="teamname">
      <h5>{props.teamname}</h5>
    </div>
    
    <div className="winloss">
      <span className="floatL">10-10-0</span>
    </div>
  </div>
)

const TopRow = (props) => (
  <div className="nil">
    <ul className="topRow">
        <li className="topDiv name">
          <h4>Team</h4>
        </li>
        <li className="topDiv">
          <h4>FG%</h4>
        </li>
        <li className="topDiv">
          <h4>FT%</h4>
        </li>
        <li className="topDiv">
          <h4>3PT</h4>
        </li>
        <li className="topDiv">
          <h4>PTS</h4>
        </li>
        <li className="topDiv">
          <h4>AST</h4>
        </li>
        <li className="topDiv">
          <h4>REB</h4>
        </li>
        <li className="topDiv">
          <h4>STL</h4>
        </li>
        <li className="topDiv">
          <h4>BLK</h4>
        </li>
        <li className="topDiv">
          <h4>TO</h4>
        </li>
    </ul>
  </div>
)
