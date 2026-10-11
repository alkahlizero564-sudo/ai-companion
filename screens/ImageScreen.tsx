import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, Text, StyleSheet, ActivityIndicator, ScrollView } from "react-native";
import { Image } from "expo-image";
import { generateImage } from "../services/api";

export default function ImageScreen() {
  const [prompt, setPrompt] = useState("");
  const [url, setUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleGenerate() {
    if (!prompt.trim() || loading) return;
    setLoading(true);
    setError(null);
    try {
      const imageUrl = await generateImage(prompt.trim());
      setUrl(imageUrl);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TextInput
        style={styles.input}
        value={prompt}
        onChangeText={setPrompt}
        placeholder="صف الصورة اللي عايزها..."
        multiline
      />
      <TouchableOpacity style={styles.btn} onPress={handleGenerate}>
        <Text style={{ color: "white", fontWeight: "600" }}>توليد الصورة</Text>
      </TouchableOpacity>

      {loading && <ActivityIndicator style={{ marginTop: 20 }} />}
      {error && <Text style={styles.error}>{error}</Text>}
      {url && <Image source={{ uri: url }} style={styles.image} contentFit="contain" />}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, alignItems: "stretch" },
  input: { borderWidth: 1, borderColor: "#ccc", borderRadius: 12, padding: 12, minHeight: 60, marginBottom: 12 },
  btn: { backgroundColor: "#111", borderRadius: 20, padding: 14, alignItems: "center" },
  error: { color: "#c0392b", marginTop: 12 },
  image: { width: "100%", height: 400, marginTop: 16, borderRadius: 12 },
});
