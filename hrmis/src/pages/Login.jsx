// import { useState } from 'react';
// import { login } from '../services/authservice';
// import './Login.css';

// export default function Login() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     setError('');
// //     setLoading(true);

// //     try {
// //       await login(email, password);
// //       // Agar login ho gaya, redirect karo
// //       window.location.href = '/dashboard';
// //     } catch (err) {
// //       setError(err.message);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };
// const handleSubmit = async (e) => {
//   e.preventDefault();
//   setError('');
//   setLoading(true);

//   // ✅ FAKE LOGIN START — Yahan se shuru
//   setTimeout(() => {
//     // Fake token (koi bhi string)
//     localStorage.setItem('accessToken', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.fake.token');

//     // Role choose karo: 'admin', 'manager', ya 'user'
//     localStorage.setItem('userRole', 'admin');

//     // Optional: Name bhi save karo
//     localStorage.setItem('userName', 'Ali Raza');

//     // Redirect to dashboard
//     window.location.href = '/dashboard';
//   }, 800); // 0.8 second delay (jaise real API ho)
//   // ✅ FAKE LOGIN END — Yahan tak
// };

//   return (
//     <div className="login-container">
//       <form className="login-form" onSubmit={handleSubmit}>
//         <h2 className="login-title">HRMS Login</h2>
//         <p className="login-subtitle">Sign in to your account</p>

//         {error && <div className="error-message">{error}</div>}

//         <div className="form-group">
//           <label>Email</label>
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             placeholder="Enter your email"
//             disabled={loading}
//           />
//         </div>

//         <div className="form-group">
//           <label>Password</label>
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             placeholder="Enter your password"
//             disabled={loading}
//           />
//         </div>

//         <button type="submit" className="login-btn" disabled={loading}>
//           {loading ? 'Logging in...' : 'Login'}
//         </button>
//       </form>
//     </div>
//   );
// }
// src/components/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    setLoading(true);

    // Fake role-based login (aap baad mein API se replace karna)
    setTimeout(() => {
      if (email === 'user@company.com') {
        localStorage.setItem('token', 'fake-jwt');
        localStorage.setItem('role', 'employee');
        navigate('/user');
      } else if (email === 'manager@company.com') {
        localStorage.setItem('token', 'fake-jwt');
        localStorage.setItem('role', 'manager');
        navigate('/manager');
      } else if (email === 'admin@company.com') {
        localStorage.setItem('token', 'fake-jwt');
        localStorage.setItem('role', 'admin');
        navigate('/admin');
      } else {
        alert("Invalid credentials");
      }
      setLoading(false);
    }, 800);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-brand">
          <h1>HRMIS</h1>
          <p>Human Resource Management Information System</p>
        </div>

        <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoFocus
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
