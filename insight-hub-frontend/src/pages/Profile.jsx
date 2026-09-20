
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getMyProfile,
  getUserProfile,
  toggleFollow,
} from "../services/userService";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import ErrorState from "../components/ui/ErrorState";

export default function Profile() {
  const { userId } = useParams();

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [followLoading, setFollowLoading] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);

  const isOwnProfile = !userId;

  useEffect(() => {
    async function fetchProfile() {
      try {
        setLoading(true);
        setError("");

        const data = isOwnProfile
          ? await getMyProfile()
          : await getUserProfile(userId);

        setProfile(data);

        if (!isOwnProfile) {
          setIsFollowing(data.followedByCurrentUser);
        }
      } catch (err) {
        console.error(err);
        setError("Unable to load profile.");
      } finally {
        setLoading(false);
      }
    }

    fetchProfile();
  }, [userId, isOwnProfile]);

  const handleFollowToggle = async () => {
    try {
      setFollowLoading(true);

      await toggleFollow(profile.id);

      setIsFollowing((prev) => !prev);

      setProfile((prev) => ({
        ...prev,
        followers: isFollowing
          ? prev.followers - 1
          : prev.followers + 1,
      }));
    } catch (err) {
      console.error(err);
    } finally {
      setFollowLoading(false);
    }
  };

  if (loading) {
    return <LoadingSpinner text="Loading profile..." />;
  }

  if (error) {
    return <ErrorState message={error} />;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900">
        Profile
      </h1>

      <div className="mt-6 rounded-xl border border-gray-200 bg-white p-6">
        <div className="flex items-center justify-between gap-4">
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

          {!isOwnProfile && (
            <button
              onClick={handleFollowToggle}
              disabled={followLoading}
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {followLoading
                ? "Please wait..."
                : isFollowing
                ? "Unfollow"
                : "Follow"}
            </button>
          )}
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
