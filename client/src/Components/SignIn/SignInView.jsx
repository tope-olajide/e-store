import React from "react";

const SignInView = ({handleChange, handleFormSubmit}) => {
 
  return (
    <>
      <section className="">
        <h1 className="admin-panel-title">Sign in</h1>
        <form className="user-form sign-in-form mt-2">
          <input
            type="text"
            placeholder="Username or Email"
            name="usernameOrEmail"
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            onChange={handleChange}
            placeholder="Password"
          />
          <section className="mt-3">
            <input type="button" onClick={handleFormSubmit} className="primary-button mt-2" value="Log in" />
          </section>
        </form>
      </section>
    </>
  );
};
export default SignInView;
