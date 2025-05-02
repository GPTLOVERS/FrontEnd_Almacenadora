import axios from 'axios';

const apiClient = axios.create({
    baseURL: "http://127.0.0.1:3005/salesManager/v1",
    timeout: 3000,
    httpAgent: false
})

apiClient.interceptors.request.use(
    (config) => {
        const userDetails = localStorage.getItem("user")

        if (userDetails) {
            const token = JSON.parse(userDetails).token
            config.headers.Authorization = `Bearer ${token}`
        }
        return config

    },
    (e) => {
        return Promise.reject(e)
    }
)

export const login = async (data) => {
    try {
        return await apiClient.post("/auth/login", data)
    } catch (e) {
        return {
            error: true,
            e
        }
    }
}

export const register = async (data) => {
    try {
        return await apiClient.post('/auth/register', data)
    } catch (e) {
        return {
            error: true,
            e
        }
    }
}

export const getProveedor = async () => {
    try {
        const response = await apiClient.get("proveedores/getProveedores");
        return response.data;
    } catch (e) {
        return {
            error: true,
            message: e.response ? e.response.data.message : e.message || 'Error desconocido',
        };
    }
};

export const getProveedorById = async (id) => {
    try {
        const response = await apiClient.get(`proveedores/getProveedorById/${id}`);
        return response.data;
    } catch (e) {
        return {
            error: true,
            message: e.response ? e.response.data.message : e.message || "Error desconocido",
        };
    }
};

export const registerProveedor = async (data) => {
    try {
        return await apiClient.post('/proveedores/createProveedor', data)
    } catch (e) {
        return {
            error: true,
            e
        }
    }
}

export const updateProveedor = async (data, id) => {
    try {
        return await apiClient.put(`/proveedores/updateProveedor/${id}`, data)
    } catch (e) {
        return {
            error: true,
            e
        }
    }
}

export const reports = async (option) => {
    try {
        return await apiClient.post("/report/generateAndSaveGraphImage", option);
    } catch (e) {
        return { error: true, e };
    }
};

export const getDowloadInventory = async () => {
    try {
        const response = await apiClient.post(`/report/generateInventoryReport`);
        return response.data;
    } catch (e) {
        return {
            error: true,
            message: e.response ? e.response.data.message : e.message || "Error desconocido",
        };

    }
};

export const getDowloadMovments = async () => {
    try {
        const response = await apiClient.post(`/report/getLatestMovementReport`);
        return response.data;
    } catch (e) {
        return {
            error: true,
            message: e.response ? e.response.data.message : e.message || "Error desconocido",
        };
    }
};

export const getProductos = async () => {
    try {
        const response = await apiClient.get("/product/listProduct");
        return response.data;
    } catch (e) {
        return {
            error: true,
            message: e.response ? e.response.data.message : e.message || "Error desconocido",
        };
    }
};

export const getProductoById = async (id) => {
    try {
        const response = await apiClient.get(`/product/findProduct/${id}`);
        return response.data;
    } catch (e) {
        return {
            error: true,
            message: e.response ? e.response.data.message : e.message || "Error desconocido",
        };
    }
};

export const registerProducto = async (data) => {
    try {
        return await apiClient.post("/product/registerProduct", data);
    } catch (e) {
        return {
            error: true,
            e,
        };
    }
};

export const registerBatch = async (data) => {
    try {
        return await apiClient.post('/batch/createBatch', data);
    } catch (e) {
        return {
            error: true,
            message: e.response ? e.response.data.message : e.message || 'Error al registrar el lote'
        };
    }
};

export const updateBatch = async (data, id) => {
    try {
        return await apiClient.put(`/batch/updateBatch/${id}`, data);
    } catch (e) {
        return {
            error: true,
            message: e.response ? e.response.data.message : e.message || 'Error al actualizar el lote'
        };
    }
};

export const getBatchById = async (id) => {
    try {
        const response = await apiClient.get(`/batch/findBatch/${id}`);
        return response.data;
    } catch (e) {
        return {
            error: true,
            message: e.response ? e.response.data.message : e.message || "Error desconocido",
        };
    }
};

export const getBatches = async () => {
    try {
        const response = await apiClient.get(`/batch/getBatch`);
        return response.data;
    } catch (e) {
        return {
            error: true,
            message: e.response ? e.response.data.message : e.message || "Error desconocido",
        };
    }
};