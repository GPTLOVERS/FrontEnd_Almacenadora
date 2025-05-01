import RegisterBatch from "./components/batch/RegisterBatch";
import DashboardPro from "./components/proveedores/DashboardPro";
import BuscarProveedor from "./components/proveedores/FindProveedor";
import ProveedorDetalle from "./components/proveedores/ProveedorDetalle";
import RegisterProveedor from "./components/proveedores/RegisterProveedor";
import UpdateProveedor from "./components/proveedores/UpdateProveedor";
import { LoginPage } from "./pages/auth";
import DashboardBatch from "./pages/batch";
import Dashboard from "./pages/dasboard";
import DashboardProveedores from "./pages/proveedores";

export const routes = [
    { path: "/auth", element: <LoginPage /> },
    { path: "/*", element: <Dashboard /> },
    { path: "/proveedores", element: <DashboardProveedores /> },
    { path: "/proveedores/dashboard", element: <DashboardPro/> },
    { path: "/proveedores/:id", element: <ProveedorDetalle/> },
    { path: "/proveedores/register", element: <RegisterProveedor/> },
    { path: `/proveedores/update/:id` , element: <RegisterProveedor/> },
    { path: `/proveedores/update` , element: <UpdateProveedor/> },
    { path: `/proveedores/find` , element: <BuscarProveedor/> },
    { path: "/proveedores/find/:id" , element: <BuscarProveedor/> },
    { path: "/batch/dashboard", element: <DashboardBatch /> },
    { path: "/batch/register", element: <RegisterBatch /> },
];
