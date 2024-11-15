import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import RootLayout from "../pages/Layout";
import HomePage from "../pages";
import ProductsPage from "../pages/Products";
import AboutPage from "../pages/About";
import ProductChildren from "../pages/Product";
import LoginPage from "../pages/Login";
import CookieService from "../services/CookieService";
import AdminDashboard from "../dachboard";
import DashBoardLayout from "../dachboard/DashBoardLayout";
const token = CookieService.get("jwt");
const isAuthenticated = !!token;

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* Root Layout */}
      <Route>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/product" element={<ProductsPage />} />
          <Route path="/product/:id" element={<ProductChildren />} />
        </Route>
        <Route path="/dashboard" element={<DashBoardLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route
            path="products"
            element={
              <h1 className="ml-60 text-red-700 border border-red-600">sadas</h1>
            }
          />
          <Route path="categories" element={<h1>asdasdasdas</h1>} />
        </Route>

        <Route
          path="/login"
          element={<LoginPage isAuthenticated={isAuthenticated} />}
        />
      </Route>
    </>
  )
);

export default router;
