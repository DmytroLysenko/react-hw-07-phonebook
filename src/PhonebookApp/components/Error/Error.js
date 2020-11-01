import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import selectors from "../../redux/contacts/contactsSelectors";
import { errorReset } from "../../redux/contacts/contactsActions";

import styles from "./Error.module.css";

const Error = ({ message, errorReset }) => {
  return (
    <div className={styles.container}>
      <p>Oops... something went wrong :(</p>
      <p>
        <strong>{message}</strong>
      </p>
      <button type="button" onClick={errorReset}>
        Ok...
      </button>
    </div>
  );
};

const mapStateToProps = (state) => ({
  message: selectors.error(state),
});

const mapDispatchToProps = {
  errorReset,
};

export default connect(mapStateToProps, mapDispatchToProps)(Error);

Error.defaultProps = {
  message: "Unknown message",
};

Error.propTypes = {
  message: PropTypes.string.isRequired,
  errorReset: PropTypes.func.isRequired,
};
