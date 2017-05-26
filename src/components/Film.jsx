import React, {Component} from 'react';
import Bar from './Bar';

class Film extends Component{
    render() {
        return <div className="film">
            <div className="rating">{this.props.rating}</div>
            <div className="name">{this.props.name} </div>
            <Bar genres={this.props.genres} />
        </div>;
    }
}
export {Film};