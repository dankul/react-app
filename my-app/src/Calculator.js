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
            history: {}
        };

        this.onResult = this.onResult.bind(this);
        this.renderHistory = this.renderHistory.bind(this);
        this.clearHistory = this.clearHistory.bind(this);
  	}

  	onResult(result) {
		this.setState({
			result: result.result,
            history: {...this.state.history, [result.id]: result}
		})
	}

    renderHistory() {
		return (
			Object.keys(this.state.history).map((historyId) => {
				return (
					<div
						key={historyId}
						style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItem: 'center'}}
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

	clearHistory() {
		this.setState({history: {}})
	}

	render() {
		console.log(this.state.history);
		// console.log('render() {, this.state.history', this.state.history);
		return (
			<div>
				<Addition onResult={this.onResult} />
                <Subtraction onResult={this.onResult} onHistory={this.onHistory} />
                <Division onResult={this.onResult} />
                <Multiplication onResult={this.onResult} />
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