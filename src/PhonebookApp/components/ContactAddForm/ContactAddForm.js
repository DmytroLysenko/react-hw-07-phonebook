import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { messageShow } from "../../redux/contacts/contactsActions";
import { contactAdd } from "../../redux/contacts/contactsOperations";
import selectors from "../../redux/contacts/contactsSelectors";

import LOGS from "../../utils/LOGS";

import styles from "./ContactAddForm.module.css";

class ContactForm extends React.Component {
  static propTypes = {
    contacts: PropTypes.arrayOf(
      PropTypes.exact({
        id: PropTypes.number.isRequired,
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
  contacts: selectors.contacts(state),
  isMessage: Boolean(selectors.message(state)),
});

const mapDispatchToProps = {
  contactAdd,
  messageShow,
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactForm);
