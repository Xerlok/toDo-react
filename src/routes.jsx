import ErrorPage from "./errorPage.jsx";
import App from "./App.jsx";
import ToDoList from "./components/ToDoList/ToDoList.jsx"
import ProjectsList from "./components/ProjectsList/ProjectsList.jsx";
import { Children } from "react";

const routes = [
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index:true, element: <ProjectsList /> },
      { path: "projects/:name", element: <ToDoList /> }
    ]
  }
];

export default routes;
