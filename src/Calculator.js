import React, { Component } from 'react';
import Addition from './Addition';
import Subtraction from './Subtraction';
import Division from './Division.js';
import Multiplication from './Multiplication';
import './Calc.css';

class Calculator extends Component {
	constructor(props) {
    	super(props);
	    this.state = {
            result: 0,
            history: {},
            setAddition: {},
            setSubtraction: {},
            setDivision: {},
            setMultiplication: {},
        };

        this.onResult = this.onResult.bind(this);
        this.renderHistory = this.renderHistory.bind(this);
        this.clearHistory = this.clearHistory.bind(this);
        this.reCalc = this.reCalc.bind(this);
  	}

  	onResult(result) {
		this.setState({
			result: result.result,
            history: {...this.state.history, [result.id]: result}
		})
	}

	clearHistory() {
		this.setState({history: {}})
	}

    reCalc(historyId){
		this.setState({result: this.state.history[historyId].result})
		switch (this.state.history[historyId].mathSign) {
			case "+":
				this.setState({setAddition: this.state.history[historyId]});
				break;
			case "-":
				this.setState({setSubtraction: this.state.history[historyId]});
				break;
			case "/":
				this.setState({setDivision: this.state.history[historyId]});
				break;
			case "*":
				this.setState({setMultiplication: this.state.history[historyId]});
				break;
			default:
				console.log("Error! No math symbol does not match.")
			}
		}

    renderHistory() {
        return (
            Object.keys(this.state.history).map((historyId) => {
                return (
                    <div
                        key={historyId}
                        style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItem: 'center'}}
                        onClick={() => this.reCalc(historyId)}
                    >
                        <div style={{marginRight: 20}}>
                            {this.state.history[historyId].id}
                        </div>
                        <div style={{marginRight: 20}}>
                            {this.state.history[historyId].a}
                        </div>
                        <div style={{marginRight: 20}}>
                            {this.state.history[historyId].mathSign}
                        </div>
                        <div style={{marginRight: 20}}>
                            {this.state.history[historyId].b}
                        </div>
                        <div style={{marginRight: 20}}>
                            =
                        </div>
                        <div style={{marginRight: 20}}>
                            {this.state.history[historyId].result}
                        </div>
                    </div>
                )
            })
        )
    }

	render() {
		return (
			<div>
				<Addition onResult={this.onResult} reCalc={this.state.setAddition} />
                <Subtraction onResult={this.onResult} reCalc={this.state.setSubtraction} />
                <Division onResult={this.onResult} reCalc={this.state.setDivision} />
                <Multiplication onResult={this.onResult} reCalc={this.state.setMultiplication} />
                <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItem: 'center'}}>Result: {this.state.result}</div>
                <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItem: 'center'}}>
					<p>History:</p>
					{this.renderHistory()}
				</div>
				<button onClick={() => this.clearHistory()}>Clear History</button>
			</div>
		);
	}
}

export default Calculator;