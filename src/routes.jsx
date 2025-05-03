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
import ImageOfReport from "./components/reports/ImageOfReport";
import { Movements } from "./components/reports/Movements";
import DashboardProductos from "./components/productos/DashboardProductos";
import ProductoDetalle from "./components/productos/ProductoDetalle";
import RegisterProducto from "./components/productos/RegisterProducto";
import DashboardBatch from "./components/batch/DashboardBat";
import BatchDetalle from "./components/batch/BatchDetalle";
import FindBatch from "./components/batch/FindBatch";
import UpdateProducto from "./components/productos/UpdateProducto";
import BuyProduct from "./components/productos/BuyProduct";
import BuscarProducto from "./components/productos/FindProducto";

export const routes = [
    { path: "/auth", element: <LoginPage /> },
    { path: "/*", element: <Dashboard /> },
    { path: "/proveedores", element: <DashboardProveedores /> },
    { path: "/proveedores/dashboard", element: <DashboardPro /> },
    {
        path: "/proveedores/:id", element: <ProtectedRoute allowedRoles={"ADMIN_ROLE"}>
            <ProveedorDetalle />
        </ProtectedRoute>
    },
    { path: "/proveedores/register", element: <RegisterProveedor /> },
    { path: `/proveedores/update/:id`, element: <RegisterProveedor /> },
    { path: `/proveedores/update`, element: <UpdateProveedor /> },
    { path: `/proveedores/find`, element: <BuscarProveedor /> },
    {
        path: "/stats", element: <ProtectedRoute allowedRoles={["ADMIN_ROLE", "EMPLOYEE_ROLE"]}>
            <ImageOfReport />
        </ProtectedRoute>
    },
    {
        path: "/movements", element: <ProtectedRoute allowedRoles={["ADMIN_ROLE", "EMPLOYEE_ROLE"]}>
            <Movements />
        </ProtectedRoute>
    },
    { path: `/unauthorized`, element: <Unauthorized /> },
    { path: "/productos", element: <DashboardProductos /> },
    { path: "/productos/:id", element: <ProductoDetalle /> },
    { path: "/productos/agregarProducto", element: <RegisterProducto /> },
    {
        path: "/batch/list", element: <ProtectedRoute allowedRoles={["ADMIN_ROLE", "EMPLOYEE_ROLE"]}>
            <DashboardBatch />
        </ProtectedRoute>
    },
    {
        path: "/batch/:id", element: <ProtectedRoute allowedRoles={["ADMIN_ROLE", "EMPLOYEE_ROLE"]}>
            <BatchDetalle />
        </ProtectedRoute>
    },
    {
        path: "/batch/search", element: <ProtectedRoute allowedRoles={["ADMIN_ROLE", "EMPLOYEE_ROLE"]}>
            <FindBatch />
        </ProtectedRoute>
    },
    {
        path: "/productos/update", element: <ProtectedRoute allowedRoles={["ADMIN_ROLE", "EMPLOYEE_ROLE"]}>
            <UpdateProducto/>
        </ProtectedRoute>
    },
    {
        path: "/productos/update/:id", element: <ProtectedRoute allowedRoles={["ADMIN_ROLE", "EMPLOYEE_ROLE"]}>
            <RegisterProducto />
        </ProtectedRoute>
    },
    { path: `/product/buy`, element: <BuyProduct /> },
    {
        path: "/productos/find", element: <ProtectedRoute allowedRoles={["ADMIN_ROLE", "EMPLOYEE_ROLE"]}>
            <BuscarProducto />
        </ProtectedRoute>
    },
];