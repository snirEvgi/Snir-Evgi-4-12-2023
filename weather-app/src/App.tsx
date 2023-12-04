import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import NavBar from "./app/UI-components/Navbar"
import NotFound from "./app/pages/notFound";
import HomePage from "./app/pages/HomePage";

const searchAutoCompleteURL = "http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=ICfOrVGI3ofdnGODMlLrRMwyPbISOCdO&q=is"
const locationSearch = "http://dataservice.accuweather.com/locations/v1/cities/search?apikey=ICfOrVGI3ofdnGODMlLrRMwyPbISOCdO&q=Los%20Angeles"
const basedLocationKeySearch = "http://dataservice.accuweather.com/currentconditions/v1/1239134?apikey=ICfOrVGI3ofdnGODMlLrRMwyPbISOCdO&details=true"

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
     
      <div className="p-5">
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
