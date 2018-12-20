import React, { Component } from 'react';
import FormDialog from './FormDialog';
import OkDialog from './OkDialog';

export class DefaultPage extends Component {
  state = {
    showFormDialog: false,
    showOKDialog: false
  }
  _handleSend = () => {
    this.setState({showFormDialog: false, showOKDialog: true});
  }
  handlePress = () => {
    this.setState({showFormDialog: true});
  };
  _handleOK = () => {
    this.setState({showOKDialog: false});
  }
  render() {
    return (
      <div className="request-invitation-default-page">
      <FormDialog visible={this.state.showFormDialog} handleConfirm={this._handleSend}></FormDialog>
      <OkDialog visible={this.state.showOKDialog} handleConfirm={this._handleOK}></OkDialog>
        <header className="header"> <p>BROCCOLI & CO.</p></header>
        <div className="content"> 
          <div className="mFontContent">A better way</div>
          <div className="mFontContent">to enjoy every day.</div>
          <div className="sFontContent">Be the first to know when we launch</div>
          <button className="requestButton" onClick={this.handlePress}>Request an invite</button>
        </div>
        <footer className="footer">
          <div className="fonterContent">
            <p>Made with in Melboure</p>
            <p>@ 2016 Broccoli & Co. All rights reserved.</p>
          </div>
        </footer>
      </div>
    );
  }
}

export default DefaultPage;
