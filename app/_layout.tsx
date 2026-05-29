import "@/utils/calendarConfig";
import { Ionicons } from "@expo/vector-icons";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { router, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { TouchableOpacity } from "react-native";
import FlashMessage from "react-native-flash-message";
import { Provider as PaperProvider } from "react-native-paper";
import "react-native-reanimated";

export const unstable_settings = {
  anchor: "(tabs)",
};
const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <PaperProvider>
        <FlashMessage position="top" floating style={{ zIndex: 999 }} />
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
            name="booking/BookingDetail"
            options={{
              title: "Chi tiết đặt phòng",
              headerLeft: () => <BackIconStack />,
            }}
          />
          <Stack.Screen
            name="(auth)/Login"
            options={{
              headerLeft: () => <BackIconStack />,
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="(auth)/Register"
            options={{
              headerLeft: () => <BackIconStack />,
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="search/SearchResult"
            options={{
              title: "Kết quả tìm kiếm",
              headerLeft: () => <BackIconStack />,
            }}
          />
          <Stack.Screen
            name="subScreen/RegisterHost"
            options={{
              title: "Đăng ký làm chủ cơ sở",
              headerLeft: () => <BackIconStack />,
            }}
          />
        </Stack>
        <StatusBar style="auto" />
      </PaperProvider>
    </QueryClientProvider>
  );
}

export const BackIconStack = () => {
  return (
    <TouchableOpacity onPress={() => router.back()} style={{ marginLeft: 0 }}>
      <Ionicons name="chevron-back" size={24} color="#333" />
    </TouchableOpacity>
  );
};
