import React from "react";
import BottomNav from "./BottomNav";
import TopNav from "./TopNav";

const AddPost = () => {
  return (
    <>
      <TopNav title="Add Post" />
      <form>
        <input type="file" />
        <textarea />
        <button>Upload</button>
      </form>
      <BottomNav active={2} />
    </>
  );
};

export default AddPost;
