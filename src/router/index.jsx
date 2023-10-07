import { useRoutes, Outlet } from "react-router-dom";
import LoginPage from "../pages/login";
import HomePage from "../pages/home";
import SpeciesPage from "../pages/species";
import WrapComponentRoute from "./config";
import AddNewPage from "../pages/species/add-new";
import UpdatePage from "../pages/species/update";
import SearchPage from "../pages/search";
import DetailPage from "../pages/search/search-chitiet";
const routerList = [
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/search",
    element: <SearchPage />,
  },
  {
    path: "/species/:id",
    element: <DetailPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/species",
    element: <WrapComponentRoute element={<Outlet />} auth />,
    children: [
      { path: "", element: <SpeciesPage /> },
      { path: "/species/add-new", element: <AddNewPage /> },
      { path: "chi-tiet/:id", element: <UpdatePage /> },
    ],
  },
];

export const RenderRouter = () => {
  const element = useRoutes(routerList);
  return element;
};
