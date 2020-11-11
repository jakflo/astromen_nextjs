import React, { Component } from 'react';
import $ from 'jquery';

export default class InputCell extends React.Component {        
    constructor(props) {
        super(props);
        this.state = {
            cellSize: 20, 
            error: ''
        };
        this.value = this.props.value === undefined? '' : this.props.value;
        this.validator = this.props.validator;
        this.validator.setValueName(this.props.label);
    }
    
    change = (sendingForm) => {
        this.value = $('#' + this.props.name).val();
        this.resizeCell();
        var error = this.validator.validate(this.value)
        this.setState({error: error});        
        var checklist = ['fname', 'lname', 'dob'];
        if (checklist.indexOf(this.props.name) !== -1 && !sendingForm) {
            this.props.formObj.checkDuplicideName();
        }
        
        return error;
    }
    
    resizeCell = () => {
        var textLen = this.value.length;
        var betterTextLen = textLen + 2;
        this.setState({cellSize: (betterTextLen > 20? betterTextLen : 20)});
    }
    
    render() {
        var errorCell = '';
        if (this.state.error !== '') {
            errorCell = (
                    <div className="errorCell">
                        <span className="form_error">{this.state.error}</span>
                        <br />
                    </div>
                    );
        }
        return (
        <td>
            {errorCell}
            <input 
                className="edit" 
                id={this.props.name} 
                type="text" 
                name={this.props.name} 
                value={this.value} 
                size={this.state.cellSize}
                onChange={() => {this.change(false);}}
            />
        </td>
        );
    };
    
    componentDidMount() {
        this.props.formObj.addFormToList(this);
        this.resizeCell();
    }
};
