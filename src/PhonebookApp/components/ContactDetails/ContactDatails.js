import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import styles from "./ContactDetails.module.css";

import contactsActions from "../../redux/contacts/contactsActions";

import contactDetailsAnimationLeft from "../../utils/animations/contactDetailsMoveLeft.module.css";
import contactDetailsAnimationRight from "../../utils/animations/contactDetailsMoveRight.module.css";

class ContactDetails extends React.Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
    allIds: PropTypes.arrayOf(PropTypes.string).isRequired,

    contactDetailsClose: PropTypes.func.isRequired,
    contactDetailsSet: PropTypes.func.isRequired,
  };

  state = {
    isNext: false,
  };

  handleDetailsNext = () => {
    const { id: currentId, allIds } = this.props;
    const currentIdx = allIds.indexOf(currentId);
    this.setState({ isNext: true });
    const nextIdx = currentIdx === allIds.length - 1 ? 0 : currentIdx + 1;
    this.props.contactDetailsSet(allIds[nextIdx]);
  };

  handleDetailsPrev = () => {
    const { id: currentId, allIds } = this.props;
    const currentIdx = allIds.indexOf(currentId);
    this.setState({ isNext: false });
    const nextIdx = currentIdx === 0 ? allIds.length - 1 : currentIdx - 1;
    this.props.contactDetailsSet(allIds[nextIdx]);
  };

  render() {
    const { id, name, number } = this.props;
    const { isNext } = this.state;
    return (
      <div className={styles.overlay}>
        <div className={styles.container} id="contactDetails">
          <TransitionGroup className={styles.containerInner}>
            <CSSTransition
              key={id}
              timeout={250}
              classNames={
                isNext
                  ? contactDetailsAnimationRight
                  : contactDetailsAnimationLeft
              }
            >
              <div className={styles.contact}>
                <p className={styles.avatar}></p>
                <p className={styles.name}>{name}</p>
                <p className={styles.number}>{number}</p>
              </div>
            </CSSTransition>
          </TransitionGroup>
          <button
            className={styles.btnNext}
            type="button"
            onClick={this.handleDetailsNext}
          ></button>
          <button
            className={styles.btnPrev}
            type="button"
            onClick={this.handleDetailsPrev}
          ></button>
          <button
            className={styles.btnClose}
            data-action="close"
            type="button"
            onClick={this.props.contactDetailsClose}
          ></button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const id = state.contacts.itemDetails;
  const contact = state.contacts.items.find((item) => item.id === id);
  const allIds = state.contacts.items.map((item) => item.id);
  return {
    ...contact,
    allIds,
  };
};

const mapDispatchToProps = (dispatch) => ({
  contactDetailsClose: () => dispatch(contactsActions.contactDetailsClose()),
  contactDetailsSet: (id) => dispatch(contactsActions.contactDetailsSet(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactDetails);
