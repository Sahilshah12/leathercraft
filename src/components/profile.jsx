import React from 'react';
import { useNavigate } from 'react-router-dom';
import photo from '../assets/ssahil.jpg';

const Profile = () => {
    const navigate = useNavigate();

    const handleSignOut = () => {
        navigate('/dashboard');
    };

    return (
        <div 
            style={{ 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                height: '100vh', 
                backgroundColor: '#e9ecef', 
                fontFamily: "'Roboto', sans-serif" 
            }}
        >
            <div 
                className="profile" 
                style={{ 
                    textAlign: 'center', 
                    padding: '30px', 
                    backgroundColor: '#ffffff', 
                    borderRadius: '15px', 
                    boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)', 
                    maxWidth: '600px', 
                    width: '90%' 
                }}
            >
                <h1 style={{ color: '#343a40', marginBottom: '20px' }}>Profile Page</h1>
                <img 
                    src={photo}
                    alt="Profile" 
                    className="profile-image" 
                    style={{ 
                        borderRadius: '50%', 
                        width: '100%', 
                        maxWidth: '150px', 
                        height: 'auto', 
                        marginBottom: '15px', 
                        border: '3px solid #007BFF' 
                    }}
                />
                <h2 style={{ color: '#495057', marginBottom: '10px' }}>Sahil Shah</h2>
                <p style={{ color: '#6c757d', marginBottom: '5px' }}>Email: sahilshah8219@gmail.com</p>
                <p style={{ color: '#6c757d', marginBottom: '20px' }}>Location: punjab, India</p>
                <button 
                    onClick={handleSignOut} 
                    style={{ 
                        marginTop: '20px', 
                        padding: '12px 25px', 
                        backgroundColor: '#007BFF', 
                        color: '#ffffff', 
                        border: 'none', 
                        borderRadius: '5px', 
                        cursor: 'pointer', 
                        fontSize: '16px', 
                        transition: 'background-color 0.3s ease' 
                    }}
                    onMouseOver={(e) => e.target.style.backgroundColor = '#0056b3'}
                    onMouseOut={(e) => e.target.style.backgroundColor = '#007BFF'}
                >
                    Sign Out
                </button>
            </div>
        </div>
    );
};

export default Profile;