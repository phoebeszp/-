import React from "react";
import PropTypes from 'prop-types';
import {Modal, Spin} from "antd";

class ModalDialog extends React.PureComponent {
  constructor(props){
    super(props);
    this.state = {visible : this.props.visible, modalTitle: this.props.modalTitle};
  }
  static propTypes = {
    modalTitle: PropTypes.string.isRequired,
    visible: PropTypes.bool.isRequired
  }
  componentWillMount(){
    this.setState({visible: this.props.visible});
  }
  componentWillReceiveProps(props){
    this.setState({visible: props.visible});
  }
  render() {
    let {modalTitle, children} = this.props;
    return (
        <Modal
          className="request-invitation-modal-dialog" 
          footer={null}
          destroyOnClose={true}
          closable={false}
          centered={true}
          visible={this.state.visible}
          >
            <div className="content">
              <div className="formTitle">
              <p>{modalTitle}</p>
              <hr className="separator"></hr>
              </div>
              <div className="formContent">
                  {children}
              </div>
            </div>
        </Modal>
    );
  }
}

export default ModalDialog;
