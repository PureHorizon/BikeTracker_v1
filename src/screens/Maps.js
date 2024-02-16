import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Button, TouchableOpacity, Dimensions, Platform, StatusBar } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import * as Location from 'expo-location';
import Icon from 'react-native-vector-icons/Feather';

const App = () => {
 const [query, setQuery] = useState('');
 const [startQuery, setStartQuery] = useState('');
 const [locations, setLocations] = useState([]);
 const [startLocation, setStartLocation] = useState(null);
 const [selectedLocation, setSelectedLocation] = useState(null);
 const [route, setRoute] = useState([]);

 const ORS_API_KEY = '5b3ce3597851110001cf624825c13acd3f674172900efadfb4dab04c'; // Replace this with your API key

 const getRoute = async () => {
  if (!startLocation || !selectedLocation) return;

  const response = await fetch(`https://api.openrouteservice.org/v2/directions/driving-car`, {
   method: 'POST',
   headers: {
    'Authorization': ORS_API_KEY,
    'Content-Type': 'application/json',
   },
   body: JSON.stringify({
    coordinates: [
     [startLocation.longitude, startLocation.latitude],
     [selectedLocation.longitude, selectedLocation.latitude]
    ],
   }),
  });

  const json = await response.json();
  const points = json.features[0].geometry.coordinates.map(([longitude, latitude]) => ({ latitude, longitude }));
  setRoute(points);
 };

 const getCurrentLocation = async () => {
    try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            console.error('Permission to access location was denied');
            return;
        }

        const location = await Location.getCurrentPositionAsync({});
        setStartLocation({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        });
    } catch (error) {
        console.error('Error fetching current location', error);
    }
};

 // Add functions for searching and selecting locations, as well as updating startLocation and selectedLocation here

 return (
  <View style={styles.container}>
   <MapView style={styles.map} region={selectedLocation || startLocation}>
    {startLocation && <Marker coordinate={startLocation} pinColor="blue" />}
    {selectedLocation && <Marker coordinate={selectedLocation} />}
    {route.length > 0 && <Polyline coordinates={route} strokeWidth={2} strokeColor="red" />}
   </MapView>
   <View style={styles.searchBox}>
    <View style={styles.inputContainer}>
        <TextInput 
            style={styles.input} 
            placeholder="Startadresse" 
            value={startQuery} 
            onChangeText={setStartQuery} 
        />
        <TouchableOpacity style={styles.iconContainer} onPress={getCurrentLocation}>
            <Icon name="map-pin" size={20} color="gray" />
        </TouchableOpacity>
    </View>
    <TextInput style={styles.input} placeholder="Zieladresse" value={query} onChangeText={setQuery} />
    <Button title="Route berechnen" onPress={getRoute} />
   </View>
  </View>
 );
};

const styles = StyleSheet.create({
 container: {
  flex: 1,
  marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
 },
 map: {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height,
 },
 searchBox: {
  position: 'absolute',
  top: 10,
  left: 10,
  right: 10,
  backgroundColor: '#fff',
  padding: 10,
 },
 inputContainer: {
  flexDirection: 'row',
  alignItems: 'center',
 },
 input: {
  height: 40,
  borderColor: 'gray',
  borderWidth: 1,
  marginBottom: 8,
  paddingHorizontal: 10,
  flex: 1,
 },
 iconContainer: {
  padding: 10,
 },
});

export default App;
