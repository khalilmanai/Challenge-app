import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  Alert,
} from "react-native";

import { AntDesign } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";
import { fetchDetails } from "../Api/connection";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
const { width } = Dimensions.get("window");

const Movie = ({ route }) => {
  const [movieDetails, setMovieDetails] = useState("");
  const { movie } = route.params;
  const { poster_path, id } = movie;

  const ImageUri = `https://image.tmdb.org/t/p/w500/${poster_path}`;

  const navigation = useNavigation();
  useEffect(() => {
    const getMovieDetails = async () => {
      try {
        const response = await fetchDetails(id);
        setMovieDetails(response);
      } catch (error) {
        console.error(error);
        return null;
      }
    };
    getMovieDetails();
  }, [id]);

  const addToFavorites = async () => {
    try {
      const existingFavorites = await AsyncStorage.getItem("favorites");
      let favorites = existingFavorites ? JSON.parse(existingFavorites) : [];

      // Check if the movie already exists in favorites
      const isMovieAlreadyAdded = favorites.some(
        (favMovie) => favMovie.id === movie.id
      );
      if (isMovieAlreadyAdded) {
        alert("Movie already exists in favorites!");
        return;
      }

      Alert.alert(
        "Confirmation",
        "Are you sure you want to add this movie to favorites?",
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "OK",
            onPress: async () => {
              try {
                favorites.push(movie);
                await AsyncStorage.setItem(
                  "favorites",
                  JSON.stringify(favorites)
                );
                alert("Movie added to favorites!");
              } catch (error) {
                console.error("Error adding to favorites:", error);
              }
            },
          },
        ]
      );
    } catch (error) {
      console.error("Error adding to favorites:", error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <ImageBackground source={{ uri: ImageUri }} style={styles.image}>
        <View style={styles.textContainer}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text style={styles.title}>{movie.title}</Text>
            <Text style={styles.rating}>{`Rating: ${movie.vote_average}`}</Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Text
              style={styles.duration}
            >{`Duration: ${movieDetails.runtime} minutes`}</Text>
            <Text
              style={styles.releaseDate}
            >{`Release Date : ${movie.release_date}`}</Text>
          </View>
          {movieDetails && (
            <View style={{margin:10}}>
              <Text style={styles.genres}>
                {movieDetails.genres.map((genre) => (
                  <View style={styles.genre} key={genre.id}>
                    <Text style={styles.genreText}>{genre.name}</Text>
                  </View>
                ))}
              </Text>
            </View>
          )}
        </View>
      </ImageBackground>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.goBack()}
        >
          <AntDesign name="arrowleft" size={32} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={addToFavorites}>
          <AntDesign name="heart" size={32} color="red" />
        </TouchableOpacity>
      </View>
      <View style={styles.description}>
        <Text style={styles.overview}>{movie.overview}</Text>
      </View>
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
    resizeMode: "cover",
  },
  buttonsContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
  },
  button: {
    backgroundColor: "white",
    justifyContent: "center",
    borderRadius: 50,
    padding: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  textContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
    color: "white",
  },
  rating: {
    fontSize: 16,
    marginBottom: 8,
    color: "white",
  },
  releaseDate: {
    fontSize: 16,
    color: "white",
  },
  duration: {
    fontSize: 16,
    color: "white",
    marginBottom: 8,
    marginRight: 8,
  },
  genres: {
    fontSize: 16,
    color: "white",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  genre: {
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 50,
    paddingVertical: 4,
    paddingHorizontal: 8,
    marginLeft:10,
  },
  genreText: {
    color: "white",
  },
  description: {
    padding: 12,
  },
  overview: {
    fontSize: 16,
    marginBottom: 16,
  },
});
