import { User } from "@/type/interfaces/auth";
import { storage } from "@/utils/authWrapper";
import { useEffect, useState } from "react";

export const useAuthUser = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const currentUser = await storage.getUser();
        setUser(currentUser);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  return {
    user,
    loading,
    isAuthenticated: !!user,
  };
};
