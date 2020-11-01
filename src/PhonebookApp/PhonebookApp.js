import React from "react";
import { connect } from "react-redux";
import { CSSTransition } from "react-transition-group";
import PropTypes from "prop-types";

import styles from "./PhonebookApp.module.css";
import titleAppAnimate from "./utils/animations/titleApp.module.css";
import filterAnimate from "./utils/animations/filter.module.css";
import messageAnimate from "./utils/animations/message.module.css";

import { contactsLoad } from "./redux/contacts/contactsOperations";
import selectors from "./redux/contacts/contactsSelectors";

import ContactAddForm from "./components/ContactAddForm/ContactAddForm";
import ContactList from "./components/ContactList/ContactList";
import ContactDetails from "./components/ContactDetails/ContactDatails";
import Filter from "./components/Filter/Filter";
import Message from "./components/Message/Message";
import Loader from "./components/Loader/Loader";
import Error from "./components/Error/Error";

class PhonebookApp extends React.Component {
  static propTypes = {
    isFilter: PropTypes.bool.isRequired,
    isMessage: PropTypes.bool.isRequired,
    isContactDetails: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired,
    isError: PropTypes.bool.isRequired,
    contacts: PropTypes.arrayOf(
      PropTypes.exact({
        id: PropTypes.number,
        name: PropTypes.string,
        number: PropTypes.string,
      })
    ).isRequired,
    contactsLoad: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.contactsLoad();
  }

  render() {
    const {
      isMessage,
      isFilter,
      isLoading,
      isError,
      isContactDetails,
    } = this.props;
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

        {isError ? <Error /> : !isLoading && !isError && <ContactList />}

        <CSSTransition
          in={isMessage}
          timeout={250}
          classNames={messageAnimate}
          unmountOnExit
        >
          <Message />
        </CSSTransition>

        {isContactDetails && <ContactDetails />}
        {isLoading && <Loader />}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isFilter: selectors.contacts(state).length > 1 ? true : false,
  isMessage: selectors.message(state) ? true : false,
  isContactDetails: selectors.idContactDetails(state) ? true : false,
  isLoading: selectors.isLoading(state),
  isError: selectors.error(state) ? true : false,
  contacts: selectors.contacts(state),
});

const mapDispatchToProps = {
  contactsLoad,
};

export default connect(mapStateToProps, mapDispatchToProps)(PhonebookApp);
