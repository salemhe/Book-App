import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";
import App from "../App";
import Home from "../home/Home";
import Shop from "../shop/Shop";
import About from "../components/About";
import Blog from "../components/Blog";
import SingleBook from "../shop/SingleBook";
import DashboardLayout from "../dashboard/DashboardLayout";
import Dashboard from "../dashboard/Dashboard";
import UploadBooks from "../dashboard/UploadBooks";
import ManageBooks from "../dashboard/ManageBooks";
import EditBooks from "../dashboard/EditBooks";
import SignUp from "../components/SignUp";
import Login from "../components/Login";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import Logout from "../components/Logout";


  const router = createBrowserRouter([
    {
      path: "/",
      element: <App/>,
      children: [
        {
            path: '/',
            element: <Home/>
        },
        {
            path: "/shop",
            element: <Shop/>
        },
        {
            path: "/about",
            element: <About/>
        },
        {
            path: "/blog",
            element: <Blog/>
        }, {
            path: "/book/:id",
            element: <SingleBook/>,
            loader: ({ params }) => fetch(`http://localhost:5000/book/${params.id}`)
        }
      ]
    },
    {
      path: "/admin/dashboard",
      element: <DashboardLayout/>,
      children: [
        {
          path: "/admin/dashboard",
          element: <PrivateRoute><Dashboard/></PrivateRoute>
        },
        {
          path: "/admin/dashboard/upload",
          element: <UploadBooks/>
        },
        {
          path: "/admin/dashboard/manage",
          element: <ManageBooks/>
        },
        {
          path: "/admin/dashboard/edit-books/:id",
          element: <EditBooks/>,
          loader: ({params}) => fetch(`http://localhost:5000/book/${params.id}`)
        }
      ]
    }, {
      path: "sign-up",
      element: <SignUp/>
    },{
      path:"login",
      element:<Login/>
    },
    {
      path: "logout",
      element: <Logout/>
    }
  ]);

  export default router;






// import React from "react";
// import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import App from "../App";
// import Home from "../home/Home";
// import Shop from "../shop/Shop";
// import About from "../components/About";
// import Blog from "../components/Blog";
// import SingleBook from "../shop/SingleBook";
// import DashboardLayout from "../dashboard/DashboardLayout";
// import Dashboard from "../dashboard/Dashboard";
// import UploadBooks from "../dashboard/UploadBooks";
// import ManageBooks from "../dashboard/ManageBooks";
// import EditBooks from "../dashboard/EditBooks";
// import SignUp from "../components/SignUp";
// import Login from "../components/Login";
// import PrivateRoute from "../PrivateRoute/PrivateRoute";
// import Logout from "../components/Logout";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <App />,
//     children: [
//       { path: "/", element: <Home /> },
//       { path: "/shop", element: <Shop /> },
//       { path: "/about", element: <About /> },
//       { path: "/blog", element: <Blog /> },
//       {
//         path: "/book/:id",
//         element: <SingleBook />,
//         loader: ({ params }) =>
//           fetch(`http://localhost:5000/book/${params.id}`).then((res) =>
//             res.json()
//           ),
//       },
//     ],
//   },
//   {
//     path: "/admin/dashboard",
//     element: <DashboardLayout />,
//     children: [
//       {
//         path: "/",
//         element: (
//           <PrivateRoute>
//             <Dashboard />
//           </PrivateRoute>
//         ),
//       },
//       { path: "/upload", element: <UploadBooks /> },
//       { path: "/manage", element: <ManageBooks /> },
//       {
//         path: "/edit-books/:id",
//         element: <EditBooks />,
//         loader: ({ params }) =>
//           fetch(`http://localhost:5000/book/${params.id}`).then((res) =>
//             res.json()
//           ),
//       },
//     ],
//   },
//   { path: "/sign-up", element: <SignUp /> },
//   { path: "/login", element: <Login /> },
//   { path: "/logout", element: <Logout /> },
// ]);

// export default router;
