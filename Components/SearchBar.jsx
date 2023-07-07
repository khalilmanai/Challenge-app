import React from 'react';
import { StyleSheet } from 'react-native';
import { SearchBar } from '@rneui/themed';

const SearchBanner = ({ search, onChangeText }) => {
  const updateSearch = (text) => {
    onChangeText(text);
  };

  return (
    <SearchBar
      platform="default"
      containerStyle={styles.searchBarContainer}
      inputContainerStyle={styles.searchBarInputContainer}
      inputStyle={styles.searchBarInput}
      round
      onChangeText={updateSearch}
      lightTheme
      value={search}
      placeholder="Search..."
      placeholderTextColor="white"
      key="search-bar"
    />
  );
};

export default SearchBanner;

const styles = StyleSheet.create({
  searchContainer: {
    marginBottom: 10,
  },
  searchBarContainer: {
    width: '70%',
    backgroundColor: 'transparent',
    borderBottomWidth: 0,
    borderTopWidth: 0,
  },
  searchBarInputContainer: {
    backgroundColor: '#D3D3D3',
  },
});
