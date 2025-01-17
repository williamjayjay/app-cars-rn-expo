import React from "react";
import { View, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { Search, X } from "lucide-react-native";
import colors from "@/presentation/ui/styles/colors.json";

interface SearchBarCustomProps {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  placeHolderText: string;
}

const SearchBarCustom: React.FC<SearchBarCustomProps> = ({ searchQuery, setSearchQuery, placeHolderText = "Search..." }) => {
  return (
    <View style={styles.searchBarContainer}>
      <View style={styles.searchBar}>
        <Search size={20} color={colors.base.light} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder={placeHolderText}
          placeholderTextColor={colors.base.midnight2}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery("")}>
            <X size={18} color={colors.base.light} style={styles.clearIcon} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  searchBarContainer: {
    marginVertical: 16,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.base.midnight,
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 40,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    color: colors.base.light,
    fontSize: 16,
  },
  clearIcon: {
    marginLeft: 8,
  },
});

export { SearchBarCustom };
