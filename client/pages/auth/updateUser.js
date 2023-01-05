import { useState, useEffect } from "react";
import Router from "next/router";
import useRequest from "../../hooks/use-request";

const UpdateInfo = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const { doRequest, errors } = useRequest({
    url: "/api/users/update",
    method: "patch",
    body: {
      name,
      age,
      phoneNumber,
    },
    onSuccess: () => Router.push("/"),
  });

  const onSubmit = async (event) => {
    event.preventDefault();

    await doRequest();
  };

  return (
    <form onSubmit={onSubmit}>
      <h1>Update Info</h1>
      <div className="form-group">
        <label>New Name</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label>New Age</label>
        <input
          value={age}
          onChange={(e) => setAge(e.target.value)}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <label>New Phone Number</label>
        <input
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          className="form-control"
        />
      </div>
      {errors}
      <button className="btn btn-primary">Update</button>
    </form>
  );
};

export default UpdateInfo;
