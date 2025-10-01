import React, { useCallback, useState } from "react";
import ProfileCard from "./components/ProfileCard";
import { useGitHubUser } from "./hooks/useGitHubUser";

// Top-level App — now uses a hook to manage GitHub user fetching and a presentational ProfileCard
export default function App() {
  const [username, setUsername] = useState<string>("");

  // Hook provides user, loading and error state plus a finder function
  const { user, loading, error, findProfile } = useGitHubUser();

  // Typed submit handler
  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      void findProfile(username);
    },
    [findProfile, username]
  );

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center">
      <div className="w-full max-w-xl mx-4 p-8 rounded-lg">
        <header className="mb-6 text-center">
          <h1 className="text-4xl font-bold text-white">
            GitHub Profile Finder
          </h1>
          <p className="mt-2 text-sm text-slate-300">
            Quickly find public GitHub profiles and details.
          </p>
        </header>

        <form
          className="flex gap-3 items-center"
          role="search"
          aria-label="Search GitHub profiles"
          onSubmit={handleSubmit}
        >
          <label htmlFor="username" className="sr-only">
            GitHub username or organization
          </label>
;
          <input
            id="username"
            name="username"
            type="text"
            value={username}
            onChange={handleChange}
            className="flex-1 bg-slate-700 text-white rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter GitHub username (e.g. SahilHasnain)"
            aria-label="GitHub username"
            autoComplete="off"
          />

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={username.trim().length === 0 || loading}
          >
            {loading ? "Searching..." : "Search"}
          </button>
        </form>

        <section className="mt-6">
          {loading ? (
            <p className="text-white">Loading...</p>
          ) : error ? (
            /* Friendly message for 404 */
            // Type-guard: check if error has a numeric 'status' property
            typeof (error as { status?: unknown }).status === "number" &&
            (error as { status?: number }).status === 404 ? (
              <p className="text-sm text-red-300">
                User not found. Try another username.
              </p>
            ) : (
              <p className="text-sm text-red-300">
                An error occurred. Please try again later.
              </p>
            )
          ) : user ? (
            <ProfileCard user={user} />
          ) : (
            <p className="text-sm text-slate-400">
              No profile loaded. Enter a username and search to view a profile.
            </p>
          )}
        </section>
      </div>
    </div>
  );
}
