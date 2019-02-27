import React from "react";
import ReactDOM from "react-dom";
import { withFormik, Form, Field } from "formik";
//importing components from Formik
import * as Yup from "yup";
import "./styles.css";

function App({ values, errors, touched }) {
  // errors/ touched from Yup
  return (
    <Form className="container row"//formik form has implementaion onChange and submit method
    >
      <div className="col s6">
        {errors.email && touched.email && <p>{errors.email}</p>}
        <Field
          type="email"
          name="email"
          placeholder="Email"
          // value={values.email}
          // onChange={handleChange}
        />
      </div>
      <div  className="col s6">
        {touched.password && errors.password && <p>{errors.password}</p>}
        <Field
          type="password"
          name="password"
          placeholder="Password"
          //With field we can remove value for changes and hadler used for standard forms
          // value={values.password}
          // onChange={handleChange}
        />
      </div>
      <label>
        <Field type="checkbox" className="filled-in" name="newsletter" checked={values.newsletter} />
        <span>Join newsletter</span>
      </label>
      <div className="input-field col s12">

       
      <Field  className="input-field" component="select" name="plan">
         
        <option value="free">Free</option>
        <option value="premium">Premium</option>
       
      </Field>
     
      </div>
      <button className="btn  right" type="submit">Join </button>
    </Form>
  );
}

const FormikApp = withFormik({
  mapPropsToValues({ email, password, newsletter, plan }) {
    //Deconstructing props to values for Formik
    return {
      email: email || "",
      password: password || "",
      newsletter: newsletter || true,
      plan: plan || "free"
    };
  },
  validationSchema: Yup.object().shape({
    //validation provided by Yup
    email: Yup.string()
      .email("email valid required")
      .required(),
    password: Yup.string()
      .min(4)
      .required("Password is required")
  }),

  handleSubmit(values , { resetForm , setValues , setSubmit} ) {
      setTimeout(()=>{
            if (values.email === 'rav260@wp.pl'){
                let mail = values.email
                console.log(withFormik)
                setValues({email: mail + "that email is already taken"})
            }else {
                resetForm()
            }
            }, 1000)
    //actions / dispatch / functions place here fro submitting form
    console.log(values);
  }
})(App);

const rootElement = document.getElementById("root");
ReactDOM.render(<FormikApp email="" />, rootElement);
