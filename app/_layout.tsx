import "@/utils/calendarConfig";
import { Ionicons } from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { TouchableOpacity } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
import "react-native-reanimated";
import "../global.css";

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  return (
    <PaperProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="modal"
          options={{ presentation: "modal", title: "Modal" }}
        />
        <Stack.Screen
          name="detail/FacilityDetail"
          options={{
            title: "Chi tiết cơ sở",
            headerLeft: () => <BackIconStack />,
          }}
        />
        <Stack.Screen
          name="detail/RoomDetail"
          options={{
            title: "Chi tiết phòng",
            headerLeft: () => <BackIconStack />,
          }}
        />
        <Stack.Screen
          name="booking/BookingScreen"
          options={{
            title: "Đặt phòng",
            headerLeft: () => <BackIconStack />,
          }}
        />
        <Stack.Screen
          name="(auth)/Login"
          options={{
            title: "Đăng nhập",
            headerLeft: () => <BackIconStack />,
            headerShown: false,
          }}
        />
      </Stack>
      <StatusBar style="auto" />
    </PaperProvider>
  );
}

export const BackIconStack = () => {
  const router = useRouter();
  return (
    <TouchableOpacity onPress={() => router.back()} style={{ marginLeft: 0 }}>
      <Ionicons name="chevron-back" size={24} color="#333" />
    </TouchableOpacity>
  );
};
