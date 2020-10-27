import React from "react";
import { connect } from "react-redux";
import contactsActions from "../../redux/contacts/contactsActions";
import PropTypes from "prop-types";
import styles from "./Filter.module.css";

const Filter = ({ filter, onFilter }) => {
  return (
    <div className={styles.container}>
      <input
        type="text"
        name="filter"
        value={filter}
        onChange={(e) => onFilter(e.target.value)}
        autoComplete="off"
        placeholder="Find contact by name"
        className={styles.input}
      />
    </div>
  );
};

const mapStateToProps = (state) => ({
  filter: state.contacts.filter,
});

const mapDispatchToProps = (dispatch) => ({
  onFilter: (keyword) => dispatch(contactsActions.filter(keyword)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Filter);

Filter.propTypes = {
  filter: PropTypes.string,
  onFilter: PropTypes.func.isRequired,
};
