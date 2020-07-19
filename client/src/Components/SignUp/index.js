import React, { useState } from "react";
import useForm from "../CustomHooks/useForm";
import SignUpView from "./SignUpView";
import { useMutation } from "@apollo/react-hooks";
import { SIGNUP_MUTATION } from "../../mutations/auth";
import { Redirect } from "react-router";
const SignUp = () => {
  const { inputs, handleChange } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [signup, { loading, data, error }] = useMutation(SIGNUP_MUTATION);
  const handleFormSubmit = async () => {
    console.log(inputs);
    try {
      await signup({
        variables: inputs,
      });
    } catch (error) {
      console.log(error);
    }
  };
  if (data) {
    localStorage.setItem("token", data.signup.token);
    return <Redirect to="/" />;
  }
  return (
    <>
      <SignUpView
        handleFormSubmit={handleFormSubmit}
        handleChange={handleChange}
        isLoading={isLoading}
      />
    </>
  );
};
export default SignUp;
