import React, { Component } from 'react';
import './App.css';
import ball from './basketball.svg';
import MyTable from './Components/MyTable';
import Calendar from 'react-calendar';

const nba_logos = require.context('../public/logos', false, /\.svg$/);
const team_logo = nba_logos.keys()
      .reduce((image, key) => {
        let x = key.split("/")
        image[x[1]] = nba_logos(key)
        return image
      }, {});

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
        <h1>
          {this.state.text}
        </h1>
      </div>
    )
  }
}

function Matchup(props) {
  const months={
    '01': "Jan",
    '02': "Feb",
    '03': "Mar",
    '04': "Apr",
    '05': "May",
    '06': "Jun",
    '07': "Jul",
    '08': "Aug",
    '09': "Sep",
    '10': "Oct",
    '11': "Nov",
    '12': "Dec"
  }
  let [yr,mo,dy] = props.gameDate[0]
    ? props.gameDate[1].split('-')
    : ['','',''];
  
  return props.displayData
      ? typeof props.displayData === "string"
        ? (<p>{props.displayData}</p>)
        : (
          <div>
            <br/>
            <h4>Games on: {`${months[mo]} ${dy}, ${yr}`} </h4>
            <ul className="flex-parent">
              {props.displayData.map(x => {
                if(x.postSeason && x.postSeason !== "closed") {
                  return (
                    <li key={x.id} className="no-dot why-no-click flex-button-parent">
                      <button className="gimme-lil-space greyed my-flex-button" onClick={e=>e.preventDefault()}>{`${x.home.alias} vs ${x.away.alias}`}</button>
                      <span className="here-why">Scheduled. Unnecessary.</span>
                    </li>
                  )
                } else {
                  return (
                    <li key={x.id} className="no-dot ">
                      <button className="gimme-lil-space my-flex-button" onClick={e => props.findGame(x.id, x.home.alias, x.away.alias, e)}>
                        <span className="buttext"> {`${x.home.alias} vs ${x.away.alias}`}</span>
                        <br/>
                        {/* <span className="buttext"> XXX - XXX </span> */}
                      </button>
                    </li>
                  )
                }
              })}
              </ul>
            </div>
            )
      : null;
}




class GameData extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  componentDidMount(){
    //fetch game logs
  }

  








  render() {
    const showData = this.state.show_stats
      ? (
          <div className="my-container">
            <div className="flex-parent">
              <img 
                src={team_logo[this.state.matchup.home+'.svg']} 
                className="height-restricted  my-flex" 
                onClick={e => this.showTeam(this.state.all_stats.home, this.state.matchup.home, e)} 
                alt={this.state.matchup.home}
              />
              <h1 className={"gimme-space"}>{this.state.score.home}</h1>
              <h3 className="">Final</h3>
              <h1 className={"gimme-space"}>{this.state.score.away}</h1>
              <img 
                src={team_logo[this.state.matchup.away+'.svg']}
                className="height-restricted  my-flex" 
                onClick={e => this.showTeam(this.state.all_stats.away, this.state.matchup.away, e)} 
                alt={this.state.matchup.away}/>
            </div>
            <div className={"flex-parent"}>
              <p className={"gimme-lil-space"}>Boxscores - </p>
              {<button className={"gimme-lil-space"} onClick={e => this.showTeam(this.state.all_stats.home, this.state.matchup.home, e)}>{this.state.matchup.home}</button>}
              {<button className={"gimme-lil-space"} onClick={e => this.showTeam(this.state.all_stats.away, this.state.matchup.away, e)}>{this.state.matchup.away}</button>}
              {<button className={"gimme-lil-space"} onClick={e => this.setState({show_stats: this.state.final_stats})}>FINAL</button>}
            </div>
            <MyTable stats={this.state.show_stats}/>
          </div>
        )
      : null



    return (
      <div>

      </div>
    )
  }
}

class GameChooser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    };

    this.findGame = this.findGame.bind(this);
    this.showTeam = this.showTeam.bind(this);
    this.showDates = this.showDates.bind(this);
  }

  componentDidMount() {
    this.props.someAction();
  }

  componentDidUpdate() {
    console.log("Home data: ", this.state.home);
    console.log("Away data: ", this.state.away);
  }

  showTeam(stats, team, e) {
    e.preventDefault();
    // Uncomment to show team stats above players
    // const players_data = [{
    //   name: team,
    //   fgs: stats.team_stats.field_goals_pct.toFixed(2),
    //   fts: stats.team_stats.free_throws_pct.toFixed(2),
    //   tre: stats.team_stats.three_points_made,
    //   pts: stats.team_stats.points,
    //   reb: stats.team_stats.rebounds,
    //   ast: stats.team_stats.assists,
    //   stl: stats.team_stats.steals,
    //   blk: stats.team_stats.blocks,
    //   tos: stats.team_stats.turnovers
    // }];
    const players_data = [];
    for (const x in stats.players) {
      players_data.push({
        name: stats.players[x].full_name,
        min: stats.players[x].statistics.minutes,
        fgs: stats.players[x].statistics.field_goals_pct.toFixed(2),
        fts: stats.players[x].statistics.free_throws_pct.toFixed(2),
        tre: stats.players[x].statistics.three_points_made,
        pts: stats.players[x].statistics.points,
        reb: stats.players[x].statistics.rebounds,
        ast: stats.players[x].statistics.assists,
        stl: stats.players[x].statistics.steals,
        blk: stats.players[x].statistics.blocks,
        tos: stats.players[x].statistics.turnovers
      })
    }

    this.setState({
      show_stats: players_data
    })
  }

  findGame(gameID, home_team, away_team, e) {
    e.preventDefault();
    this.setState({loading: true});
    if(this.state.searched_game === gameID){
      return null
    }
    const uri1 = `${process.env.REACT_APP_myMongo}/matchup/search/${gameID}`;
    const uri_team = `${process.env.REACT_APP_myMongo}/games/teamthings/`;
    let home = null;
    let away = null;
    fetch(uri1)
      .then(data => data.json())
      .then(extract => {
        this.setState({
          loading: false,
          matchupStyles: {
            gameID: "bold"
          },
          matchup: {
            home: home_team,
            away: away_team
          },
          score: {
            home: extract.stats.home.team_stats.points,
            away: extract.stats.away.team_stats.points
          },
          all_stats: extract.stats,
          final_stats: [{
            name: home_team,
            fgs: extract.stats.home.team_stats.field_goals_pct.toFixed(2),
            fts: extract.stats.home.team_stats.free_throws_pct.toFixed(2),
            tre: extract.stats.home.team_stats.three_points_made,
            pts: extract.stats.home.team_stats.points,
            reb: extract.stats.home.team_stats.rebounds,
            ast: extract.stats.home.team_stats.assists,
            stl: extract.stats.home.team_stats.steals,
            blk: extract.stats.home.team_stats.blocks,
            tos: extract.stats.home.team_stats.turnovers
          },{
            name: away_team,
            fgs: extract.stats.away.team_stats.field_goals_pct.toFixed(2),
            fts: extract.stats.away.team_stats.free_throws_pct.toFixed(2),
            tre: extract.stats.away.team_stats.three_points_made,
            pts: extract.stats.away.team_stats.points,
            reb: extract.stats.away.team_stats.rebounds,
            ast: extract.stats.away.team_stats.assists,
            stl: extract.stats.away.team_stats.steals,
            blk: extract.stats.away.team_stats.blocks,
            tos: extract.stats.away.team_stats.turnovers
          }],
          show_stats: [{
            name: home_team,
            fgs: extract.stats.home.team_stats.field_goals_pct.toFixed(2),
            fts: extract.stats.home.team_stats.free_throws_pct.toFixed(2),
            tre: extract.stats.home.team_stats.three_points_made,
            pts: extract.stats.home.team_stats.points,
            reb: extract.stats.home.team_stats.rebounds,
            ast: extract.stats.home.team_stats.assists,
            stl: extract.stats.home.team_stats.steals,
            blk: extract.stats.home.team_stats.blocks,
            tos: extract.stats.home.team_stats.turnovers
          },{
            name: away_team,
            fgs: extract.stats.away.team_stats.field_goals_pct.toFixed(2),
            fts: extract.stats.away.team_stats.free_throws_pct.toFixed(2),
            tre: extract.stats.away.team_stats.three_points_made,
            pts: extract.stats.away.team_stats.points,
            reb: extract.stats.away.team_stats.rebounds,
            ast: extract.stats.away.team_stats.assists,
            stl: extract.stats.away.team_stats.steals,
            blk: extract.stats.away.team_stats.blocks,
            tos: extract.stats.away.team_stats.turnovers
          }]
        })
        return fetch(uri_team+home_team)
      })
      .then(parseHome => parseHome.json())
      .then(homeInfo => {
        home = homeInfo.results[0];
        return fetch(uri_team+away_team)
      })
      .then(parseAway => parseAway.json())
      .then(awayInfo => {
        away = awayInfo.results[0];
        console.log("Home: ", home)
        console.log("Away: ", away);
        this.setState({away, home});
      })
      .catch(err=> {
        console.log(err)
        this.setState({
          loading: false
        })
        return null
      })
  }

  showDates() {

  }

  render() {
    const showData = this.state.show_stats
      ? (
          <div className="my-container">
            <div className="flex-parent">
              <img 
                src={team_logo[this.state.matchup.home+'.svg']} 
                className="height-restricted  my-flex" 
                onClick={e => this.showTeam(this.state.all_stats.home, this.state.matchup.home, e)} 
                alt={this.state.matchup.home}
              />
              <h1 className={"gimme-space"}>{this.state.score.home}</h1>
              <h3 className="">Final</h3>
              <h1 className={"gimme-space"}>{this.state.score.away}</h1>
              <img 
                src={team_logo[this.state.matchup.away+'.svg']}
                className="height-restricted  my-flex" 
                onClick={e => this.showTeam(this.state.all_stats.away, this.state.matchup.away, e)} 
                alt={this.state.matchup.away}/>
            </div>
            <div className={"flex-parent"}>
              <p className={"gimme-lil-space"}>Boxscores - </p>
              {<button className={"gimme-lil-space"} onClick={e => this.showTeam(this.state.all_stats.home, this.state.matchup.home, e)}>{this.state.matchup.home}</button>}
              {<button className={"gimme-lil-space"} onClick={e => this.showTeam(this.state.all_stats.away, this.state.matchup.away, e)}>{this.state.matchup.away}</button>}
              {<button className={"gimme-lil-space"} onClick={e => this.setState({show_stats: this.state.final_stats})}>FINAL</button>}
            </div>
            <MyTable stats={this.state.show_stats}/>
          </div>
        )
      : null

    return (
      <div>
        <Matchup findGame={this.findGame} displayData={this.props.displayData} gameDate={this.props.gameDate}/>
        <br/>
        {this.state.loading 
          ? <MyLoading/>
          : null}
        {showData}
        <GameData stats={this.state}/>
        
        <br/>
        <div>
          <p>{this.state.away ? this.state.away.dates[10] : null}</p>
        </div>
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
      cal_min: new Date(2017, 9, 17),
      cal_max: new Date(2018, 5, 17),
      cal_date: new Date(2017, 5, 6),
      date: [false],
      display: null,
      display_date: null,
      loading: false,
      show: true,
      myPrompt: "Please select a date for the 2017-2018 NBA season."
    }
    this.didSubmit = this.didSubmit.bind(this);
    this.verifyDate = this.verifyDate.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.hideCal = this.hideCal.bind(this);
  }

  componentDidUpdate() {
    // console.log("Calendar date is: ", this.state.cal_date)
  }

  didSubmit(dateArray) {
    console.log("verifying input: ", dateArray) ;
    let [dateIsValid, date] = dateArray;
    if(date === this.state.display_date) {
      console.log("error?")
      return null
    } else if(!dateIsValid) {
      alert("Please choose a valid date");
    } else {
      this.setState({loading: true});
      const uri1 = `${process.env.REACT_APP_myMongo}/games/find/${date}`;
      fetch(uri1)
        .then(resp => resp.json())
        .then(respJson => {
          const send = typeof respJson.response === "string"
            ? respJson.response
            : respJson.response.games
          this.setState({
            date: [true, date],
            myPrompt: null,
            loading: false,
            display: send,
            display_date: date,
            show: true
          });
        })
        .catch(err => {
          this.setState({
            loading: false,
            display: "Error Loading Data"
          })
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
      ? this.didSubmit([true,inputDate])
      : duringSeason 
        ? [false,[]]
        : [false,"invalid date"];
  }

  handleChange(date) {
    let mo = date.getMonth()+1;
    let dy = date.getDate();
    mo = mo < 10
      ? '0'+mo
      : mo
    dy = dy < 10
      ? '0'+dy
      : dy
    let newDate = `${date.getFullYear()}-${mo}-${dy}`
    this.verifyDate(newDate, this.state.season);
    this.setState({cal_date: date});
  }

  hideCal(){
    this.state.show 
    ? this.setState({show:false})
    : null
  }

  render() {
/*
    const showForm = this.state.show 
      // ? <form className="gimme-space" onSubmit={(e)=>this.didSubmit(this.state.date, e)}>
      ? <form className="gimme-space">
          <label>
            <input type="date" 
              min={`${this.state.season.begin.year}-${this.state.season.begin.month}-${this.state.season.begin.day}`}
              max={`${this.state.season.end.year}-${this.state.season.end.month}-${this.state.season.end.day}`}
              onChange={ e => {
                const newDate = this.verifyDate(e.target.value, this.state.season);
                // this.didSubmit(newDate, e); //uncomment to auto submit
                return this.setState({date: newDate});
              }}
            />
          </label>
          <input type="submit" value="Submit" />
        </form>
      : <button className="gimme-space" onClick={()=>{this.setState({show:true})}}>
          Date Selector
        </button>
*/
    const showCal = this.state.show 
    ? <div>
        <button className="gimme-space" onClick={this.hideCal}>
          Hide Calendar
        </button>
        <div className='flex-parent'>
          <Calendar 
            onChange={value => this.handleChange(value)}
            maxDate={this.state.cal_max}
            minDate={this.state.cal_min}
            minDetail="year"
            
            value={this.state.cal_date}
          />
        </div>
      </div>
    : <button className="gimme-space" onClick={()=>{this.setState({show:true})}}>
        Show Calendar
      </button>

    return (
      <div>
        <h4>{this.state.myPrompt}</h4>
        {/* {showForm} */}
        {showCal}
        {this.state.loading 
          ? <MyLoading/>
          : <GameChooser someAction={this.hideCal} gameDate={this.state.date} displayData={this.state.display} />}
          
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