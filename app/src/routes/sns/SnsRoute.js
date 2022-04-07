import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FeedView from '../../views/sns/feed/FeedView';
import FeedSearchView from '../../views/sns/feed/FeedSearchView';
import ProfileView from '../../views/sns/profile/ProfileView';

const FeedScreen = ({ navigation }) => {
    return (
      <FeedView navigation={navigation} />
    )
}

const FeedSearchScreen = ({ navigation }) => {
  return (
    <FeedSearchView navigation={navigation} />
  )
}

const ProfileScreen = ({ navigation }) => {
  return (
    <ProfileView navigation={navigation} />
  )
}

const RootStack = createNativeStackNavigator();

const SnsRoute = () => {
  return (
    <RootStack.Navigator
      screenOptions={{ headerShown: false }}     
    >
        <RootStack.Group>
          <RootStack.Screen name="FeedList" component={FeedScreen} />
          <RootStack.Screen name="FeedSearch" component={FeedSearchScreen} />
          <RootStack.Screen name="Profile" component={ProfileScreen} />
        </RootStack.Group>
    </RootStack.Navigator>
  );
}

export default SnsRoute;
