import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  RefreshControl,
  TouchableOpacity,
  Alert,
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
      console.error("Error fetching favorite movies:", error);
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    fetchFavoriteMovies().then(() => setRefreshing(false));
  };

  const handleDeleteMovie = (movieId) => {
    Alert.alert(
      "Confirmation",
      "Are you sure you want to delete this movie from favorites?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => {
            setFavoriteMovies((prevMovies) =>
              prevMovies.filter((movie) => movie.id !== movieId)
            );
          },
        },
      ]
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
              <RefreshControl
                refreshing={refreshing}
                onRefresh={handleRefresh}
              />
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
    marginBottom:'10%'
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
  
    fontSize: 16,
    fontWeight: "bold",
    color: "gray",
  },
  textContainer: {
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});
