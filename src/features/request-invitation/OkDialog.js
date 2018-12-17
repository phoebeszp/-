import React, { Component } from 'react';
import ModalDialog from './ModalDialog';
import PropTypes from 'prop-types';

export default class OkDialog extends Component {
  static propTypes = {
    visible: PropTypes.bool.isRequired
  }
  static defaultProps = {
    visible: true
  }
  constructor(props){
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {visible: true}
  };
  handleSubmit = ()=>{
    this.setState({visible: false});
  }
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
        handleSubmit={this.handleSubmit}
        visible = {this.state.visible}
      >
      <div className="request-invitation-ok-dialog">
        <p>You will be one of the first to experience</p>
        <p>Broccoli & Co. when we launch.</p>
      </div>
      </ModalDialog>
    );
  }
}
