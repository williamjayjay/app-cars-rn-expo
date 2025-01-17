import React, { useEffect } from "react";
import { StyleSheet, View, ScrollView, TouchableOpacity, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTranslation } from "react-i18next";
import Brasil from "./flags/Brazil";
import USA from "./flags/USA";

const flags = [
  { component: Brasil, lang: "pt-BR", name: "Brasil" },
  { component: USA, lang: "en-US", name: "USA" },
];


export function Language({customFn}:{customFn?:()=>void}) {
  const { i18n, t } = useTranslation();
  const currentLanguage = i18n.language;

  useEffect(() => {
    const loadLanguage = async () => {
      const savedLanguage = await AsyncStorage.getItem("language");
      if (savedLanguage) {
        i18n.changeLanguage(savedLanguage);
      }
    };
    loadLanguage();
  }, [i18n]);

  const changeLanguage = async (lang: string) => {
    await AsyncStorage.setItem("language", lang);
    i18n.changeLanguage(lang);
    customFn && customFn()
  };

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.flagsContainer}
      >
        {flags.map(({ component: Flag, lang, name }) => (
          <TouchableOpacity
          disabled={currentLanguage === lang}
            key={name}
            onPress={() => changeLanguage(lang)}
            style={[
              styles.flag,
              currentLanguage === lang && styles.activeFlag,
              currentLanguage !== lang && styles.inactiveFlag,
            ]}
          >
            <Flag width={18} height={18} />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    width: 70,
  },
  flagsContainer: {
    flexDirection: "row",
  },
  flag: {
    paddingHorizontal: 8,
  },
  activeFlag: {
    transform: [{ scale: 1.5 }],
  },
  inactiveFlag: {
    opacity: 0.5,
    transform: [{ scale: 1 }],

  },
  text: {
    fontSize: 22,
    lineHeight: 32,
    marginTop: -6,
  },
});
