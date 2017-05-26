import React, { Component } from 'react';
import logo from './logo.svg';
import * as Main from './main';
import YearBar from './components/YearBar';
import FilmsList from './components/FilmsList';
import RateBar from './components/RateBar';


class App extends Component {

  constructor() {
    super();
    this.state = localStorage[this.STORAGE] ? JSON.parse(localStorage[this.STORAGE]) : this.DEFAULT_SETTINGS;
    this.changeYears = this.changeYears.bind(this);
    this.handleFilter = this.handleFilter.bind(this);
    this.changeRate = this.changeRate.bind(this);
    this.switcherHandler = this.switcherHandler.bind(this);
    this.resetHandler = this.resetHandler.bind(this);

  }

  STORAGE = 'filmsSettings'

  DEFAULT_SETTINGS = {
    isLoaded: false,
    genres: ['All'],
    years: { left: 1915, right: 2016 },
    rate: { min: 1.0, max: 10.0 },
    isAny: true
  }

  componentWillMount() {
    window.onunload = function () {
      // save state
      let settings = this.state;
      settings.isLoaded = false; //for update films in next time 
      localStorage[this.STORAGE] = JSON.stringify(settings);
    }.bind(this);
    var xhr = new XMLHttpRequest();

    xhr.open('GET', 'films.json', false);

    xhr.send();

    let films = JSON.parse(xhr.responseText);
   
    this.allFilms = films;

    this.prevGenres = ["All"];
  }


  handleFilter(event) {
    let genres = this.state.genres;
    this.prevGenres = genres;
    if (event.target.checked) {
      if (genres.indexOf(event.target.value) == -1) {
        genres.push(event.target.value);
      }

    }
    else {
      let pos = genres.indexOf(event.target.value);
      if (pos != -1) {
        genres.splice(pos, 1);
      }
    }
    this.setState({ genres: genres });
  }

  resetCheckboxes(e) {
    if (!e.target.checked) {
      this.setState({ genres: this.prevGenres });
    }
    else {
      this.setState({ genres: ["All"] });
    }
  }

  changeYears(state, e) {
    this.setState({ years: { left: state.left, right: state.right } });
  }

  changeRate(state, e) {
    this.setState({ rate: { min: state.left, max: state.right } });
  }

  switcherHandler(e) {
    const switchAny = !this.state.isAny;
    this.setState({ isAny: switchAny });
  }

  resetHandler(e) {
    this.DEFAULT_SETTINGS.isLoaded = true;
    this.DEFAULT_SETTINGS.genres = ["All"];
    this.setState(this.DEFAULT_SETTINGS);
  }


  render() {
    console.log(this.state);
    var filmsList = [];
      // filter films
      // filter by genres
      let filteredFilms = this.state.genres.length > 1 ? Main.groupBy(this.allFilms.filter(function (el) {
        if (this.state.isAny) {
          return Main.intersect(el.Genres, this.state.genres).length > 0; // filter by genres
        }
        return Main.intersect(el.Genres, this.state.genres).length === this.state.genres.length - 1;
      }, this), 
      x => x.Year) : Main.groupBy(this.allFilms, x => x.Year);

      var props = Object.keys(filteredFilms)
        .filter(x => parseInt(x) >= this.state.years.left && parseInt(x) <= this.state.years.right) // filter by years
        .sort(function (a, b) { return b - a; });

      props.forEach(function (key) {
        const films = filteredFilms[key].filter(x => x.IMDB >= this.state.rate.min && x.IMDB <= this.state.rate.max)
        if (films.length !== 0) {
          filmsList.push(<FilmsList key={key} year={key} genres={this.state.genres} films={films} />);
        }

      }, this);
      //
      return (
        <div>

          <div className="genres">
            <div key="All">
              <label className='btn btn-default'>
                <input id="All" type="checkbox" autoComplete="off"
                  onChange={this.resetCheckboxes} checked={(this.state.genres.length == 1)} name="genres" value="All" />
                <span className={"glyphicon glyphicon-ok " + (this.state.genres.length == 1 ? "active" : "")}></span>
              </label>
              <label className="label-name" style={{ color: "black" }} htmlFor="All">All</label>
            </div>
            {

              Main.genres.map(function (el) {

                const checked = this.state.genres.find(function (genre) { return genre === el.name }) ? true : false;
                const active = checked ? 'active' : '';
                return <div key={el.name}>
                  <label className='btn btn-default'>
                    <input id={el.name} type="checkbox" autoComplete="off"
                      onChange={this.handleFilter} checked={checked} name="genres" value={el.name} />
                    <span className={"glyphicon glyphicon-ok " + active}></span>
                  </label>
                  <label className="label-name" style={{ color: el.color }} htmlFor={el.name}>{el.name}</label>
                </div>
              }, this)
            }
          </div>
          <div id="settings-container">
            <YearBar blurHandler={this.changeYears} years={this.state.years} />
            <RateBar blurHandler={this.changeRate} rate={this.state.rate} />
            <div className="switch">
              <input type="radio" id="Any" name="switch" checked={this.state.isAny} onChange={this.switcherHandler} value="Any" />
              <label htmlFor="Any">Any</label>
              <input type="radio" id="All" name="switch" checked={!this.state.isAny} onChange={this.switcherHandler} value="All" />
              <label htmlFor="All">All</label>
            </div>
            <button onClick={this.resetHandler} id="reset"><span className="glyphicon glyphicon-repeat"></span></button>
            <label htmlFor="reset">Reset</label>
          </div>
          <div id="films-container"> {filmsList}</div>
        </div>
      );

  }
}

export default App;
