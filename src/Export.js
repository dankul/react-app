import React, { Component } from 'react';
import Workbook from 'react-excel-workbook'

export default class Export extends Component {

    render() {
        if(this.props.xlsHistory < 1) {
            return <div> </div>
        }
        return (
            <div className="row text-center" style={{marginTop: '100px'}}>
                <Workbook filename="example.xls" element={<button className="btn btn-lg btn-primary">Try me!</button>}>
                    <Workbook.Sheet data={this.props.xlsHistory} name="Sheet A">
                        <Workbook.Column label="A" value="a"/>
                        <Workbook.Column label="B" value="b"/>
                        <Workbook.Column label="Result" value="result"/>
                    </Workbook.Sheet>
                </Workbook>
            </div>
        )
    }
};
