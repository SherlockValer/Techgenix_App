import { Outlet } from "react-router-dom";

import "./App.css";

import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";

function App() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
