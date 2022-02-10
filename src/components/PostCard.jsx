import { Card, Icon, Label, Image, Button } from "semantic-ui-react";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../common/context/auth";
import { LikeButton } from "./LikeButton";
import { DeleteButton } from "./DeleteButton";

export const PostCard = ({ post }) => {
  const { id, username, body, createdAt, comments, likes } = post;

  const { user } = useContext(AuthContext);
  const navigate = useNavigate({});

  const likePost = () => {};

  const commentOnPost = () => {};

  return (
    <Card fluid style={{ height: "225px" }}>
      <Card.Content>
        <Image
          floated="right"
          size="mini"
          src="https://react.semantic-ui.com/images/avatar/large/molly.png"
        />
        <Card.Header>{username}</Card.Header>
        <Card.Meta>{moment(createdAt).fromNow(true)}</Card.Meta>
        <Card.Description>{body}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <LikeButton id={id} likes={likes} />
        <Button as="div" labelPosition="right" style={{ marginLeft: "8px" }}>
          <Button basic color="blue" onClick={() => navigate(`/posts/${id}`)}>
            <Icon name="comments" />
          </Button>
          <Label basic color="blue" pointing="left">
            {comments.length}
          </Label>
        </Button>
        {user && user.username === username && <DeleteButton postId={id} />}
      </Card.Content>
    </Card>
  );
};
