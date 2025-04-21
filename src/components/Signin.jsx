import React, { useState } from 'react';

const Signin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (email === 'sahilshah8219@gmail.com' && password === '@Sahil123') {
            window.location.href = '/dashboard';
        } else {
            alert('Invalid credentials');
        }
    };

    return (
        <div
            className="signin-container"
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '100vh',
                padding: '20px',
                backgroundColor: '#f9f9f9',
            }}
        >
           
            <h2 style={{ marginBottom: '20px', textAlign: 'center' }}>Sign In</h2>
            <form
                onSubmit={handleSubmit}
                style={{
                    width: '100%',
                    maxWidth: '400px',
                    backgroundColor: '#fff',
                    padding: '20px',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                }}
            >
                <div className="form-group" style={{ marginBottom: '15px' }}>
                    <label
                        htmlFor="email"
                        style={{
                            display: 'block',
                            marginBottom: '5px',
                            fontWeight: 'bold',
                        }}
                    >
                        Email:
                    </label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        style={{
                            width: '100%',
                            padding: '10px',
                            borderRadius: '4px',
                            border: '1px solid #ccc',
                        }}
                    />
                </div>
                <div className="form-group" style={{ marginBottom: '15px' }}>
                    <label
                        htmlFor="password"
                        style={{
                            display: 'block',
                            marginBottom: '5px',
                            fontWeight: 'bold',
                        }}
                    >
                        Password:
                    </label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={{
                            width: '100%',
                            padding: '10px',
                            borderRadius: '4px',
                            border: '1px solid #ccc',
                        }}
                    />
                </div>
                <button
                    type="submit"
                    style={{
                        width: '100%',
                        padding: '10px',
                        backgroundColor: '#333',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                    }}
                >
                    Log In
                </button>
            </form>
        </div>
    );
};

export default Signin;