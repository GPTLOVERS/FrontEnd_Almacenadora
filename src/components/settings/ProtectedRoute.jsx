import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles }) => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) return <Navigate to="/login" />;

    const { role } = JSON.parse(storedUser);
    if (!allowedRoles.includes(role)) {
        return <Navigate to="/unauthorized" />;
    }

    return children;
};

export default ProtectedRoute;
