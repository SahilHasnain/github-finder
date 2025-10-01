import type { UserData } from "../types";

export class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

export async function fetchGitHubUser(username: string): Promise<UserData> {
  const trimmed = username.trim();
  if (!trimmed) throw new ApiError("Empty username", 400);

  const res = await fetch(
    `https://api.github.com/users/${encodeURIComponent(trimmed)}`
  );

  if (!res.ok) {
    // Map 404 to a helpful error message
    if (res.status === 404) throw new ApiError("User not found", 404);
    throw new ApiError(`GitHub API returned status ${res.status}`, res.status);
  }

  const data = (await res.json()) as Partial<UserData>;

  // Map to our UserData shape with defensive defaults
  const mapped: UserData = {
    avatar_url: data.avatar_url ?? "",
    name: data.name ?? null,
    bio: data.bio ?? null,
    followers: typeof data.followers === "number" ? data.followers : 0,
    following: typeof data.following === "number" ? data.following : 0,
    public_repos: typeof data.public_repos === "number" ? data.public_repos : 0,
    html_url: data.html_url ?? `https://github.com/${trimmed}`,
  };

  return mapped;
}
