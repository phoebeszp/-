import React, { Component } from "react";
import {saveRequest} from "./saveRequest";
import ModalDialog from './ModalDialog';
import {Form,Input,Button} from 'antd';
import PropTypes from 'prop-types';

const sendText = "Send";
const waitText = "Send, please wait...";
function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class FormContent extends Component{
    static propTypes = {
      handleConfirm: PropTypes.func.isRequired,
      visible: PropTypes.bool.isRequired
    }
    constructor(props){
        super(props);
        this.state = {
            submitButtonText: sendText,
            submitButtonDisabled: false,
            errorMessage: ""
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
                this.props.handleConfirm();
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
    componentWillMount(){
      this.setState({handleConfirm: this.props.handleConfirm, visible: this.props.visible, errorMessage:""});
    }

    componentWillReceiveProps(props){
      this.setState({visible: props.visible, errorMessage:""});
    }

    render (){
        const FormItem = Form.Item;
        const {getFieldDecorator, getFieldsError, getFieldError, isFieldTouched} = this.props.form;
        return (
            <ModalDialog modalTitle="Request an invite" visible={this.state.visible}>
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
                  disabled={hasErrors(getFieldsError())|| this.state.submitButtonDisabled}
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

const FormDialog = Form.create()(FormContent);
export default FormDialog;
