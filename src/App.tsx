import { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Signup from "pages/Auth/Signup";
import TopNavigation from "./components/common/TopNavigation";
import Home from "./pages/Home";
import BoardList from "./pages/BoardList";
import Post from "./pages/Post";
import Login from "./pages/Auth/Login";
import BoardDetail from "pages/BoardDetail";
import AuthRoute from "components/Auth/AuthRoute";
import Modify from "pages/Modify";
function App() {
  return (
    <Suspense fallback={<div />}>
      <TopNavigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/list" element={<BoardList />} />
        <Route path="/detail" element={<BoardDetail />} />
        <Route element={<AuthRoute needAuth={false} redirectRoute="/" />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>
        <Route element={<AuthRoute needAuth redirectRoute="/login" />}>
          <Route path="/post" element={<Post />} />
          <Route path="/modify" element={<Modify />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
