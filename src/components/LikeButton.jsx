import { useMutation } from "@apollo/client";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Icon, Label, Button } from "semantic-ui-react";
import { AuthContext } from "../common/context/auth";
import { LIKE_POST_MUTATION } from "../gql/mutation";

export const LikeButton = ({ id, likes }) => {
  const [liked, setLiked] = useState(false);

  const navigate = useNavigate();

  const { user } = useContext(AuthContext);

  const [likePost] = useMutation(LIKE_POST_MUTATION);

  const handleLikePost = () => {
    if (!user) {
      navigate("/");
    } else {
      likePost({
        variables: {
          postId: id,
        },
      });
    }
  };

  useEffect(() => {
    if (user && likes.find((like) => like.username === user.username)) {
      setLiked(true);
    } else {
      setLiked(false);
    }
  }, [user, likes]);

  return (
    <Button as="div" labelPosition="right">
      <Button color="teal" basic={!liked} onClick={handleLikePost}>
        <Icon name="heart" />
      </Button>
      <Label basic color="teal" pointing="left">
        {likes.length}
      </Label>
    </Button>
  );
};
