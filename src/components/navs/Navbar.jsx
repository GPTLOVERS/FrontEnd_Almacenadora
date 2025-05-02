import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserDetails } from '../../shared/hooks';
import PropTypes from 'prop-types';
import useDownloadInventory from '../../pages/reports/ReportDashboard';


const NavButton = ({ text, onClickHandler }) => (
    <span className='nav-button' onClick={onClickHandler}>{text}</span>
);

NavButton.propTypes = {
    text: PropTypes.string.isRequired,
    onClickHandler: PropTypes.func.isRequired
};

export const Navbar = () => {
    const { isLogged, logout } = useUserDetails();
    const { download } = useDownloadInventory();
    const navigate = useNavigate();

    const [isDropdownOpen, setIsDropdownOpen] = useState({
        producto: false,
        proveedores: false,
        cuenta: false,
        stats: false,
        batch: false
    });

    const toggleDropdown = (menu) => {
        setIsDropdownOpen((prevState) => ({
            ...prevState,
            [menu]: true
        }));

        setTimeout(() => {
            setIsDropdownOpen((prevState) => ({
                ...prevState,
                [menu]: false
            }));
        }, 3000);
    };

    const handleGoToAuth = () => navigate("/auth");
    const handleGoToSettings = () => navigate("/settings");
    const handleGoToHome = () => navigate("/");
    const handleGoToProfile = () => navigate("/profile");
    const handleGoToStats = () => navigate("/stats");
    const handleDowloadInventory = async () => { await download(); };
    const handleGotoMovements = () => navigate("/movements")
    const handleGoToVerProveedores = () => navigate("/proveedores/dashboard");
    const handleGoToRegistrarProveedores = () => navigate("/proveedores/register");
    const handleGoToEditarProveedores = () => navigate("/proveedores/update");
    const handleGoToBuscarProveedores = () => navigate("/proveedores/find");
    const handleGoToVerProductos = () => navigate("/productos");
    const handleGoToRegistrarProductos = () => navigate("/productos/agregarProducto");
    const handleGoToEditarProductos = () => navigate("/productos/update");
    const handleGoToBuyProduct = () => navigate("/product/buy");
    const handleGoToGetBatch = () => navigate("/batch/list");
    const hangleGoToShearBatch = () => navigate("/batch/search");
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
                                        <span onClick={handleGoToBuyProduct}>Comprar Productos</span>
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
                                        <span onClick={handleGoToBuscarProveedores}>Buscar Proveedores</span>
                                    </div>
                                )}
                            </div>
                            <div className="nav-button dropdown" onClick={() => toggleDropdown('batch')}>
                                Lotes
                                {isDropdownOpen.batch && (
                                    <div className="dropdown-content">
                                        <span onClick={handleGoToStats}>Agregar Lotes</span>
                                        <span onClick={handleGoToGetBatch}>Ver Lotes</span>
                                        <span onClick={hangleGoToShearBatch}>Buscar Lotes</span>
                                    </div>
                                )}
                            </div>
                            <div className="nav-button dropdown" onClick={() => toggleDropdown('stats')}>
                                Estadísticas
                                {isDropdownOpen.stats && (
                                    <div className="dropdown-content">
                                        <span onClick={handleGoToStats}>Ver Gráficas</span>
                                        <span onClick={handleDowloadInventory}>Descargar Inventario</span>
                                        <span onClick={handleGotoMovements}>Descargar Reporte de Vomientos</span>
                                    </div>
                                )}
                            </div>
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
