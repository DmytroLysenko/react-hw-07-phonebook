import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import * as operations from "../../redux/contacts/contactsOperations";
import * as actions from "../../redux/contacts/contactsActions";
import selectors from "../../redux/contacts/contactsSelectors";

import styles from "./ContactListItem.module.css";

/**
 * Использование класса? - при анимации удаления
 * элемента нет доступа к пропсам name и number
 * Поэтому храним их в state до unmount компонента
 */
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

const mapStateToProps = (state, { id }) => ({
  ...selectors.contactById(state, id),
});

const mapDispatchToProps = (dispatch, { id }) => ({
  removeItem: (e) => {
    e.stopPropagation();
    dispatch(operations.contactRemove(id));
  },
  contactDetailsSet: () => dispatch(actions.contactDetailsSet(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactListItem);

ContactListItem.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string,
  number: PropTypes.string,
  removeItem: PropTypes.func.isRequired,
  contactDetailsSet: PropTypes.func.isRequired,
};
