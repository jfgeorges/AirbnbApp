import React from "react";
import { ActivityIndicator, AsyncStorage, StatusBar, View } from "react-native";

class AuthorizationLoadingScreen extends React.Component {
  componentDidMount = async () => {
    const userToken = await AsyncStorage.getItem("userToken");
    this.props.navigation.navigate(userToken ? "App" : "SignIn");
  };

  render() {
    return (
      <View>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}

export default AuthorizationLoadingScreen;
