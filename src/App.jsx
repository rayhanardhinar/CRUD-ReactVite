import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [userEdit, setUserEdit] = useState("");

  const API_URL = "http://localhost:8000/person";

  useEffect(() => {
    getAllData();
  }, []);

  //display data
  async function getAllData() {
    const response = await axios.get(API_URL);
    setUsers(response.data);
  }

  //tambah data
  async function addData(e) {
    e.preventDefault();
    if (!name || !email) {
      return;
    }
    // eslint-disable-next-line no-unused-vars
    const response = await axios.post(API_URL, { name, email });
    setName("");
    setEmail("");
    getAllData();
  }

  //delete data
  async function deleteData(id) {
    const response = await axios.delete(`${API_URL}/${id}`);
    getAllData();
  }

  //edit data
  async function editData(id) {
    const response = await axios.get(`${API_URL}/${id}`);
    setName(response.data.name);
    setEmail(response.data.email);
    setUserEdit(id);
  }

  //update data
  async function updateData(e) {
    e.preventDefault();
    // eslint-disable-next-line no-unused-vars
    const response = await axios.put(`${API_URL}/${userEdit}`, { name, email });
    setName("");
    setEmail("");
    setUserEdit("");
    getAllData();
  }

  function handleSubmit(e) {
    if (userEdit) {
      updateData(e);
    } else {
      addData(e);
    }
  }

  return (
    <div className="wrapper">
      <div className="header">
        <h3>Tambah Pengguna</h3>
        <form className="input-box" type="submit" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Nama"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="submit">Simpan</button>
        </form>
      </div>
      <div className="data-pengguna">
        <h3>Data Pengguna</h3>
        <ul>
          {users.map((user) => (
            <li>
              <div>
                {user.name} <span className="email">({user.email})</span>
              </div>
              <div>
                <a href="#" onClick={() => editData(user.id)} className="edit">
                  Edit
                </a>{" "}
                -{" "}
                <a
                  href="#"
                  onClick={() => deleteData(user.id)}
                  type="submit"
                  className="delete"
                >
                  Delete
                </a>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
