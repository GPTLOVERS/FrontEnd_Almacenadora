import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from "../../components/navs/Navbar";

const DashboardProveedores = () => {
    return (
        <div>
            <Navbar />
            <Outlet />
        </div>
    );
};

export default DashboardProveedores;
