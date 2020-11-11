import React, { Component } from 'react';
import ArrayTools from '../utils/arrayTools';
import SendRequest from '../utils/sendRequest.js';

export default class DeleteRow extends React.Component {
        render() {
            if (this.props.idToDelete === -1) {
                return '';
            }
            var arrayTools = new ArrayTools();
            var dataRow = arrayTools.searchInObjArray(this.props.data, 'id', this.props.idToDelete)[0];
            return (
                    <div id="deleteConfirm">
                        <p className="error">Skutečně chcete vymazat astronauta {dataRow.f_name} {dataRow.l_name}?</p>
                        <button type="button" onClick={this.deleteRow} >Ano</button>
                        <button type="button" onClick={this.cancel} >Ne</button>
                    </div>                    
                    );
        }
        
        deleteRow = () => {
            var sendRequest = new SendRequest();
            var url = 'http://localhost/api/delete/' + this.props.idToDelete;
            sendRequest.simpleRequest("DELETE", url, {}, this.props.parent, 'Záznam byl úspešně vymazán.');            
        }
        
        cancel = () => {
            this.props.parent.setState({idToDelete: -1});            
        }
        
}

