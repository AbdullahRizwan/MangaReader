import React from 'react';
import { View, Text, Button, StyleSheet, StatusBar } from 'react-native';
import { useTheme } from '@react-navigation/native';

const ExtraScreen = ({navigation}) => {
    return (
      <View style={styles.container}>
        <Text>extra Screen</Text>
      </View>
    );
};

export default ExtraScreen ;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
});