import { Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import {
  TextInput,
  StyleSheet,
  ImageBackground,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import img from "../src/assets/Sunset-1.jpg";
import humid from "../src/assets/humidity.png";
import pressure from "../src/assets/presure.png";
import wind from "../src/assets/wind.png";
import sunset from "../src/assets/sunset.png";
import sunrise from "../src/assets/sunrise.png";
import sunr from "../src/assets/sunrise12.jpg";
import day from "../src/assets/day.jpg";
import night from "../src/assets/night.jpg";

const HomeScreen = () => {
  const [weather, setWeather] = useState([]);
  const [query, setQuery] = useState("");
  const [lesh, setLesh] = useState(true);
  const [time, setTime] = useState(null);
  const [showRes, setShowRes] = useState(false);
  const [message, setMessage] = useState("");
  const [realState, setRealState] = useState(false);
  const [image, setImage] = useState("");

  const styles = StyleSheet.create({
    input: {
      height: 45,
      margin: 12,
      borderWidth: 3,
      padding: 10,
      width: 300,
      borderRadius: 10,
      opacity: 0.5,
      borderColor: "wheat",
    },
    searchGroup: {
      display: "flex",
      flexDirection: "row",
    },
    icon: {
      marginTop: 14,
    },
  });

  const searchRes = () => {
    if (lesh === true) {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=4275d7e8ab54041486a789789217396c&units=metric`
      )
        .then((res) => res.json())
        .then((result) => {
          setWeather(result);
          setShowRes(true);
        });
    }
  };

  const dateBuilder = (d) => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return ` ${day} ${date} ${month} ${year}`;
  };

  useEffect(() => {
    let time = getCurrentTime();
    setTime(time);
  }, []);

  const getCurrentTime = () => {
    let today = new Date();
    let hours = (today.getHours() < 10 ? "0" : "") + today.getHours();
    let minutes = (today.getMinutes() < 10 ? "0" : "") + today.getMinutes();

    return hours + ":" + minutes;
  };

  console.log(weather);
  console.log(image);
  //sunset

  const sunsets = new Date(weather.sys?.sunset * 1000);
  const hours = sunsets.toLocaleString("en-US", { hour: "numeric" });
  const minutes = sunsets.toLocaleString("en-US", { minute: "2-digit" });
  const sunsetPrint = hours + ":" + minutes;

  //sunrise

  const sunrises = new Date(weather.sys?.sunrise * 1000);
  const hours1 = sunrises.toLocaleString("en-Us", { hour: "2-digit" });
  const minutes1 = sunrises.toLocaleString("en-US", { minute: "2-digit" });
  const sunrisePrint = hours1 + ":" + minutes1;
  const dummyF = () => {
    if (realState === false) {
      setMessage("select a location");
      setShowRes(false);
    } else {
      setMessage("");
      setShowRes(true);
    }
  };

  const onPr = () => {
    searchRes();
  };

  return (
    <ImageBackground style={{ flex: 1 }} resizeMode="cover" source={img}>
      <ScrollView>
        <View style={{ marginTop: 40 }}>
          <Text>{message}</Text>
          <View style={styles.searchGroup}>
            <TextInput
              onChangeText={(e) => setQuery(e)}
              value={query}
              style={styles.input}
              placeholder="Search a location"
            />
            <TouchableOpacity
              onPress={onPr}
              style={{
                backgroundColor: "white",
                alignItems: "center",
                borderRadius: 10,
                opacity: 0.5,
                height: 50,
                width: 50,
                marginTop: 8,
                right: 5,
              }}
            >
              <AntDesign
                style={styles.icon}
                name="search1"
                size={24}
                color="black"
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ display: showRes ? "flex" : "none" }}>
          <View
            style={{
              justifyContent: "center",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: 60,
                color: "wheat",
                marginTop: 60,
              }}
            >
              {weather.name}, {weather.sys?.country}
            </Text>
            <Text
              style={{
                marginTop: 50,
                fontSize: 50,
                color: "wheat",
              }}
            >
              {Math.round(weather.main?.temp)}°c
            </Text>
            <Text
              style={{
                marginTop: 40,
                fontSize: 20,
                fontStyle: "italic",
              }}
            >
              {dateBuilder(new Date())}
            </Text>
            <Text style={{ fontSize: 20, fontStyle: "italic" }}>{time}</Text>
          </View>
          <View style={{ padding: 10 }}>
            <View
              style={{
                backgroundColor: "white",
                padding: 30,
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 10,
                opacity: 0.5,
                borderRadius: 20,
              }}
            >
              <View>
                <Image style={{ width: 60, height: 60 }} source={pressure} />
                <Text style={{ marginLeft: 3 }}>Pressure</Text>
                <Text style={{ marginLeft: 3 }}>
                  {weather.main?.pressure} mb
                </Text>
              </View>
              <View>
                <Image style={{ width: 60, height: 60 }} source={wind} />
                <Text style={{ marginLeft: 3 }}>Wind</Text>
                <Text style={{ marginLeft: 3 }}>
                  {weather.wind?.speed} km/h
                </Text>
              </View>
              <View>
                <Image style={{ width: 60, height: 60 }} source={humid} />
                <Text style={{ marginLeft: 3 }}>Humidity</Text>
                <Text style={{ marginLeft: 3 }}>
                  {weather.main?.humidity} %
                </Text>
              </View>
            </View>
          </View>
          <View style={{ padding: 10 }}>
            <View
              style={{
                backgroundColor: "white",
                padding: 30,
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 10,
                opacity: 0.5,
                borderRadius: 20,
              }}
            >
              <View style={{ alignItems: "center" }}>
                <Text
                  style={{ fontSize: 18, color: "gray", fontWeight: "bold" }}
                >
                  Sunrise
                </Text>
                <Text>{sunrisePrint}</Text>
                <Image
                  source={sunrise}
                  style={{ width: 120, height: 110, zIndex: 20, opacity: 1 }}
                />
              </View>
              <View style={{ alignItems: "center" }}>
                <Text
                  style={{ fontSize: 18, color: "gray", fontWeight: "bold" }}
                >
                  Sunset
                </Text>
                <Text>{sunsetPrint}</Text>
                <Image
                  source={sunset}
                  style={{
                    width: 100,
                    height: 100,
                    zIndex: 20,
                    opacity: 1,
                    marginTop: 7,
                  }}
                />
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default HomeScreen;
