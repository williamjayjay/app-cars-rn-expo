import React from "react";
import {
  FlatList,
  View,
  StyleSheet,
  RefreshControl,
} from "react-native";
import colors from "@/presentation/ui/styles/colors.json";
import { TextOneCustom } from "../TextOneCustom";
import { IModel } from "@/core/data/repositories/model/types/model.type";

interface ModelListProps {
  data: IModel[];
  labelCode: string;
}

const ModelList: React.FC<ModelListProps> = ({
  data,
  labelCode = "Code",
}) => {
  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.codigo.toString()}
      renderItem={({ item }) => (
        <View style={styles.listItem}>
          <View style={styles.listItemContent}>
            <TextOneCustom numberOfLines={2} style={styles.listItemText}>
              {item.nome}
            </TextOneCustom>
            <TextOneCustom
              style={styles.listItemCode}
            >{`${labelCode}: ${item.codigo}`}</TextOneCustom>
          </View>
        </View>
      )}
      contentContainerStyle={styles.listContentContainer}
    />
  );
};

const styles = StyleSheet.create({
  listItem: {
    borderRadius: 8,
    padding: 8,
  },
  listItemContent: {
    flexDirection: "column",
    gap: 4,
    alignItems: "flex-start",
  },
  listItemText: {
    fontSize: 16,
    color: colors.base.light,
    fontWeight: "600",
    lineHeight: 24,
  },
  listItemCode: {
    fontSize: 14,
    color: colors.base.midnight2,
    fontStyle: "italic",
    lineHeight: 24,
  },
  listContentContainer: {
    paddingBottom: 16,
    gap: 16,
    marginTop: 16,
  },
});

export { ModelList };
