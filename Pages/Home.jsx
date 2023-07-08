import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import SearchBanner from "../Components/SearchBar";
import Card from "../Components/Card";
import { fetchMovies } from "../Api/connection";
import { useNavigation } from "@react-navigation/native";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const navigation = useNavigation();
  useEffect(() => {
    const getMovies = async () => {
      try {
        const data = await fetchMovies();
        setMovies(data);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    getMovies();
  }, []);

  const updateSearch = (search) => {
    setSearch(search);
  };

  const filteredMovies = () => {
    return movies.filter((movie) =>
      movie.title.toLowerCase().includes(search.toLowerCase())
    );
  };

  const renderMovieCard = ({ item }) => <Card movie={item} />;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <SearchBanner onChangeText={updateSearch} value={search} />
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Favorites");
          }}
        >
          <AntDesign name="heart" size={32} color="red" />
        </TouchableOpacity>
      </View>
      <View>
        <FlatList
          data={filteredMovies()}
          renderItem={renderMovieCard}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          contentContainerStyle={styles.movieList}
        />
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  movieList: {
    flexGrow: 1,
  },
});
