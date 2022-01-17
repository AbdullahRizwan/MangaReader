import React from 'react';
import {Image, View, tintColor} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import HomeScreen from '../screens/Home'
import SearchScreen from '../screens/search'
import ExtraScreen from '../screens/extra'

const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name='Home' component={HomeScreen} options={{
        tabBarIcon: ({focused}) =>(
            <View>
              <Image 
                source={require('../assets/home.png')}
                resizeMode='contain'
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused? '#e32f45' : '#7c8x94'
                }}
              />
            </View>
        ),
      }}/>

      <Tab.Screen name='Search' component={SearchScreen}options={{
        tabBarIcon: ({focused}) =>(
            <View>
              <Image 
                source={require('../assets/search.png')}
                resizeMode='contain'
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused? '#e32f45' : '#7c8x94'
                }}
              />
            </View>
        ),
      }}/>

      <Tab.Screen name='Extra' component={ExtraScreen}options={{
        tabBarIcon: ({focused}) =>(
            <View>
              <Image 
                source={require('../assets/favicon.png')}
                resizeMode='contain'
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused? '#e32f45' : '#7c8x94'
                }}
              />
            </View>
        ),
      }}/>

    </Tab.Navigator>
  );
}

export default Tabs;