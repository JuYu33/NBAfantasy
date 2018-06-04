import React, { Component } from 'react';

const season1718 = {
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
}

class DateSelector extends Component {
  constructor(prop) {
    super(prop);
    this.state = {
      season: season1718,
      date: {
        month: "01",
        day: "01",
        year: "2018"
      }
    }
  }

  render() {
    const currDate = new Date();
    const today = {
      month: currDate.getMonth()+1, 
      day: currDate.getDate(), 
      year: currDate.getFullYear()
    };

    function verifyDate(inputDate, season) {
      const dateSplit = inputDate.split('-');
      const inDate = {
        month: parseInt(dateSplit[1], 10), 
        day: parseInt(dateSplit[2], 10), 
        year: parseInt(dateSplit[0], 10)
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
          ? [false,"no games played yet"]
          : [false,"invalid date"];
    }   

    return (
      <div>
        <h4>Season 2017-2018</h4>
        <form onSubmit={(e)=>this.props.didSubmit(this.state.date, e)}>
          <label>
            {this.props.someProp}: 
            <br/>
            {/* <input type="date"  onChange={(event) => this.setState({startDate: event.target.value})}/> */}
            <input type="date" 
              min={`${this.state.season.begin.year}-${this.state.season.begin.month}-${this.state.season.begin.day}`}
              max={`${this.state.season.end.year}-${this.state.season.end.month}-${this.state.season.end.day}`}
              onChange={ e => {
                const newDate = verifyDate(e.target.value, this.state.season);
                return this.setState({date: newDate});
              }}
            />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
    )
  }
}


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.handleFindGame = this.handleFindGame.bind(this);
    this.handleFindGameDate = this.handleFindGameDate.bind(this);
  }

  componentDidMount() {
  }

  handleFindGame(gameId) {

  }

  handleFindGameDate(date, e) {
    e.preventDefault();
    console.log("Submit Date: ", date);

      if(date[0]) {
        let uri1 = `${process.env.REACT_APP_myMongo}/games/find/${date[1]}`;
        let onServer = false;

        //TODO: check if server is running
        console.log("fetching: ", uri1);
        fetch(uri1)
          // .then(resp => resp.json())
          .then(resp => {
            console.log("resp stuff", resp);
          })
          .then(respJson => {
            console.log("The response: ", respJson);
            if(respJson.game[0]){
              console.log("Found jsondate: ", respJson.games[0]._id);
              onServer = true;
            }

            
          })
          .catch(err => {
            if(err.name === "TypeError") {console.log("Uh oh error: ")};
            console.log("message: ", err.message);
      })

/*
    const gamesListFromSportsAPI = {
      "date": "2018-05-08",
      "league": {
          "id": "4353138d-4c22-4396-95d8-5f587d2df25c",
          "name": "NBA",
          "alias": "NBA"
      },
      "games": [{
          "id": "7bb47540-95cc-47a4-9ee4-3899794e9524",
          "status": "closed",
          "title": "Game 5",
          "coverage": "full",
          "scheduled": "2018-05-09T00:00:00+00:00",
          "home_points": 112,
          "away_points": 102,
          "track_on_court": true,
          "reference": "0041700225",
          "venue": {
              "id": "5b239206-57ce-50aa-baaa-627f3349dfdc",
              "name": "Toyota Center",
              "capacity": 18055,
              "address": "1510 Polk St.",
              "city": "Houston",
              "state": "TX",
              "zip": "77002",
              "country": "USA"
          },
          "broadcast": {
              "network": "TNT",
              "satellite": "245"
          },
          "home": {
              "name": "Houston Rockets",
              "alias": "HOU",
              "id": "583ecb3a-fb46-11e1-82cb-f4ce4684ea4c",
              "reference": "1610612745"
          },
          "away": {
              "name": "Utah Jazz",
              "alias": "UTA",
              "id": "583ece50-fb46-11e1-82cb-f4ce4684ea4c",
              "reference": "1610612762"
          }
      }, {
          "id": "e55bba63-07a3-4aeb-8e0a-adce124dabdf",
          "status": "closed",
          "title": "Game 5",
          "coverage": "full",
          "scheduled": "2018-05-09T02:30:00+00:00",
          "home_points": 113,
          "away_points": 104,
          "track_on_court": true,
          "reference": "0041700235",
          "venue": {
              "id": "e25e21f2-1d67-5f13-910b-81fc8629eea7",
              "name": "Oracle Arena",
              "capacity": 19596,
              "address": "7000 Coliseum Way",
              "city": "Oakland",
              "state": "CA",
              "zip": "94621",
              "country": "USA"
          },
          "broadcast": {
              "network": "TNT",
              "satellite": "245"
          },
          "home": {
              "name": "Golden State Warriors",
              "alias": "GSW",
              "id": "583ec825-fb46-11e1-82cb-f4ce4684ea4c",
              "reference": "1610612744"
          },
          "away": {
              "name": "New Orleans Pelicans",
              "alias": "NOP",
              "id": "583ecc9a-fb46-11e1-82cb-f4ce4684ea4c",
              "reference": "1610612740"
          }
      }]
    }

    if (false) {
      const uri = `${process.env.REACT_APP_myMongo}/games/save`;
      //Done
      fetch(uri, {
        method: 'POST',
        headers: {
          'content-type' : 'application/json'
        },
        body: JSON.stringify({
          date: gamesListFromSportsAPI.date,
          games: gamesListFromSportsAPI.games.map(eachGame => {
            return {
              id : eachGame.id,
              matchup : `${eachGame.home.alias} vs ${eachGame.away.alias}`
            }
          })
        })
      })
      .then(result =>{
        console.log(result);
      })
      .catch(err => {
        console.log("Uh oh error: ");
        console.log(err);
      })
    }
*/  
    } else {
      //Mount based on date[1]
      console.log(date[1]);
    }
  }

  render() {
    const myPrompt = "Please select a date during the 2017-2018 season. Game data will only appear for games played before todays date";

    return (
      <div className="App">
        <h1>NBA API</h1>
        <DateSelector someProp={myPrompt} didSubmit={this.handleFindGameDate}/>
      </div>
    );
  }
}

export default App;


//From schedule: http://api.sportradar.us/nba/trial/v4/en/games/2018/05/08/schedule.json?api_key=
/*
Content: 
{
  "date": "2018-05-08",
  "league": {
      "id": "4353138d-4c22-4396-95d8-5f587d2df25c",
      "name": "NBA",
      "alias": "NBA"
  },
  "games": [{
      "id": "7bb47540-95cc-47a4-9ee4-3899794e9524",
      "status": "closed",
      "title": "Game 5",
      "coverage": "full",
      "scheduled": "2018-05-09T00:00:00+00:00",
      "home_points": 112,
      "away_points": 102,
      "track_on_court": true,
      "reference": "0041700225",
      "venue": {
          "id": "5b239206-57ce-50aa-baaa-627f3349dfdc",
          "name": "Toyota Center",
          "capacity": 18055,
          "address": "1510 Polk St.",
          "city": "Houston",
          "state": "TX",
          "zip": "77002",
          "country": "USA"
      },
      "broadcast": {
          "network": "TNT",
          "satellite": "245"
      },
      "home": {
          "name": "Houston Rockets",
          "alias": "HOU",
          "id": "583ecb3a-fb46-11e1-82cb-f4ce4684ea4c",
          "reference": "1610612745"
      },
      "away": {
          "name": "Utah Jazz",
          "alias": "UTA",
          "id": "583ece50-fb46-11e1-82cb-f4ce4684ea4c",
          "reference": "1610612762"
      }
  }, {
      "id": "e55bba63-07a3-4aeb-8e0a-adce124dabdf",
      "status": "closed",
      "title": "Game 5",
      "coverage": "full",
      "scheduled": "2018-05-09T02:30:00+00:00",
      "home_points": 113,
      "away_points": 104,
      "track_on_court": true,
      "reference": "0041700235",
      "venue": {
          "id": "e25e21f2-1d67-5f13-910b-81fc8629eea7",
          "name": "Oracle Arena",
          "capacity": 19596,
          "address": "7000 Coliseum Way",
          "city": "Oakland",
          "state": "CA",
          "zip": "94621",
          "country": "USA"
      },
      "broadcast": {
          "network": "TNT",
          "satellite": "245"
      },
      "home": {
          "name": "Golden State Warriors",
          "alias": "GSW",
          "id": "583ec825-fb46-11e1-82cb-f4ce4684ea4c",
          "reference": "1610612744"
      },
      "away": {
          "name": "New Orleans Pelicans",
          "alias": "NOP",
          "id": "583ecc9a-fb46-11e1-82cb-f4ce4684ea4c",
          "reference": "1610612740"
      }
  }]
}
*/