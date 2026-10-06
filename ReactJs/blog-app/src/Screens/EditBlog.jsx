import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams,useNavigate } from "react-router-dom";
const EditBlog = () => {

  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [Error, setError] = useState("");
  const {id} = useParams();

  const getPost = () => {
    axios
      .get(`http://localhost:5000/posts/${id}`)
      .then((res) => {
        console.log(res.data);
        setTitle(res.data.title);
        setContent(res.data.content);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  useEffect(() => {
    getPost();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if(!title || !content) {
       setError('Please fill all the fields');
       return;
    }

    const posts = {
      title,
      content
    }

    axios
      .put(`http://localhost:5000/posts/${id}`, posts)
      .then((response) => {
        console.log(response);
        navigate('/');
      })
      .catch((err) => {
        console.log(err);
        setError("Failed to update blog");
      });
    }



  return <div className="h-screen bg-[#F2EFE7] flex justify-center items-center">
      <form className="max-w-[500px] w-[90%] bg-[#66A3BF] flex flex-col gap-4 p-4 rounded-md">
        <h1 className="text-2xl font-semibold text-center text-white">
          Edit Blog
        </h1>
        {Error && <p className="text-red-500 text-center text-lg">{Error}</p>}
        <input value={title}
        onChange={(e) => setTitle(e.target.value)}
          type="text"
          placeholder="Enter Blog Title"
          className="p-2 rounded bg-white border-none outline-none"
        />
        <textarea

        value={content}
        onChange={(e) => setContent(e.target.value)}
          rows={10}
          placeholder="Enter Blog Content"
          className="p-2 rounded bg-white border-none outline-none"
        ></textarea>
        <button className="p-2 rounded bg-green-500 text-white font-semibold text-lg cursor-pointer border-none outline-none" onClick={handleSubmit}>
          Update Blog
        </button>
      </form>
    </div>;
};

export default EditBlog;
