import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login/login";
import Voting from "../pages/VotingPage/Voting";
import RootLayout from "../components/RootLayout/RootLayout";
import { AuthenticatedRoutes } from "../enums/routes";
import CountVotes from "../pages/CountVotesPage/CountVotes";
import AdminDashboard from "../pages/AdminDashboard/AdminDashboard";
import PrivateRoute from "./PrivateRoute"; // Import the PrivateRoute component

const routes = createBrowserRouter([
  {
    path: AuthenticatedRoutes.Login,
    element: <RootLayout />, 
    children: [
      // These routes are accessible without authentication
      { path: AuthenticatedRoutes.Login, element: <Login /> },
    ],
  },
  {
    path: "/",
    element: <PrivateRoute />,  // Wrap all routes under PrivateRoute to protect them
    children: [
      { path: AuthenticatedRoutes.Voting, element: <Voting /> },
      { path: AuthenticatedRoutes.CountVotes, element: <CountVotes /> },
      { path: AuthenticatedRoutes.Dashboard, element: <AdminDashboard /> },
    ],
  },
]);

export default routes;
