import React from "react";
import { StyleSheet, Dimensions } from "react-native";
import { WebView } from "react-native-webview";
import { SafeAreaView } from "react-native-safe-area-context";

const MapScreen = () => {
  const iframeUrl =
    "https://api.maptiler.com/maps/streets-v2/?key=djtXgXwd54GCjmeMweoU#13.8/53.55626/10.01744";

  return (
    <SafeAreaView style={styles.webview}>
      <WebView
        style={styles.webview}
        originWhitelist={["*"]}
        source={{ uri: iframeUrl }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  webview: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});

export default MapScreen;
