import React, { Component } from 'react';
import ModalDialog from './ModalDialog';
import PropTypes from 'prop-types';

export default class OkDialog extends Component {
  static propTypes = {
    handleConfirm: PropTypes.func.isRequired,
    visible: PropTypes.bool.isRequired
  }
  constructor(props){
    super(props);
    this.state = {visible: false};
  };
  componentDidMount() {
      this.setState({ visible: this.props.visible})
  }
  componentWillReceiveProps(props) {
      this.setState({ visible: props.visible })
  }
  render() {
    return (
      <ModalDialog modalTitle="All done!" 
        submitButtonText="OK"
        visible = {this.state.visible}
      >
      <div className="request-invitation-ok-dialog">
        <p>You will be one of the first to experience</p>
        <p>Broccoli & Co. when we launch.</p>
      </div>
      <button onClick={this.props.handleConfirm}>OK</button>
      </ModalDialog>
    );
  }
}
