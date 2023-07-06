import { Navigate, Outlet } from "react-router-dom";
import { getAuth } from "store/store";

interface Props {
  redirectRoute: string;
  needAuth: boolean;
}

export default function AuthRoute({ needAuth, redirectRoute }: Props) {
  const auth = getAuth();

  if (needAuth) {
    if (auth) {
      return <Outlet />;
    }
    return <Navigate to={redirectRoute} replace />;
  }
  if (auth) {
    return <Navigate to={redirectRoute} replace />;
  }
  return <Outlet />;
}
