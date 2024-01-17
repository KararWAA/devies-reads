import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function loginUser(user: { username: string; password: string }) {
    const data = await fetch("https://devies-reads-be.onrender.com/auth/login", {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
      cache: "default",
    }).then((res) => {
      return res.json();
    });
    if (data.accessToken) {
      navigate("/books");
      localStorage.setItem("accessToken", data.accessToken);
    }
  }

  async function registerUser(user: { username: string; password: string }) {
    await fetch("https://devies-reads-be.onrender.com/auth/register", {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
      cache: "default",
    });
  }

  return (
    <Wrapper>
      <Input onChange={(e) => setUsername(e.target.value)} placeholder="username" value={username} />
      <Input onChange={(e) => setPassword(e.target.value)} placeholder="password" type="password" value={password} />
      <Button
        onClick={() => {
          loginUser({ username, password });
        }}
      >
        Login
      </Button>
      <Button
        onClick={() => {
          registerUser({ username, password });
        }}
      >
        Register
      </Button>
    </Wrapper>
  );
}

export default Login;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Button = styled.button`
  background-color: #f5f5f5;
  border: 1px solid black;
  border-radius: 5px;
  height: 50px;
  width: 80%;
  &:hover {
    background-color: grey;
  }
`;

const Input = styled.input`
  border: 1px solid black;
  border-radius: 5px;
  height: 50px;
  width: 80%;
`;
