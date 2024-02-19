import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  Animated,
  PanResponder,
  Dimensions,
  StyleSheet,
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const windowWidth = Dimensions.get("window").width;

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
        setIsLocked(!isLocked);
        onUnlock(!isLocked);
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
    outputRange: [0, 20],
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
            marginLeft: 5,
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

const styles = StyleSheet.create({
  unlockContainer: {
    height: 60,
    backgroundColor: "#ddd",
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
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
});

export default UnlockSlider;