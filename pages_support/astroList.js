import React, { Component } from 'react';
import AstroListRow from './astroListRow.js';
import AstroFormRow from './astroFormRow.js';
import Messages from './messages.js';
import DeleteRow from './deleteRow';
import SendRequest from '../utils/sendRequest.js';
import $ from 'jquery';

export default class AstroList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            astroList: [], 
            idToEdit: -1, 
            idToDelete: -1
        };
        this.forms = {};
        this.messages = {};
        this.serverError = false;
    }
    
    render() {
        var rows = '';        
        if (this.state.astroList.length > 0) {
            rows = [];
            var k;
            for (k in this.state.astroList) {                
                if (this.state.idToEdit === this.state.astroList[k].id) {
                    rows.push(<AstroFormRow 
                        key={k} 
                        data={this.state.astroList[k]} 
                        parent={this} 
                    />);
                }
                else {
                    rows.push(<AstroListRow 
                        key={k} 
                        data={this.state.astroList[k]} 
                        parent={this} 
                        idToDelete={this.state.idToDelete} 
                    />);
                }
            }
            if (this.state.idToEdit === 0) {
                rows.push(<AstroFormRow key={k + 1} data={{}} parent={this} />);
            }
        }
        return (
                <div id="astroNutz">
                    <Messages parent={this} />
                    <form onSubmit={this.sendForm}>
                        <table className="normTab">
                            <tbody>
                                <tr>
                                    <th>Jméno</th>
                                    <th>Příjmení</th>
                                    <th>Datum narození</th>
                                    <th>Dovednost</th>
                                    <th></th>
                                </tr>
                                {rows}
                            </tbody>
                        </table>
                        <button type="button" onClick={this.addNew}>Přidat nový</button>
                    </form>
                    <DeleteRow data={this.state.astroList} idToDelete={this.state.idToDelete} parent={this} />
                </div>
                );
    }
    
    componentDidMount() {
        this.loadData();
    }
    
    loadData = () => {
        var sendRequest = new SendRequest();        
        var toto = this;
        
        sendRequest.fullReq("GET", 'http://localhost/api/get_all', {}, this, (data, stat) => {
            toto.setState({astroList: data.result, idToEdit: -1, idToDelete: -1});
        });
    }
    
    addNew = () => {
        if (!this.serverError) {
            this.clearFormList();
            this.messages.clearAll();
            this.setState({idToEdit: 0});
        }
    }
    
    clearFormList = () => {
        this.forms = {};
    }
    
    addFormToList = (form) => {
        this.forms[form.props.name] = form;
    }
    
    setMessages = (messages) => {
        this.messages = messages;
    }
    
    checkDuplicideName = () => {
        return new Promise((resolve, reject) => {
            var sendRequest = new SendRequest();            
            if (Object.keys(this.forms).length > 0) {
                var query = this.getQuery();
                var fnameForm = this.forms.fname;
                sendRequest.fullReq("GET", 'http://localhost/api/is_exists', query, this, (data, stat) => {
                    if (data.result === true) {
                        fnameForm.setState({error: 'Toto jméno již existuje.'});
                        resolve(true);
                    }
                    else if (data.result === false) {
                        resolve(false);
                        if (fnameForm.state.error === 'Toto jméno již existuje.') {
                            fnameForm.setState({error: ''});
                        }
                    }
                });
            }
        });
    }
    
    getQuery = () => {
        var query = {
                fname: this.forms.fname.value, 
                lname: this.forms.lname.value, 
                dob: this.forms.dob.value, 
                skill: this.forms.skill.value
            };
        var id = this.state.idToEdit;
        if (id > 0) {
            query.id = id;
        }
        return query;
    }    
    
    sendForm = (event) => {
        event.preventDefault();
        var k;
        var passed = true;
        var id = this.state.idToEdit;
        for (k in this.forms) {
            let form = this.forms[k];
            if (form.change(true) !== '') {
                passed = false;                
            }
        }
        this.checkDuplicideName().then((noDoop) => {
            if (passed && !noDoop) {
                var sendRequest = new SendRequest();
                var query = this.getQuery();
                if (id > 0) {
                    sendRequest.simpleRequest("PUT", 'http://localhost/api/edit', query, this, 'Záznam byl úspešně upraven.');              
                }
                else {
                    sendRequest.simpleRequest("POST", 'http://localhost/api/new', query, this, 'Záznam byl úspešně přidán.');
                }
            }            
        });
    }
}
