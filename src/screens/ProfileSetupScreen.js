import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const ProfileSetupScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');

  const saveProfileAndStartGame = () => {
    // Here you might want to validate the username or save it persistently
    // For now, we'll just navigate and pass the username as a parameter
    navigation.navigate('Game', { username });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile Setup:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Username"
        value={username}
        onChangeText={setUsername}  // This updates the username state
      />
      <Button title="Save Profile" onPress={saveProfileAndStartGame} />
      <Button title="Start Game" onPress={saveProfileAndStartGame} />
      <Button title="Back" onPress={() => navigation.goBack()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    width: '80%',
    padding: 10,
    marginVertical: 10,
  },
});

export default ProfileSetupScreen;
