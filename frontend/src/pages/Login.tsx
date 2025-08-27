import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import "@/styles/login.css";

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login form submitted:", { email, password });
    navigate("/products");
  };

  const handleGithubSignIn = () => {
    console.log("GitHub sign in clicked");
    navigate("/feed");
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Login</h2>

      <form onSubmit={handleSubmit} className="login-form">
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
            placeholder="Enter your password"
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>

      <div className="separator">
        <span>or</span>
      </div>

      <button onClick={handleGithubSignIn} className="btn btn-github">
        Sign in with GitHub
      </button>

      <p className="register-link" style={{color: "black"}}>
        Don’t have an account? <Link to="/register">Sign up</Link>
      </p>
    </div>
  );
}
