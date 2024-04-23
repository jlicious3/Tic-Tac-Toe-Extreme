import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, Image } from 'react-native';
import { Audio } from 'expo-av';
import { useFocusEffect } from '@react-navigation/native';

const header1 = require('../Images/header1.png');
const backgroundImage = require('../Images/bg5.jpg');
const logoImage = require('../Images/text-1710659971419.png');
const backgroundMusic = require('../music/next2u.mp3');

const HomeScreen = ({ navigation }) => {
  const [sound, setSound] = useState(null);

  useEffect(() => {
    const loadBackgroundMusic = async () => {
      try {
        const { sound } = await Audio.Sound.createAsync(backgroundMusic);
        await sound.setIsLoopingAsync(true);
        await sound.playAsync();
        setSound(sound);
      } catch (error) {
        console.error('Error playing background music:', error);
      }
    };

    loadBackgroundMusic();

    // Clean up function to stop the background music
    return () => {
      if (sound) {
        sound.stopAsync();
        sound.unloadAsync();
      }
    };
  }, []);

  // Use useFocusEffect to play background music again when returning to the Home screen
  useFocusEffect(
    React.useCallback(() => {
      const playBackgroundMusic = async () => {
        try {
          if (sound) {
            await sound.playAsync();
          }
        } catch (error) {
          console.error('Error playing background music:', error);
        }
      };
      playBackgroundMusic();

      // Clean up function
      return () => {
        if (sound) {
          sound.stopAsync();
        }
      };
    }, [sound])
  );

  return (
    <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
      <View style={styles.container}>
        <Image source={header1} style={styles.header1} />
        <Image source={logoImage} style={styles.logo} />
        
        <TouchableOpacity
          style={styles.playButton}
          onPress={() => navigation.navigate('ModeSelection')}
        >
          <Text style={styles.playButtonText}>Tap to Start</Text>
        </TouchableOpacity>

        <View style={styles.bottomButtons}>
          <TouchableOpacity style={styles.button} onPress={() => {/* Implement settings action */}}>
            <Text style={styles.buttonText}>Settings</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={() => {/* Implement policy action */}}>
            <Text style={styles.buttonText}>Privacy Policy</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
          style={styles.button} 
          onPress={() => navigation.navigate('AboutUs')}
          >
            <Text style={styles.buttonText}>About Us</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  header1: {
    width: '100%',
    height: '50%',
    resizeMode: 'contain',
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 300,
  },
  logo: {
    width: '80%',
    height: '20%',
    resizeMode: 'contain',
    marginTop: 1,
    marginBottom: 40,
  },
  playButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#FFD700',
  },
  playButtonText: {
    fontSize: 20,
    color: '#FFD700',
    textAlign: 'center',
  },
  bottomButtons: {
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 70,
  },
  button: {
    backgroundColor: 'transparent',
    padding: 10,
    marginVertical: 5,
    width: '80%',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FFD700',
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 18,
    color: '#FFF',
    textAlign: 'center',
  },
});

export default HomeScreen;
