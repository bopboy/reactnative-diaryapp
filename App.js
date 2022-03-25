import Realm from "realm"
import AppLoading from 'expo-app-loading'
import { NavigationContainer } from '@react-navigation/native';
import React, { useState } from 'react';
import Navigator from './navigators';

const FeelingSchema = {
  name: "Feeling",
  properties: {
    _id: "int",
    emotion: "string",
    message: "string"
  },
  primaryKey: "_id"
}

export default function App() {
  const [ready, setReady] = useState(false)
  const startLoading = async () => {
    const realm = await Realm.open({
      path: "diaryapp",
      schema: [FeelingSchema]
    })
    console.log("realm", realm)
  }
  const onFinish = () => setReady(true)
  if (!ready) {
    return (
      <AppLoading
        onError={console.error}
        startAsync={startLoading}
        onFinish={onFinish}
      />
    )
  }
  return (
    <NavigationContainer>
      <Navigator />
    </NavigationContainer>
  );
}
