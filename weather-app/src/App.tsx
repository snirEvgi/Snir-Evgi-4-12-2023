import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import NavBar from "./app/UI-components/Navbar"
import NotFound from "./app/pages/notFound"
import HomePage from "./app/pages/HomePage"
import FavoritePage from "./app/pages/FavoritePage"
import classNames from "classnames"
import "./index.css"
import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import { useAppSelector } from "./app/hooks"
function App() {

  interface IRoute {
    path: string
    key: string
    component: any
  }
  const routes: Array<IRoute> = [
    {
      path: "/",
      component: <HomePage />,
      key: "home_page",
    },
    {
      path: "/favorites",
      component: <FavoritePage />,
      key: "favorites",
    },
    {
      path: "*",
      component: <NotFound />,
      key: "not_found",
    },
  ]
  const theme = localStorage.getItem("theme")
  if (!theme) localStorage.setItem("theme","light")
  const theme2 = useAppSelector((state) => state.theme.theme) ||theme

  return (
    <Router>
      <NavBar />

      <div
        className={classNames({
          "p-4 h-screen overflow-x-hidden  bg-light": true ,
          "bg-dark text-white":theme === "dark",
         
        })}
      >
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
