    import { router } from "expo-router";

    export function useBackHome() {
    const handleBack = () => router.replace("/(tabs)");
    return handleBack;
    }
