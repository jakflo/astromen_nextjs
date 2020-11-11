import React, { Component } from 'react';

export default class Messages extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                notice: '', 
                error: ''
            };        
        }
        render() {
            var notice = '';
            var error = '';
            if (this.state.notice !== '') {
                notice = <p className="notice">{this.state.notice}</p>;
            }
            if (this.state.error !== '') {
                error = <p className="error">{this.state.error}</p>;
            }
            return (
                    <div id="flashMsg">
                        {notice}
                        {error}                    
                    </div>
                    );
        }
        
        displayNotice = (notice) => {
            this.setState({
                notice: notice, 
                error: ''
            });
        }
        displayError = (error) => {
            this.setState({
                notice: '', 
                error: error
            });
        }
        clearAll = () => {
            this.setState({
                notice: '', 
                error: ''
            });
        }
        
        componentDidMount() {
            this.props.parent.setMessages(this);
        }
}

