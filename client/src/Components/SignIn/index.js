import React from "react";
import { Redirect } from "react-router";
import SignInView from "./SignInView";
import { LOGIN_MUTATION } from "../../mutations/auth";
import { useMutation } from "@apollo/react-hooks";
import useForm from "../CustomHooks/useForm";
const SignIn = () => {
  const { inputs, handleChange } = useForm();
  const [signin, { loading, data, error }] = useMutation(LOGIN_MUTATION);
  const handleFormSubmit = async () => {
    console.log(inputs);
    try {
      await signin({
        variables: inputs,
      });
    } catch (error) {
      console.log(error);
    }
  };
  if (data) {
    localStorage.setItem("token", data.signin.token);
    return <Redirect to="/" />;
  }
  return (
    <>
      <SignInView
        handleFormSubmit={handleFormSubmit}
        handleChange={handleChange}
      />
    </>
  );
};
export default SignIn;
