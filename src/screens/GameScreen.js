// import React, { useState, useEffect } from 'react';
// import { View, StyleSheet, Alert, Text, TouchableOpacity } from 'react-native';
// import Board from '../components/Board';


// const GameScreen = ({ navigation, route, sound }) => {
//   const [squares, setSquares] = useState(Array(9).fill(null));
//   const [isXPlayer, setIsXPlayer] = useState(true);
//   const username = route.params?.username ?? 'Player';

//   const getWinner = (squares) => {
//     const lines = [
//         [0, 1, 2],
//         [3, 4, 5],
//         [6, 7, 8],
//         [0, 3, 6],
//         [1, 4, 7],
//         [2, 5, 8],
//         [0, 4, 8],
//         [2, 4, 6],
//       ];
//       for (let i = 0; i < lines.length; i++) {
//         const [a, b, c] = lines[i];
//         if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
//           return squares[a];
//         }
//       }
//       return null;
//   };

//   const handlePress = (index) => {
//     if (squares[index] != null || getWinner(squares) != null) {
//       return;
//     }
//     const newSquares = [...squares];
//     newSquares[index] = isXPlayer ? 'X' : 'O';
//     setSquares(newSquares);
//     setIsXPlayer(!isXPlayer);
//   };

//   const winner = getWinner(squares);
//   let status;
//   if (winner) {
//     status = `Winner: ${winner === 'X' ? username : 'Opponent'}`;
//     Alert.alert(status);
//   } else if (squares.every(Boolean)) {
//     status = "It's a draw!";
//     Alert.alert(status);
//   } else {
//     status = `Next player: ${isXPlayer ? username : 'Opponent'}`;
//   }
  
//   const resetGame = () => {
//     setSquares(Array(9).fill(null));
//     setIsXPlayer(true);
//   };

  

//   return (
//     <View style={styles.container}>
//       <Text style={styles.playerInfo}>{status}</Text>
//       <Board squares={squares} onPress={handlePress} style={styles.board} />
//       <View style={styles.buttonContainer}>
//         <TouchableOpacity style={styles.button} onPress={resetGame}>
//           <Text style={styles.buttonText}>Play Again</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Home')}>
//           <Text style={styles.buttonText}>Exit to Home</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//       justifyContent: 'center',
//       alignItems: 'center',
//       backgroundColor: '#f0f0f0', // Set a neutral background color
//     },
//     playerInfo: {
//       fontSize: 24,
//       fontWeight: 'bold',
//       marginVertical: 20,
//       color: '#333', // A color that contrasts well with the background
//     },
//     board: {
//       // The Board component already has some styles from the previous adjustment
//     },
//     buttonContainer: {
//       marginTop: 20, // Spacing between the board and the buttons
//     },
//     button: {
//       backgroundColor: '#5b9df9', // A pleasant blue color for the buttons
//       padding: 15,
//       borderRadius: 8,
//       marginVertical: 8, // Spacing between buttons
//       width: 200, // Set a fixed width for buttons
//       alignItems: 'center', // Center the text inside the buttons
//       elevation: 2, // Shadow for Android
//       shadowOpacity: 0.3, // Shadow for iOS
//       shadowRadius: 3,
//       shadowOffset: { width: 0, height: 2 },
//     },
//     buttonText: {
//       fontSize: 18,
//       color: '#fff', // White color text for the buttons
//     },
//     // Rest of the styles if needed
//   });

// export default GameScreen;

import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Alert, Text, TouchableOpacity } from 'react-native';
import Board from '../components/Board';

const GameScreen = ({ navigation, route }) => {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isXPlayer, setIsXPlayer] = useState(true);
  const username = route.params?.username ?? 'Player';
  const sound = route.params?.sound;

  useEffect(() => {
  console.log("GameScreen mounted");
  return () => {
    console.log("GameScreen unmounted");
    if (sound) {
      console.log("Stopping and unloading sound");
      sound.stopAsync().then(() => {
        console.log("Sound stopped");
        sound.unloadAsync().then(() => {
          console.log("Sound unloaded");
        }).catch((error) => {
          console.error("Error unloading sound:", error);
        });
      }).catch((error) => {
        console.error("Error stopping sound:", error);
      });
    }
  };
}, [sound]);

  const getWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const handlePress = (index) => {
    if (squares[index] != null || getWinner(squares) != null) {
      return;
    }
    const newSquares = [...squares];
    newSquares[index] = isXPlayer ? 'X' : 'O';
    setSquares(newSquares);
    setIsXPlayer(!isXPlayer);
  };

  const winner = getWinner(squares);
  let status;
  if (winner) {
    status = `Winner: ${winner === 'X' ? username : 'Opponent'}`;
    Alert.alert(status);
  } else if (squares.every(Boolean)) {
    status = "It's a draw!";
    Alert.alert(status);
  } else {
    status = `Next player: ${isXPlayer ? username : 'Opponent'}`;
  }

  const resetGame = () => {
    setSquares(Array(9).fill(null));
    setIsXPlayer(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.playerInfo}>{status}</Text>
      <Board squares={squares} onPress={handlePress} style={styles.board} />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={resetGame}>
          <Text style={styles.buttonText}>Play Again</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Home')}>
          <Text style={styles.buttonText}>Exit to Home</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0', // Set a neutral background color
  },
  playerInfo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
    color: '#333', // A color that contrasts well with the background
  },
  board: {
    // The Board component already has some styles from the previous adjustment
  },
  buttonContainer: {
    marginTop: 20, // Spacing between the board and the buttons
  },
  button: {
    backgroundColor: '#5b9df9', // A pleasant blue color for the buttons
    padding: 15,
    borderRadius: 8,
    marginVertical: 8, // Spacing between buttons
    width: 200, // Set a fixed width for buttons
    alignItems: 'center', // Center the text inside the buttons
    elevation: 2, // Shadow for Android
    shadowOpacity: 0.3, // Shadow for iOS
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 2 },
  },
  buttonText: {
    fontSize: 18,
    color: '#fff', // White color text for the buttons
  },
  // Rest of the styles if needed
});

export default GameScreen;


