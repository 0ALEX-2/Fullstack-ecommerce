import React, { useState } from "react";
import Layout from "./../../components/Layout/Layout";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios"
import "../../styles/AuthStyles.css";

const initialState = {
  name: "",
  email: "",
  phone: "",
  address: "",
  password: "",
  answer:""
};
const Register = () => {
  const [formData, setFormData] = useState(initialState);

  const navigate=useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  //Form Submit Function
  const handleSubmit =async (e) => {
    e.preventDefault();
    setFormData({
      name:"",
      email:"",
      phone:"",
      address:"",
      password:"",
      answer:""
    })
   try {
    const res=await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/register`,{name,email,phone,address,password})
    if(res && res.data.success){
      toast.success(res.data.message)
      navigate("/login")
    }else{
      toast.error(res.data.message)
    }
   } catch (error) {
    console.log(error);
    toast.error("Something went wrong")
   }
  };

  const { name, email, phone, address, password,answer } = formData;

  return (
    <Layout title={"Registration-HutBajar"} style={{ minHeight: "90vh" }}>
      <div className="form-container">
        <h1>Registration Page</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              placeholder="Name"
              type="text"
              className="form-control"
              aria-describedby="emailHelp"
              name="name"
              value={name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <input
              placeholder="Email"
              type="email"
              className="form-control"
              aria-describedby="emailHelp"
              name="email"
              value={email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <input
              placeholder="Phone"
              type="text"
              className="form-control"
              aria-describedby="emailHelp"
              name="phone"
              value={phone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <input
              placeholder="Address"
              type="text"
              className="form-control"
              aria-describedby="emailHelp"
              name="address"
              value={address}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <input
              placeholder="Password"
              type="password"
              className="form-control"
              name="password"
              value={password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <input
              placeholder="What is your favorite food?"
              type="answer"
              className="form-control"
              name="answer"
              value={password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Register;
