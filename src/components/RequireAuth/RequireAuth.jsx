// src/components/RequireAuth/RequireAuth.jsx
import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/currentUserContext.js";

export default function RequireAuth({ children }) {
  const location = useLocation();
  const user = useContext(CurrentUserContext);
  if (!user) return <Navigate to="/" replace state={{ from: location }} />;
  return children;
}
