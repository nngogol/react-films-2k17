import React, {Component} from 'react';
import * as Main from '../main';

class Bar extends Component{
     render() {
        const pointWidth = ((100 / this.props.genres.length).toFixed(1)).toString() + '%';
        return <div className="bar">
            {
                this.props.genres.map((el, i) => {
                    return <div key={i} key={el.name} className="point" style={{ width: pointWidth, background: Main.genres.find(x => x.name == el).color }}>

                    </div>
                })
            }
        </div>;
    }
}
export default Bar;
