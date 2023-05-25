import { createBrowserRouter } from "react-router-dom";
import { App } from "../App";
import { ClaimDeal, ClaimStatus, SubmitDeal } from "../pages";

export const routerConfig = createBrowserRouter([
  {
    path: "/",
    element: <App />,

    children: [
      // {
      //   path: "/",
      //   element: <App />,
      // },
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
