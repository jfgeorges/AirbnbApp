import React from "react";
import { Dimensions, ActivityIndicator, StyleSheet, ScrollView, Text, View, Image } from "react-native";
import { MaterialIcons, Feather } from "@expo/vector-icons";
import Swiper from "react-native-swiper";
import { MapView } from "expo";

class DetailScreen extends React.Component {
  state = {
    room: {},
    descriptionLines: 3,
    isLoading: true
  };

  //   static navigationOptions = () => {
  //     return {
  //       title: "Room",
  //       headerStyle: {
  //         backgroundColor: "#FF5A5F"
  //       },
  //       headerTintColor: "#fff"
  //     };
  //   };

  componentDidMount = async () => {
    try {
      const response = await fetch(`https://airbnb-api.now.sh/api/room/${this.props.navigation.state.params.roomId}`);
      const json = await response.json();
      await this.setState({ room: json, isLoading: false });
    } catch (error) {
      alert(error.message);
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

  renderPhotos = photoArray => {
    const tabPhoto = [];
    let color = "";
    for (let i = 0; i < photoArray.length; i++) {
      if (i === 0) {
        color = "#FFB400";
      }
      tabPhoto.push(<Image key={i} source={{ uri: photoArray[i] }} style={styles.roomPicture} resizeMode="cover" />);
    }
    return tabPhoto;
  };
  handleDescription = () => {
    this.setState({ descriptionLines: this.state.descriptionLines === 3 ? 100 : 3 });
  };

  renderSwiperPagination = (index, total, context) => {
    return (
      <View style={styles.swipperPaginationStyle}>
        <Text style={{ color: "white", fontSize: 20 }}>
          <Text>{index + 1}</Text>/{total}
        </Text>
      </View>
    );
  };

  renderMoreOrLess = () => {
    let chevron = "chevron-down";
    if (this.state.descriptionLines !== 3) {
      chevron = "chevron-up";
    }
    return <Feather style={styles.chevron} name={chevron} size={20} color="#BBBBBB" onPress={this.handleDescription} />;
  };

  render() {
    if (this.state.isLoading === true) {
      return (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="#FF5A5F" />
        </View>
      );
    } else {
      return (
        <ScrollView contentContainerStyle={styles.container}>
          <Swiper style={styles.wrapper} showsButtons renderPagination={this.renderSwiperPagination} loop={true}>
            {this.renderPhotos(this.state.room.photos)}
          </Swiper>
          <View style={styles.descriptionContainer}>
            <View style={styles.roomSummary}>
              <View style={styles.leftContainer}>
                <Text style={styles.title} numberOfLines={1}>
                  {this.state.room.title}
                </Text>
                <View style={styles.reviewContainer}>
                  <View style={styles.reviews}>{this.renderStars(this.state.room.ratingValue)}</View>
                  <Text style={styles.nbReviews}>{this.state.room.reviews} reviews</Text>
                </View>
              </View>
              <Image style={styles.userPicture} source={{ uri: this.state.room.user.account.photos[0] }} />
            </View>
            <Text style={styles.description} numberOfLines={this.state.descriptionLines} onPress={this.handleDescription}>
              {this.state.room.description}
            </Text>
            {this.renderMoreOrLess()}

            <MapView
              style={styles.map}
              initialRegion={{
                latitude: 48.856614,
                longitude: 2.3522219,
                latitudeDelta: 0.09,
                longitudeDelta: 0.04
              }}
            >
              <MapView.Marker
                coordinate={{
                  latitude: this.state.room.city.loc[1],
                  longitude: this.state.room.city.loc[0]
                }}
                title={this.state.room.title}
                description={this.state.room.description}
              />
            </MapView>
          </View>
        </ScrollView>
      );
    }
  }
}
export default DetailScreen;

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  container: {
    alignItems: "center"
  },
  wrapper: {
    width: Dimensions.get("window").width,
    height: 340
  },
  roomPicture: {
    height: 320,
    width: "100%",
    justifyContent: "flex-end"
  },
  swipperPaginationStyle: {
    position: "absolute",
    bottom: 22,
    right: 7
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
  descriptionContainer: {
    width: "90%"
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
  },
  description: {
    marginTop: 10,
    fontSize: 20
  },
  chevron: {
    textAlign: "center"
  },
  map: {
    marginVertical: 10,
    height: 200
  }
});
