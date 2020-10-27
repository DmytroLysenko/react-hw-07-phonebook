import React from "react";
import { connect } from "react-redux";
import { CSSTransition } from "react-transition-group";
import PropTypes from "prop-types";

import styles from "./PhonebookApp.module.css";
import titleAppAnimate from "./utils/animations/titleApp.module.css";
import filterAnimate from "./utils/animations/filter.module.css";
import messageAnimate from "./utils/animations/message.module.css";
import listItemAmimate from "./utils/animations/listItem.module.css";

import LocalStorage from "./utils/localStorageAPI";

import contactsActions from "./redux/contacts/contactsActions";

import ContactAddForm from "./components/ContactAddForm/ContactAddForm";
import ContactList from "./components/ContactList/ContactList";
import ContactDetails from "./components/ContactDetails/ContactDatails";
import Filter from "./components/Filter/Filter";
import Message from "./components/Message/Message";

const CONTACTS = "contacts";

class PhonebookApp extends React.Component {
  static propTypes = {
    isContacts: PropTypes.bool.isRequired,
    isFilter: PropTypes.bool.isRequired,
    isMessage: PropTypes.bool.isRequired,
    isContactDetails: PropTypes.bool.isRequired,
    contacts: PropTypes.arrayOf(
      PropTypes.exact({
        id: PropTypes.string,
        name: PropTypes.string,
        number: PropTypes.string,
      })
    ).isRequired,
    contactsLoad: PropTypes.func.isRequired,
  };

  componentDidMount() {
    const contacts = LocalStorage.get(CONTACTS);
    this.props.contactsLoad(contacts);
  }

  componentDidUpdate() {
    const oldContacts = JSON.stringify(LocalStorage.get(CONTACTS));
    const newContacts = JSON.stringify(this.props.contacts);

    if (oldContacts !== newContacts) {
      LocalStorage.set(CONTACTS, newContacts);
    }
  }

  render() {
    const { isMessage, isContacts, isFilter, isContactDetails } = this.props;
    return (
      <div className={styles.container}>
        <CSSTransition
          in={true}
          appear={true}
          timeout={500}
          classNames={titleAppAnimate}
        >
          <h1 className={styles["title-app"]}>Phonebook</h1>
        </CSSTransition>

        <ContactAddForm />

        <h2 className={styles.title}>Contacts</h2>
        <CSSTransition
          in={isFilter}
          timeout={250}
          classNames={filterAnimate}
          unmountOnExit
        >
          <Filter />
        </CSSTransition>

        <CSSTransition
          in={isContacts}
          appear={true}
          timeout={250}
          classNames={listItemAmimate}
        >
          <ContactList />
        </CSSTransition>

        <CSSTransition
          in={isMessage}
          timeout={250}
          classNames={messageAnimate}
          unmountOnExit
        >
          <Message />
        </CSSTransition>

        {isContactDetails && <ContactDetails />}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isContacts: state.contacts.items.length > 0 ? true : false,
  isFilter: state.contacts.items.length > 1 ? true : false,
  isMessage: state.contacts.message ? true : false,
  isContactDetails: state.contacts.itemDetails ? true : false,
  contacts: state.contacts.items,
});

const mapDispatchToProps = (dispatch) => ({
  contactsLoad: (contacts) => dispatch(contactsActions.contactsLoad(contacts)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PhonebookApp);
