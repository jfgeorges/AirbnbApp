import React from "react";
import { FontAwesome } from "@expo/vector-icons";
import { StyleSheet } from "react-native";

import { connect } from "react-redux";

class HeaderButton extends React.Component {
  handleClick = async () => {
    const action = { type: "TOGGLE_MAP_OR_LIST", value: "" };
    this.props.dispatch(action);
  };

  renderButton = () => {
    return this.props.mapOrList === "list" ? "map-o" : "list";
  };
  render() {
    return <FontAwesome onPress={this.handleClick} name={this.renderButton()} size={25} color="white" style={styles.headerButton} />;
  }
}

const mapStateToProps = state => {
  return { mapOrList: state.mapOrList };
};
export default connect(mapStateToProps)(HeaderButton);

const styles = StyleSheet.create({
  headerButton: {
    paddingRight: 16
  }
});
