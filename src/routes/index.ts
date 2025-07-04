import App from "@/App";
import AddBookModal from "@/home/AddBookModal";
import BorrowSummary from "@/home/BorrowSummary";
import Home from "@/home/Home";



import {
  createBrowserRouter,

} from "react-router";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children:[
      {
        path: "/",
        Component:Home
      },
      {
        path: "/addbooks",
        Component:AddBookModal
      },
      {
        path: "/borrowsummary",
        Component:BorrowSummary
      },
    ]

  },
  {
    path: "/books",
    Component: BorrowSummary

  },
]);