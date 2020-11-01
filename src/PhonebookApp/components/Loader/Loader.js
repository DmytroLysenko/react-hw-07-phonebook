import React from "react";
import Loader from "react-loader-spinner";

import styles from "./Loader.module.css";

import variables from "../../utils/variables.module.css";

export default class App extends React.Component {
  render() {
    return (
      <Loader
        type="ThreeDots"
        color={variables.colorBlueLight}
        height={80}
        width={80}
        className={styles.loader}
      />
    );
  }
}
