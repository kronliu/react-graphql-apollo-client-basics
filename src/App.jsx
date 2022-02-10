import { ApolloProvider } from "@apollo/client";
import { useAppApolloClient } from "./common/hooks/useAppApolloClient";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { NavBar } from "./components/NavBar";
import { AuthProvider } from "./common/context/auth";
import { ProtectedComponent } from "./common/hoc/ProtectedComponent";
import { Post } from "./pages/Post";
import "./App.css";

export const App = () => {
  const client = useAppApolloClient();

  return (
    <AuthProvider>
      <ApolloProvider client={client}>
        <BrowserRouter>
          <NavBar />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route
              exact
              path="/login"
              element={<ProtectedComponent component={Login} />}
            />
            <Route
              exact
              path="/register"
              element={<ProtectedComponent component={Register} />}
            />
            <Route path="/posts/:postId" element={<Post />} />
          </Routes>
        </BrowserRouter>
      </ApolloProvider>
    </AuthProvider>
  );
};
