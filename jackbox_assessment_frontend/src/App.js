import Form from "./components/Form"
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "./pages/RootLayout"
import UserPage from "./pages/UserPage"
import AdminPage from "./pages/AdminPage"
import ErrorPage from "./pages/ErrorPage";
import Home from "./pages/Home";


const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: "login",
        element: <Form />
      },
      {
        path: ":userId",
        element: <UserPage />
      },
      {
        path: "admin",
        element: <AdminPage />,
      }
    ]
  }
])
function App() {
  return <RouterProvider router={router} />
}

export default App;
