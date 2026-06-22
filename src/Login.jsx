import { useEffect, useState } from "react";
import { Card, CardContent, CardActions, Box } from "@mui/material";
import { TextField, Button, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";
import { auth } from "./firebase";
import { GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from "firebase/auth";
import { useSelector, useDispatch } from "react-redux";
import { login } from "./ReduxStore";
import "./Signup.css";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const user = useSelector((state) => state.user.data);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        dispatch(
          login({
            uid: currentUser.uid,
            name: currentUser.displayName,
            email: currentUser.email,
            photo: currentUser.photoURL,
          })
        );
        fetch(`/api/auth/firebase`, {
          method: "POST",
          credentials: "include",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({
            name: currentUser.displayName,
            email: currentUser.email,
            photo_url: currentUser.photoURL,
          }),
        })
          .then((data) => data.json())
          .then(console.log);
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (user) {
      console.log(user);
      window.location.assign("/");
    }
  }, [user]);

  const provider = new GoogleAuthProvider();
  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };

  const validate = () => {
    let newErrors = {};
    if (!form.email) newErrors.email = "Email is required";
    if (!form.password) newErrors.password = "Password is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      fetch(`/api/login`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          email: form.email,
          password: form.password,
        }),
      })
        .then((data) => data.json())
        .then((data) => {
          if (data.status === 200) {
            alert("Login Successful");
            dispatch(
              login({
                name:data.name,
                email: form.email,
              })
            );
          } else {
            alert("Invalid Credentials!");
          }
        });
    }
  };

  return (
    <Box className="signup-container">
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="signup-box">
        <Card className="signup-card">
          <CardContent className="signup-content">
            <Typography variant="h4" className="signup-title">Login</Typography>
            <form onSubmit={handleSubmit} className="signup-form">
              <TextField
                label="Email Address"
                variant="outlined"
                fullWidth
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                error={!!errors.email}
                helperText={errors.email}
                className="signup-input"
              />
              <TextField
                label="Password"
                type="password"
                variant="outlined"
                fullWidth
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                error={!!errors.password}
                helperText={errors.password}
                className="signup-input"
              />
              <CardActions className="signup-actions">
                <Button type="submit" variant="contained" color="primary" fullWidth size="large" className="signup-button">
                  Login
                </Button>
                <Typography className="signup-or">or</Typography>
                <Button onClick={signInWithGoogle} variant="outlined" fullWidth startIcon={<FcGoogle />} size="large" className="google-button">
                  Login with Google
                </Button>
                <span>Don't have an account? <a href="/Signup" className="text-bule-600 underline">Signup</a></span>
              </CardActions>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </Box>
  );
}
