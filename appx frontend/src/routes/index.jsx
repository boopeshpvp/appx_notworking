import React, { Suspense, useState } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import image from "../assets/loaderimg.png";
import '../components/ImageView/style.css';
import NotFound from '../containers/error';
import { adminPrivateRoutes, publicRoutes, userPrivateRoutes } from '../utils/appRoutes';

import PersonalDetails from '../containers/profile/personalDetails';
import ProfileChangePassword from '../containers/profile/new-change-password';
import AdminProfileSettings from '../containers/profile/adminProfileSettings';

const AppRoutes = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [auth, setAuth] = useState(JSON.parse(localStorage.getItem('authentication')))
  const authorization = localStorage.getItem('switchButton')
  const handleLogin = () => {
    setAuth(true);
  };

    const handleLogout = () => {
        setAuth(false)
    }
    if (authorization === "admin" && location.pathname === "/") {
        navigate("/admin/dashboard" || location.pathname);
    }
    else if (authorization === "user" && location.pathname === "/") {
        navigate("user/home" || location.pathname);
    }
    else if (authorization === "[]" && location.pathname !== "/") {
        navigate("/")
    }

    return (
        <>
            <Routes>
                {auth ?
                    <>
                        {authorization === "admins"
                            ? adminPrivateRoutes.map((route, index) => {
                                let Component = route.component;
                                if (route.routeId === 'R013') {
                                    return (
                                        <Route
                                            key={`route-${route.routeId}`}
                                            path={route.path}
                                            element={
                                                <Suspense fallback={<div className="loaderVeiw">
                                                    <img src={image} alt="altimg" className='spinner' />
                                                </div>}>
                                                    <Component isAuthOut={handleLogout} />
                                                </Suspense>
                                            }
                                        >
                                            <Route
                                                path=""
                                                element={<PersonalDetails />}
                                            />
                                            <Route
                                                path="change-password"
                                                element={<ProfileChangePassword />}
                                            />
                                            {/* <Route
                                                path="settings"
                                                element={<AdminProfileSettings />}
                                            /> */}
                                        </Route>
                                    )
                                }
                                else {
                                    return (
                                        <Route
                                            key={`route-${route.routeId}`}
                                            path={route.path}
                                            element={
                                                <Suspense fallback={<div className="loaderVeiw">
                                                    <img src={image} alt="altimg" className='spinner' />
                                                </div>}>
                                                    <Component isAuthOut={handleLogout} />
                                                </Suspense>
                                            }
                                        />
                                    )
                                }

                                // return (
                                //     <Route
                                //         key={`route-${route.routeId}`}
                                //         path={route.path}
                                //         element={
                                //             <Suspense fallback={<div className="loaderVeiw">
                                //                 <img src={image} alt="altimg" className='spinner' />
                                //             </div>}>
                                //                 <Component isAuthOut={handleLogout} />
                                //             </Suspense>
                                //         }
                                //     />
                                // )
                            })
                            : userPrivateRoutes.map((route, index) => {
                                let Component = route.component;
                                return (
                                    <Route
                                        key={`route-${route.routeId}`}
                                        path={route.path}
                                        element={
                                            <Suspense fallback={<div className="loaderVeiw">
                                                <img src={image} alt="altimg" className='spinner' />
                                            </div>}>
                                                <Component isAuthOut={handleLogout} />
                                            </Suspense>
                                        }
                                    />
                                );
                            })
                        }
                    </>
                    :
                    publicRoutes.map((route, index) => {
                        let Component = route.component;
                        return (
                            <Route
                                key={`route-${route.routeId}`}
                                path={route.path}
                                element={
                                    <Suspense fallback={<div className="loaderVeiw">
                                        <img src={image} alt="altimg" className='spinner' />
                                    </div>}>
                                        <Component isAuthed={handleLogin} />
                                    </Suspense>
                                }
                            />
                        );
                    })}
                <Route path="*" element={<NotFound />} />
            </Routes>
        </>
    );
};

export default AppRoutes