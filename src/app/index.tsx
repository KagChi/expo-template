import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert, ScrollView } from "react-native";
import { Picker } from "@react-native-picker/picker";

export default function Index() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [institution, setInstitution] = useState("");
  const [participantType, setParticipantType] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const participantTypes = [
    { label: "Pilih Tipe Peserta...", value: "" },
    { label: "Mahasiswa", value: "Mahasiswa" },
    { label: "Umum", value: "Umum" },
  ];

  const topics = [
    { label: "Pilih Topik...", value: "" },
    { label: "Teknologi AI", value: "Teknologi AI" },
    { label: "Cloud Computing", value: "Cloud Computing" },
    { label: "Keamanan Siber", value: "Keamanan Siber" },
  ];

  const handleSubmit = async () => {
    if (!fullName || !email || !phone || !institution || !participantType || !selectedTopic) {
      Alert.alert("Please fill in all fields.");
      return;
    }
    setSubmitting(true);
    const formData = new FormData();
    formData.append("entry.59791515", fullName);
    formData.append("entry.739327528", email);
    formData.append("entry.1114672691", phone);
    formData.append("entry.1620844296", institution);
    formData.append("entry.760243841", participantType);
    formData.append("entry.1301806015", selectedTopic);

    try {
      const response = await fetch(
        "",
        {
          method: "POST",
          body: formData,
        }
      );
      if (response.ok || response.status === 0) {
        Alert.alert("Submitted!", "Your response has been recorded.");
        setFullName("");
        setEmail("");
        setPhone("");
        setInstitution("");
        setParticipantType("");
        setSelectedTopic("");
      } else {
        Alert.alert("Submission failed", "Please try again later.");
      }
    } catch {
      Alert.alert("Error", "An error occurred. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: "center", alignItems: "center", padding: 24 }}>
      <View style={{ width: "100%", maxWidth: 400 }}>
        <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 16, textAlign: "center" }}>
          Registration Form
        </Text>
        <TextInput
          placeholder="Full Name"
          value={fullName}
          onChangeText={setFullName}
          style={{
            borderWidth: 1,
            borderColor: "#ccc",
            borderRadius: 8,
            padding: 12,
            marginBottom: 12,
            backgroundColor: "#fff",
          }}
        />
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          style={{
            borderWidth: 1,
            borderColor: "#ccc",
            borderRadius: 8,
            padding: 12,
            marginBottom: 12,
            backgroundColor: "#fff",
          }}
        />
        <TextInput
          placeholder="Phone"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
          style={{
            borderWidth: 1,
            borderColor: "#ccc",
            borderRadius: 8,
            padding: 12,
            marginBottom: 12,
            backgroundColor: "#fff",
          }}
        />
        <TextInput
          placeholder="Institution"
          value={institution}
          onChangeText={setInstitution}
          style={{
            borderWidth: 1,
            borderColor: "#ccc",
            borderRadius: 8,
            padding: 12,
            marginBottom: 12,
            backgroundColor: "#fff",
          }}
        />
        <Text style={{ marginBottom: 8, fontWeight: "500" }}>Participant Type</Text>
        <View
          style={{
            borderWidth: 1,
            borderColor: "#ccc",
            borderRadius: 8,
            marginBottom: 12,
            backgroundColor: "#fff",
            overflow: "hidden",
          }}
        >
          <Picker
            selectedValue={participantType}
            onValueChange={(itemValue) => setParticipantType(itemValue)}
            style={{ height: 48, width: "100%" }}
            dropdownIconColor="#000"
          >
            {participantTypes.map((type) => (
              <Picker.Item key={type.value} label={type.label} value={type.value} />
            ))}
          </Picker>
        </View>
        <Text style={{ marginBottom: 8, fontWeight: "500" }}>Topik</Text>
        <View
          style={{
            borderWidth: 1,
            borderColor: "#ccc",
            borderRadius: 8,
            marginBottom: 20,
            backgroundColor: "#fff",
            overflow: "hidden",
          }}
        >
          <Picker
            selectedValue={selectedTopic}
            onValueChange={(itemValue) => setSelectedTopic(itemValue)}
            style={{ height: 48, width: "100%" }}
            dropdownIconColor="#000"
          >
            {topics.map((topic) => (
              <Picker.Item key={topic.value} label={topic.label} value={topic.value} />
            ))}
          </Picker>
        </View>
        <Button title={submitting ? "Submitting..." : "Submit"} onPress={handleSubmit} disabled={submitting} />
      </View>
    </ScrollView>
  );
}
