import React, { useEffect, useState } from 'react';

import { db } from '../firebase';

import { collection, getDocs } from 'firebase/firestore';

function UserList() {

const [users, setUsers] = useState([]);

const [searchTerm, setSearchTerm] = useState("");

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

                    </tr>

                </thead>

                <tbody>

                    {filteredUsers.length > 0 ? (

                        filteredUsers.map(user => (

                            <tr key={user.id}>

                                <td>{user.name}</td>

                                <td>{user.email}</td>

                                <td>{user.phone}</td>

                            </tr>

                        ))

                    ) : (

                        <tr>

                            <td colSpan="3" className="text-center">
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
