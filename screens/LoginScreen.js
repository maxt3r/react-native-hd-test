import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Switch, KeyboardAvoidingView } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import JitBitAPI from '../services/api';
import Auth from '../services/auth';

const LoginScreen = ({ navigation }) => {
  let [url, setUrl] = useState('https://support.jitbit.com/helpdesk');
  let [isLegacyLogin, setIsLegacyLogin] = useState(false);
  let [username, setUsername] = useState('');
  let [password, setPassword] = useState('');


  const login = async () => {
    if (isLegacyLogin) {
      const credentials = {
        url: url,
        username: username,
        password: password
      };

      console.log(credentials);

      JitBitAPI.init(credentials);
      const result = await JitBitAPI.Authorization();
      console.log(result);
      if (result.status == 200) {
        await Auth.saveCredentials(credentials);
        navigation.navigate('Tickets');
      }
    }
    // try {
    //   const result = await WebBrowser.openBrowserAsync(url + '/User/Login?needAuthToken=true');
    //   console.log(result);
    // } catch (error) {
    //   console.error('Failed to open browser:', error.message);
    // }
  }


  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
    >
    <View style={styles.container}>
      <Text>Login</Text>
      <TextInput
        style={styles.input}
        onChangeText={setUrl}
        value={url}
        placeholder="Enter URL"
        keyboardType="url"
      />
      <View style={styles.switchContainer}>
        <Text>Legacy Login </Text>
        <Switch
          onValueChange={setIsLegacyLogin}
          value={isLegacyLogin}
        />
      </View>

      {isLegacyLogin &&
        <View style={styles.childView}>
          <TextInput
          style={styles.input}
          onChangeText={setUsername}
          value={username}
          placeholder="Username"
          />
          <TextInput
            style={styles.input}
            onChangeText={setPassword}
            value={password}
            placeholder="Password"
            secureTextEntry={true}
            />
        </View>
      }
      <Button
        title="Login"
        onPress={login}
      />
      
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  childView: {
    width: '100%',
    alignItems: 'center',
  },
  switchContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: '80%'
  }
});

export default LoginScreen;
