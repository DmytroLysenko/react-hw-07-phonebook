import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { TransitionGroup, CSSTransition } from "react-transition-group";

import selector from "../../redux/contacts/contactsSelectors";

import ContactListItem from "../ContactListItem/ContactListItem";

import styles from "./ContactList.module.css";
import listItemAmimate from "../../utils/animations/listItem.module.css";


const ContactList = ({ contactsIdsByFilter }) =>
  contactsIdsByFilter.length === 0 ? (
    <p className={styles.noList}>There are no contacts</p>
  ) : (
    <TransitionGroup component="ul" className={styles.list}>
      {contactsIdsByFilter.map((id) => {
        return (
          <CSSTransition
            timeout={250}
            key={id}
            classNames={listItemAmimate}
            unmountOnExit
          >
            <li className={styles.item}>
              <ContactListItem id={id} />
            </li>
          </CSSTransition>
        );
      })}
    </TransitionGroup>
  );

const mapStateToProps = (state) => ({
  contactsIdsByFilter: selector.contactsIdsByFilter(state),
});

export default connect(mapStateToProps)(ContactList);

ContactList.propTypes = {
  contactsIdsByFilter: PropTypes.arrayOf(PropTypes.number).isRequired,
};
