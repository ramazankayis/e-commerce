import { isAdmin } from "../config/isAdmin";
import AdminLayout from "./AdminLayout";
import MainLayout from "./MainLayout";

export const LayoutDefault = isAdmin ? AdminLayout : MainLayout;
//export default LayoutDefault;
