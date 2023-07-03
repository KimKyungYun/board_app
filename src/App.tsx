import {Suspense} from 'react';
import {Routes,Route} from 'react-router-dom';
import TopNavigation from './components/common/TopNavigation';
import Home from './pages/Home';
import BoardList from './pages/BoardList';
import Post from './pages/Post';
import Login from './pages/Auth/Login';
function App() {
  return (
    <Suspense fallback={<div/>}>
      <TopNavigation />
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/list' element={<BoardList />} />
        <Route path='/post' element={<Post />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </Suspense>
  );
}

export default App;
