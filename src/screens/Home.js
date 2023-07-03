import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, Platform } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { AppRegistry } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import { check, PERMISSIONS, RESULTS, request } from 'react-native-permissions';
import getDirections from 'react-native-google-maps-directions'

const App = () => {
  const [location, setLocation] = useState(null);
  const [destination, setDestination] = useState("");
  const [coords, setCoords] = useState(null);

  const requestLocationPermission = async () => {
    const permission = Platform.select({
      android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
      ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
    });

    const status = await check(permission);

    if (status !== RESULTS.GRANTED) {
      return await request(permission);
    }

    return status;
  };

  useEffect(() => {
    requestLocationPermission().then(response => {
      if (response === RESULTS.GRANTED) {
        Geolocation.getCurrentPosition(
          position => {
            const { latitude, longitude } = position.coords;
        
            setLocation({
              latitude,
              longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            });
          },
          error => {
            console.log(error.code, error.message);
          },
          { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
        );
      }
    });
  }, []);

  const handleGetDirections = () => {
    const data = {
       source: {
         latitude: location.latitude,
         longitude: location.longitude
       },
       destination: {
         latitude: coords.latitude,
         longitude: coords.longitude
       },
       params: [
         {
           key: "travelmode",
           value: "bicycling"        // may be "walking", "bicycling" or "transit" as well
         },
         {
           key: "dir_action",
           value: "navigate"       // this launches turn-by-turn navigation in Google Maps app
         }
       ]
     }

     getDirections(data)
  }

  const geocodeDestination = async () => {
    if (destination !== "") {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${destination}`
      );
      const data = await response.json();
      if (data.length > 0) {
        setCoords({
          latitude: parseFloat(data[0].lat),
          longitude: parseFloat(data[0].lon),
        });
        handleGetDirections();
      } else {
        alert('Adresse nicht gefunden');
      }
    }
  }

  return (
    <View style={{ flex: 1 }}>
      {location ? (
        <MapView style={{ flex: 1 }} initialRegion={location}>
          <Marker coordinate={location} />
        </MapView>
      ) : (
        <Text>Standortdaten werden geladen...</Text>
      )}

      <TextInput
        style={{height: 40, borderColor: 'gray', borderWidth: 1}}
        onChangeText={text => setDestination(text)}
        value={destination}
        placeholder='Geben Sie das Ziel ein'
      />

      <Button
        title="Navigieren"
        onPress={geocodeDestination}
      />
    </View>
  );
};

export default App;
