import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { routes } from "./routeConfig";

const Routers = () => {
  return (
    <Router>
      <Routes>
        {routes.map((route, index) => (
          <Route key={index} path={route.path} element={route.element}>
            {route.children?.map((childRoute, childIndex) => (
              <Route
                key={childIndex}
                path={childRoute.path}
                element={childRoute.element}
              />
            ))}
          </Route>
        ))}
      </Routes>
    </Router>
  );
};

export default Routers;
