import React, {Component} from 'react';

class RateBar extends Component{
    constructor(props){
        super(props);
        this.state = { leftValue: props.rate.min, rightValue: props.rate.max };
        this.leftchangeHandler = this.leftchangeHandler.bind(this);
        this.rightchangeHandler = this.rightchangeHandler.bind(this);
        
    }

    componentWillReceiveProps(props) {
        if (props.rate.min !== this.state.leftValue || props.rate.max !== this.state.rightValue) {
            this.setState({ leftValue: props.rate.min, rightValue: props.rate.max });
        }
    }

    getOffset(value) {
        return ((value - 1) / 9 * 97.6).toString() + '%';
    }

    leftchangeHandler(e) {
        const value = parseFloat(e.target.value);
        if (value > this.state.rightValue) {
            this.setState({ leftValue: value, rightValue: value });
        }
        else {
            this.setState({ leftValue: value });
        }
    }

    rightchangeHandler(e) {
        const value = parseFloat(e.target.value);
        if (value < this.state.leftValue) {
            this.setState({ leftValue: value, rightValue: value });
        }
        else {
            this.setState({ rightValue: value });
        }
    }

    render() {

        return <div className="year-bar">
            <div className="year-bar-wrapper">
                <label style={{ left: this.getOffset(this.state.leftValue) }} id="left-label">{this.state.leftValue}</label>

                <input type="range" min="1.0" max="10.0" id="left" name="year" value={this.state.leftValue} step="0.1"
                    onChange={this.leftchangeHandler} onKeyUp={this.props.blurHandler.bind(null, { left: this.state.leftValue, right: this.state.rightValue })}
                    onMouseUp={this.props.blurHandler.bind(null, { left: this.state.leftValue, right: this.state.rightValue })} />
            </div>
            <div className="year-bar-wrapper">
                <input type="range" min="1.0" max="10.0" id="right" name="year" value={this.state.rightValue} step="0.1"
                    onChange={this.rightchangeHandler} onKeyUp={this.props.blurHandler.bind(null, { left: this.state.leftValue, right: this.state.rightValue })}
                    onMouseUp={this.props.blurHandler.bind(null, { left: this.state.leftValue, right: this.state.rightValue })} />

                <label style={{ left: this.getOffset(this.state.rightValue) }} id="right-label">{this.state.rightValue}</label>
            </div>

        </div>
    }
}

export default RateBar;