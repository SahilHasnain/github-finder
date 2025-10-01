import type { UserData } from "../types";

type Props = {
  user: UserData;
  className?: string;
};

export default function ProfileCard({ user, className = "" }: Props) {
  return (
    <div
      className={`bg-slate-800 rounded-lg p-6 shadow-lg text-slate-100 ${className}`}
    >
      <div className="flex items-start gap-6">
        <img
          src={user.avatar_url}
          alt={`${user.name ?? "GitHub user"} avatar`}
          className="w-24 h-24 rounded-full flex-shrink-0"
        />

        <div className="flex-1">
          <a
            href={user.html_url}
            target="_blank"
            rel="noreferrer"
            className="text-2xl font-semibold text-white hover:underline"
          >
            {user.name ?? "Unknown"}
          </a>

          {user.bio && <p className="mt-2 text-slate-300">{user.bio}</p>}

          <div className="mt-4 flex gap-6 text-sm text-slate-200">
            <div className="flex flex-col">
              <span className="font-medium">Repos</span>
              <span>{user.public_repos}</span>
            </div>
            <div className="flex flex-col">
              <span className="font-medium">Followers</span>
              <span>{user.followers}</span>
            </div>
            <div className="flex flex-col">
              <span className="font-medium">Following</span>
              <span>{user.following}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
