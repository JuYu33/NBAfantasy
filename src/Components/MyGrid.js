import React, { Component } from 'react';
// import logo from './logo.svg';
import '../Styles/MyGrid.css';

export default class MyGrid extends Component {
  constructor() {
    super();
    this.state = {

    }
  }

  onHover() {
    
  }

  render() {
    const totalRows = []
    for(let i=0; i<9;i++) {
      totalRows.push(<Row/>)
    }

    return (
      <div className="App">
        
        
        <div className="display">
          <p className="App-intro">
            Click to compare teams
          </p>

          <div className="main">
            <div className="stats">
              <TopRow/>              
              {totalRows}
            </div>
          </div>
        </div>

      </div>
    );
  }
}

class Row extends Component {
  constructor() {
    super();
    this.state = {
      name : "random name",
      stats: [
        Math.random().toFixed(3),
        Math.random().toFixed(3),
        (Math.floor(Math.random() * 100) + (Math.random() * 200) + (Math.random()*200) + (Math.random()*100)).toFixed(0),
        (Math.random() * 10).toFixed(0),
        ((Math.random() * 50) + (Math.random() * 50) + (Math.random() * 50)).toFixed(0),
        ((Math.random() * 50) + (Math.random() * 50) + (Math.random() * 50)).toFixed(0),
        ((Math.random() * 10) + (Math.random() * 10) + (Math.random() * 10) + (Math.random() * 20)).toFixed(0),
        ((Math.random() * 10) + (Math.random() * 10) + (Math.random() * 10) + (Math.random() * 10)).toFixed(0),
        (15 + 3*((Math.random() * 10) + (Math.random() * 10) + (Math.random() * 10) + (Math.random() * 10) + (Math.random() * 10))).toFixed(0)
      ]
    }
  }

  render () {
    return (
      <div className="abc">
        <ul className="row">
          <li>
            <img className="portrait" alt="img"/>
          </li>
          <li className="cat-player">
            <TeamData teamname={this.state.name}/>
          </li>
          {this.state.stats.map(x=>{
            return (
              <li className="cat">
                <span className="potato">{x}</span>
              </li>
            )
          })}
        </ul>
      </div>
    );
  }
}


const TeamData = (props) => (
  <div className="tdName">
    <div className="teamname">
      <h5>{props.teamname}</h5>
    </div>
    <div className="standing">
      <span>12</span>
    </div>
    <div className="winloss">
      <span className="floatL">10-10-0</span>
    </div>
    <div className="show">
      <span className>Show Players</span>
    </div>
  </div>
)

const stats = ["FG%", "FT%", "3PT", "PTS", "AST", "REB", "STL", "BLK", "TO" ]
const TopRow = (props) => (
  <div className="nil">
    <ul className="topRow">
        <li className="topDiv name">
          <h4></h4>
        </li>
        <li className="topDiv">
          <h4>FG%</h4>
        </li>
        {stats.map(x=>{
          return (
            <li className="topDiv">
              <h4>{x}</h4>
            </li>
          )
        })}
    </ul>
  </div>
)
