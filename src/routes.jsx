import { Children } from "react";

import App from "./Components/App";
import ShopPage from "./Components/ShopPageFolder/shopPage";
import CartPage from "./Components/CartPageFolder/CartPage";
import HomePage from "./Components/HomePageFolder/HomePage";

const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      { path: "HomePage", element: <HomePage /> },
      { path: "ShopPage", element: <ShopPage /> },
      { path: "CartPage", element: <CartPage /> },
    ],
  },
];
export default routes;
