import React, {Component} from 'react';

class YearBar extends Component{
    constructor(props){
        super(props);
        this.state = { leftValue: this.props.years.left, rightValue: this.props.years.right };
        this.leftchangeHandler = this.leftchangeHandler.bind(this);
        this.rightchangeHandler = this.rightchangeHandler.bind(this);
    }

    componentWillReceiveProps(props) {
        if (props.years.left !== this.state.leftValue || props.years.right !== this.state.rightValue) {
            this.setState({ leftValue: props.years.left, rightValue: props.years.right });
        }
    }

    getOffset(value) {
        return ((value - 1915) * 0.96).toString() + '%';
    }

    leftchangeHandler(e) {
        const value = parseInt(e.target.value);
        if (value > this.state.rightValue) {
            this.setState({ leftValue: value, rightValue: value });
        }
        else {
            this.setState({ leftValue: value });
        }
    }

    rightchangeHandler(e) {
        const value = parseInt(e.target.value);
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

                <input type="range" min="1915" max="2016" id="left" name="year" value={this.state.leftValue}
                    onChange={this.leftchangeHandler} onKeyUp={this.props.blurHandler.bind(null, { left: this.state.leftValue, right: this.state.rightValue })}
                    onMouseUp={this.props.blurHandler.bind(null, { left: this.state.leftValue, right: this.state.rightValue })} />
            </div>
            <div className="year-bar-wrapper">
                <input type="range" min="1915" max="2016" id="right" name="year" value={this.state.rightValue} onChange={this.rightchangeHandler}
                    onKeyUp={this.props.blurHandler.bind(null, { left: this.state.leftValue, right: this.state.rightValue })}
                    onMouseUp={this.props.blurHandler.bind(null, { left: this.state.leftValue, right: this.state.rightValue })} />

                <label style={{ left: this.getOffset(this.state.rightValue) }} id="right-label">{this.state.rightValue}</label>
            </div>

        </div>
    }
};

export default YearBar;