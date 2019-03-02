import React from "react";
import { View, Text, FlatList, Image, StyleSheet, ImageBackground, ActivityIndicator, TouchableOpacity } from "react-native";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import { MapView } from "expo";

import { connect } from "react-redux";

class HomeScreen extends React.Component {
  state = {
    rooms: { id: "", title: "", price: 0, ratingValue: 0, nbReviews: 0, roomPicture: "", userPicture: "", description: "", cityLoc: [], roomloc: [] },
    isLoading: true
  };

  componentDidMount = async () => {
    try {
      const response = await fetch("https://airbnb-api.now.sh/api/room?city=paris");
      const json = await response.json();
      const rooms = [];
      json.rooms.forEach(room => {
        rooms.push({
          id: room._id,
          title: room.title,
          price: room.price,
          ratingValue: room.ratingValue,
          nbReviews: room.reviews,
          roomPicture: room.photos[0],
          userPicture: room.user.account.photos[0],
          description: room.description,
          cityLoc: room.city.loc,
          roomLoc: room.loc
        });
      });
      await this.setState({ rooms: rooms, isLoading: false });
    } catch (error) {
      alert(error);
    }
  };

  renderStars = rate => {
    const tabReview = [];
    let color = "";
    for (let i = 1; i < 6; i++) {
      color = "#BBBBBB";
      if (i <= rate) {
        color = "#FFB400";
      }
      tabReview.push(<MaterialIcons key={i} name="star" size={20} color={color} />);
    }
    return tabReview;
  };

  renderPinPoints = () => {
    return this.state.rooms.map((room, i) => {
      return (
        <MapView.Marker
          key={"room" + i}
          coordinate={{
            latitude: room.roomLoc[1],
            longitude: room.roomLoc[0]
          }}
          title={room.title}
          description={room.description}
          onPress={() => this.props.navigation.navigate("Detail", { roomId: room.id })}
        />
      );
    });
  };

  render() {
    if (this.state.isLoading === true) {
      return (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="#FF5A5F" />
        </View>
      );
    } else {
      if (this.props.mapOrList === "map") {
        return (
          <>
            <MapView
              style={styles.map}
              initialRegion={{
                latitude: this.state.rooms[0].cityLoc[1],
                longitude: this.state.rooms[0].cityLoc[0],
                latitudeDelta: 0.14,
                longitudeDelta: 0.06
              }}
            >
              {this.renderPinPoints()}
            </MapView>
          </>
        );
      } else {
        return (
          <>
            <FlatList
              data={this.state.rooms}
              keyExtractor={item => String(item.id)}
              renderItem={({ item }) => {
                return (
                  <TouchableOpacity style={styles.container} onPress={() => this.props.navigation.navigate("Detail", { roomId: item.id })}>
                    <View style={styles.roomCard}>
                      <ImageBackground style={styles.roomPicture} source={{ uri: item.roomPicture }}>
                        <Text style={styles.price}>{item.price} €</Text>
                      </ImageBackground>
                      <View style={styles.roomSummary}>
                        <View style={styles.leftContainer}>
                          <Text style={styles.title} numberOfLines={1}>
                            {item.title}
                          </Text>
                          <View style={styles.reviewContainer}>
                            <View style={styles.reviews}>{this.renderStars(item.ratingValue)}</View>
                            <Text style={styles.nbReviews}>{item.nbReviews} reviews</Text>
                          </View>
                        </View>
                        <Image style={styles.userPicture} source={{ uri: item.userPicture }} />
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              }}
            />
          </>
        );
      }
    }
  }
}
const mapStateToProps = state => {
  return { mapOrList: state.mapOrList };
};

export default connect(mapStateToProps)(HomeScreen);

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  container: {
    alignItems: "center"
  },
  map: {
    flex: 1
  },
  roomCard: {
    height: 300,
    width: "90%",
    marginTop: 20,
    borderBottomWidth: 0.5,
    borderBottomColor: "#BBBBBB"
  },
  roomPicture: {
    height: 220,
    width: "100%",
    justifyContent: "flex-end"
  },
  price: {
    textAlign: "center",
    width: 100,
    height: 50,
    fontSize: 24,
    margin: 10,
    paddingTop: 8,
    backgroundColor: "black",
    color: "white"
  },
  roomSummary: {
    flexDirection: "row",
    width: "100%",
    marginTop: 10
  },
  leftContainer: {
    flex: 1
  },
  title: {
    fontSize: 20
  },
  reviews: {
    flexDirection: "row"
  },
  nbReviews: {
    marginLeft: 10,
    fontSize: 20,
    color: "#BBBBBB"
  },
  reviewContainer: {
    flexDirection: "row",
    alignItems: "center"
  },
  userPicture: {
    borderRadius: 30,
    width: 60,
    height: 60
  }
});
