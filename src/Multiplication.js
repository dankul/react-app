import React, { Component } from 'react';

export default class Multiplication extends Component {
    constructor(props) {
        super(props);
        this.state = {
            a: 0,
            b: 0,
        };

        this.multiplication = this.multiplication.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if(Object.keys(nextProps.reCalc).length > 0) {
            this.setState({a: nextProps.reCalc.a, b: nextProps.reCalc.b })
        }
    }

    multiplication() {
        this.props.onResult({
            id: Date.now(),
            a: Number.parseInt(this.state.a),
            b: Number.parseInt(this.state.b),
            mathSign: "*",
            result: Number.parseInt(this.state.a) * Number.parseInt(this.state.b)
        });
    };

    onClear() {
        this.setState({
            a: 0,
            b: 0,
        })
    }

    render() {
        return (
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItem: 'center'}}>
                <div>
                    <label>
                        a:
                        <input type="text" className="calc-elem number" value={this.state.a} onChange={(event) => this.setState({a: event.target.value})} />
                    </label>
                </div>
                <div>
                    <label>
                        b:
                        <input type="text" className="calc-elem number" value={this.state.b} onChange={(event) => this.setState({b: event.target.value})} />
                    </label>
                    <input type="button" onClick={() => this.multiplication()} className="calc-elem btn division" value="*" />
                </div>

                <button onClick={() => this.onClear()} >clear</button>
            </div>
        )
    }
};