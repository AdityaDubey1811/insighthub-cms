import { useEffect, useState } from "react";
import { getMyProfile } from "../services/userService";
import LoadingSpinner from "../components/ui/LoadingSpinner";

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchProfile() {
      try {
        
        const data = await getMyProfile();
        setProfile(data);
      } catch (err) {
        console.error(err);
        setError("Unable to load profile.");
      } finally {
        setLoading(false);
      }
    }

    fetchProfile();
  }, []);

  if (loading) {
  return <LoadingSpinner text="Loading profile..." />;
  }

  if (error) {
    return <p className="text-red-600">{error}</p>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900">
        Profile
      </h1>

      <div className="mt-6 rounded-xl border border-gray-200 bg-white p-6">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-xl font-semibold text-white">
            {profile.name?.charAt(0).toUpperCase()}
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              {profile.name}
            </h2>

            <p className="text-sm text-gray-500">
              {profile.email}
            </p>
          </div>
        </div>

        <div className="mt-6 flex gap-8 border-t border-gray-200 pt-5">
          <div>
            <p className="text-2xl font-bold text-gray-900">
              {profile.followers}
            </p>
            <p className="text-sm text-gray-500">Followers</p>
          </div>

          <div>
            <p className="text-2xl font-bold text-gray-900">
              {profile.following}
            </p>
            <p className="text-sm text-gray-500">Following</p>
          </div>
        </div>
      </div>
    </div>
  );
}