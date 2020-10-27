import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import styles from "./ContactListItem.module.css";

import contactsActions from "../../redux/contacts/contactsActions";

class ContactListItem extends React.Component {
  state = { ...this.props };
  render() {
    const { name, number } = this.state;
    const { contactDetailsSet, removeItem } = this.props;
    return (
      <div className={styles.container} onClick={contactDetailsSet}>
        <span className={styles.name}>
          {name.length < 10 ? name : `${name.substring(0, 9)}...`}
        </span>
        <span className={styles.number}>
          {number.length < 14 ? number : `${number.substring(0, 13)}...`}
        </span>
        <span className={styles.close} onClick={removeItem}></span>
      </div>
    );
  }
}

const mapStateToProps = (state, { id }) => {
  const contact = state.contacts.items.find((item) => item.id === id);
  return {
    ...contact,
  };
};

const mapDispatchToProps = (dispatch, { id }) => ({
  removeItem: (e) => {
    e.stopPropagation();
    dispatch(contactsActions.contactRemove(id));
  },
  contactDetailsSet: () => dispatch(contactsActions.contactDetailsSet(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactListItem);

ContactListItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string,
  number: PropTypes.string,
  removeItem: PropTypes.func.isRequired,
  contactDetailsSet: PropTypes.func.isRequired,
};
