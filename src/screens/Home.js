import React from "react";
import UnlockSlider from "../components/UnlockSlider.js";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";

const windowWidth = Dimensions.get("window").width;

const HomeScreen = () => {
  const navigation = useNavigation();

  const handleUnlockSuccess = (isLocked) => {
    console.log(isLocked ? "Locked!" : "Unlocked!");
  };

  const handleMapsPress = () => {
    navigation.navigate("Maps");
  };

  const handleRideDataPress = () => {
    navigation.navigate("Fahrdaten");
  };

  // Weitere Handler hier ...

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <TouchableOpacity
          style={[styles.tile, styles.tileLarge]}
          onPress={handleMapsPress}
        >
          <Text style={styles.tileText}>Maps</Text>
          {/* Icons und Text für die Kachel */}
        </TouchableOpacity>

        <View style={styles.row}>
          <TouchableOpacity
            style={[styles.tile, styles.tileSmall]}
            onPress={handleRideDataPress}
          >
            <Image
              source={require("../assets/images/Fahrrad.png")} // Pfad zu Ihrem Fahrrad-Bild
              style={styles.bikeImage}
            />
            <Text style={styles.tileText}>Fahrdaten</Text>
          </TouchableOpacity>

          <View style={styles.column}>
            <TouchableOpacity
              style={[styles.tile, styles.tileSmall]}
              onPress={() => {}} // Handler für Ihre Aktion
            >
              <Text style={styles.tileText}>923 km</Text>
              <MaterialIcons name="directions-bike" size={30} color="#FFFFFF" />
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.tile, styles.tileSmall]}
              onPress={() => {}} // Handler für Ihre Aktion
            >
              <Text style={styles.tileText}>20</Text>
              <MaterialIcons name="search" size={30} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Platz für weitere Kacheln, falls nötig */}
      </View>

      <View style={styles.sliderWrapper}>
        <UnlockSlider onUnlock={handleUnlockSuccess} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
  },
  content: {
    flex: 1,
    width: windowWidth,
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  tile: {
    width: windowWidth - 32,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    padding: 20,
  },
  tileLarge: {
    height: windowWidth * 0.5,
    marginBottom: 16,
    backgroundColor: "#333",
  },
  tileSmall: {
    width: (windowWidth - 64) / 2,
    backgroundColor: "#555",
  },
  sliderWrapper: {
    width: "100%",
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  column: {
    justifyContent: "space-between",
  },
  tileText: {
    fontSize: 18,
    color: "#fff",
    position: "absolute",
    bottom: 10,
    left: 10,
  },
  bikeImage: {
    width: 50,
    height: 50,
    position: "absolute",
    top: 10,
    right: 10,
  },
  sliderContainer: {
    width: "100%",
    padding: 16,
  },
});

export default HomeScreen;
