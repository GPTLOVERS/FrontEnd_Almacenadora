import React from "react";
import { LoginPage } from "./pages/auth";
import Dashboard from "./pages/dasboard";
import DashboardProveedores from "./pages/proveedores";
import DashboardPro from "./components/proveedores/DashboardPro";
import ProveedorDetalle from "./components/proveedores/ProveedorDetalle";
import RegisterProveedor from "./components/proveedores/RegisterProveedor";
import UpdateProveedor from "./components/proveedores/UpdateProveedor";
import BuscarProveedor from "./components/proveedores/FindProveedor";
import ProtectedRoute from "./components/settings/ProtectedRoute";
import Unauthorized from "./components/settings/Unauthorized";

export const routes = [
    { path: "/auth", element: <LoginPage /> },
    { path: "/*", element: <Dashboard /> },
    { path: "/proveedores", element: <DashboardProveedores /> },
    { path: "/proveedores/dashboard", element: <DashboardPro/> },
    { path: "/proveedores/:id", element: <ProtectedRoute allowedRoles={"admin"}>
        <ProveedorDetalle/>
    </ProtectedRoute> },
    { path: "/proveedores/register", element: <ProtectedRoute allowedRoles={"admin"}>
    <RegisterProveedor/>
</ProtectedRoute> },
    { path: `/proveedores/update/:id` , element: <RegisterProveedor/> },
    { path: `/proveedores/update` , element: <UpdateProveedor/> },
    { path: `/proveedores/find` , element: <BuscarProveedor/> },
    { path: `/unauthorized` , element: <Unauthorized/> }
];
