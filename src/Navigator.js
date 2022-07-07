import { StyleSheet, Text, View } from "react-native";
import HomeScreen from "./HomeScreen";
import { NavigationContainer } from "@react-navigation/native";
import Forecast from "./Forecast";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function Navigator() {
  const Tab = createBottomTabNavigator();

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: {
            position: "absolute",
            bottom: 25,
            right: 14,
            left: 14,
            elevation: 0,
            height: 90,
            borderRadius: 15,
            opacity: 0.5,
          },
        }}
      >
        <Tab.Screen
          options={{
            headerShown: false,
            tabBarActiveTintColor: "red",

            tabBarIcontabBarIcon: ({ focused, color, size }) => {
              iconName = focused;
            },

            tabBarIcon: ({ focused }) => {
              return (
                <View style={{ marginTop: 10 }}>
                  <AntDesign name="home" size={40} color="black" />
                </View>
              );
            },
          }}
          name="Home"
          component={HomeScreen}
        />
        <Tab.Screen
          options={{
            headerShown: false,
            tabBarIcontabBarIcon: ({ focused, color, size }) => {
              iconName = focused;
            },

            tabBarIcon: ({ focused }) => {
              return (
                <View style={{ marginTop: 10 }}>
                  <MaterialCommunityIcons
                    name="weather-cloudy-clock"
                    size={40}
                    color="black"
                  />
                </View>
              );
            },
          }}
          name="Forecast"
          component={Forecast}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
