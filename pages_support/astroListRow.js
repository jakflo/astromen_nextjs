import React, { Component } from 'react';

export default class AstroListRow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.data.id
        }
    }
    
    render() {
        let deleteThat = '';
        if (this.props.idToDelete === this.props.data.id) {
            deleteThat = 'marked_delete';
        }
        return (
                <tr className={deleteThat} >
                    <td>{this.props.data.f_name}</td>
                    <td>{this.props.data.l_name}</td>
                    <td>{this.props.data.DOB}</td>
                    <td>{this.props.data.skill}</td>
                    <td>
                        <button 
                            type="button" 
                            onClick={() => {this.editRow(this.props.data.id);}}
                            >Změnit
                        </button>
                        <button 
                            type="button" 
                            onClick={() => {this.deleteRow(this.props.data.id);}}
                            >Smazat
                        </button>                
                    </td>
                </tr>
                );
    }
    
    buttonClicked = () => {
        this.props.parent.clearFormList();
        this.props.parent.messages.clearAll();        
    }
    
    editRow = (id) => {
        this.buttonClicked();        
        this.props.parent.setState({idToEdit: id, idToDelete: -1});
    }
    
    deleteRow = (id) => {
        this.buttonClicked();
        this.props.parent.setState({idToEdit: -1, idToDelete: id});
    }
}
