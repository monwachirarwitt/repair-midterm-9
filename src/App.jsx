import { RouterProvider } from "react-router";
import router from "./routes/router";



function App() {

  return (
    <div className="bg-gray-800">
      <RouterProvider router={router} />
    </div>
  )
}
export default App
