import { FC, useState } from "react";
import styled from "styled-components";
import Button from "../../../components/Button";
import Container from "../../../components/Container";
import Input from "../../../components/Input";

const LoginModal: FC = () => {
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  return (
    <Container>
      <StyledNicknameLabel>Nickname: </StyledNicknameLabel>
      <Input
        value={nickname}
        onChange={({ target }) => setNickname(target.value)}
      />
      <StyledPasswordLabel>Password: </StyledPasswordLabel>
      <Input
        type="password"
        value={password}
        onChange={({ target }) => setPassword(target.value)}
      />
      <StyledLogInButton>Log in</StyledLogInButton>
      <StyledHorizontalLine />
      <StyledSignUpButton>Sign up</StyledSignUpButton>
    </Container>
  );
};

const StyledNicknameLabel = styled.div`
  margin-bottom: 2px;
`;

const StyledPasswordLabel = styled.div`
  margin: 2px 0;
`;

const StyledLogInButton = styled(Button)`
  width: 100%;
  padding: 10px 0;
  margin-top: 10px;
`;

const StyledSignUpButton = styled(Button)`
  width: 100%;
  padding: 10px 0;
`;

const StyledHorizontalLine = styled.hr`
  width: 180px;
  border: 1px solid;
  border-radius: 4px;
  box-shadow: 2px 2px 0 #000;
`;

export default LoginModal;
