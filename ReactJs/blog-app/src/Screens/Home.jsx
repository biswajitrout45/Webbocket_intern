import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const [allPosts, setAllPosts] = useState([]);

  const navigate = useNavigate();

  const getAllPost = () => {
    axios
      .get("http://localhost:5000/posts")
      .then((res) => {
        // console.log(res.data);
        setAllPosts(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  useEffect(() => {
    getAllPost();
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:5000/posts/${id}`)
      .then((res) => {
        console.log(res.data);
        getAllPost();
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  return (
    <div className="min-h-screen bg-[#F2EFE7] px-20 py-10">
      <h2 className="text-3xl font-semibold">Explore Blogs</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-5">
        {allPosts.map((post) => (
          <div
            key={post.id}
            className="p-4 rounded-md bg-white shadow-lg relative h-56"
          >
            <h3 className="text-2xl font-semibold">
              {post.title.slice(0, 55)} {post.title.length > 55 && "..."}
            </h3>
            <p>
              {post.content.slice(0, 150)} {post.content.length > 150 && "..."}
            </p>

            <div className="flex justify-between absolute bottom-4 left-4 right-4">
              <button
                className="px-5 py-2 rounded bg-blue-500 font-semibold cursor-pointer text-white"
                onClick={() => navigate(`/blog/${post.id}`)}
              >
                Read More
              </button>
              <button className="px-5 py-2 rounded bg-red-500 font-semibold cursor-pointer text-white" onClick={() => handleDelete(post.id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
