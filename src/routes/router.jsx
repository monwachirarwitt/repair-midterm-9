
import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Login from "../page/loginpage";
import Register from "../page/Register";
import TodolistPage from "../page/TodolistPage";


const router = createBrowserRouter([
    {
        path: "/",
        element:<MainLayout />,
        children: [
            {
                index:true,
                element:<Login />,
            },
            {
                path:"register",
                element:<Register />,
            },
            {
                path:"todolist",
                element:<TodolistPage  />,
            },
        ],
    },
]);

export default router;