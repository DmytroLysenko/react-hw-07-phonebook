import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import * as actions from "../../redux/contacts/contactsActions";
import selectors from "../../redux/contacts/contactsSelectors";

import styles from "./Filter.module.css";

const Filter = ({ filter, onFilter }) => (
  <div className={styles.container}>
    <input
      type="text"
      name="filter"
      value={filter}
      onChange={onFilter}
      autoComplete="off"
      placeholder="Find contact by name"
      className={styles.input}
    />
  </div>
);

const mapStateToProps = (state) => ({
  filter: selectors.filter(state),
});

const mapDispatchToProps = (dispatch) => ({
  onFilter: (e) => dispatch(actions.filter(e.target.value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Filter);

Filter.propTypes = {
  filter: PropTypes.string,
  onFilter: PropTypes.func.isRequired,
};
