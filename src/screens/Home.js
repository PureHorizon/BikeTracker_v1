import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  Animated,
  PanResponder,
} from "react-native";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const windowWidth = Dimensions.get("window").width;

const onSwipeSuccess = () => {
  console.log("Unlocked!");
};

const UnlockSlider = ({ onUnlock }) => {
  const containerWidth = windowWidth * 0.9;
  const thumbWidth = containerWidth * 0.17;
  const maxDrag = containerWidth - thumbWidth;

  const pan = useRef(new Animated.Value(0)).current;
  const [isLocked, setIsLocked] = useState(true);
  const arrowAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(arrowAnimation, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (evt, gestureState) => {
      let newPosition = Math.min(gestureState.dx, maxDrag);
      newPosition = Math.max(0, newPosition);
      pan.setValue(newPosition);
    },
    onPanResponderRelease: (evt, gestureState) => {
      if (gestureState.dx >= maxDrag) {
        setIsLocked((current) => {
          // Log-Nachricht basierend auf dem aktuellen Zustand ausgeben
          if (current) {
            console.log("Locked!"); // Wird ausgeführt, wenn vorher gesperrt
          } else {
            console.log("Unlocked!"); // Wird ausgeführt, wenn vorher entsperrt
          }
          return !current; // Zustand umkehren
        });
        Animated.timing(pan, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }).start();
      } else {
        Animated.spring(pan, {
          toValue: 0,
          friction: 5,
          useNativeDriver: true,
        }).start();
      }
    },
  });

  const arrowOpacity = arrowAnimation.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, 1, 0],
  });

  const arrowTranslateX = arrowAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 20], // Increase the movement range if needed
  });

  return (
    <View style={[styles.unlockContainer, { width: containerWidth }]}>
      <View style={styles.textAndArrowsContainer}>
        <Text style={styles.slideToUnlockText}>
          {isLocked ? "Slide to lock" : "Slide to unlock"}
        </Text>
        <Animated.View
          style={{
            opacity: arrowOpacity,
            transform: [{ translateX: arrowTranslateX }],
            marginLeft: 5, // Abstand zwischen Text und Pfeil
          }}
        >
          <MaterialIcons name="arrow-forward-ios" size={20} color="#000" />
        </Animated.View>
      </View>
      <Animated.View
        {...panResponder.panHandlers}
        style={[
          styles.thumb,
          {
            width: thumbWidth,
            backgroundColor: isLocked ? "#C80000" : "green",
            transform: [{ translateX: pan }],
          },
        ]}
      >
        <MaterialIcons
          name={isLocked ? "lock" : "lock-open"}
          size={30}
          color="#FFFFFF"
        />
      </Animated.View>
    </View>
  );
};

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.statusBar}>
        <Text style={styles.statusText}>Hey Rider!</Text>
        <View style={styles.statusIndicator}>
          <View style={styles.statusDot} />
          <Text style={styles.statusLabel}>Connected</Text>
        </View>
      </View>

      <View style={styles.bikeInfoContainer}>
        <Text style={styles.bikeInfoText}>Bike No. 234567</Text>
        <View style={styles.pressureContainer}>
          <Text style={styles.pressureText}>34.64 psi</Text>
          <Text style={styles.pressureText}>32.56 psi</Text>
        </View>
      </View>

      <Image
        source={{ uri: "./src/assets/images/bike.jpg" }}
        style={styles.bikeImage}
      />

      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <UnlockSlider onUnlock={onSwipeSuccess} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  statusBar: {
    marginTop: 50,
    marginHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  statusText: {
    color: "#fff",
    fontSize: 24,
  },
  statusIndicator: {
    flexDirection: "row",
    alignItems: "center",
  },
  statusDot: {
    height: 10,
    width: 10,
    backgroundColor: "green",
    borderRadius: 5,
    marginRight: 6,
  },
  statusLabel: {
    color: "green",
    fontSize: 16,
  },
  bikeInfoContainer: {
    marginHorizontal: 20,
    marginTop: 20,
  },
  bikeInfoText: {
    color: "#fff",
    fontSize: 18,
  },
  pressureContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  pressureText: {
    color: "#fff",
    fontSize: 18,
  },
  bikeImage: {
    width: "100%",
    height: 200,
    resizeMode: "contain",
    marginTop: 20,
  },
  unlockContainer: {
    height: 60,
    backgroundColor: "#ddd",
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden", // Add this to prevent the thumb from overflowing
  },
  thumb: {
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    left: 0,
    borderRadius: 30,
    zIndex: 1,
  },
  slideToUnlockText: {
    position: "relative",
    color: "#000",
    opacity: 0.5,
    fontSize: 16,
    zIndex: 0,
  },
  textAndArrowsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    opacity: 0.5,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginBottom: 20,
  },
  menuButton: {
    padding: 10,
  },
  menuText: {
    color: "#fff",
    fontSize: 18,
  },
});

export default HomeScreen;