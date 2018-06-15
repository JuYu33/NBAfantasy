import React, { Component } from 'react';
import './App.css';
import ball from './basketball.svg'
import MyGrid from './Components/MyGrid';
import MyTable from './Components/MyTable'

class MyLoading extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: 'Loading.'
    }
  }
  
  componentDidMount() {
    const dot3 = this.state.text + '.....';
    this.interval = setInterval(() => {
      this.state.text === dot3
        ? this.setState(() => ({text: 'Loading'}))
        : this.setState(prevState => ({text: prevState.text + '.'}))
    },300)
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <div>
        <p>
          {this.state.text}
        </p>
      </div>
    )
  }
}

class GameChooser extends Component {
  constructor(props) {
    super(props);
    this.state = {
    
    };

    this.findGame = this.findGame.bind(this);
  }

  findGame(gameID, e) {
    e.preventDefault();

    this.setState({gameID});
  }

  render() {
    console.log("I have this prop: ", this.props.displayData);
    const data = this.props.displayData
      ? this.props.displayData === "no games played"
        ? (<p>There were no games played on this date.</p>)
        : (<ul className="no-dot">
            {this.props.displayData.map(x => (
              <li key={x.id} className="no-dot">
                <button onClick={e => this.findGame(x.id, e)}>
                  {`${x.home.alias} vs ${x.away.alias}`}
                </button>
              </li>
            ))}
            </ul>)
      : null;

    return (
      <div>
        {data}
        <br/>
        <h1>{this.state.gameID}</h1>
        <MyTable stats={123} id={this.state.gameID}/>
      </div>
    )
  }
}

class DateSelector extends Component {
  constructor(prop) {
    super(prop);
    this.state = {
      season: {
        begin : {
          year : "2017",
          month : "10",
          day : "17"
        },
        end : {
          year : "2018",
          month : "06",
          day : "17"
        }
      },
      date: [false],
      display: null,
      loading: false
    }
    this.didSubmit = this.didSubmit.bind(this);
    this.verifyDate = this.verifyDate.bind(this);
  }

  didSubmit(dateArray, e) {
    e.preventDefault();
    let [dateIsValid, dateData1] = dateArray;

    if(!dateIsValid) {
      alert("Please choose a valid date");
    } else {
      this.setState({loading: true});
      let uri1 = `${process.env.REACT_APP_myMongo}/games/find/${dateData1}`;
      fetch(uri1)
        .then(resp => resp.json())
        .then(respJson => {
          console.log("response data from submit: ", respJson);
          this.setState({
            loading: false,
            display: respJson.response.games
          });
        })
        .catch(err => {
          console.log("message: ", err.message);
        })
    }
  }  

  verifyDate(inputDate, season) {
    const [yr,mo,dy] = inputDate.split('-');
    const currDate = new Date();
    const today = {
      month: currDate.getMonth()+1, 
      day: currDate.getDate(), 
      year: currDate.getFullYear()
    };
    const inDate = {
      month: parseInt(mo, 10), 
      day: parseInt(dy, 10), 
      year: parseInt(yr, 10)
    };

    const beforeToday = 
      inDate.year === today.year 
        ? inDate.month === today.month
          ? inDate.day < today.day
          : inDate.month < today.month
        : inDate.year < today.year;
    const duringSeason = 
      inDate.year === parseInt(season.begin.year, 10) 
        ? inDate.month === parseInt(season.begin.month, 10)
          ? inDate.day >= parseInt(season.begin.day, 10)
          : inDate.month > parseInt(season.begin.month, 10)
        : inDate.year === parseInt(season.end.year, 10)
          ? inDate.month === parseInt(season.end.month, 10)
            ? inDate.day <= parseInt(season.end.day, 10)
            : inDate.month < parseInt(season.end.month, 10)
          : false;
    return beforeToday && duringSeason 
      ? [true,inputDate]
      : duringSeason 
        ? [false,[]]
        : [false,"invalid date"];
  }   

  render() {
    const myPrompt = "Please select a date for the 2017-2018 NBA season.";
    console.log("What's my display state? ", this.state.display);
    return (
      <div>
        <form onSubmit={(e)=>this.didSubmit(this.state.date, e)}>
          <label>
            <h2>{myPrompt}</h2>
            <br/>
            <input type="date" 
              min={`${this.state.season.begin.year}-${this.state.season.begin.month}-${this.state.season.begin.day}`}
              max={`${this.state.season.end.year}-${this.state.season.end.month}-${this.state.season.end.day}`}
              onChange={ e => {
                const newDate = this.verifyDate(e.target.value, this.state.season);
                return this.setState({date: newDate});
              }}
            />
          </label>
          <input type="submit" value="Submit" />
        </form>
        {this.state.loading 
          ? <MyLoading/>
          : <GameChooser displayData={this.state.display} />}
      </div>
    )
  }
}


class App extends Component {
  render() {

    return (
      <div className="App">
        <div className="App-header">
          <img src={ball} className="App-logo" alt="logo" />
          <h2>Welcome to NBA Stats</h2>
        </div>
        <DateSelector/>
      </div>
    );
  }
}

export default App;