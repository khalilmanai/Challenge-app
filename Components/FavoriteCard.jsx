import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const FavoriteCard = ({ movie, onDelete }) => {
  const { poster_path, title, vote_average } = movie;
  const imageUri = `https://image.tmdb.org/t/p/w500/${poster_path}`;
 const navigation = useNavigation()
  const handleDelete = async () => {
    try {
      // Retrieve the favorite movies from AsyncStorage
      const favorites = await AsyncStorage.getItem("favorites");
      if (favorites) {
        const parsedFavorites = JSON.parse(favorites);
        // Filter out the movie to be deleted
        const updatedFavorites = parsedFavorites.filter((fav) => fav.id !== movie.id);
        // Update AsyncStorage with the updated favorites
        await AsyncStorage.setItem("favorites", JSON.stringify(updatedFavorites));
        // Remove the movie from the state immediately
        onDelete(movie.id);
      }
    } catch (error) {
      console.log("Error deleting favorite movie:", error);
    }
  };
  
  return (
    <TouchableOpacity style={styles.container} onPress={()=>{
      navigation.navigate('Movie' , {movie})
    }}>
      <View style={styles.container}>
      <Image source={{ uri: imageUri }} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.rating}>{`Rating: ${vote_average}`}</Text>
      </View>
      <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
        <Text style={styles.deleteButtonText}>Delete</Text>
      </TouchableOpacity>
    </View>
    </TouchableOpacity>
  );
};

export default FavoriteCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  image: {
    width: 80,
    height: 120,
    borderRadius: 10,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  rating: {
    fontSize: 14,
    color: "gray",
  },
  deleteButton: {
    padding: 8,
    backgroundColor: "red",
    borderRadius: 5,
  },
  deleteButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});
