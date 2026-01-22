import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { Button, Text, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LocalStorage() {
  const [nama, setNama] = useState("");
  const [kelas, setKelas] = useState("");
  const [umur, setUmur] = useState("");
  const [jurusan, setJurusan] = useState("");

  async function saveData() {
    await AsyncStorage.setItem("nama", nama);
    await AsyncStorage.setItem("kelas", kelas);
    await AsyncStorage.setItem("umur", umur);
    await AsyncStorage.setItem("jurusan", jurusan);
  }

  async function deleteData() {
    await AsyncStorage.removeItem("nama");
    await AsyncStorage.removeItem("kelas");
    await AsyncStorage.removeItem("umur");
    await AsyncStorage.removeItem("jurusan");

    setNama("");
    setKelas("");
    setUmur("");
    setJurusan("");
  }

  async function getData() {
    const storedNama = await AsyncStorage.getItem("nama");
    const storedUmur = await AsyncStorage.getItem("umur");
    const storedJurusan = await AsyncStorage.getItem("jurusan");
    const storedKelas = await AsyncStorage.getItem("kelas");

    if (storedNama) setNama(storedNama);
    if (storedUmur) setUmur(storedUmur);
    if (storedJurusan) setJurusan(storedJurusan);
    if (storedKelas) setKelas(storedKelas);
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <SafeAreaView style={{ padding: 20 }}>
      <Text>Nama : {nama} </Text>
      <Text>umur : {umur} </Text>
      <Text>jurusan : {jurusan} </Text>
      <Text>kelas : {kelas} </Text>

      <TextInput placeholder="masukkan nama" onChangeText={setNama}></TextInput>
      <TextInput placeholder="masukkan umur" onChangeText={setUmur}></TextInput>
      <TextInput
        placeholder="masukkan jurusan"
        onChangeText={setJurusan}
      ></TextInput>
      <TextInput
        placeholder="masukkan kelas"
        onChangeText={setKelas}
      ></TextInput>

      <Button title="simpan data" onPress={saveData}></Button>
      <Button title="hapus data" onPress={deleteData}></Button>
      <Button title="ambil data" onPress={getData}></Button>
    </SafeAreaView>
  );
}
