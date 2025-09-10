// // // // src/context/AuthContext.js
// // // import React, { createContext, useEffect, useState } from "react";
// // // import API from "../api/axios";

// // // export const AuthContext = createContext();

// // // export function AuthProvider({ children }) {
// // //   const [profile, setProfile] = useState(null);
// // //   const [loadingProfile, setLoadingProfile] = useState(true);

// // //   useEffect(() => {
// // //     const token = localStorage.getItem("token");
// // //     if (!token) {
// // //       setProfile(null);
// // //       setLoadingProfile(false);
// // //       return;
// // //     }

// // //     const fetchProfile = async () => {
// // //       try {
// // //         const res = await API.get("/users/profile");
// // //         // Expecting backend returns { id, name, email, role, ... }
// // //         setProfile(res.data);
// // //       } catch (err) {
// // //         console.error("Failed fetching profile", err);
// // //         // token might be invalid -> clear
// // //         localStorage.removeItem("token");
// // //         setProfile(null);
// // //       } finally {
// // //         setLoadingProfile(false);
// // //       }
// // //     };

// // //     fetchProfile();
// // //   }, []);

// // //   return (
// // // //     <AuthContext.Provider value={{ profile, setProfile, loadingProfile }}>
// // // //       {children}
// // // //     </AuthContext.Provider>
// // // //   );
// // // // }
// // // import { createContext, useState, useEffect } from "react";

// // // export const AuthContext = createContext();

// // // export function AuthProvider({ children }) {
// // //   const [user, setUser] = useState(null);

// // //   useEffect(() => {
// // //     const storedUser = localStorage.getItem("user");
// // //     if (storedUser) {
// // //       setUser(JSON.parse(storedUser));
// // //     }
// // //   }, []);

// // //   const login = (userData, token) => {
// // //     localStorage.setItem("token", token);
// // //     localStorage.setItem("user", JSON.stringify(userData));
// // //     setUser(userData);
// // //   };

// // //   const logout = () => {
// // //     localStorage.removeItem("token");
// // //     localStorage.removeItem("user");
// // //     setUser(null);
// // //   };

// // //   return (
// // //     <AuthContext.Provider value={{ user, login, logout }}>
// // //       {children}
// // //     </AuthContext.Provider>
// // //   );
// // // }
// // import React, { createContext, useState, useEffect } from "react";
// // import API from "../api/axios";
// // import { useNavigate } from "react-router-dom";

// // export const AuthContext = createContext();

// // export function AuthProvider({ children }) {
// //   const [user, setUser] = useState(null);
// //   const [loading, setLoading] = useState(true);
// //   const navigate = useNavigate();

// //   useEffect(() => {
// //     const init = async () => {
// //       const token = localStorage.getItem("token");
// //       if (!token) {
// //         setLoading(false);
// //         return;
// //       }
// //       try {
// //         const res = await API.get("/users/profile");
// //         setUser(res.data);
// //       } catch (err) {
// //         console.error("Auth init error", err);
// //         localStorage.removeItem("token");
// //       } finally {
// //         setLoading(false);
// //       }
// //     };
// //     init();
// //   }, []);

// //   const login = async (email, password) => {
// //     const res = await API.post("/auth/login", { email, password });
// //     // expecting token in res.data.token or res.data.access_token depending on backend
// //     const token =
// //       res.data?.token || res.data?.access_token || res.data?.accessToken;
// //     if (!token) throw new Error("Token not found in login response");
// //     localStorage.setItem("token", token);
// //     const profile = await API.get("/users/profile");
// //     setUser(profile.data);
// //     return profile.data;
// //   };

// //   const logout = async () => {
// //     try {
// //       await API.post("/auth/logout");
// //     } catch (e) {
// //       // ignore
// //     }
// //     localStorage.removeItem("token");
// //     setUser(null);
// //     navigate("/login");
// //   };

// //   return (
// //     <AuthContext.Provider
// //       value={{ user, setUser, login, logout, loading }}
// //     ></AuthContext.Provider>
// //   );
// // }
// import { createContext, useState, useEffect } from "react";

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [auth, setAuth] = useState({ token: null, user: null });

//   useEffect(() => {
//     const stored = localStorage.getItem("auth");
//     if (stored) {
//       setAuth(JSON.parse(stored));
//     }
//   }, []);

//   return (
//     <AuthContext.Provider value={{ auth, setAuth }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };