import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../api/api";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  // const [name, setName] = useState("");
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const key = e.target.name;
    const value = e.target.value;
    setFormData({ ...formData, [key]: value });
    console.log(formData);
  };

  const navigate = useNavigate();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log(e);

    if (formData["password"] !== formData["confirmPassword"]) {
      setError("Passwords do not match!");
      return;
    }

    const userData = {
      name: formData["name"],
      email: formData["email"],
      password: formData["password"],
    };

    console.log(userData);
    try {
      const response = await registerUser(userData);
      console.log(response);

      if (response.message !== null) {
        navigate("/");
      } else {
        setError(response.error);
      }
    } catch (e) {
      console.error(e);
      setError("An error occurred. Please try again later");
    }
  };

  return (
    <>
      <h1>Register</h1>
      <Form onSubmit={handleFormSubmit}>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            name="name"
            type="text"
            placeholder="Enter your name"
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            name="email"
            type="email"
            placeholder="Enter email"
            onChange={handleChange}
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
          <Form.Label>Confirm password</Form.Label>
          <Form.Control
            name="confirmPassword"
            type="password"
            placeholder="Password"
            onChange={handleChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
};

export default Register;
