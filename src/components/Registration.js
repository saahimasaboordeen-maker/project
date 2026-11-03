import React, { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc } from "firebase/firestore";

function Registration() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        setSuccessMessage('');

        // Name Validation
        if (name.trim().length < 3) {
            alert("Name must be at least 3 characters");
            return;
        }

        // Email Validation
        if (!email.includes("@")) {
            alert("Invalid email");
            return;
        }

        // Phone Validation
        if (!/^\d{10}$/.test(phone)) {
            alert("Phone must be 10 digits");
            return;
        }

        try {

            await addDoc(collection(db, "users"), {
                name: name,
                email: email,
                phone: phone,
                timestamp: new Date()
            });

            setSuccessMessage("Registration successful!");

            // Clear Form
            setName('');
            setEmail('');
            setPhone('');

        } catch (err) {

            console.error("Error adding document: ", err);
            alert("Error submitting form. Check console.");

        }
    };

    return (

        <div className="container mt-5">

            <h2>Register</h2>

            <form onSubmit={handleSubmit}>

                <div className="mb-3">
                    <label htmlFor="name">Name</label>

                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="form-control"
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="email">Email</label>

                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="form-control"
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="phone">Phone</label>

                    <input
                        type="text"
                        id="phone"
                        name="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="form-control"
                    />
                </div>

                <button type="submit" className="btn btn-success">
                    Submit
                </button>

            </form>

            {/* Success Message */}
            {successMessage && (
                <div className="alert alert-success mt-3" role="alert">
                    {successMessage}
                </div>
            )}

        </div>
    );
}

export default Registration;