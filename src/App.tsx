import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
//페이지 컴포넌트
import MainPage from '@pages/index/index';
import BookmarkPage from '@pages/bookmark/index';
import LoginPage from '@pages/login/index';
import SignupPage from '@pages/signup/index';
import Protect from './pages/protect/protect';
import { useEffect } from 'react';

const PrivateRoute = ({ children }) => {
    const token = localStorage.getItem('token');
    const location = useLocation();
    useEffect(() => {
        if (!token) {
            alert('로그인 이 필요한 기능입니다.');
        }
    }, [token]);

    // 로그인 후 원래 페이지로 이동
    return token ? children : <Navigate to="/reactalbum/login" state={{ from: location }} />;
};

function App() {
    return (
        <RecoilRoot>
            <BrowserRouter>
                <Routes>
                    <Route path="/reactalbum/" element={<MainPage />}></Route>
                    <Route path="/reactalbum/search/:id" element={<MainPage />}></Route>
                    <Route path="/reactalbum/login" element={<LoginPage />}></Route>
                    <Route
                        path="/reactalbum/bookmark"
                        element={
                            <PrivateRoute>
                                {' '}
                                <BookmarkPage />
                            </PrivateRoute>
                        }
                    ></Route>
                    <Route path="/reactalbum/signup" element={<SignupPage />}></Route>
                    <Route
                        path="/reactalbum/protect"
                        element={
                            <PrivateRoute>
                                <Protect />
                            </PrivateRoute>
                        }
                    />
                </Routes>
            </BrowserRouter>
        </RecoilRoot>
    );
}

export default App;
