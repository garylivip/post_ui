import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";
const baseURL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:4000"
    : "http://101.132.187.152:4000";

function Home() {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  const { authState } = useContext(AuthContext);

  useEffect(() => {
    axios
      .get(`${baseURL}/posts`)
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => {
        console.log("Error", error);
      });
  }, []);

  const likePost = (postId) => {
    axios
      .post(
        `${baseURL}/likes`,
        { PostId: postId },
        {
          headers: {
            authorization: localStorage.getItem("token"),
          },
        }
      )
      .then(() => {
        setPosts(
          posts.map((post) => {
            if (post.id === postId) {
              if (post.Likes) {
                post.Likes.push({ username: authState.username });
              } else {
                post.Likes = [{ username: authState.username }];
              }
            }
            return post;
          }),

          {
          ...posts,
          Likes: [...posts.Likes, { username: authState.username }],
        });
      })
      .catch((error) => {
        console.log("Error", error);
      });
  };

  return (
    <div>
      {posts.map((post, key) => {
        console.log(post);

        return (
          <div key={post.id} className="post">
            <div className="title">{post.title}</div>
            <div
              className="body"
              onClick={() => navigate(`/post/${post.id}`)} //onClick={() => (window.location.href = `/post/${post.id}`)}
            >
              {post.postText}
            </div>
            <div className="footer">
              {post.userName}
              <button onClick={() => likePost(post.id)}>Like</button>
              <label>{post.Likes ? post.Likes.length : 0}</label>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Home;
