import React from "react";
import { connect } from "react-redux";
import contactsActions from "../../redux/contacts/contactsActions";

import PropTypes from "prop-types";

import styles from "./Message.module.css";

class Message extends React.Component {
  static propTypes = {
    message: PropTypes.string,
    messageClose: PropTypes.func.isRequired,
  };

  componentDidMount() {
    setTimeout(() => this.props.messageClose(), 1500);
  }

  render() {
    return (
      <div className={styles.container}>
        <p className={styles.message}>{this.props.message}</p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  message: state.contacts.message,
});

const mapDispatchToProps = (dispatch) => ({
  messageClose: () => dispatch(contactsActions.messageClose()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Message);
