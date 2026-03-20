import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Login from "../page/loginpage";

import TodolistPage from "../page/TodolistPage";
import PageNotFound from "../page/PageNotFound";
import ProtectedRoute from "./ProtectedRoute"; 

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                index: true,
                element: <Login />,
            },

            {
                path: "todolist",
                element: (
                    <ProtectedRoute>
                        <TodolistPage />
                    </ProtectedRoute>
                ),
            },
            {
                path: "*",
                element: <PageNotFound />,
            }
        ],
    },
]);

export default router;