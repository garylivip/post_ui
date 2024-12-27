import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const baseURL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:4000"
    : "http://101.132.187.152:4000";

function CreatePost() {
  const navigate = useNavigate();
  const initialValues = { title: "", postText: "", userName: "" };
  const validationSchema = Yup.object({
    title: Yup.string().required("You must input a Title!"),
    postText: Yup.string().required("Required"),
    userName: Yup.string().min(3).max(15).required("Required"),
  });
  const onSubmit = (values) => {
    axios
      .post(`${baseURL}/posts`, values)
      .then((response) => {
        navigate("/");
      })
      .catch((error) => {
        console.log("Error", error);
      });
  };

  return (
    <div className="createPostPage">
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className="formContainer">
          <label htmlFor="title">Title</label>
          <Field
            id="title"
            type="text"
            name="title"
            placeholder="(Ex. Title)"
          />
          <ErrorMessage name="title" component="span" />

          <label htmlFor="postText">Post</label>
          <Field
            id="postText"
            type="text"
            name="postText"
            placeholder="(Ex. Post)"
          />
          <ErrorMessage name="postText" component="span" />

          <label htmlFor="userName">User Name</label>
          <Field
            id="userName"
            type="text"
            name="userName"
            placeholder="(Ex. User Name)"
          />
          <ErrorMessage name="userName" component="span" />

          <button type="submit">Create Post</button>
        </Form>
      </Formik>
    </div>
  );
}

export default CreatePost;
