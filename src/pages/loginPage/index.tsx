import { FC } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const LoginPage: FC = () => {
  return (
    <LoginPageWrapper>
      <button disabled> Play online</button>
      <Link to="/lobby">
        <button> Play offline mode (hotseat)</button>
      </Link>
    </LoginPageWrapper>
  );
};

const LoginPageWrapper = styled.div`
  display: flex;
`;

export default LoginPage;
