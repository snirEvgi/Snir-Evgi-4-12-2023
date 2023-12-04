import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import NavBar from "./app/UI-components/Navbar"
import NotFound from "./app/pages/notFound";
import HomePage from "./app/pages/HomePage";


function App() {
  interface IRoute {
    path: string;
    key: string;
    component: any;
  }
  const routes: Array<IRoute> = [
    {
      path: "/",
      component: <HomePage />,
      key: "home_page",
    },
    {
      path: "*",
      component: <NotFound />,
      key: "not_found",
    }
  
  ];
  return (
    <Router >
      <NavBar />
     
      <div className="p-5 ">
        <Routes>
          {routes.map((route) => (
              <Route
                path={route.path}
                key={route.key}
                element={route.component}
              />
            
          ))}
        </Routes>
      </div>
    </Router>
  )
}

export default App
