import { useState } from "react";
import { useMutation } from "@apollo/client";
import { Button, Confirm, Icon } from "semantic-ui-react";

import { DELETE_COMMENT_MUTATION, DELETE_POST_MUTATION } from "../gql/mutation";
import { POSTS_QUERY } from "../gql/queries";

export const DeleteButton = ({ postId, commentId }) => {
  const [confirmOpen, setConfirmOpen] = useState(false);

  const [deletePost] = useMutation(DELETE_POST_MUTATION, {
    refetchQueries: [POSTS_QUERY],
    update: () => {
      setConfirmOpen(false);
    },
  });

  const [deleteComment] = useMutation(DELETE_COMMENT_MUTATION);

  const handleDelete = () => {
    if (commentId) {
      deleteComment({
        variables: {
          postId,
          commentId,
        },
      });
    } else {
      deletePost({
        variables: {
          postId,
        },
      });
    }
  };

  return (
    <>
      <Button
        as="div"
        icon
        basic
        color="red"
        floated="right"
        onClick={() => setConfirmOpen(true)}
      >
        <Icon name="trash" />
      </Button>
      <Confirm
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={handleDelete}
      />
    </>
  );
};
