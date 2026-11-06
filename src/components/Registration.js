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

            setName('');
            setEmail('');
            setPhone('');

        } catch (err) {

            console.error("Error adding document: ", err);
            alert("Error submitting form. Check console.");

        }
    };

    return (

        <div className="container mt-5 mb-5">

            <div className="row justify-content-center">

                <div className="col-12 col-md-8 col-lg-6">

                    <div className="card shadow p-4">

                        <h2 className="text-center mb-4">
                            User Registration
                        </h2>

                        <form onSubmit={handleSubmit}>

                            {/* Name */}
                            <div className="mb-3">

                                <label htmlFor="name" className="form-label">
                                    Full Name
                                </label>

                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    placeholder="Enter your full name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="form-control"
                                    required
                                    minLength="3"
                                />

                            </div>

                            {/* Email */}
                            <div className="mb-3">

                                <label htmlFor="email" className="form-label">
                                    Email Address
                                </label>

                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    placeholder="example@gmail.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="form-control"
                                    required
                                />

                            </div>

                            {/* Phone */}
                            <div className="mb-3">

                                <label htmlFor="phone" className="form-label">
                                    Phone Number
                                </label>

                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    placeholder="Enter 10 digit phone number"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    className="form-control"
                                    maxLength="10"
                                    inputMode="numeric"
                                    required
                                />

                            </div>

                            {/* Submit Button */}
                            <div className="d-grid">

                                <button
                                    type="submit"
                                    className="btn btn-success btn-lg"
                                >
                                    Register
                                </button>

                            </div>

                        </form>

                        {/* Success Message */}
                        {successMessage && (

                            <div className="alert alert-success mt-3" role="alert">
                                {successMessage}
                            </div>

                        )}

                    </div>

                </div>

            </div>

        </div>

    );
}

export default Registration;