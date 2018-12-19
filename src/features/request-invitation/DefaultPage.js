import React, { Component } from 'react';
import PropTypes from 'prop-types';
import generateDialog from './FormDialog';

export class DefaultPage extends Component {
  static propTypes = {
    requestInvitation: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };
  state = {
    showFormDialog: false
  }
  handlePress = () => {
   generateDialog({visible:true}).then(result => {

   });
  };
  render() {
    return (
      <div className="request-invitation-default-page">
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
