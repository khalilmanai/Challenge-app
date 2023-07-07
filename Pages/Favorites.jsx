import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  RefreshControl,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import FavoriteCard from "../Components/FavoriteCard";

const Favorites = () => {
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    fetchFavoriteMovies();
  }, []);

  const fetchFavoriteMovies = async () => {
    try {
      const favorites = await AsyncStorage.getItem("favorites");
      if (favorites) {
        setFavoriteMovies(JSON.parse(favorites));
      }
    } catch (error) {
      console.log("Error fetching favorite movies:", error);
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    fetchFavoriteMovies().then(() => setRefreshing(false));
  };

  const handleDeleteMovie = (movieId) => {
    // Remove the movie from the list immediately
    setFavoriteMovies((prevMovies) =>
      prevMovies.filter((movie) => movie.id !== movieId)
    );
  };

  const renderFavoriteMovie = ({ item }) => (
    <FavoriteCard movie={item} onDelete={handleDeleteMovie} />
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.goBack()}
        >
          <AntDesign name="arrowleft" size={32} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>Favorites</Text>
      </View>
      {favoriteMovies.length > 0 ? (
        <FlatList
          data={favoriteMovies}
          renderItem={renderFavoriteMovie}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }
        />
      ) : (
        <View style={styles.textContainer}>
          <Text style={styles.emptyText}>No favorite movies found</Text>
        </View>
      )}
    </View>


  );
};

export default Favorites;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  backButton: {
    position: "absolute",
    left: "10%",
  },
  title: {
    flex: 1,
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  emptyText: {
    Margin: 20,
    fontSize: 16,
    fontWeight: "bold",
    color: "gray",
  },
  textContainer: {
    height:"100%",
    justifyContent: "center",
    alignItems:'center'
  },
});
