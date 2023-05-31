import { createBrowserRouter } from "react-router-dom";
import { App } from "../App";
import {
  AboutPage,
  ClaimDeal,
  ClaimStatus,
  DealDetailPage,
  HomePage,
  HowItWorks,
  SubmitDeal,
} from "../pages";

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
        path: "/deal-detail",
        element: <DealDetailPage />,
      },
      {
        path: "/claim-deal",
        element: <ClaimDeal />,
      },
      {
        path: "/claim-status",
        element: <ClaimStatus />,
      },
      {
        path: "/how-it-works",
        element: <HowItWorks />,
      },
      {
        path: "/about",
        element: <AboutPage />,
      },
    ],
  },
]);
