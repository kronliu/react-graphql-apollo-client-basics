import { useState, useContext } from "react";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { Button, Container, Form } from "semantic-ui-react";

import { useForm } from "../common/hooks/useForm";
import { AuthContext } from "../common/context/auth";
import { LOGIN_MUTATION } from "../gql/mutation";

export const Login = () => {
  const context = useContext(AuthContext);
  const navigate = useNavigate();

  const [errors, setErrors] = useState({});

  const [login, { loading }] = useMutation(LOGIN_MUTATION, {
    update: (_, { data: { login: userData } }) => {
      context.login(userData);
      navigate("/");
    },
    onError: (err) => {
      setErrors(err.graphQLErrors[0].extensions.errors);
    },
  });

  const handleLogin = () => {
    login({
      variables: {
        loginInput: {
          ...values,
        },
      },
    });
  };

  const { handleChange, handleSubmit, values } = useForm(handleLogin, {
    username: "",
    password: "",
  });

  return (
    <Container
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "30px",
      }}
    >
      <div style={{ width: "400px" }}>
        {loading ? (
          <h3>Loading....</h3>
        ) : (
          <Form onSubmit={handleSubmit} noValidate>
            <h1>Login</h1>
            <Form.Input
              label="Username"
              name="username"
              value={values.username}
              error={errors.username ? true : false}
              onChange={handleChange}
            />
            <Form.Input
              type="password"
              label="Password"
              name="password"
              value={values.password}
              error={errors.password ? true : false}
              onChange={handleChange}
            />
            <Button type="submit" primary style={{ margin: "5px 0" }}>
              Login
            </Button>
          </Form>
        )}
        {Object.keys(errors).length > 0 && (
          <div className="ui error message" style={{ width: "100%" }}>
            <ul className="list">
              {Object.values(errors).map((value) => (
                <li key={value}>{value}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </Container>
  );
};
