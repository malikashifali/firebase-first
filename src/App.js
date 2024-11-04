import { useEffect, useState } from 'react';
import { useAuthContext } from 'contexts/AuthContext';
import './App.scss';
import './config/firebase'
import './config/golobal'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
import Routes from "./pages/Routes"
import ScreenLoader from 'components/ScreenLoader';
import { ToastContainer } from "react-toastify"

function App() {
  const [isScreenLodading, setIsScreenLoading] = useState(true)

  const { isAuthenticated } = useAuthContext()

  useEffect(() => {
    setTimeout(() => {
      setIsScreenLoading(false)
    }, 2000);
  }, [])

  // console.log("isAuthenticated =>", isAuthenticated)
  return (
    <>
      {
        !isScreenLodading
          ? <Routes />
          : <ScreenLoader />
      }

      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />

    </>
  );
}

export default App;
