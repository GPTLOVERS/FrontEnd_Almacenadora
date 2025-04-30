import React, { useState } from "react";
import { Login, Register } from "../../components/settings";
import { Flex } from "@chakra-ui/react";
import "./loginPage.css";

export const LoginPage  = () => {
  const [isLogin, setIsLogin] = useState(true);

  const handleLoginPageToggle = () => {
    setIsLogin((prevState) => !prevState);
  };

  return (
    <Flex className="auth-container">
      {isLogin ? (
        <Login switchAuthHandler={handleLoginPageToggle} />
      ) : (
        <Register switchAuthHandler={handleLoginPageToggle} />
      )}
    </Flex>
  );
};

export default LoginPage;

