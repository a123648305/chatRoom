import { createBrowserRouter } from "react-router-dom";

import Home from "../Home";
import Index from "../Index";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    // children: [
    //   {
    //     path: "chatroom",
    //     element: <Index />,
    //   },
    // ],
  },
  {
    path: "/chatroom/:uId",
    element: <Index />,
  },
]);

export default router;
