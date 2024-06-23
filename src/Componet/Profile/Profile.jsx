import { jwtDecode } from "jwt-decode";
import React, { useState } from "react";
import { useEffect } from "react";
import { TailSpin } from "react-loader-spinner";

export default function Profile() {
  const [name, setname] = useState(null);
  const [userId, setuserId] = useState(null);
  useEffect(function () {
    const x = jwtDecode(localStorage.getItem("token"));
    setname(x.name);
    setuserId(x.id);
  }, []);
  if (name === null) {
    return (
      <div className="vh-100 d-flex justify-content-center  align-items-center">
        <TailSpin
          height="80"
          width="80"
          color="#4fa94d"
          ariaLabel="tail-spin-loading"
          radius="1"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      </div>
    );
  } else {
  }
  return (
    <div className="container p-5">
      <h2 className="text-center">
        <span className="text-success">Welcome</span> {name}
      </h2>
    </div>
  );
}
