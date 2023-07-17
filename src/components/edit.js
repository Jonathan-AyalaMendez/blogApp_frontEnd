import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";

export default function Edit() {
  const [form, setForm] = useState({
    name: "",
    position: "",
    records: [],
  });
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const id = params.id.toString();
      const response = await fetch(`http://localhost:5050/${params.id.toString()}`);

      if (!response.ok) {
        const message = `An error has occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const record = await response.json();
      if (!record) {
        window.alert(`Record with id ${id} not found`);
        navigate("/");
        return;
      }

      setForm(record);
    }

    fetchData();

    return;
  }, [params.id, navigate]);

  // These methods will update the state properties.
  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  async function onSubmit(e) {
    e.preventDefault();
    const editedPerson = {
      name: form.name,
      position: form.position,
    };

    // This will send a post request to update the data in the database.
    await fetch(`http://localhost:5050/${params.id}`, {
      method: "PATCH",
      body: JSON.stringify(editedPerson),
      headers: {
        'Content-Type': 'application/json'
      },
    });

    navigate("/");
  }

  // This following section will display the form that lets users update their post and name.
  return (
    <div>
      <h3>Edit Blog Text</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="name">Title </label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={form.name}
            onChange={(e) => updateForm({ name: e.target.value })}
            style={{ whiteSpace: "normal" }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="position">Blog Post </label>
          <textarea
            className="form-control"
            id="position"
            value={form.position}
            onChange={(e) => updateForm({ position: e.target.value })}
            style={{ whiteSpace: "normal" }}
            rows={4} 
          />
        </div>
        <div className="form-group">
          <input
            type="submit"
            value="Update Record"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
}
