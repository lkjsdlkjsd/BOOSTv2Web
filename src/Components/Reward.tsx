import React, { useEffect, useState } from "react";
import "./Reward.css";
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import {
  SiNetflix,
  SiSpotify,
  SiCanva,
  SiDiscord,
  SiScribd,
  SiYoutube,
  SiGrammarly,
  SiValorant,
  SiRoblox,
} from "react-icons/si";

export default function Reward() {
  const [userXp, setUserXp] = useState<number>(0); // User's current XP
  const [loading, setLoading] = useState<boolean>(true); // Loading state
  const [showClaimModal, setShowClaimModal] = useState<boolean>(false); // Modal state
  const [modalMessage, setModalMessage] = useState<string>(""); // Modal message

  // Fetch user's XP from the database
  useEffect(() => {
    const fetchUserXp = async () => {
      try {
        const auth = getAuth();
        const user = auth.currentUser;
        if (user) {
          const db = getFirestore();
          const userDocRef = doc(db, "users", user.uid);
          const docSnap = await getDoc(userDocRef);
          if (docSnap.exists()) {
            const userData = docSnap.data();
            setUserXp(userData.exp || 0); // Set user's XP
          }
        }
      } catch (error) {
        console.error("Error fetching user XP:", error);
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchUserXp();
  }, []);

  // Handle reward claim
  const handleClaim = async (rewardXp: number, rewardName: string) => {
    try {
      const auth = getAuth();
      const user = auth.currentUser;
      if (user) {
        const db = getFirestore();
        const userDocRef = doc(db, "users", user.uid);

        // Deduct XP and update in the database
        const newXp = userXp - rewardXp;
        await updateDoc(userDocRef, { exp: newXp });

        // Update local state
        setUserXp(newXp);

        // Show modal with success message
        setModalMessage(`You have successfully claimed ${rewardName}!`);
        setShowClaimModal(true);
      }
    } catch (error) {
      console.error("Error claiming reward:", error);
      setModalMessage("An error occurred while claiming the reward.");
      setShowClaimModal(true);
    }
  };

  // Rewards data
  const rewards = [
    { name: "Spotify Premium", icon: <SiSpotify size={100} />, xpRequired: 15000 },
    { name: "Netflix", icon: <SiNetflix size={100} />, xpRequired: 100000 },
    { name: "Canva Pro", icon: <SiCanva size={100} />, xpRequired: 12000 },
    { name: "Discord Nitro", icon: <SiDiscord size={100} />, xpRequired: 16000 },
    { name: "Scribd Subscription", icon: <SiScribd size={100} />, xpRequired: 18000 },
    { name: "YouTube Premium", icon: <SiYoutube size={100} />, xpRequired: 13000 },
    { name: "Grammarly Pro", icon: <SiGrammarly size={100} />, xpRequired: 12000 },
    { name: "Valorant Points", icon: <SiValorant size={100} />, xpRequired: 25000 },
    { name: "Robux", icon: <SiRoblox size={100} />, xpRequired: 40000 },
  ];

  if (loading) {
    return <p>Loading...</p>; // Show loading state
  }

  return (
    <React.Fragment>
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-2xl font-bold mb-4">Rewards</h1>
        <p className="mb-4">Your Total XP: {userXp.toLocaleString()} XP</p>
        <div className="rewards-grid">
          {rewards.map((reward, index) => (
            <div className="card" key={index}>
              <div className="icon-wrapper">{reward.icon}</div>
              <div>{reward.name}</div>
              <div>{reward.xpRequired.toLocaleString()} Experience</div>
              <progress value={userXp} max={reward.xpRequired} />
              <div>
                {userXp.toLocaleString()}/{reward.xpRequired.toLocaleString()} XP
              </div>
              <button
                className="btn btn-warning"
                disabled={userXp < reward.xpRequired} // Disable if XP is insufficient
                onClick={() => handleClaim(reward.xpRequired, reward.name)} // Claim reward
              >
                {userXp >= reward.xpRequired ? "Claim" : "Insufficient XP"}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Claim Modal */}
      {showClaimModal && (
        <div className="modal-bg">
          <div className="modal-content bg-light p-4 rounded-5">
            <h3>Reward Claimed</h3>
            <p>{modalMessage}</p>
            <div>
              <a></a>
            </div>
            <div className="modal-buttons">
              <button
                onClick={() => setShowClaimModal(false)}
                className="btn btn-primary"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
}