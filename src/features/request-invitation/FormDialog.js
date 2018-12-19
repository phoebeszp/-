import React, { Component } from "react";
import {saveRequest} from "./saveRequest";
import ModalDialog from './ModalDialog';
import {Form,Input,Button} from 'antd';
import ReactDOM from "react-dom";

const sendText = "Send";
const waitText = "Send, please wait...";
function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class FormDialog extends Component{
    constructor(props){
        super(props);
        this.state = {
            submitButtonText: sendText,
            submitButtonDisabled: false,
            showOkDialog: false
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
            this.setState({submitButtonText:waitText, submitButtonDisabled: true});
            const {name, email} = values;
            saveRequest({name, email}).then((response)=>{
              if(response.status === 200){
                this.setState({visible:false, showOKDialog: true});
                this.setState({submitButtonText: sendText, submitButtonDisabled: false});
              }
            }).catch((error) =>{
              this.setState({submitButtonText: sendText, submitButtonDisabled: false});
              if(error.response && error.response.status === 400 && error.response.data){
                this.setState({errorMessage: error.response.data.errorMessage});
              }
            });
          }
        });
    }
    componentDidMount() {
        this.setState({ visible: this.props.visible});
        // this.props.form.validateFields();
    }
    componentWillReceiveProps(props) {
        this.setState({ visible: props.visible })
    }
    
    render (){
        const FormItem = Form.Item;
        const {getFieldDecorator, getFieldsError, getFieldError, isFieldTouched} = this.props.form;
        return (
            <ModalDialog modalTitle="Request an invite" 
            submitButtonText={this.state.submitButtonText}
            visible = {this.state.visible}
            handleSubmit={this.handleSubmit}>
            <Form onSubmit={this.handleSubmit}>
                <FormItem>
                  {getFieldDecorator('name', {
                    rules: [{ required: true},{min:3}],
                  })(
                    <Input  placeholder="Full Name" />
                  )}
              </FormItem>
              <FormItem>
                  {getFieldDecorator('email', {
                    rules: [{ required: true },{type:"email"}],
                  })(
                    <Input  placeholder="Email" />
                  )}
              </FormItem>
              <FormItem>
                  {getFieldDecorator('confirmEmial', {
                    rules: [{ required: true },{type:"email"}],
                  })(
                    <Input  placeholder="Confirm Email" />
                  )}
              </FormItem>
              <FormItem>
                <Button
                  htmlType="submit"
                  disabled={hasErrors(getFieldsError())&& this.state.submitButtonDisabled}
                  >
                  {this.state.submitButtonText}
                </Button>
              </FormItem>
               <FormItem>
                {this.state.errorMessage && (<div className="errorMessage">{this.state.errorMessage}</div>) }
              </FormItem>
            </Form>
           </ModalDialog>
        );
    };
}

const Dialog =  Form.create()(FormDialog);
const generateDialog = props => {
  return new Promise((fulfill) => { 
    const holder = document.createElement('div')
    document.body.appendChild(holder)

    const close = () => {
      document.body.removeChild(holder)
    }

    ReactDOM.render(
      <Dialog
      {...props}
        onCancel={close}
        onConfirm={() => {
          close();
          fulfill();
        }}
      />,
      holder
    );
  });
}

export default generateDialog;
