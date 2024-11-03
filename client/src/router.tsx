import { createBrowserRouter } from "react-router-dom";
import ErrorScreen from "./components/error-screen";
import AuditLogPage from "./pages/AuditLogPage";
import HomePage from "./pages/HomePage";
import QuestionDetailPage from "./pages/QuestionDetailPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <ErrorScreen />,
  },
  {
    path: "/questions/:questionId",
    element: <QuestionDetailPage />,
    errorElement: <ErrorScreen />,
  },
  {
    path: "/audit-log",
    element: <AuditLogPage />,
    errorElement: <ErrorScreen />,
  },
]);

export default router;
