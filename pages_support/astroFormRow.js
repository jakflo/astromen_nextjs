import React, { Component } from 'react';
import InputCell from './inputCell.js';
import GetValidator from './getValidator.js';

export default class AstroFormRow extends React.Component {
    render() {
        var getValidator = new GetValidator();        
        return (
                <tr>
                    <InputCell name="fname" value={this.props.data.f_name} validator={getValidator.jmeno()} label="Jméno" formObj={this.props.parent} />
                    <InputCell name="lname" value={this.props.data.l_name} validator={getValidator.prijmeni()} label="Příjmení" formObj={this.props.parent} />
                    <InputCell name="dob" value={this.props.data.DOB} validator={getValidator.czDatum()} label="Datum narození" formObj={this.props.parent} />
                    <InputCell name="skill" value={this.props.data.skill} validator={getValidator.skill()} label="Dovednost" formObj={this.props.parent} />
                    <td>
                        <input type="submit" name="sent" value="Odeslat" />
                        <button type="button" onClick={this.cancelEdit}>Zrušit</button>
                    </td>
                </tr>
                );
    }
    
    cancelEdit = () => {
        this.props.parent.setState({idToEdit: -1});        
    }
    
};
