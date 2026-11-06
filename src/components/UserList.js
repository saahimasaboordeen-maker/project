
import React, { useEffect, useState } from 'react';

import { db } from '../firebase';

import {
    collection,
    getDocs,
    doc,
    deleteDoc,
    updateDoc
} from 'firebase/firestore';

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

        } catch (err) {

            console.error(err);

            alert("Error updating user");

        }

    };


    return (

        <div className="container mt-5 mb-5">

            {/* Main Card */}

            <div className="card shadow p-4">

                <h2 className="text-center mb-4 text-primary">

                    Registered Users

                </h2>


               


                {/* Search Input */}

                <div className="mb-4">

                    <input

                        type="text"

                        placeholder="Search by name..."

                        className="form-control"

                        value={searchTerm}

                        onChange={(e) => setSearchTerm(e.target.value)}

                    />

                </div>


                {/* Update Form */}

                {editingUser && (

                    <div className="card shadow-sm p-4 mb-4 bg-light">

                        <h4 className="mb-3 text-primary">

                            Edit User Details

                        </h4>

                        <form onSubmit={handleUpdate}>

                            <div className="mb-3">

                                <label className="form-label">

                                    Full Name

                                </label>

                                <input

                                    type="text"

                                    className="form-control"

                                    placeholder="Enter name"

                                    value={name}

                                    onChange={(e) => setName(e.target.value)}

                                    required

                                />

                            </div>


                            <div className="mb-3">

                                <label className="form-label">

                                    Email Address

                                </label>

                                <input

                                    type="email"

                                    className="form-control"

                                    placeholder="Enter email"

                                    value={email}

                                    onChange={(e) => setEmail(e.target.value)}

                                    required

                                />

                            </div>


                            <div className="mb-3">

                                <label className="form-label">

                                    Phone Number

                                </label>

                                <input

                                    type="tel"

                                    className="form-control"

                                    placeholder="Enter phone number"

                                    value={phone}

                                    onChange={(e) => setPhone(e.target.value)}

                                    required

                                />

                            </div>


                            <button

                                type="submit"

                                className="btn btn-success me-2"

                            >

                                Update

                            </button>


                            <button

                                type="button"

                                className="btn btn-secondary"

                                onClick={() => {

                                    setEditingUser(null);

                                    setName("");

                                    setEmail("");

                                    setPhone("");

                                }}

                            >

                                Cancel

                            </button>

                        </form>

                    </div>

                )}


                {/* Users Table */}

                <div className="table-responsive">

                    <table className="table table-bordered table-hover table-striped align-middle">

                        <thead className="table-dark">

                            <tr>

                                <th

                                    onClick={() => sortBy("name")}

                                    style={{ cursor: "pointer" }}

                                >

                                    Name ↕ 

                                </th>


                                <th

                                    onClick={() => sortBy("email")}

                                    style={{ cursor: "pointer" }}

                                >

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

                                                className="btn btn-primary btn-sm me-2 mb-1"

                                                onClick={() => handleEdit(user)}

                                            >

                                                Edit

                                            </button>


                                            <button

                                                className="btn btn-danger btn-sm mb-1"

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

        </div>

    );

}

export default UserList;
