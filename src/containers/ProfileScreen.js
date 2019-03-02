import React from "react";
import { View, Text, Image, AsyncStorage, StyleSheet, ActivityIndicator } from "react-native";

class ProfileScreen extends React.Component {
  state = {
    userAccount: {},
    isLoading: true
  };
  componentDidMount = async () => {
    const userAccount = await AsyncStorage.getItem("userAccount");
    await this.setState({ userAccount: JSON.parse(userAccount), isLoading: false });
  };

  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="#FF5A5F" />
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <Image style={styles.profileImage} source={{ uri: this.state.userAccount.photos[0] }} />
          <Text style={styles.username}>{this.state.userAccount.username}</Text>
          <Text style={styles.description}>{this.state.userAccount.description}</Text>
        </View>
      );
    }
  }
}

export default ProfileScreen;

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#FF5A5F"
  },
  profileImage: { width: 200, height: 200, borderRadius: 100, borderWidth: 1, borderColor: "white", marginVertical: 40 },
  username: { color: "white", fontSize: 30, marginBottom: 20 },
  description: { width: "90%", color: "white", fontSize: 16 }
});
