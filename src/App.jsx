import { lazy, Suspense, useEffect, useState } from "react";
import { createBrowserRouter, Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Contact from "./components/Contact";
import Error from "./components/Error";
import RestaurantMenu from "./components/RestaurantMenu";
import Login from "./components/Login";
import { RestaurantShimmer } from "./components/Shimmer";
import Cart from "./components/Cart";
import UserContext from "./context/UserContext";
import { Provider } from "react-redux";
import appStore from "./store/appStore";

const Body = lazy(() => import("./components/Body"));
const About = lazy(() => import("./components/About"));

const App = () => {
  const [userName, setUserName] = useState();

  // Authentication Logic
  useEffect(() => {
    // Make an API Call and send username and password
    const data = {
      name: "Guest User",
    };

    setUserName(data.name);
  }, []);

  return (
    <Provider store={appStore}>
      <UserContext.Provider value={{ loggedInUser: userName, setUserName }}>
        <div className="w-full flex flex-col justify-between items-center mt-[120px] min-h-[calc(100vh-120px)]">
          <Header />
          <Outlet />
          <Footer />
        </div>
      </UserContext.Provider>
    </Provider>
  );
};

// Children Routes
export const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: (
          <Suspense fallback={<RestaurantShimmer />}>
            <Body />
          </Suspense>
        ),
      },
      {
        path: "/about",
        element: (
          <Suspense
            fallback={<h1 className="text-3xl font-bold">Loading...</h1>}
          >
            <About />
          </Suspense>
        ),
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/restaurants/:resId",
        element: <RestaurantMenu />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
    ],
    errorElement: <Error />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/hello",
    element: <h1 className="text-3xl font-bold">Hello, World!!</h1>,
  },
]);

export default App;
