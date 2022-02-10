import { useContext } from "react";
import { useQuery } from "@apollo/client";
import { Container, Grid, Transition } from "semantic-ui-react";
import { AuthContext } from "../common/context/auth";

import { PostCard } from "../components/PostCard";
import { PostForm } from "../components/PostForm";
import { POSTS_QUERY } from "../gql/queries";

export const Home = () => {
  const { user } = useContext(AuthContext);
  const { data, loading } = useQuery(POSTS_QUERY);

  return (
    <Container
      style={{
        padding: "30px",
      }}
    >
      <Grid columns="three">
        <Grid.Row>
          <h2>Recent Posts</h2>
        </Grid.Row>
        <Grid.Row>
          {user && (
            <Grid.Column>
              <PostForm />
            </Grid.Column>
          )}
          {loading ? (
            <h2>...loading</h2>
          ) : (
            <Transition.Group>
              {data?.posts &&
                data.posts?.map((post) => (
                  <Grid.Column key={post.id} style={{ marginBottom: "20px" }}>
                    <PostCard post={post} />
                  </Grid.Column>
                ))}
            </Transition.Group>
          )}
        </Grid.Row>
      </Grid>
    </Container>
  );
};
