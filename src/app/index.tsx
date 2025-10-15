import React from "react";
import { View, Text, TextInput, Alert, ScrollView, TouchableOpacity } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useForm, Controller } from "react-hook-form";

export default function Index() {
  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      institution: "",
      participantType: "",
      selectedTopic: "",
    },
  });

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

  const onSubmit = async (data: {
    fullName: string;
    email: string;
    phone: string;
    institution: string;
    participantType: string;
    selectedTopic: string;
  }) => {
    const { fullName, email, phone, institution, participantType, selectedTopic } = data;
    if (!fullName || !email || !phone || !institution || !participantType || !selectedTopic) {
      Alert.alert("Please fill in all fields.");
      return;
    }
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
        reset();
      } else {
        Alert.alert("Submission failed", "Please try again later.");
      }
    } catch {
      Alert.alert("Error", "An error occurred. Please try again.");
    }
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View className="flex-1 justify-center items-center p-6">
        <View className="w-full max-w-[400px]">
          <Text className="text-2xl font-bold mb-4 text-center">
            Registration Form
          </Text>
          <Controller
            control={control}
            name="fullName"
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                placeholder="Full Name"
                value={value}
                onChangeText={onChange}
                className="border border-gray-300 rounded-lg px-3 py-3 mb-3 bg-white"
                placeholderTextColor="#9ca3af"
              />
            )}
          />
          <Controller
            control={control}
            name="email"
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                placeholder="Email"
                value={value}
                onChangeText={onChange}
                keyboardType="email-address"
                autoCapitalize="none"
                className="border border-gray-300 rounded-lg px-3 py-3 mb-3 bg-white"
                placeholderTextColor="#9ca3af"
              />
            )}
          />
          <Controller
            control={control}
            name="phone"
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                placeholder="Phone"
                value={value}
                onChangeText={onChange}
                keyboardType="phone-pad"
                className="border border-gray-300 rounded-lg px-3 py-3 mb-3 bg-white"
                placeholderTextColor="#9ca3af"
              />
            )}
          />
          <Controller
            control={control}
            name="institution"
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                placeholder="Institution"
                value={value}
                onChangeText={onChange}
                className="border border-gray-300 rounded-lg px-3 py-3 mb-3 bg-white"
                placeholderTextColor="#9ca3af"
              />
            )}
          />
          <Text className="mb-2 font-medium">Participant Type</Text>
          <Controller
            control={control}
            name="participantType"
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
              <View className="border border-gray-300 rounded-lg mb-3 bg-white overflow-hidden">
                <Picker
                  selectedValue={value}
                  onValueChange={onChange}
                  style={{ height: 48, width: "100%" }}
                  dropdownIconColor="#000"
                >
                  {participantTypes.map((type) => (
                    <Picker.Item key={type.value} label={type.label} value={type.value} />
                  ))}
                </Picker>
              </View>
            )}
          />
          <Text className="mb-2 font-medium">Topik</Text>
          <Controller
            control={control}
            name="selectedTopic"
            rules={{ required: true }}
            render={({ field: { onChange, value } }) => (
              <View className="border border-gray-300 rounded-lg mb-5 bg-white overflow-hidden">
                <Picker
                  selectedValue={value}
                  onValueChange={onChange}
                  style={{ height: 48, width: "100%" }}
                  dropdownIconColor="#000"
                >
                  {topics.map((topic) => (
                    <Picker.Item key={topic.value} label={topic.label} value={topic.value} />
                  ))}
                </Picker>
              </View>
            )}
          />
          <TouchableOpacity
            onPress={handleSubmit(onSubmit)}
            disabled={isSubmitting}
            className={`bg-blue-600 rounded-lg px-4 py-3 ${isSubmitting ? "opacity-60" : ""}`}
          >
            <Text className="text-white text-base text-center font-semibold">
              {isSubmitting ? "Submitting..." : "Submit"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}
