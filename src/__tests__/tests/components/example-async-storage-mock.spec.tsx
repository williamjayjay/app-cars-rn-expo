import AsyncStorage from "@react-native-async-storage/async-storage";

jest.useFakeTimers();

const itemData = [
    { key: "1", text: "test item" },
    { key: "2", text: "another" },
    { key: "3", text: "and another" },
];

describe("AsyncStorage", () => {
    beforeEach(async () => {
        jest.clearAllMocks();
        await AsyncStorage.clear();
        for (const item of itemData) {
            const jsonValue = JSON.stringify(item);
            await AsyncStorage.setItem(item.key, jsonValue);
        }
    });

    it("stores and retrieves all keys", async () => {
        const keys = await AsyncStorage.getAllKeys();
        expect(keys).toEqual(["1", "2", "3"]);
    });

    it("retrieves individual items by key", async () => {
        const storedItem = await AsyncStorage.getItem("1");
        if (storedItem === null) {
            throw new Error("Item not found");
        }
        const parsedItem = JSON.parse(storedItem);
        expect(parsedItem).toEqual(itemData[0]);
    });
    

    it("removes a specific item", async () => {
        await AsyncStorage.removeItem("2");
        const keys = await AsyncStorage.getAllKeys();
        expect(keys).toEqual(["1", "3"]);
    });

    it("clears all stored items", async () => {
        await AsyncStorage.clear();
        const keys = await AsyncStorage.getAllKeys();
        expect(keys).toEqual([]);
    });
});
