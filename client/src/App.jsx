import { ToastContainer, Bounce } from "react-toastify";
import { useLocation } from "react-router-dom";
import { Footer, Header } from "./components";
import { Outlet } from "react-router-dom";
function App() {
  const location = useLocation();
  const isLogin = location.pathname === "/login" || "/register";
  return (
    <>
      {!isLogin && <Header />}
        <div>
          <Outlet/>
        </div>
      {!isLogin && <Footer/>}
      

      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={true}
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
        theme="colored"
        transition={Bounce}
      />
    </>
  );
}

export default App;
