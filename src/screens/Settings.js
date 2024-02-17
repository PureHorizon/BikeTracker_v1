import React from 'react';
import { View, Text, SectionList, TouchableOpacity, StyleSheet, Switch } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '../../ThemeContext.js';
import { SafeAreaView } from 'react-native-safe-area-context'; // Korrekter Import von SafeAreaView

const DATA = [
  {
    title: 'Account',
    data: [
      { key: 'Land', title: 'Land', icon: 'public' },
      { key: 'Fahrdaten', title: 'Fahrdaten', icon: 'directions-bike' },
      { key: 'notifications', title: 'Notifications settings', icon: 'notifications' },
    ],
  },
  {
    title: 'General',
    data: [
      { key: 'support', title: 'Support', icon: 'support-agent' },
      { key: 'terms', title: 'Terms of Service', icon: 'article' },
      { key: 'invite', title: 'Invite Friends', icon: 'group-add' },
      { key: 'theme', title: 'Dark Mode', icon: 'brightness-4'}, // Menüpunkt für Theme-Umschaltung
    ],
  },
];

const Item = ({ title, icon, onPress, isSwitch, isDarkMode }) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.item, isDarkMode && styles.itemDark]}>
      <Icon name={icon} size={24} color={isDarkMode ? '#fff' : '#000'} style={styles.icon} />
      <Text style={[styles.title, isDarkMode && styles.titleDark]}>{title}</Text>
      {isSwitch ? (
        <Switch
          trackColor={{ false: '#767577', true: '#449af8' }}
          thumbColor={isDarkMode ? '#ffffff' : '#f4f3f4'}
          onValueChange={onPress}
          value={isDarkMode}
        />
      ) : (
        <Icon name="chevron-right" size={24} color={isDarkMode ? '#fff' : '#000'} />
      )}
    </TouchableOpacity>
  );
};

const SettingsScreen = () => {
  const { theme, toggleTheme } = useTheme();
  const isDarkMode = theme === 'dark';

  const renderItem = ({ item }) => (
    <Item
      title={item.title}
      icon={item.icon}
      onPress={item.key === 'theme' ? toggleTheme : () => {}}
      isSwitch={item.key === 'theme'}
      isDarkMode={isDarkMode}
    />
  );

  return (
    <SafeAreaView style={[styles.safeArea, isDarkMode ? styles.containerDark : styles.containerLight]}>
      <SectionList
        sections={DATA}
        keyExtractor={(item) => item.key}
        renderItem={renderItem}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={[styles.header, isDarkMode && styles.headerDark]}>{title}</Text>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  containerDark: {
    backgroundColor: '#1c1c1e',
  },
  containerLight: {
    backgroundColor: '#FFF',
  },
  header: {
    fontSize: 18,
    padding: 10,
  },
  headerDark: {
    backgroundColor: '#2c2c2e',
    color: '#fff',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  itemDark: {
    backgroundColor: '#3a3a3c',
  },
  title: {
    flex: 1,
    fontSize: 18,
  },
  titleDark: {
    color: '#fff',
  },
  icon: {
    marginRight: 20,
  },
});

export default SettingsScreen;
