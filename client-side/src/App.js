// import Navbar from "./components/navbar/navbar";
// import { Routes, Route } from "react-router-dom";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/home";
import { LoginForm } from "./pages/login";
import { RegistrationForm } from "./pages/register";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    // errorElement: <ErrorPage />,
  },
  { path: "/login", element: <LoginForm /> },
  { path: "/register", element: <RegistrationForm /> },
  // { path: "/profile", element: <ProfilePage /> },
  // { path: "/admin", element: <Admin /> },
  // { path: "/adminForm", element: <AdminForm /> },
  // { path: "/registerMerchant", element: <RegisterMerchant /> },
  // { path: "product/:id", element: <ProductID /> },
]);

function App() {
  return (
    <main>
      <RouterProvider router={router} />
    </main>
  );
}

export default App;
