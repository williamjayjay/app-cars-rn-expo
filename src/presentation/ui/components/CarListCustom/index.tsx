import React from "react";
import { FlatList, TouchableOpacity, View, Text, StyleSheet, RefreshControl } from "react-native";
import { Car } from "lucide-react-native";
import colors from "@/presentation/ui/styles/colors.json";
import { ICar } from "@/core/data/repositories/cars/types/cars.type";

interface CarListCustomProps {
  data: ICar[];
  refreshing: boolean;
  onRefresh: () => void;
  handlePress: (brandCode: string, brandName: string) => void;
}

const CarListCustom: React.FC<CarListCustomProps> = ({ data, refreshing, onRefresh, handlePress }) => {
  return (
    <FlatList
      data={data}
      keyExtractor={(item, index) => item.codigo.toString() + index.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity style={styles.listItem} onPress={() => handlePress(item.codigo, item.nome)}>
          <View style={styles.listItemContent}>
            <View style={styles.iconContainer}>
              <Car size={20} color={colors.base.light} />
            </View>
            <Text style={styles.listItemText}>{item.nome}</Text>
          </View>
        </TouchableOpacity>
      )}
      contentContainerStyle={styles.listContentContainer}
      refreshing={refreshing}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.base.light} />}
    />
  );
};

const styles = StyleSheet.create({
  listItem: {
    borderRadius: 8,
    padding: 8,
  },
  listItemContent: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },
  iconContainer: {
    width: 30,
    height: 30,
    borderRadius: 20,
    backgroundColor: colors.base.midnight,
    alignItems: "center",
    justifyContent: "center",
  },
  listItemText: {
    fontSize: 16,
    color: colors.base.light,
    fontWeight: "600",
  },
  listContentContainer: {
    paddingBottom: 16,
    gap: 24,
    marginTop: 16,
  },
});

export { CarListCustom };
