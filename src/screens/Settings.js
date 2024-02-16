// Settings.js
import React, { useState, useEffect } from 'react';
import { View, Text, Switch, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Appearance, useColorScheme } from 'react-native';

const SettingsScreen = () => {
  const { t, i18n } = useTranslation();
  const [isEnabled, setIsEnabled] = useState(false);
  const scheme = useColorScheme(); // 'dark' oder 'light'

  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  useEffect(() => {
    i18n.changeLanguage(isEnabled ? 'de' : 'en');
  }, [isEnabled, i18n]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: scheme === 'dark' ? '#333' : '#FFF' }}>
      <Text style={{ color: scheme === 'dark' ? '#FFF' : '#000' }}>{t('settings')}</Text>
      <TouchableOpacity onPress={toggleSwitch}>
        <Text style={{ color: scheme === 'dark' ? '#FFF' : '#000' }}>{t('language')}: {isEnabled ? 'DE' : 'EN'}</Text>
      </TouchableOpacity>
      <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
    </View>
  );
};

export default SettingsScreen;
