import React from "react";
import { StyleSheet, AsyncStorage, Text, View, TouchableOpacity } from "react-native";

class SettingsScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.logoutButton} onPress={this.signOutAsync}>
          <Text style={styles.logoutText}>Se déconnecter</Text>
        </TouchableOpacity>
      </View>
    );
  }

  signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate("SignIn");
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  logoutButton: {
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 0.5,
    borderColor: "#FF5A5F",
    borderRadius: 35,
    height: 70,
    width: 220
  },
  logoutText: {
    color: "#FF5A5F",
    fontSize: 24
  }
});

export default SettingsScreen;
