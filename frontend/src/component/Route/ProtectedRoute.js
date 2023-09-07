// import React, { Fragment } from "react";
// import { useSelector } from "react-redux";
// import { Navigate, Route } from "react-router-dom";
// import Loader from "../layout/loader/loader";

// const ProtectedRoute = ({ element: Element, ...rest }) => {
//   const { loading, isAuthenticated, user } = useSelector((state) => state.user);
//   return (
//     <Fragment>
//       {!loading && (
//         <Route
//           {...rest}
//           render={(props) => {
//             if (!isAuthenticated) {
//               return <Navigate to="/login" />;
//             }
//             return <Element {...props} />;
//           }}
//         />
//       )}
//     </Fragment>
//   );
// };

// export default ProtectedRoute;

// import React, { Fragment } from "react";
// import { useSelector } from "react-redux";
// import { Navigate, Outlet } from "react-router-dom";

// const ProtectedRoute = ({ isAdmin, element: Element, ...rest }) => {
//   const { loading, isAuthenticated } = useSelector((state) => state.user);

//   return (
//     <Fragment>
//       {loading === false && (
//         <Outlet
//           {...rest}
//           render={(props) => {
//             isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;

//             // if (isAuthenticated === false) {
//             //   return <Navigate to="/login" replace />;
//             // }

//             return <Element {...props} />;
//           }}
//         />
//       )}
//     </Fragment>
//   );
// };

// export default ProtectedRoute;

// const ProtectedRoute = ({ element: Element, ...rest }) => {
//   const { isAuthenticated, loading } = useSelector((state) => state.user);

//   if (loading) {
//     return <Loader />;
//   }

//   return isAuthenticated ? (
//     <Route {...rest} element={<Element />} />
//   ) : (
//     <Navigate to="/login" />
//   );
// };

// import React from "react";
// import { useSelector } from "react-redux";
// import { Navigate, Route } from "react-router-dom";

// const ProtectedRoute = ({ element: Element, ...rest }) => {
//   const { loading, isAuthenticated } = useSelector((state) => state.user);

//   return (
//     <Route
//       {...rest}
//       element={
//         isAuthenticated ? <Element {...rest} /> : <Navigate to="/login" />
//       }
//     />
//   );
// };

// export default ProtectedRoute;

import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { toast } from "react-toastify";

const ProtectedRoute = ({ isAuthenticated }) => {
  const { user } = useSelector((state) => state.user);

  if (!isAuthenticated) {
    toast.error("Kindly Login or Signup !!!");
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
