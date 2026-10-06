import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const BlogDetails = () => {
  
  const id = useParams().id;
  console.log(id)
  const navigate = useNavigate();
  const [post, setPost] = useState({});

  const getPost = () => {
    axios
      .get(`http://localhost:5000/posts/${id}`)
      .then((res) => {
        console.log(res.data);
        setPost(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  useEffect(() => {
    getPost();
  }, []);

  return (
    <div className="h-screen bg-[#F2EFE7] flex justify-center items-center">
      <div className="max-w-150 w-[90%] bg-[#66A3BF] flex flex-col gap-4 p-4 rounded-md text-white">
        <h3 className="text-2xl font-semibold">{post.title}</h3>
        <p className="text-lg">{post.content}</p>
        <button className="p-2 rounded bg-blue-500 text-white font-semibold text-lg cursor-pointer border-none outline-none" onClick={()=> navigate(`/edit/${id}`)}>
          Edit
        </button>
      </div>
    </div>
  );
};

export default BlogDetails;
