// src/pages/auth/LoginPage.jsx
import React from "react";
import { Flex, Box, FormControl, FormLabel, Input, Checkbox, Stack, Button, Heading, Text } from '@chakra-ui/react';
import './loginPage.css'; // Asegúrate de que el archivo CSS esté en la misma carpeta

const LoginPage = () => {
  return (
    <Flex className="flex-container">
      <Stack className="stack-container">
        <Stack className="heading-container">
          <Heading className="heading-title">Inicia sesión en tu cuenta</Heading>
        </Stack>
        <Box className="box-container">
          <Stack className="form-stack">
            <FormControl id="email">
              <FormLabel className="form-label">Correo Electrónico</FormLabel>
              <Input className="input-field" type="email" />
            </FormControl>
            <FormControl id="password">
              <FormLabel className="form-label">Contraseña</FormLabel>
              <Input className="input-field" type="password" />
            </FormControl>
            <Stack className="button-stack">
              <Stack className="checkbox-container">
                <Checkbox className="checkbox">Recordarme</Checkbox>
                <Text className="forgot-password">Olvidé la contraseña</Text>
              </Stack>
              <Button className="sign-in-button">Iniciar Sesión</Button>
            </Stack>
            <Text className="create-account">¿No tienes una cuenta?, créala</Text>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};

export default LoginPage;
