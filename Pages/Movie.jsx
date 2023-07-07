import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity, ScrollView } from 'react-native';

import { AntDesign } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
const { width } = Dimensions.get('window');

const Movie = ({ route, navigation }) => {
  const { movie } = route.params;
  const imageUri = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;

  const addToFavorites = async () => {
    try {
      const existingFavorites = await AsyncStorage.getItem('favorites');
      let favorites = existingFavorites ? JSON.parse(existingFavorites) : [];
      favorites.push(movie);
      await AsyncStorage.setItem('favorites', JSON.stringify(favorites));
      alert('Movie added to favorites!');
    } catch (error) {
      console.log('Error adding to favorites:', error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: imageUri }} style={styles.image} />
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
        <AntDesign name="arrowleft" size={32} color="black" />
        </TouchableOpacity>
        <TouchableOpacity  onPress={addToFavorites}>
        <AntDesign name="heart" size={32} color="red" />
        </TouchableOpacity>
      </View>
      <View style={styles.description}>
        <Text style={styles.title}>{movie.title}</Text>
        <Text style={styles.rating}>{`Rating: ${movie.vote_average}`}</Text>
        <Text style={styles.overview}>{movie.overview}</Text>
      </View>
      {/* Add more movie details here */}
    </ScrollView>
  );
};

export default Movie;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: width,
    height: width * 1.5, // Adjust the aspect ratio as needed
    resizeMode: 'cover',
  },
  buttonsContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
  },
  button: {
    backgroundColor: 'white',
     justifyContent:'center',
    borderRadius: 50,
    padding:10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    padding: 12,
  },
  rating: {
    fontSize: 16,
    marginBottom: 8,
  },
  overview: {
    fontSize: 16,
    marginBottom: 16,
  },
});
