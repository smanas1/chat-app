import {
  BrowserRouter as Router,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Routes,
} from "react-router-dom";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import Notloggedinuser from "./pages/Privateroute/Notloggedin";
import Loggedinuser from "./pages/Privateroute/Loggedinuser";
import Registration from "./pages/Register/Registration";
import Forgetpass from "./pages/Forgetpass/Forgetpass";
import Rootlayout from "./Root Layout/Rootlayout";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route element={<Notloggedinuser />}>
          <Route path="/forgetpass" element={<Forgetpass />}></Route>
          <Route path="/register" element={<Registration />}></Route>
          <Route path="/login" element={<Login />}></Route>
        </Route>
        <Route element={<Loggedinuser />}>
          <Route element={<Rootlayout />}>
            <Route path="/" element={<Home />}></Route>
          </Route>
        </Route>
      </Route>
    )
  );

  return (
    <>
      {/* <Router>
        <Routes>
          <Route element={<Notloggedinuser />}>
            <Route path="/register" element={<Registration />}></Route>
            <Route path="/login" element={<Login />}></Route>
          </Route>
          <Route element={<Loggedinuser />}>
            <Route path="/" element={<Home />}></Route>
          </Route>
        </Routes>
      </Router> */}

      <RouterProvider router={router}></RouterProvider>
    </>
  );
}

export default App;
