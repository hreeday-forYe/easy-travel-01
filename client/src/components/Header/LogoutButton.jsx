import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { useLogoutMutation } from "../../app/slices/userApiSlice";
import { logout as logoutStore } from "../../app/slices/authSlice";
import { toast } from "react-toastify";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

const LogoutButton = ({ className = " ", isSidebarCollapsed = false }) => {
  const [logout, { isLoading }] = useLogoutMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      dispatch(logoutStore());
      navigate("/");
      toast.success("Logout successful");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <Button
      onClick={handleLogout}
      disabled={isLoading || isSidebarCollapsed} // Disable the button if isSidebarCollapsed is true
      className={`${className}`}
    >
      <LogOut /> {isSidebarCollapsed ? "" : "Logout"}  {/* Render text only if isSidebarCollapsed is false */}
    </Button>
  );
};

export default LogoutButton;
