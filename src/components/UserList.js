
import React, { useEffect, useState } from 'react';

import { db } from '../firebase';

import { collection, getDocs, doc, deleteDoc, updateDoc } from 'firebase/firestore';

function UserList() {

const [users, setUsers] = useState([]);

const [searchTerm, setSearchTerm] = useState("");

const [editingUser, setEditingUser] = useState(null);

const [name, setName] = useState("");

const [email, setEmail] = useState("");

const [phone, setPhone] = useState("");

// Fetch Data from Firebase
useEffect(() => {

    const fetchUsers = async () => {

        try {

            const querySnapshot = await getDocs(collection(db, "users"));

            const userData = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));

            setUsers(userData);

        } catch (error) {

            console.error("Error fetching users:", error);

        }

    };

    fetchUsers();

}, []);

// Search Functionality
const filteredUsers = users.filter(user =>
    (user.name || "").toLowerCase().includes(searchTerm.toLowerCase())
);

// Sorting Functionality
const sortBy = (key) => {

    const sorted = [...users].sort((a, b) => {

        const valueA = (a[key] || "").toLowerCase();
        const valueB = (b[key] || "").toLowerCase();

        return valueA.localeCompare(valueB);

    });

    setUsers(sorted);

};

// Delete Functionality
const handleDelete = async (id) => {

    if (window.confirm("Are you sure you want to delete this user?")) {

        try {

            await deleteDoc(doc(db, "users", id));

            setUsers(users.filter(user => user.id !== id));

            alert("User deleted successfully!");

        } catch (err) {

            console.error(err);

            alert("Error deleting user");

        }

    }

};

// Edit Functionality
const handleEdit = (user) => {

    setEditingUser(user);

    setName(user.name);

    setEmail(user.email);

    setPhone(user.phone);

};

// Update Functionality
const handleUpdate = async (e) => {

    e.preventDefault();

    try {

        const userRef = doc(db, "users", editingUser.id);

        await updateDoc(userRef, {
            name,
            email,
            phone
        });

        setUsers(users.map(u =>
            u.id === editingUser.id
                ? { ...u, name, email, phone }
                : u
        ));

        setEditingUser(null);

        setName("");

        setEmail("");

        setPhone("");

        alert("User updated successfully!");

    } catch(err) {

        console.error(err);

        alert("Error updating user");

    }

};

return (

    <div className="container mt-5">

        <h2 className="text-center mb-4">
            Registered Users
        </h2>

        {/* Search Input */}

        <input
            type="text"
            placeholder="Search by name"
            className="form-control mb-3"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
        />

        {/* Update Form */}

        {editingUser && (

            <form onSubmit={handleUpdate} className="mb-4">

                <h4>Edit User</h4>

                <input
                    type="text"
                    className="form-control mb-2"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <input
                    type="email"
                    className="form-control mb-2"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="text"
                    className="form-control mb-2"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                />

                <button type="submit" className="btn btn-success me-2">
                    Update
                </button>

                <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setEditingUser(null)}
                >
                    Cancel
                </button>

            </form>

        )}

        {/* Users Table */}

        <div className="table-responsive">

            <table className="table table-bordered table-hover table-striped">

                <thead className="table-dark">

                    <tr>

                        <th onClick={() => sortBy("name")} style={{ cursor: "pointer" }}>
                            Name ↕
                        </th>

                        <th onClick={() => sortBy("email")} style={{ cursor: "pointer" }}>
                            Email ↕
                        </th>

                        <th>
                            Phone
                        </th>

                        <th>
                            Action
                        </th>

                    </tr>

                </thead>

                <tbody>

                    {filteredUsers.length > 0 ? (

                        filteredUsers.map(user => (

                            <tr key={user.id}>

                                <td>{user.name}</td>

                                <td>{user.email}</td>

                                <td>{user.phone}</td>

                                <td>

                                    <button
                                        className="btn btn-primary btn-sm me-2"
                                        onClick={() => handleEdit(user)}
                                    >
                                        Edit
                                    </button>

                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => handleDelete(user.id)}
                                    >
                                        Delete
                                    </button>

                                </td>

                            </tr>

                        ))

                    ) : (

                        <tr>

                            <td colSpan="4" className="text-center">
                                No users found
                            </td>

                        </tr>

                    )}

                </tbody>

            </table>

        </div>

    </div>

);

}

export default UserList;
