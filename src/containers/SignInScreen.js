import React from "react";
import { TouchableOpacity, AsyncStorage, View, Text, TextInput, StyleSheet, KeyboardAvoidingView, StatusBar } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

class SignInScreen extends React.Component {
  state = { email: "arno@airbnb-api.com", password: "password01" };

  static navigationOptions = () => {
    return {
      header: null
    };
  };

  handleChange = (propName, value) => {
    this.setState({ [propName]: value });
  };
  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#FF5A5F" barStyle="light-content" translucent={false} />
        <View style={styles.topContainer}>
          <MaterialIcons name="home" size={150} color="white" />
          <Text style={styles.welcome}>Welcome</Text>
        </View>
        <KeyboardAvoidingView style={styles.bottomContainer} behavior="padding">
          <TextInput
            autoCorrect={false}
            autoCapitalize={"none"}
            placeholder="Email"
            placeholderTextColor="white"
            style={styles.input}
            secureTextEntry={false}
            keyboardType={"email-address"}
            value={this.state.email}
            onChangeText={value => {
              this.handleChange("email", value);
            }}
          />
          <TextInput
            autoCorrect={false}
            autoCapitalize={"none"}
            placeholder="Password"
            placeholderTextColor="white"
            style={styles.input}
            secureTextEntry={true}
            keyboardType={"default"}
            value={this.state.password}
            onChangeText={value => {
              this.handleChange("password", value);
            }}
          />

          <TouchableOpacity style={styles.loginButton} onPress={this.signInAsync}>
            <Text style={styles.loginText}>Login</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </View>
    );
  }

  signInAsync = async () => {
    try {
      const response = await fetch("https://airbnb-api.now.sh/api/user/log_in", {
        method: "POST",
        body: JSON.stringify({ email: this.state.email, password: this.state.password }),
        headers: { Accept: "application/json", "Content-Type": "application/json" }
      });
      const json = await response.json();
      await AsyncStorage.setItem("userToken", json.token);
      await AsyncStorage.setItem("userAccount", JSON.stringify(json.account));
      this.props.navigation.navigate("Home");
    } catch (error) {
      alert("Problème de connexion");
    }
  };
}
export default SignInScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FF5A5F"
  },
  topContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around"
  },
  bottomContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around"
  },
  welcome: {
    fontSize: 50,
    color: "#FFFFFF"
  },
  input: {
    height: 44,
    width: "70%",
    color: "#FFFFFF",
    fontSize: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#FFFFFF",
    padding: 10
  },
  loginButton: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 35,
    height: 70,
    width: 160
  },
  loginText: {
    color: "#FF5A5F",
    fontSize: 30
  }
});
