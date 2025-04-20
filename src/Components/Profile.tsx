import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { supabase } from "../supabase";
import { FaPen } from "react-icons/fa";
import "./Profile.css";

const Profile: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<any>({
    name: "",
    email: "",
    sex: "",
    birthday: "",
    occupation: "",
    createdAt: "",
    profilePictureUrl: "", 
  });
  const [loading, setLoading] = useState<boolean>(true);

  const auth = getAuth();
  const db = getFirestore();

  useEffect(() => {
    onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        const userRef = doc(db, "users", firebaseUser.uid);
        const docSnap = await getDoc(userRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setUserData((prev: any) => ({
            ...prev,
            name: data.name || "",
            email: firebaseUser.email || "",
            sex: data.sex || "",
            birthday: data.birthday || "",
            occupation: data.occupation || "",
            createdAt: data.createdAt ? formatDate(data.createdAt) : "", // Format the timestamp
            profilePictureUrl: data.profilePicture || "",
          }));

          if (data.profilePicture) {
            const { data: profilePictureData, error } = await supabase.storage
              .from("profile-pictures") 
              .download(data.profilePicture);

            if (error) {
              console.error("Error fetching profile picture:", error);
            } else {
              const url = URL.createObjectURL(profilePictureData);
              setUserData((prev: any) => ({ ...prev, profilePictureUrl: url }));
            }
          }
        }
      }
      setLoading(false);
    });
  }, []);

  const formatDate = (timestamp: any) => {
    const date = timestamp.toDate();
    const options = { year: "numeric", month: "long", day: "numeric" }; 
    return date.toLocaleDateString("en-US", options);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <img
          src={userData.profilePictureUrl || "default-avatar.png"}
          alt="User Avatar"
          className="profile-avatar"
        />
        <div className="profile-info">
          <h2 className="fw-bold text-start">@{userData.name || "User"}</h2>
          <span>
            Joined on {userData.createdAt || "Date not available"}
          </span>{" "}
        </div>
      </div>

      <div className="profile-section">
        <h3>Contact Info</h3>
        <p> emails: {userData.email || "Email not available"}</p>
        <p>Sex: {userData.sex || "Sex not available"}</p>
        <p> Occupation: {userData.occupation || "Occupation not available"}</p>
      </div>

      <div className="profile-section">
        <h3>Bio</h3>
        <p>{userData.birthday || "Birthday: " + "Birthday not available"}</p>
      </div>
      <div className="profile-section">
        <h3>Achievements</h3>
        <div className="achievements">
          <div className="achievement">
            <FaPen size={40} color="orange" />
            <p>First of Many</p>
          </div>
          <div className="achievement">
            <FaPen size={40} color="green" />
            <p>Ten of Many</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
