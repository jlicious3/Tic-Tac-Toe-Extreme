import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Text, ImageBackground, Image, StyleSheet } from 'react-native';
import { Audio } from 'expo-av';
import { useFocusEffect } from '@react-navigation/native';

const backgroundImage = require('../Images/bgmodeselect.jpg');
const modeSelect = require('../Images/modeselect.png');

const ModeSelectionScreen = ({ navigation }) => {
  const [sound, setSound] = useState(null);
  const [isMusicLoaded, setIsMusicLoaded] = useState(false);

  useEffect(() => {
    const loadBackgroundMusic = async () => {
      try {
        if (!isMusicLoaded) {
          const { sound } = await Audio.Sound.createAsync(
            require('../music/next2uu.mp3')
          );
          await sound.setIsLoopingAsync(true);
          await sound.playAsync(); // Attempt to play the background music
          setSound(sound);
          setIsMusicLoaded(true);
        }
      } catch (error) {
        console.error('Error loading background music:', error);
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

  // Use the useFocusEffect hook to handle navigation focus events
  useFocusEffect(
    React.useCallback(() => {
      return () => {
        if (sound && navigation.isFocused()) {
          sound.stopAsync();
          sound.unloadAsync();
        }
      };
    }, [navigation, sound])
  );

  const handleBackToHome = () => {
    // Stop the sound before navigating back to home
    if (sound) {
      sound.stopAsync();
      sound.unloadAsync();
    }
    navigation.goBack();
  };

  return (
    <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
      <View style={styles.container}>
        <Image source={modeSelect} style={styles.header1} />
        <View style={styles.bottomButtons}>
          <TouchableOpacity 
            title="Play Now"
            style={[styles.playButton, styles.buttonMargin]}
            onPress={() => navigation.navigate('Game', { sound })}

          >
            <Text style={styles.playButtonText}>Play Now</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            title="Profile Setup" 
            style={[styles.playButton, styles.buttonMargin]}
            onPress={() => navigation.navigate('ProfileSetup')} 
          >
            <Text style={styles.playButtonText}>Profile Setup</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            title="Back to Home" 
            style={[styles.playButton, styles.buttonMargin]}
            onPress={handleBackToHome}
          >
            <Text style={styles.playButtonText}>Back to Home</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            title="Additional Features" 
            style={[styles.playButton, styles.buttonMargin]}
            onPress={handleBackToHome}
          >
            <Text style={styles.playButtonText}>Coming Soon...</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            title="Additional Features" 
            style={[styles.playButton, styles.buttonMargin]}
            onPress={handleBackToHome}
          >
            <Text style={styles.playButtonText}>Coming Soon...</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            title="Additional Features" 
            style={[styles.playButton, styles.buttonMargin]}
            onPress={handleBackToHome}
          >
            <Text style={styles.playButtonText}>Coming Soon...</Text>
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
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  header1: {
    width: '100%',
    height: 150,
    resizeMode: 'contain',
  },
  bottomButtons: {
    alignSelf: 'flex-start',
    marginLeft: 20,
    marginBottom: 500,
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
    marginHorizontal: 15,
  },
  buttonMargin: {
    marginVertical: 10,
  },
});

export default ModeSelectionScreen;
