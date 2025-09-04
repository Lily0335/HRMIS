export default function Dashboard() {
  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Welcome to HRMIS Dashboard 🎉</h1>
      <p>You are successfully logged in.</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
