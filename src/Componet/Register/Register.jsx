import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { FallingLines } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [errorMsg, seterrorMsg] = useState(null);
  const [succsesMsg, setsuccsesMsg] = useState(null);
  const navigate = useNavigate();
  const [Isloading, setIsloading] = useState(false);
  async function registerNewuser(values) {
    setIsloading(true);
    try {
      const { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signup",
        values
      );
      if (data.message === "success") {
        //احوله لصفحه الدخول واظهرله رساله تم التسجيل
        setsuccsesMsg(data.message);
        setTimeout(() => {
          navigate("/Login");
        }, 1000);
      }
    } catch (err) {
      seterrorMsg(err.response.data.message);
    }
    setIsloading(false);
  }
  let user = {
    name: "",
    email: "",
    password: "",
    rePassword: "",
    phone: "",
  };
  let formikOpj = useFormik({
    initialValues: user,
    onSubmit: registerNewuser,
    validate: function (values) {
      const errors = {};

      if (values.name.length < 4 || values.name.length > 20) {
        errors.name = "name must be from 4 char to 20 char";
      }
      if (
        values.email.includes("@") === false ||
        values.email.includes(".") === false
      ) {
        errors.email = "email does not valid";
      }
      if (values.password.length < 6 || values.password.length > 12) {
        errors.password = "password must be from 4 char to 12 char";
      }
      if (values.rePassword !== values.password) {
        errors.rePassword = "repassword must match password";
      }
      if (!values.phone.match(/^01[0125][0-9]{8}$/)) {
        errors.phone = "phone is invalid";
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

        <h2>Register Now</h2>
        <form onSubmit={formikOpj.handleSubmit}>
          <label htmlFor="name">name</label>
          <input
            onBlur={formikOpj.handleBlur}
            onChange={formikOpj.handleChange}
            value={formikOpj.values.name}
            type="text"
            id="name"
            className="form-control mb-3"
            name="name"
          />
          {formikOpj.errors.name && formikOpj.touched.name ? (
            <div className="alert alert-danger">{formikOpj.errors.name}</div>
          ) : (
            ""
          )}
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
          <label htmlFor="rePassword">rePassword</label>
          <input
            name="rePassword"
            onBlur={formikOpj.handleBlur}
            onChange={formikOpj.handleChange}
            value={formikOpj.values.rePassword}
            type="password"
            id="rePassword"
            className="form-control mb-3"
          />
          {formikOpj.errors.rePassword && formikOpj.touched.rePassword ? (
            <div className="alert alert-danger">
              {formikOpj.errors.rePassword}
            </div>
          ) : (
            ""
          )}
          <label htmlFor="phone">phone</label>
          <input
            onBlur={formikOpj.handleBlur}
            onChange={formikOpj.handleChange}
            value={formikOpj.values.phone}
            type="tel"
            id="phone"
            className="form-control mb-3"
            name="phone"
          />
          {formikOpj.errors.phone && formikOpj.touched.phone ? (
            <div className="alert alert-danger">{formikOpj.errors.phone}</div>
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
