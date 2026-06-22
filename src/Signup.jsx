import { useEffect, useState } from "react";
import { Card, CardContent, CardActions, Box } from "@mui/material";
import { TextField, Button, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";
import { auth } from "./firebase";
import {GoogleAuthProvider , signInWithPopup , onAuthStateChanged } from "firebase/auth";
import { useSelector, useDispatch } from "react-redux";
import { login } from "./ReduxStore";
import "./Signup.css";

export default function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState({});
  const user=useSelector((state)=>state.user.data);
  const dispatch=useDispatch();
  useEffect(()=>{
   const unsubscribe=onAuthStateChanged(auth,(currentUser)=>{
    if (!currentUser) {
      console.log("No user logged in");
      return; 
    }
        dispatch(login({
          uid: currentUser.uid,
          name: currentUser.displayName,
          email: currentUser.email,
          photo: currentUser.photoURL
        }));
        fetch(`/api/auth/firebase`,
          {
            method:"POST",
            credentials:"include",
            headers:{"Content-type":"application/json"},
            body:JSON.stringify(
              {
                name:currentUser.displayName,
                email:currentUser.email,
                photo_url:currentUser.photoURL
              }
            )
          }
        ) 
        .then(data=>data.json())
        .then(console.log(data));
   })
   return ()=>{unsubscribe();}
  },[])
  useEffect(()=>{
       if(user){
        console.log(user);
        window.location.assign("/");
       }
  },[user])
const provider = new GoogleAuthProvider();
const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    
  } catch (error) {
    console.error("Error signing in:", error);
  }
};

  const validate = () => {
    let newErrors = {};
    if (!form.name) newErrors.name = "Name is required";
    if (!form.email.includes("@")) newErrors.email = "Valid email is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
   
    if (validate()) {
      fetch(`/api/auth/local`,
        {
        method:"POST",
        credentials:"include",
        headers:{"Content-type":"application/json"},
        body:JSON.stringify({
          name:form.name,
          email:form.email,
          password:form.password
        })
        }

      )
      .then((data)=>data.json())
      .then((data)=>{
          if(data.status==200){
            alert("Signup Successful");
            dispatch(login({
              
              name: form.name,
              email:form.name,
              
            }));
          }
          else if(data.error_code==23505){
            alert("This Email is Already Registered!");
          }
      })
      
    }
  };

  return (
    <Box className="signup-container">
      <motion.div 
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }} 
        className="signup-box">
        <Card className="signup-card">
          <CardContent className="signup-content">
            <Typography variant="h4" className="signup-title">Sign Up</Typography>
            <form onSubmit={handleSubmit} className="signup-form">
              <TextField 
                label="Full Name"
                variant="outlined"
                fullWidth
                value={form.name} 
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                error={!!errors.name}
                helperText={errors.name}
                className="signup-input"
              />
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
                  Sign Up
                </Button>
                <Typography className="signup-or">or</Typography>
                <Button onClick={signInWithGoogle} variant="outlined" fullWidth startIcon={<FcGoogle />} size="large" className="google-button">
                  Sign Up with Google
                </Button>
                <span>Already Have an account? <a href="/login" className="text-bule-600 underline">Login</a></span>
              </CardActions>
              
            </form>
            
          </CardContent>
        </Card>
      </motion.div>
    </Box>
  );
}