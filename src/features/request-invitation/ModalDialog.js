import React, { Component } from "react";
import PropTypes from 'prop-types';
import {Modal} from "antd";
import {saveRequest} from "./saveRequest"

class ModalDialog extends React.PureComponent {
  constructor(props){
    super(props);
    this.state = {
      submitButtonText: "",
      submitButtonDisabled: false
    };
  }
  static propTypes = {
    visible: PropTypes.bool.isRequired,
    modalTitle: PropTypes.string.isRequired,
    submitButtonText: PropTypes.string.isRequired,
    handleSubmit: PropTypes.func.isRequired
  }
  static defaultProps = {
    visible: true,
    modalTitle: "",
    submitButtonText: ""
  } 

  componentWillReceiveProps(props) {
    this.setState({ visible: props.visible, 
      submitButtonText: props.submitButtonText, 
      errorMessage: props.errorMessage, 
      submitButtonDisabled: props.submitButtonDisabled});
  }
  componentDidMount() {
    this.setState({ 
      visible: this.props.visible, 
      submitButtonText: this.props.submitButtonText,
      errorMessage: this.props.errorMessage,
      submitButtonDisabled: this.props.submitButtonDisabled
    });
  }
  
  render() {
    let {modalTitle, children, handleSubmit, visible} = this.props;
    return (
        <Modal
          className="request-invitation-modal-dialog" 
          footer={null}
          destroyOnClose={true}
          closable={false}
          visible={visible}
          >
            <div className="content">
              <div className="formTitle">
              <p>{modalTitle}</p>
              <hr className="separator"></hr>
              </div>
              <div className="formContent">
                  {children}
                  <button className="footerButton"  
                  disabled={this.state.submitButtonDisabled} 
                  onClick={handleSubmit}>{this.state.submitButtonText}</button>
                  {this.state.errorMessage && (<div className="errorMessage">{this.state.errorMessage}</div>) }
              </div>
            </div>
        </Modal>
    );
  }
}

export default ModalDialog;
