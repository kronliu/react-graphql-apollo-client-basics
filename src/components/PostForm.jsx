import { gql, useMutation } from "@apollo/client";
import { Button, Form } from "semantic-ui-react";
import { useForm } from "../common/hooks/useForm";

import { CREATE_POST_MUTATION } from "../gql/mutation";
import { POSTS_QUERY } from "../gql/queries";

export const PostForm = () => {
  const [createPost, { error }] = useMutation(CREATE_POST_MUTATION, {
    refetchQueries: [POSTS_QUERY],
  });

  const handleCreatePost = () => {
    createPost({ variables: values });
  };

  const { values, handleChange, handleSubmit } = useForm(handleCreatePost, {
    body: "",
  });

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <h2>Create a post:</h2>
        <Form.Field>
          <Form.Input
            name="body"
            onChange={handleChange}
            value={values.body}
            error={!!error}
          />
          <Button type="submit" color="teal">
            Submit
          </Button>
        </Form.Field>
      </Form>
      {error && (
        <div className="ui error message">
          <ul className="list">
            <li>{error.graphQLErrors[0].message}</li>
          </ul>
        </div>
      )}
    </>
  );
};
