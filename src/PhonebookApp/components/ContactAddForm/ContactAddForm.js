import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import contactsActions from "../../redux/contacts/contactsActions";

import LOGS from "../../utils/LOGS";

import styles from "./ContactAddForm.module.css";

const uuid = require("uuid");

class ContactForm extends React.Component {
  static propTypes = {
    contacts: PropTypes.arrayOf(
      PropTypes.exact({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        number: PropTypes.string.isRequired,
      })
    ).isRequired,
    isMessage: PropTypes.bool.isRequired,
    contactAdd: PropTypes.func.isRequired,
    messageShow: PropTypes.func.isRequired,
  };

  state = {
    name: "",
    number: "",
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { name, number } = this.state;
    const contact = {
      id: uuid.v4(),
      name: name.split(" ").join(" "),
      number,
    };

    if (this.isContactPassed(contact)) {
      this.props.contactAdd(contact);
    }
    this.reset();
  };

  isContactPassed = (contact) => {
    const namesOfContacts = this.props.contacts.map((contact) =>
      contact.name.toLowerCase()
    );
    const passed = !namesOfContacts.includes(contact.name.toLowerCase());

    if (!passed) {
      this.props.messageShow(`${contact.name} ${LOGS.isPresent}`);
    }
    return passed;
  };

  reset = () =>
    this.setState({
      name: "",
      number: "",
    });

  render() {
    const { name, number } = this.state;
    const { isMessage } = this.props;
    return (
      <form className={styles.form} onSubmit={this.handleSubmit}>
        <label className={styles.label}>
          Name
          <input
            className={styles.input}
            type="text"
            name="name"
            value={name}
            onChange={this.handleChange}
            autoComplete="off"
            autoFocus
          />
        </label>

        <label className={styles.label}>
          Number
          <input
            className={styles.input}
            type="phone"
            name="number"
            value={number}
            onChange={this.handleChange}
            autoComplete="off"
          />
        </label>

        <button
          className={styles.btn}
          type="submit"
          disabled={!name || !number || isMessage}
        >
          Add contact
        </button>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  contacts: state.contacts.items,
  isMessage: Boolean(state.contacts.message),
});

const mapDispatchToProps = (dispatch) => ({
  contactAdd: (contact) => dispatch(contactsActions.contactAdd(contact)),
  messageShow: (message) => dispatch(contactsActions.messageSet(message)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactForm);
