import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { StyleSheet, Text,  Image } from 'react-native';

const Card = ({ movie }) => {
  const { poster_path, title, vote_average } = movie;
  const imageUri = `https://image.tmdb.org/t/p/w500/${poster_path}`;

  const navigation = useNavigation()
  return (
    <TouchableOpacity style={styles.container}
    onPress={()=>{
      navigation.navigate('Movie' , {movie})
    }}
    >
    
      <Image source={{ uri: imageUri }} style={styles.image} />
      <Text numberOfLines={2} ellipsizeMode="tail" style={styles.title}>{title}</Text>
      <Text style={styles.rating}>{`Rating: ${vote_average}`}</Text>
   
    </TouchableOpacity>
  );
};

export default Card;

const styles = StyleSheet.create({
  container: {
    margin:10,
    width: '45%',
    aspectRatio: 2 / 3,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f2f2f2',
  },
  image: {
    width: '100%',
    height: '70%',
    borderRadius: 20,
    resizeMode: 'cover',
  },
  title: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  rating: {
    marginTop: 4,
    fontSize: 14,
    textAlign: 'center',
  },
});
