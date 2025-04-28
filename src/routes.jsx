import React from "react";
import { LoginPage } from "./pages/auth";

export const routes = [
    { path: "/*", element: <LoginPage /> }
];
