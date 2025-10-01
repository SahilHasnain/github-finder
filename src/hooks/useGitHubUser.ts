import { useCallback, useState } from "react";
import type { UserData } from "../types";
import { fetchGitHubUser } from "../lib/api";

export function useGitHubUser() {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const findProfile = useCallback(async (username: string) => {
    const trimmed = username.trim();
    if (!trimmed) return;

    setLoading(true);
    setError(null);
    setUser(null);

    try {
      const data = await fetchGitHubUser(trimmed);
      setUser(data);
    } catch (err: unknown) {
      if (err instanceof Error) setError(err);
      else setError(new Error("Unknown error"));
    } finally {
      setLoading(false);
    }
  }, []);

  return { user, loading, error, findProfile } as const;
}
