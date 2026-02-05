import * as ImagePicker from "expo-image-picker";
import * as SQLite from "expo-sqlite";

import { useState } from "react";
import { Image, Text, View } from "react-native";
import {
  Appbar,
  Button,
  Card,
  Dialog,
  Portal,
  TextInput,
} from "react-native-paper";

const db = SQLite.openDatabaseSync("books.db", {
  useNewConnection: true,
});

export default function BooksPage() {
  const [visible, setVisible] = useState(false);
  const [formData, setFormData] = useState({
    image: "",
    title: "",
    author: "",
    category: "",
    year: "",
    description: "",
  });

  async function initDatabase() {
    try {
      await db.execAsync(
        `CREATE TABLE IF NOT EXISTS books (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        author TEXT NOT NULL,
        category TEXT NOT NULL,
        year TEXT NOT NULL,
        description TEXT,
        image TEXT
            )`,
      );
    } catch (error) {}
  }

  async function pickImage() {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsEditing: true,
        aspect: [3, 4],
        quality: 0.8,
      });
      if (!result.canceled) {
        setFormData({ ...formData, image: result.assets[0].uri });
      }
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <View>
      <Appbar.Header>
        <Appbar.Content title="Books Page" />
        <Appbar.Action
          icon="plus"
          onPress={() => {
            setVisible(true);
          }}
        />
      </Appbar.Header>

      <View
        style={{
          padding: 16,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Card style={{ width: "48%", padding: 8, marginBottom: 12 }}>
          <Card.Cover
            source={{
              uri: "https://i.pinimg.com/736x/08/61/a5/0861a542e87659b5a3eb8e7091f5eddd.jpg",
            }}
          />
          <View style={{ marginTop: 8, marginBottom: 4 }}>
            <Text style={{ fontWeight: "bold", fontSize: 20, color: "white" }}>
              Laut Bercerita
            </Text>

            <Text style={{ fontSize: 11, color: "gray" }}>
              Leila S. Chudori - Fiksi - 2017
            </Text>

            <Text style={{ marginTop: 6, fontSize: 11, color: "gray" }}>
              Deskripsi
            </Text>
          </View>
        </Card>
        <Card style={{ width: "48%", padding: 8, marginBottom: 12 }}>
          <Card.Cover
            source={{
              uri: "https://i.pinimg.com/736x/08/61/a5/0861a542e87659b5a3eb8e7091f5eddd.jpg",
            }}
          />
          <View style={{ marginTop: 8, marginBottom: 4 }}>
            <Text style={{ fontWeight: "bold", fontSize: 20, color: "white" }}>
              Laut Bercerita
            </Text>

            <Text style={{ fontSize: 11, color: "gray" }}>
              Leila S. Chudori - Fiksi - 2017
            </Text>

            <Text style={{ marginTop: 6, fontSize: 11, color: "gray" }}>
              Deskripsi
            </Text>
          </View>
        </Card>
      </View>
      <Portal>
        <Dialog
          visible={visible}
          onDismiss={() => {
            setVisible(false);
          }}
        >
          <Dialog.Title>Tambah Buku</Dialog.Title>
          <Dialog.Content>
            <View style={{ marginBottom: 12 }}>
              <View style={{ alignItems: "center" }}>
                {formData.image ? (
                  <View
                    style={{
                      width: 120,
                      height: 160,
                      marginBottom: 8,
                      borderRadius: 8,
                      backgroundColor: "gray",
                    }}
                  >
                    <Image
                      source={{ uri: formData.image }}
                      style={{ width: "100%", height: "100%" }}
                      resizeMode="cover"
                    />
                  </View>
                ) : (
                  <View
                    style={{
                      width: 120,
                      height: 160,
                      justifyContent: "center",
                      marginBottom: 8,
                      borderRadius: 8,
                      backgroundColor: "gray",
                    }}
                  >
                    <Text style={{ color: "white", textAlign: "center" }}>
                      Belum Ada Gambar
                    </Text>
                  </View>
                )}
              </View>
              <Button mode="outlined" onPress={pickImage}>
                Pilih Gambar
              </Button>

              <TextInput
                label={"judul buku"}
                mode="outlined"
                style={{ marginBottom: 12 }}
                value={formData.title}
                onChangeText={(text) =>
                  setFormData({ ...formData, title: text })
                }
              />
              <TextInput
                label={"Penulis"}
                mode="outlined"
                style={{ marginBottom: 12 }}
                value={formData.author}
                onChangeText={(text) =>
                  setFormData({ ...formData, author: text })
                }
              />
              <View
                style={{
                  flexDirection: "row",
                  gap: 10,
                  justifyContent: "space-between",
                }}
              >
                <TextInput
                  label={"Kategori"}
                  mode="outlined"
                  style={{ marginBottom: 12, flex: 1 }}
                  value={formData.category}
                  onChangeText={(text) =>
                    setFormData({ ...formData, category: text })
                  }
                />
                <TextInput
                  label={"Tahun"}
                  mode="outlined"
                  style={{ marginBottom: 12, flex: 1 }}
                  value={formData.year}
                  onChangeText={(text) =>
                    setFormData({ ...formData, year: text })
                  }
                />
              </View>
              <TextInput
                label={"Deskripsi Buku"}
                multiline
                numberOfLines={3}
                mode="outlined"
                style={{ marginBottom: 12 }}
                value={formData.description}
                onChangeText={(text) =>
                  setFormData({ ...formData, description: text })
                }
              />
            </View>
          </Dialog.Content>
        </Dialog>
      </Portal>
    </View>
  );
}
