import ErrorPage from "./errorPage.jsx";
import App from "./App.jsx";
import Header from "./components/Header/Header.jsx";

const routes = [
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: "profile/:name?",
    element: <Header />
  },
];

export default routes;
