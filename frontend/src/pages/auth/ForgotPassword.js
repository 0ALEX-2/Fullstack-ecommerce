import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate} from "react-router-dom";
import "../../styles/AuthStyles.css";


const initialData = {
  email: "",
  newPassword: "",
  answer: "",
};
const ForgotPassword = () => {
  const [data, setData] = useState(initialData);
  const navigate = useNavigate();
  const handleChange = (e) => {
    let { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/forgot-password`,
        data
      );

      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    }

    setData({
      email: "",
      newPassword: "",
      answer: "",
    });
  };

  const { email, newPassword, answer } = data;
  return (
    <Layout title={"Register - Ecommerce app"}>
      <div className="form-container" style={{ minHeight: "90vh" }}>
        <h1 className="title">Reset Password</h1>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail"
              placeholder="Enter your email"
              name="email"
              value={email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="New Password"
              name="newPassword"
              value={newPassword}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="What is your favorite place?"
              name="answer"
              value={answer}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Reset
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default ForgotPassword;
