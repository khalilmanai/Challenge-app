import React from 'react';
import { StyleSheet } from 'react-native';
import { SearchBar } from '@rneui/themed';

const SearchBanner = ({ value, onChangeText }) => {
  return (
    <SearchBar
      platform="default"
      containerStyle={styles.searchBarContainer} // Updated style name
      inputContainerStyle={styles.searchBarInputContainer}
      inputStyle={styles.searchBarInput}
      round
      onChangeText={onChangeText}
      lightTheme
      value={value} // Updated prop name
      placeholder="Search..."
      placeholderTextColor="white"
      key="search-bar"
    />
  );
};

export default SearchBanner;

const styles = StyleSheet.create({
  searchBarContainer: { // Updated style name
    width: '70%',
    backgroundColor: 'transparent',
    borderBottomWidth: 0,
    borderTopWidth: 0,
  },
  searchBarInputContainer: {
    backgroundColor: '#D3D3D3',
  },
});
