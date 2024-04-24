"use client";

import { useState } from "react";
import { PostDto } from "../types/posts";
import { createPost } from "../apis/posts";

export const PostInput = () => {
  const [form, setForm] = useState<PostDto>({
    title: "",
    body: "",
  });

  const handleChange = (name: keyof PostDto, value: string) => {
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    const result = await createPost(form);
    alert(`Create ${JSON.stringify(result)}`);
  };

  return (
    <div>
      <div>
        <div>
          <label htmlFor="title">title</label>
        </div>
        <input
          name="title"
          value={form.title}
          onChange={(e) => handleChange("title", e.target.value)}
        />
      </div>
      <div>
        <div>
          <label htmlFor="body">body</label>
        </div>
        <textarea
          name="body"
          value={form.body}
          onChange={(e) => handleChange("body", e.target.value)}
        />
      </div>
      <button type="button" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
};
