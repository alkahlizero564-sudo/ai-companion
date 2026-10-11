import React, { useState } from "react";
import { View, TextInput, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from "react-native";
import { saveKey } from "../services/api";

function KeyField({ label, storeName }: { label: string; storeName: string }) {
  const [value, setValue] = useState("");
  return (
    <View style={{ marginBottom: 20 }}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={setValue}
        placeholder="sk-..."
        secureTextEntry
        autoCapitalize="none"
      />
      <TouchableOpacity
        style={styles.btn}
        onPress={async () => {
          if (!value.trim()) return;
          await saveKey(storeName, value.trim());
          Alert.alert("تم الحفظ", `${label} اتخزن بشكل مشفر على الجهاز.`);
          setValue("");
        }}
      >
        <Text style={{ color: "white" }}>حفظ</Text>
      </TouchableOpacity>
    </View>
  );
}

export default function SettingsScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>مفاتيح الـ API</Text>
      <Text style={styles.sub}>
        بتتخزن محليًا فقط باستخدام expo-secure-store (Keychain / Keystore)، مش بترفع لأي سيرفر منّا.
      </Text>
      <KeyField label="OpenAI API Key (chat + images)" storeName="OPENAI_API_KEY" />
      <KeyField label="Runway API Key (video, اختياري)" storeName="RUNWAY_API_KEY" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  header: { fontSize: 20, fontWeight: "700", marginBottom: 4 },
  sub: { color: "#666", marginBottom: 20, lineHeight: 20 },
  label: { marginBottom: 6, fontWeight: "600" },
  input: { borderWidth: 1, borderColor: "#ccc", borderRadius: 10, padding: 10, marginBottom: 8 },
  btn: { backgroundColor: "#111", borderRadius: 10, padding: 10, alignItems: "center" },
});
