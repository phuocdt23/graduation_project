import { useState, useEffect } from "react";
import Router from "next/router";
import useRequest from "../../hooks/use-request";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(null);
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const { doRequest, errors } = useRequest({
    url: "/api/users/signup",
    method: "post",
    body: {
      email,
      password,
      name,
      age,
      phoneNumber,
    },
    onSuccess: () => {
      setSuccess(
        <div className="alert alert-success">
          <h4>Create Account Successfully</h4>
        </div>)
      setEmail("");
      setPassword("");
      setName("");
      setAge("");
      setPhoneNumber("");
      setTimeout(() => { Router.push("/auth/signin") }, 5000);
    },
  });

  const onSubmit = async (event) => {
    event.preventDefault();

    await doRequest();
  };

  return (
    <form onSubmit={onSubmit}>
      <h1>Sign Up</h1>
      <div className="form-group">
        <label>Name</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label>Age</label>
        <input
          value={age}
          onChange={(e) => setAge(e.target.value)}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label>Phone Number</label>
        <input
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label>Email Address</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label>Password</label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          className="form-control"
        />
      </div>
      {errors}
      {success}
      <button className="btn btn-primary">Sign Up</button>
    </form>
  );
};

export default Signup;
