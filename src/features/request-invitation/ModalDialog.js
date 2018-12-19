import React from "react";
import PropTypes from 'prop-types';
import {Modal} from "antd";

class ModalDialog extends React.PureComponent {
  static propTypes = {
    visible: PropTypes.bool.isRequired,
    modalTitle: PropTypes.string.isRequired
  }
  static defaultProps = {
    visible: false,
    modalTitle: ""
  } 
  componentWillReceiveProps(props) {
    this.setState({ visible: props.visible});
  }
  componentDidMount() {
    this.setState({ 
      visible: this.props.visible, 
    });
  }
  
  render() {
    let {modalTitle, children, visible} = this.props;
    return (
        <Modal
          className="request-invitation-modal-dialog" 
          footer={null}
          destroyOnClose={true}
          closable={false}
          centered={true}
          visible={visible}
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
