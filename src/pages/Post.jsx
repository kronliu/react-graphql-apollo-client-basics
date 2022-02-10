import { useContext, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import {
  Container,
  Grid,
  Image,
  Card,
  CardDescription,
} from "semantic-ui-react";
import moment from "moment";

import { LikeButton } from "../components/LikeButton";
import { POST_QUERY } from "../gql/queries";
import { CREATE_COMMENT_MUTATION } from "../gql/mutation";
import { DeleteButton } from "../components/DeleteButton";
import { AuthContext } from "../common/context/auth";

export const Post = () => {
  const params = useParams();
  const { postId } = params;

  const [body, setBody] = useState("");

  const { user } = useContext(AuthContext);

  const {
    data,
    loading,
    refetch: refetchPost,
  } = useQuery(POST_QUERY, {
    variables: { postId },
  });

  const [createComment] = useMutation(CREATE_COMMENT_MUTATION, {
    update: () => refetchPost(),
  });

  const handleCreateComment = () => {
    createComment({
      variables: {
        postId,
        body,
      },
    });
  };

  return (
    <Container
      style={{
        padding: "30px",
      }}
    >
      {loading && <h2>Loading ...</h2>}
      {data?.post && (
        <Grid>
          <Grid.Row>
            <Grid.Column width={2}>
              <Image
                src="https://react.semantic-ui.com/images/avatar/large/molly.png"
                size="small"
                floated="right"
              />
            </Grid.Column>
            <Grid.Column width={14}>
              <Card fluid>
                <Card.Content>
                  <Card.Header>{data.post.username}</Card.Header>
                  <Card.Meta>
                    {moment(data.post.createdAt).fromNow(true)}
                  </Card.Meta>
                  <Card.Description>{data.post.body}</Card.Description>
                </Card.Content>
                <Card.Content extra>
                  <LikeButton id={data.post.id} likes={data.post.likes} />
                </Card.Content>
              </Card>
              <Card fluid>
                <div className="ui action input fluid">
                  <input
                    type="text"
                    placeholder="Write a comment"
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                  />
                  <button
                    type="submit"
                    className="ui button teal"
                    onClick={handleCreateComment}
                  >
                    Comment
                  </button>
                </div>
              </Card>
              {data.post.comments.map((comment) => (
                <Card fluid key={comment.id}>
                  <Card.Content>
                    <Card.Header>{comment.username}</Card.Header>
                    <Card.Meta>{moment(comment.createdAt).fromNow()}</Card.Meta>
                    <CardDescription>{comment.body}</CardDescription>
                    {user && user.username === comment.username && (
                      <DeleteButton
                        floated="right"
                        postId={data.post.id}
                        commentId={comment.id}
                        refetchPost={refetchPost}
                      />
                    )}
                  </Card.Content>
                </Card>
              ))}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      )}
    </Container>
  );
};
