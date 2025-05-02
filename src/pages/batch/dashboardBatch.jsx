import { Outlet } from "react-router-dom";
import Navbar from "../../components/navs/Navbar";

const DashboardBatch = () => {
    return (
        <div>
            <Navbar />
            <Outlet />
        </div>
    );
}
export default DashboardBatch;