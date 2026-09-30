import { useEffect, useState } from "react";
import FriendCard from "../component/FriendCard";
import { getUserFriends } from "../lib/api";
import PageLoader from "../component/PageLoader";

const FriendsPage = () => {
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const data = await getUserFriends();
        setFriends(data);
      } catch (error) {
        console.error("Error fetching friends", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFriends();
  }, []);

  if (loading) return <p className="p-6"><PageLoader /></p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Friends</h1>

      {friends.length === 0 ? (
        <p>No friends yet</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {friends.map((friend) => (
            <FriendCard key={friend._id} friend={friend} />
          ))}
        </div>
      )}
    </div>
  );
};

export default FriendsPage;