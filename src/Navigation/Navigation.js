import React from "react";
// Navigation
import { createStackNavigator, createBottomTabNavigator, createSwitchNavigator, createAppContainer } from "react-navigation";

// Containers
import AuthorizationLoadingScreen from "../containers/AuthorizationLoadingScreen";
import SignInScreen from "../containers/SignInScreen";
import HomeScreen from "../containers/HomeScreen";
import DetailScreen from "../containers/DetailScreen";
import SettingsScreen from "../containers/SettingsScreen";
import ProfileScreen from "../containers/ProfileScreen";
import HeaderButton from "../components/HeaderButton";
// Icons
import { Ionicons } from "@expo/vector-icons";

const AppStack = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        title: "Home",
        headerRight: <HeaderButton />
      }
    },
    Detail: {
      screen: DetailScreen,
      navigationOptions: {
        title: "Detail"
      }
    }
  },
  {
    defaultNavigationOptions: {
      headerTintColor: "#fff",
      headerStyle: {
        backgroundColor: "#FF5A5E"
      },
      headerTitleStyle: {
        fontWeight: "300",
        fontSize: 25
      },
      headerBackTitle: null
    }
  }
);
const SignInStack = createStackNavigator({ SignIn: SignInScreen });

const AppTabNavigator = createBottomTabNavigator(
  {
    AppStack: {
      screen: AppStack
    },
    Profile: {
      screen: ProfileScreen
    },
    Settings: {
      screen: SettingsScreen
    }
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;

        switch (routeName) {
          case "AppStack":
            iconName = "ios-home";
            break;
          case "Profile":
            iconName = "ios-contact";
            break;
          case "Settings":
            iconName = "ios-settings";
            break;
          default:
            iconName = null;
        }
        return <Ionicons name={iconName} size={30} color={tintColor} />;
      }
    }),
    tabBarOptions: {
      showLabel: false,
      showIcon: true,
      activeTintColor: "#FF5A5F",
      inactiveTintColor: "#BBBBBB"
    }
  }
);

const appSwitchNavigator = createSwitchNavigator(
  {
    AuthorizationLoading: AuthorizationLoadingScreen,
    App: AppTabNavigator,
    SignIn: SignInStack
  },
  {
    initialRouteName: "AuthorizationLoading"
  }
);

export default createAppContainer(appSwitchNavigator);
