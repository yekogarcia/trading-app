import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export const PublicRouters = ({ children }) => {
    const users = useSelector(state => state.auth);

    return users.logged
        ? <Navigate to="/ad" />
        : children

};
