import { createBrowserRouter } from "react-router-dom";
import { App } from "../App";
import { ClaimDeal, ClaimStatus, HomePage, SubmitDeal } from "../pages";

export const routerConfig = createBrowserRouter([
  {
    path: "/",
    element: <App />,

    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/submit-deal",
        element: <SubmitDeal />,
      },
      {
        path: "/claim-deal",
        element: <ClaimDeal />,
      },
      {
        path: "/claim-status",
        element: <ClaimStatus />,
      },
    ],
  },
]);
