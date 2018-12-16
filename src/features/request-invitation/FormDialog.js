import React, { Component } from "react";
import PropTypes from 'prop-types';
import {Modal} from "antd";
import {saveRequest} from "./saveRequest";
import ModalDialog from './ModalDialog';

const sendText = "Send";
const waitText = "Send, please wait...";
class FormDialog extends Component{
    constructor(props){
        super(props);
        this.state = {
            email: "",
            name: "",
            confirmEmail: "",
            submitButtonText: "",
            submitButtonDisabled: false,
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onNameChange = this.onNameChange.bind(this);
        this.onEmailChange = this.onEmailChange.bind(this);
        this.onConfirmEmailChange = this.onConfirmEmailChange.bind(this);
    }
    onNameChange = (e) => {
        this.setState({
        name: e.target.value
        });
    }
    onEmailChange = (e) => {
        this.setState({
            email: e.target.value
        });
    }
    onConfirmEmailChange = (e) => {
        this.setState({
            confirmEmail: e.target.value
        });
    }
    handleSubmit = (e) => {
        // this.setState({visible: false});
        e.preventDefault();
        const {name, email} = this.state;
        this.setState({submitButtonText: waitText, submitButtonDisabled: true});
        saveRequest({name, email}).then((response)=>{
          if(response.status === 200){
            this.setState({visible:false});
          }
        }).catch((error) =>{
          this.setState({submitButtonText: sendText, submitButtonDisabled: false});
          if(error.response && error.response.status === 400 && error.response.data){
            this.setState({errorMessage: error.response.data.errorMessage});
          }
        });
      }
    componentDidMount() {
        this.setState({ visible: this.props.visible})
    }
    componentWillReceiveProps(props) {
        this.setState({ visible: props.visible })
    }
    render (){
        return (
           <ModalDialog modalTitle="Request an invite" 
           submitButtonText={sendText}
           visible = {this.state.visible}
           submitButtonDisabled = {this.state.submitButtonDisabled}
           errorMessage = {this.state.errorMessage}
           handleSubmit={this.handleSubmit}>
           <input placeholder="Full Name" value={this.state.name}
                    onChange={this.onNameChange}
                ></input>
                <input placeholder="Email"  value={this.state.email}
                    onChange={this.onEmailChange}
                ></input>
                <input placeholder="Confrim Email"  value={this.state.confirmEmail} 
                    onChange={this.onConfirmEmailChange}
                ></input>
           </ModalDialog>
        );
    };
}

export default FormDialog;
