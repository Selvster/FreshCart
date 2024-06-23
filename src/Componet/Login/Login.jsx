import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useContext } from "react";
import { FallingLines } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import { authcontext } from "../../contexts/authContext";

export default function Login() {
  const { setToken } = useContext(authcontext);
  const [errorMsg, seterrorMsg] = useState(null);
  const [succsesMsg, setsuccsesMsg] = useState(null);
  const navigate = useNavigate();
  const [Isloading, setIsloading] = useState(false);
  async function loginNewuser(values) {
    setIsloading(true);
    try {
      const { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signin",
        values
      );
      if (data.message === "success") {
        localStorage.setItem("token", data.token);
        //احوله لصفحه الدخول واظهرله رساله تم التسجيل
        setToken(data.token);
        setsuccsesMsg(data.message);
        setTimeout(() => {
          navigate("/Products");
        }, 1000);
      }
    } catch (err) {
      seterrorMsg(err.response.data.message);
    }
    setIsloading(false);
  }
  let user = {
    email: "",
    password: "",
  };
  let formikOpj = useFormik({
    initialValues: user,
    onSubmit: loginNewuser,
    validate: function (values) {
      const errors = {};

      if (
        values.email.includes("@") === false ||
        values.email.includes(".") === false
      ) {
        errors.email = "email does not valid";
      }
      if (values.password.length < 6 || values.password.length > 12) {
        errors.password = "password must be from 4 char to 12 char";
      }

      seterrorMsg(null);
      setsuccsesMsg(null);
      return errors;
    },
  });

  return (
    <>
      <div className="container w-75 py-4">
        {errorMsg ? <div className="alert alert-danger"> {errorMsg}</div> : ""}
        {succsesMsg ? (
          <div className="alert alert-success">{succsesMsg}</div>
        ) : (
          ""
        )}

        <h2>Login :</h2>
        <form onSubmit={formikOpj.handleSubmit}>
          <label htmlFor="email">email</label>
          <input
            onBlur={formikOpj.handleBlur}
            onChange={formikOpj.handleChange}
            value={formikOpj.values.email}
            type="email"
            id="email"
            className="form-control mb-3"
            name="email"
          />
          {formikOpj.errors.email && formikOpj.touched.email ? (
            <div className="alert alert-danger">{formikOpj.errors.email}</div>
          ) : (
            ""
          )}
          <label htmlFor="password">password</label>
          <input
            onBlur={formikOpj.handleBlur}
            onChange={formikOpj.handleChange}
            value={formikOpj.values.password}
            type="password"
            id="password"
            name="password"
            className="form-control mb-3"
          />
          {formikOpj.errors.password && formikOpj.touched.password ? (
            <div className="alert alert-danger">
              {formikOpj.errors.password}
            </div>
          ) : (
            ""
          )}

          <button
            className="btn btn-success"
            type="submit"
            disabled={formikOpj.isValid == false || formikOpj.dirty == false}
          >
            {Isloading ? (
              <FallingLines
                color="#4fa94d"
                width="50"
                visible={true}
                ariaLabel="falling-lines-loading"
              />
            ) : (
              "Register"
            )}
          </button>
        </form>
      </div>
    </>
  );
}
