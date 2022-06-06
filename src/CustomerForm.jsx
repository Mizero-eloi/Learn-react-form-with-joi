import { useState } from "react";

import Joi from "joi-browser";

function CustomerForm() {
  //   const title = useState("");
  //   const content = useState("");
  const [data, setData] = useState({
    title: "",
    content: "",
  });

  const [errors, setErrors] = useState({});

  const schema = {
    title: Joi.string().required(),
    content: Joi.string().required(),
  };

  function validate() {
    const result = Joi.validate(data, schema, {
      abortEarly: false,
    });

    if (!result.error) return null; // if error object is null

    const errors = {};
    // loop through details array
    for (let error of result.error.details) {
      // error.path[0] = input.name
      const key = error.path[0];
      const value = error.message;
      errors[key] = value;
    }

    console.log("Errors", errors);

    return errors;
  }

  function validateProperty({ name, value }) {
    const obj = { [name]: [value] };
    const subSchema = { [name]: schema.extract(name) };
    const { error } = Joi.validate(obj, subSchema);

    const errors = {};
    for (let err of error.details) {
      // error.path[0] = input.name
      const key = err.path[0];
      const value = err.message;
      errors[key] = value;
    }

    return errors;
  }

  //   console.log("Form errors", errors);

  function handleSubmit(e) {
    e.preventDefault();
    const errors = validate();
    setErrors(errors || {});
    if (errors) return; // Prevent form submitting

    console.log("Form submitted");
  }

  function handleChange(e) {
    const theData = { ...data };
    theData[e.currentTarget.name] = e.currentTarget.value;
    // const error = validateProperty(e.currentTarget);
    console.log("Property Error", error);
    setErrors(error || {});

    setData(theData);
  }

  console.log("The errors", errors.title);

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="title">Title</label>
      <input
        type="text"
        name="title"
        id="title"
        placehorder="Enter title"
        value={data.title}
        onChange={handleChange}
      />
      {/* {errors.title && <p>{errors.title}</p>} */}
      {errors.title && <p>{errors.message}</p>}

      <label htmlFor="content">Content</label>
      <input
        type="text"
        name="content"
        id="content"
        placehorder="Enter content"
        value={data.content}
        onChange={handleChange}
      />
      {errors.content && <p>{errors.content}</p>}

      <button type="submit">Submit</button>
    </form>
  );
}
export default CustomerForm;
