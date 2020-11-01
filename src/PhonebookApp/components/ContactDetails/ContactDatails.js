import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import {
  contactDetailsClose,
  contactDetailsSet,
} from "../../redux/contacts/contactsActions";
import selector from "../../redux/contacts/contactsSelectors";

import styles from "./ContactDetails.module.css";

import contactDetailsAnimationLeft from "../../utils/animations/contactDetailsMoveLeft.module.css";
import contactDetailsAnimationRight from "../../utils/animations/contactDetailsMoveRight.module.css";

class ContactDetails extends React.Component {
  static propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
    contactsIdsByFilter: PropTypes.arrayOf(PropTypes.number).isRequired,

    contactDetailsClose: PropTypes.func.isRequired,
    contactDetailsSet: PropTypes.func.isRequired,
  };

  state = {
    isNext: false,
  };

  handleDetailsNext = () => {
    const { id: currentId, contactsIdsByFilter } = this.props;
    const currentIdx = contactsIdsByFilter.indexOf(currentId);
    this.setState({ isNext: true });
    const nextIdx =
      currentIdx === contactsIdsByFilter.length - 1 ? 0 : currentIdx + 1;
    this.props.contactDetailsSet(contactsIdsByFilter[nextIdx]);
  };

  handleDetailsPrev = () => {
    const { id: currentId, contactsIdsByFilter } = this.props;
    const currentIdx = contactsIdsByFilter.indexOf(currentId);
    this.setState({ isNext: false });
    const nextIdx =
      currentIdx === 0 ? contactsIdsByFilter.length - 1 : currentIdx - 1;
    this.props.contactDetailsSet(contactsIdsByFilter[nextIdx]);
  };

  render() {
    const { id, name, number, contactDetailsClose } = this.props;
    const { isNext } = this.state;
    return (
      <div className={styles.overlay}>
        <div className={styles.container}>
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
            onClick={() => contactDetailsClose()}
          ></button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const id = selector.idContactDetails(state);
  const contact = selector.contactById(state, id);
  const contactsIdsByFilter = selector.contactsIdsByFilter(state);
  return {
    ...contact,
    contactsIdsByFilter,
  };
};

const mapDispatchToProps = {
  contactDetailsClose,
  contactDetailsSet,
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactDetails);
