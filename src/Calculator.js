import React, { Component } from 'react';
import readXlsFile from 'read-excel-file';
import Addition from './Addition';
import Subtraction from './Subtraction';
import Division from './Division.js';
import Multiplication from './Multiplication';
import Export from './Export';
import './Calc.css';

// const history = {"1542882586796":{"id":1542882586796,"a":3,"b":33,"mathSign":"*","result":99},"1542882587194":{"id":1542882587194,"a":3,"b":3,"mathSign":"/","result":1},"1542882587565":{"id":1542882587565,"a":22,"b":2,"mathSign":"-","result":20},"1542882587949":{"id":1542882587949,"a":11,"b":1,"mathSign":"+","result":12}};

class Calculator extends Component {
	constructor(props) {
    	super(props);
	    this.state = {
            result: 0,
            history: {},
            xlsHistory: [],
            setImport: [],
            sorting: "asc",
            setAddition: {},
            setSubtraction: {},
            setDivision: {},
            setMultiplication: {},
        };

        this.onResult = this.onResult.bind(this);
        this.renderHistory = this.renderHistory.bind(this);
        this.clearHistory = this.clearHistory.bind(this);
        this.reCalc = this.reCalc.bind(this);
        this.sortingHistory = this.sortingHistory.bind(this);
        this.clearSetParam = this.clearSetParam.bind(this);
        this.getXlsHistory = this.getXlsHistory.bind(this);
        this.setHistory = this.setHistory.bind(this);
  	}

    getXlsHistory() {
        const input = document.getElementById('input');

	    readXlsFile(input.files[0]).then((rows) => {
            let xlsHistory = this.setHistory(rows);
            console.log('getXlsHistory() {', xlsHistory);
            this.setState({xlsHistory});
        });
    }

    setHistory(xlsHistory) {
	    let paramList = [(a, b) => {return a + b}, (a, b) => {return a - b}, (a, b) => {return a * b}, (a, b) => {return a / b} ];
        let param;
        param = Math.round(Math.random() * (3 - 0) * 0);
	    let historyList = [];

	    console.log('setHistory() {', xlsHistory );

        xlsHistory.forEach(function (val) {
            historyList[historyList.length] = {a: val[0], b: val[1], result: paramList[param](val[0], val[1])};
        });

        return historyList;
    }

  	onResult(result) {
	    let history = {...this.state.history, [result.id]: result};

		this.setState({
			result: result.result,
            history
		});

		this.reCalc(result.id, history);
	}

    sortingHistory() {
	    if(this.state.sorting === "asc") {
            this.setState({sorting: "desc"})
        } else {
            this.setState({sorting: "asc"})
        }

        this.clearSetParam();
    }

    clearSetParam() {
        this.setState({
            setAddition: {},
            setSubtraction: {},
            setDivision: {},
            setMultiplication: {},
        })
    }

	clearHistory() {
		this.setState({
            result: 0,
            history: {},
		});
	}

    reCalc(historyId, history){
		this.setState({
            result: history[historyId].result,
        });

		this.clearSetParam();

		switch (history[historyId].mathSign) {
			case "+":
				this.setState({setAddition: history[historyId]});
				break;
			case "-":
				this.setState({setSubtraction: history[historyId]});
				break;
			case "/":
				this.setState({setDivision: history[historyId]});
				break;
			case "*":
				this.setState({setMultiplication: history[historyId]});
				break;
			default:
				console.log("Error! No math symbol does not match.")
        }
    }

    renderHistory() {
	    let historyList = Object.values(this.state.history).sort((a,b) => {
	        if(this.state.sorting === "asc"){
                return a.result - b.result
            }
            else {
                return a.result + b.result
            }
	    });

        return (
            historyList.map((history) => {
                return (
                    <div
                        key={history.id}
                        style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItem: 'center'}}
                        onClick={() => this.reCalc(history.id, this.state.history)}
                    >
                        <div style={{marginRight: 20}}>
                            {this.state.history[history.id].a}
                        </div>
                        <div style={{marginRight: 20}}>
                            {this.state.history[history.id].mathSign}
                        </div>
                        <div style={{marginRight: 20}}>
                            {this.state.history[history.id].b}
                        </div>
                        <div style={{marginRight: 20}}>
                            =
                        </div>
                        <div style={{marginRight: 20}}>
                            {+this.state.history[history.id].result.toFixed(2)}
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
                <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItem: 'center'}}>Result: {+this.state.result.toFixed(2)}</div>
                <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItem: 'center'}}>
					<p>History:</p>

					{this.renderHistory()}
				</div>
                <button onClick={() => this.sortingHistory()}>Sorting</button>
				<button onClick={() => this.clearHistory()}>Clear History</button>
				<button onClick={() => this.getXlsHistory()}>Import History</button>
                <Export xlsHistory={this.state.xlsHistory} />
            </div>
		);
	}
}

export default Calculator;
