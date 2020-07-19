import React from "react";

const SignUpView = ({ handleChange, handleFormSubmit }) => {
  return (
    <>
      <section className="">
        <h1 className="admin-panel-title">Sign up</h1>
        <form className="user-form">
          <input
            type="text"
            placeholder="Fullname"
            name="fullname"
            onChange={handleChange}
          />
          <input
            type="text"
            name="username"
            onChange={handleChange}
            placeholder="Username"
          />
          <input
            type="text"
            name="email"
            onChange={handleChange}
            placeholder="Email"
          />
          <input
            type="password"
            name="password"
            onChange={handleChange}
            placeholder="Password"
          />
          <input
            type="password"
            name="confirmPassword"
            onChange={handleChange}
            placeholder="Confirm password"
          />
          <input
            type="button"
            className="primary-button"
            onClick={handleFormSubmit}
            value="Create Account"
          />
        </form>
      </section>
    </>
  );
};
export default SignUpView;
