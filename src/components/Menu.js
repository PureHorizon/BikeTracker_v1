import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const AppMenu = () => {
  const [activeItem, setActiveItem] = useState('Startseite');

  const handlePress = (item) => {
    setActiveItem(item);
  };

  return (
    <View style={styles.menu}>
      <TouchableOpacity
        style={[
          styles.menuItem,
          activeItem === 'Startseite' ? styles.active : null,
        ]}
        onPress={() => handlePress('Startseite')}>
        <Text>Startseite</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.menuItem,
          activeItem === 'Einstellungen' ? styles.active : null,
        ]}
        onPress={() => handlePress('Einstellungen')}>
        <Text>Einstellungen</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.menuItem,
          activeItem === 'Hilfe' ? styles.active : null,
        ]}
        onPress={() => handlePress('Hilfe')}>
        <Text>Hilfe</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  menu: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    shadowColor: 'black',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 5,
  },
  menuItem: {
    backgroundColor: 'transparent',
    fontSize: 16,
    color: 'gray',
    padding: 10,
    borderRadius: 10,
    transition: 'all 0.3s ease-in-out',
  },
  active: {
    backgroundColor: 'lightgreen',
    color: 'white',
  },
});

export default AppMenu;