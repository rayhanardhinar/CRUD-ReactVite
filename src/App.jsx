/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [userEdit, setUserEdit] = useState("");

  const API_URL = import.meta.env.VITE_API_URL;

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

    const response = await axios.post(API_URL, { name, email });
    setName("");
    setEmail("");
    getAllData();
  }

  //delete data
  async function deleteData(id) {
    const confirmDelete = window.confirm("Apakah anda yakin ingin mengahapus?");
    if (!confirmDelete) {
      return;
    }

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

    const response = await axios.put(`${API_URL}/${userEdit}`, { name, email });
    setName("");
    setEmail("");
    setUserEdit("");
    getAllData();
  }

  async function handleSubmit(e) {
    if (userEdit) {
      await updateData(e);
    } else {
      await addData(e);
    }
  }

  return (
    <div className="wrapper">
      <div className="header">
        <h3>{userEdit ? "Edit Pengguna" : "Tambah Pengguna"}</h3>
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
          <button type="submit">
            {userEdit ? "Update Pengguna" : "Tambah Pengguna"}
          </button>
        </form>
      </div>
      <div className="data-pengguna">
        <h3>Data Pengguna</h3>
        <table className="w-full border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 ">No</th>
              <th className="px-4 py-2">Nama</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user.id}>
                <td className="px-4 py-3 text-center">{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <div className="flex gap-2 justify-center items-center">
                    <a href="#" onClick={() => editData(user.id)}>
                      <i className="fa-solid fa-pen-to-square"></i>
                    </a>
                    <a href="#" onClick={() => deleteData(user.id)}>
                      <i className="fa-solid fa-trash"></i>
                    </a>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
