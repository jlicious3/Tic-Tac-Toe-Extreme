import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Square from './Square';

const boardSize = Dimensions.get('window').width - 60; // Subtract some padding
const squareSize = boardSize / 3;

const Board = ({ squares, onPress }) => (
    <View style={styles.container}>
      <View style={styles.board}>
        {squares.map((square, i) => (
          <Square key={i} value={square} size={squareSize} onPress={() => onPress(i)} />
        ))}
      </View>
    </View>
  );
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center', 
      justifyContent: 'center', 
      paddingLeft: 30,
    },
    board: {
      width: boardSize,
      height: boardSize, // Ensure the board is a square
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
  });
  
  export default Board;