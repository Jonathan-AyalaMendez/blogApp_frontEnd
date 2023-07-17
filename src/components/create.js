import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Create() {
  const [form, setForm] = useState({
    name: "",
    position: "",
  });
  const navigate = useNavigate();

  // These methods will update the state properties.
  function updateForm(value) {
    setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  // This function will handle the submission.
  async function onSubmit(e) {
    e.preventDefault();

    // Adds new post to the database
    const newPerson = { ...form };

    try {
      await fetch("http://localhost:5050/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPerson),
      });
      setForm({ name: "", position: "" });
      navigate("/");
    } catch (error) {
      window.alert(error);
      return;
    }
  }

  // This following section will display the form that takes the input from the user.
  return (
    <div>
      <h3>Create New Post</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="name">Title</label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={form.name}
            onChange={(e) => updateForm({ name: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="position">Blog Post Text</label>
          <textarea
            className="form-control"
            id="position"
            value={form.position}
            onChange={(e) => updateForm({ position: e.target.value })}
            rows={4} 
          />
        </div>

        <div className="form-group">
          <input
            type="submit"
            value="Create Post"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
}
