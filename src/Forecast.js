import {
  Text,
  View,
  ImageBackground,
  ScrollView,
  TextInput,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useState } from "react";
import img from "../src/assets/Sunset-1.jpg";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";

const Forecast = () => {
  const [query, setQuery] = useState("");
  const [forecast, setForecast] = useState([]);
  const [lesh, setLesh] = useState(true);
  const [showRes, setShowRes] = useState(false);

  const forecastSearch = () => {
    if (lesh === true) {
      fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${query}&appid=4275d7e8ab54041486a789789217396c&units=metric&limit=1`
      )
        .then((res) => res.json())
        .then((result) => {
          setForecast(result);
          setShowRes(true);
        });
    }
  };

  console.log(forecast);

  return (
    <ImageBackground style={{ flex: 1 }} resizeMode="cover" source={img}>
      <ScrollView>
        <View style={{ marginTop: 55, flexDirection: "row" }}>
          <TextInput
            style={{
              height: 44,
              margin: 12,
              borderWidth: 3,
              padding: 10,
              width: 300,
              borderRadius: 10,
              opacity: 0.5,
              borderColor: "white",
            }}
            onChangeText={(e) => setQuery(e)}
            value={query}
            placeholder="Search a location"
          />
          <TouchableOpacity
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
            onPress={forecastSearch}
          >
            <AntDesign
              style={{
                marginTop: 14,
              }}
              name="search1"
              size={24}
              color="black"
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            alignItems: "center",
            marginTop: 20,
          }}
        >
          <Text
            style={{
              fontSize: 55,
              color: "wheat",
              fontWeight: "500",
            }}
          >
            {forecast.city?.name}, {forecast.city?.country}
          </Text>
        </View>
        <View>
          <View
            style={{
              padding: 10,
            }}
          >
            {forecast?.list?.map((item) => (
              <View
                style={{
                  flexDirection: "row",
                  padding: 10,
                  backgroundColor: "wheat",
                  opacity: 0.5,
                }}
                key={item.dt}
              >
                <Text
                  style={{
                    fontSize: 16,
                  }}
                >
                  {item?.dt_txt}
                </Text>
                <View
                  style={{
                    marginLeft: 20,
                    flexDirection: "row",
                    paddingLeft: 20,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 20,
                      marginLeft: 20,
                    }}
                  >
                    {Math.round(item.main?.temp_max)}
                    <Entypo
                      style={{ marginTop: 10, position: "absolute" }}
                      name="arrow-long-up"
                      size={24}
                      color="red"
                    />
                  </Text>
                  <Text
                    style={{
                      marginLeft: 20,
                    }}
                  >
                    {Math.round(item.main?.temp_min)}
                    <Entypo name="arrow-long-down" size={24} color="blue" />
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default Forecast;
