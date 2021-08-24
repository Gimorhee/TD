import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const UserPosts = ({ match, post }) => {
  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    const filteredPosts = post.posts.filter((post) => post.user._id === match.params.id);
    setUserPosts(filteredPosts);
  }, []);

  return (
    <div className="userPosts">
      <section className="cta">
        <Link to="/dashboard">DASHBOARD</Link>
      </section>
      {userPosts.length}
    </div>
  );
};

export default UserPosts;
