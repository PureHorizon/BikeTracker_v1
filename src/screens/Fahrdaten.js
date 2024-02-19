// Fahrdaten.js
import React from "react";
import { View, Text, StyleSheet, FlatList, SafeAreaView } from "react-native";

// Beispiel Daten für gefahrene Strecken
const fahrten = [
  { key: "1", strecke: "10 km", datum: "01.01.2024" },
  { key: "2", strecke: "15 km", datum: "03.01.2024" },
  // Fügen Sie hier weitere Fahrten hinzu...
];

const FahrdatenScreen = () => {
  const renderItem = ({ item }) => (
    <View style={styles.tile}>
      <Text style={styles.tileText}>Strecke: {item.strecke}</Text>
      <Text style={styles.tileText}>Datum: {item.datum}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <FlatList
        data={fahrten}
        renderItem={renderItem}
        keyExtractor={(item) => item.key}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    marginTop: 50, // Optional: zusätzlicher Abstand von der oberen Leiste, falls nötig
  },
  tile: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 20,
    elevation: 1, // Nur für Android, für iOS können shadow-Properties verwendet werden
  },
  tileText: {
    fontSize: 18,
    color: "#000",
  },
});

export default FahrdatenScreen;
