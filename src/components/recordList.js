import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Record = (props) => (
  <>
    <tr>
      <td >
        <strong>{props.record.name}</strong>
      </td>
      <td></td>
      <td>
        <Link className="btn btn-link" to={`/edit/${props.record._id}`}>
          Edit
        </Link>{" "}
        |
        <button
          className="btn btn-link"
          onClick={() => {
            props.deleteRecord(props.record._id);
          }}
        >
          Delete
        </button>
      </td>
    </tr>
    <tr>
      <td></td>
      <td style={{ whiteSpace: "normal" }}>{props.record.position}</td>
      <td></td>
    </tr>
  </>
);

export default function RecordList() {
  const [records, setRecords] = useState([]);

  // This method fetches the records from the database.
  useEffect(() => {
    async function getRecords() {
      const response = await fetch(`http://localhost:5050/`);

      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const records = await response.json();
      setRecords(records);
    }

    getRecords();
  }, []);

  // This will delete a record
  async function deleteRecord(id) {
    await fetch(`http://localhost:5050/${id}`, {
      method: "DELETE",
    });

    const newRecords = records.filter((el) => el._id !== id);
    setRecords(newRecords);
  }

  // This following section will display blog posts with the name of their authors.
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <h3 >Blog Posts</h3>
      <table className="table table-striped" style={{ marginTop: 20 }}>
        <thead>
          <tr>
            <th>Title</th>
          </tr>
        </thead>
        <tbody>
          {records.map((record) => (
            <Record
              record={record}
              deleteRecord={() => deleteRecord(record._id)}
              key={record._id}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
