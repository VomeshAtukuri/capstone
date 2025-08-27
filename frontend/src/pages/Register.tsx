import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import "@/styles/register.css";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [error, setError] = React.useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    console.log("Registration submitted:", { name, email, password });
    setError("");
    navigate("/feed");
  };

  const handleGithubSignUp = () => {
    console.log("GitHub sign up clicked");
    navigate("/feed");
  };

  return (
    <div className="register-container" style={{ overflow: "hidden"}}>
      <h2 className="register-title">Create Account</h2>

      <form onSubmit={handleSubmit} className="register-form">
        <div className="form-group">
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Enter your full name"
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Enter your email"
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Enter a password"
          />
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            placeholder="Confirm your password"
          />
        </div>

        {error && <p className="error-message">{error}</p>}

        <button type="submit" className="btn btn-primary">
          Sign Up
        </button>
      </form>

      <div className="separator">
        <span>or</span>
      </div>

      <button onClick={handleGithubSignUp} className="btn btn-github">
        Sign up with GitHub
      </button>

      <p className="login-link" style={{color: "black"}}>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
}
