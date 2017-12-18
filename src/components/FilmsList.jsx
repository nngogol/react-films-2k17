import React, {Component} from 'react';
import {Film} from './Film';
import * as Main from '../main';

class FilmsList extends Component{
    render() {
        var films = this.props.films.map(film => {
            const genres = Main.intersect(film.Genres, this.props.genres);
            return <Film key={film.Name} name={film.Name} genres={genres} rating={film.IMDB} />
        }, this)
        return (<div className="year">
            <h3>{this.props.year}</h3>
            <div className="films">{films}</div>
        </div>);
    }
}

export default FilmsList;
