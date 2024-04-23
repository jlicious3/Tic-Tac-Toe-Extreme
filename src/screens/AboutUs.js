import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView} from 'react-native';

const AboutUsScreen = () => {
  return (
    <ScrollView>
    <View style={styles.container}>
      <Person name="Jairo De Guzman" role="Developer" image={require('../Images/jairo.png')} />
      <Person name="Dave Luna" role="Developer" image={require('../Images/dave.png')} />
      <Person name="Justin James Marquez" role="Developer" image={require('../Images/justin.png')} />
      <Person name="Rajinder Kaur" role="Developer" image={require('../Images/rajinder.jpg')} />
    </View>
    </ScrollView>
  );
};

const Person = ({ name, role, image }) => {
  return (
    <View style={styles.personContainer}>
      <Image source={image} style={styles.image} />
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.role}>{role}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  personContainer: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 8,
    width: '80%',
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  role: {
    fontSize: 16,
    color: '#555',
  },
});

export default AboutUsScreen;
