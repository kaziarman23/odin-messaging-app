import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import Navbar from "../components/Navbar";

export default function ProfilePage() {
  const { user } = useContext(AuthContext);
  const [bio, setBio] = useState(user?.bio || "");

  const saveProfile = () => {
    alert("Profile updated! (API call can be implemented)");
  };

  return (
    <div>
      <Navbar />
      <div className="p-6 max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-4">Profile</h1>
        <div className="flex flex-col gap-2">
          <p>
            <strong>Username:</strong> {user.username}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <textarea
            className="border p-2 rounded"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Bio"
          ></textarea>
          <button
            className="bg-blue-500 text-white p-2 rounded mt-2"
            onClick={saveProfile}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
