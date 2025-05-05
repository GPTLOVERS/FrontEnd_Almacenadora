import React, { useState } from "react";
import {
    Box,
    Button,
    Flex,
    Stack,
    Text,
    Select,
} from "@chakra-ui/react";
import Navbar from "../navs/Navbar";
import useGetProducto from "../../shared/hooks/useGetProducto";
import useProductos from "../../shared/hooks/useProductos";
import { useNavigate } from "react-router-dom";
// import "../../pages/productos/dashboardProductos.css";
import "../../assets/style.css";

export const BuscarProducto = () => {
    const [selectedId, setSelectedId] = useState("");
    const [query, setQuery] = useState("");
    const navigate = useNavigate();
    const { product, loading } = useGetProducto(query);
    const { productos, loading: loadingProductos } = useProductos();

    const handleBuscar = (e) => {
        e.preventDefault();
        if (!selectedId.trim()) return;
        setQuery(selectedId);
        navigate(`/productos/${selectedId}`);
    };

    const productosDisponibles = productos?.filter(p => p.status !== false) || [];

    return (
        <>
          <Navbar />
          <div className="form-container">
            <Stack className="form-container" spacing={6}>
              <Stack>
                <Text className="form-title">Buscar Producto</Text>
              </Stack>
              <Box>
                <form onSubmit={handleBuscar} className=".form-container">
                  <label htmlFor="producto" className="form-label">
                    Selecciona un producto
                  </label>
                  <Select
                    id="producto"
                    value={selectedId}
                    onChange={(e) => setSelectedId(e.target.value)}
                    isDisabled={loadingProductos}
                    className="form-select"
                    placeholder="Selecciona un producto"
                  >
                    {productosDisponibles.map((producto) => (
                      <option key={producto.uid} value={producto.uid}>
                        {producto.name} - ${producto.price}
                      </option>
                    ))}
                  </Select>
                  <button
                    type="submit"
                    disabled={loading}
                    className="form-button"
                  >
                    {loading ? "Buscando..." : "Buscar"}
                  </button>
                </form>
      
                {product && (
                  <Box mt={4}>
                    <Text fontWeight="bold">Resultado:</Text>
                    <pre>{JSON.stringify(product, null, 2)}</pre>
                  </Box>
                )}
              </Box>
            </Stack>
          </div>
        </>
      );
};      

export default BuscarProducto;
