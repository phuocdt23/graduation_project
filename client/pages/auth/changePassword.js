import { useState, useEffect } from "react";
import Router from "next/router";
import useRequest from "../../hooks/use-request";

const ChangePassword = () => {
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const { doRequest, errors } = useRequest({
    url: "/api/users/changePassword",
    method: "patch",
    body: {
      password,
      newPassword,
    },
    onSuccess: () => Router.push("/"),
  });

  const onSubmit = async (event) => {
    event.preventDefault();

    await doRequest();
  };

  return (
    <form onSubmit={onSubmit}>
      <h1>Change Password</h1>
      <div className="form-group">
        <label>Current Password</label>
        <input
          value={password}
          type='password'
          onChange={(e) => setPassword(e.target.value)}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label>New Password</label>
        <input
          value={newPassword}
          type='password'
          onChange={(e) => setNewPassword(e.target.value)}
          className="form-control"
        />
      </div>
      {errors}
      <button className="btn btn-primary">Change</button>
    </form>
  );
};

export default ChangePassword;
