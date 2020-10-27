import React from "react";
import { connect } from "react-redux";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import PropTypes from "prop-types";

import ContactListItem from "../ContactListItem/ContactListItem";

import styles from "./ContactList.module.css";
import listItemAmimate from "../../utils/animations/listItem.module.css";

const ContactList = ({ allIdList }) =>
  allIdList.length === 0 ? (
    <p className={styles.noList}>There are no contacts</p>
  ) : (
    <TransitionGroup component="ul" className={styles.list}>
      {allIdList.map((id) => {
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

const mapStateToProps = (state) => {
  const filterNormalize = state.contacts.filter.toLowerCase();
  return {
    allIdList: state.contacts.items
      .filter((item) => item.name.toLowerCase().includes(filterNormalize))
      .map((item) => item.id),
  };
};

export default connect(mapStateToProps)(ContactList);

ContactList.propTypes = {
  allIdList: PropTypes.arrayOf(PropTypes.string).isRequired,
};
