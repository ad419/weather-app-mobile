import React from "react";
import { View } from "react-native";
import LottieView from "lottie-react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./HomeScreen";
import Forecast from "./Forecast";
import { useNavigation } from "@react-navigation/native";
import { NavigationContainer } from "@react-navigation/native";

const Splash = () => {
  const navigation = useNavigation();

  return (
    <>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Forecast" component={Forecast} />
        </Stack.Navigator>
      </NavigationContainer>
      <View
        style={{
          flex: 1,
        }}
      >
        <LottieView
          autoPlay={true}
          source={require("../src/assets/animation.json")}
          loop={false}
          onAnimationFinish={() => navigation.navigate("Home")}
        />
      </View>
    </>
  );
};

export default Splash;
