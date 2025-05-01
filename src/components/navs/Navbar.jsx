import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserDetails } from '../../shared/hooks';
import PropTypes from 'prop-types';

const NavButton = ({ text, onClickHandler }) => (
    <span className='nav-button' onClick={onClickHandler}>{text}</span>
);

NavButton.propTypes = {
    text: PropTypes.string.isRequired,
    onClickHandler: PropTypes.func.isRequired
};

export const Navbar = () => {
    const { isLogged, logout } = useUserDetails();
    const navigate = useNavigate();

    // Estado para controlar si el menú está abierto o cerrado
    const [isDropdownOpen, setIsDropdownOpen] = useState({
        producto: false,
        proveedores: false,
        cuenta: false
    });

    // Función para alternar el estado de apertura/cierre de los menús
    const toggleDropdown = (menu) => {
        setIsDropdownOpen((prevState) => ({
            ...prevState,
            [menu]: true  // Abre el menú al hacer clic
        }));

        // Cierra el menú automáticamente después de 3 segundos
        setTimeout(() => {
            setIsDropdownOpen((prevState) => ({
                ...prevState,
                [menu]: false  // Cierra el menú después de 3 segundos
            }));
        }, 3000);
    };

    const handleGoToAuth = () => navigate("/auth");
    const handleGoToSettings = () => navigate("/settings");
    const handleGoToHome = () => navigate("/");
    const handleGoToProfile = () => navigate("/profile");
    const handleGoToStats = () => navigate("/stats");
    const handleGoToVerProveedores = () => navigate("/proveedores/dashboard");
    const handleGoToRegistrarProveedores = () => navigate("/proveedores/register");
    const handleGoToEditarProveedores = () => navigate("/proveedores/update");
    const handleGoToVerProductos = () => navigate("/verProductos");
    const handleGoToRegistrarProductos = () => navigate("/agregarProductos");
    const handleGoToEditarProductos = () => navigate("/EditarProductos");
    const handleLogout = () => logout();

    return (
        <header className="navbar-header">
            <div className="navbar-container">
                <div className="navbar-nav">
                    <NavButton text="Inicio" onClickHandler={handleGoToHome} />

                    {!isLogged ? (
                        <NavButton text="Iniciar Sesión" onClickHandler={handleGoToAuth} />
                    ) : (
                        <>
                            <div className="nav-button dropdown" onClick={() => toggleDropdown('producto')}>
                                Producto
                                {isDropdownOpen.producto && (
                                    <div className="dropdown-content">
                                        <span onClick={handleGoToVerProductos}>Ver Productos</span>
                                        <span onClick={handleGoToRegistrarProductos}>Agregar Productos</span>
                                        <span onClick={handleGoToEditarProductos}>Editar Productos</span>
                                    </div>
                                )}
                            </div>

                            <div className="nav-button dropdown" onClick={() => toggleDropdown('proveedores')}>
                                Proveedores
                                {isDropdownOpen.proveedores && (
                                    <div className="dropdown-content">
                                        <span onClick={handleGoToVerProveedores}>Ver Proveedores</span>
                                        <span onClick={handleGoToRegistrarProveedores}>Agregar Proveedores</span>
                                        <span onClick={handleGoToEditarProveedores}>Editar Proveedores</span>
                                    </div>
                                )}
                            </div>

                            <NavButton text="Estadísticas" onClickHandler={handleGoToStats} />

                            <div className="nav-button dropdown" onClick={() => toggleDropdown('cuenta')}>
                                Mi Cuenta
                                {isDropdownOpen.cuenta && (
                                    <div className="dropdown-content">
                                        <span onClick={handleGoToProfile}>Ver Perfil</span>
                                        <span onClick={handleGoToSettings}>Configuración</span>
                                        <span onClick={handleLogout}>Cerrar Sesión</span>
                                    </div>
                                )}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Navbar;
