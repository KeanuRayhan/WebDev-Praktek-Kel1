import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import LoginPage from './pages/LoginPage'; // Import LoginPage
import RegistrationPage from './pages/RegistrationPage'; // Import RegistrationPage
import CountriesPage from './pages/CMSCountries'; // Import CountriesPage
import CommentsPage from './pages/CMSComments';
import ActorsPage from './pages/CMSActors';
import UsersPage from './pages/CMSUsers';
import Home from './pages/Home';
import ValidasiMovie from './pages/ValidasiMovie';
import CMSMovie from './pages/CMSMovie';
import CMSMovieInput from './pages/CMSMovieInput';
import SearchPage from './pages/SearchPage';
import PageDetails from './pages/PageDetails';
import ProtectedRoute from './components/ProtectedRoute';
import CMSAwards from './pages/CMSAwards';
import CMSGenres from './pages/CMSGenres';
import SuspendedPage from './pages/SuspendedPage';
import CMSMovieEdit from './pages/CMSMovieEdit';

const App = () => {
    return (
        <div className="bg-zinc-950 text-white min-h-screen">
            <Routes>
                {/* Rute hanya untuk halaman login */}
                <Route path="/login" element={<LoginPage />} />
                <Route path="/suspended" element={<SuspendedPage />} />
                <Route path="/register" element={<RegistrationPage />} />

                {/* Rute untuk halaman utama dan lainnya */}
                <Route
                    path="/*"
                    element={
                        <>
                            <Home />
                        </>
                    }
                />
                <Route
                    path="/search"
                    element={
                        <>
                            <SearchPage />
                        </>
                    }
                />
                <Route
                    path='/movies/:id'
                    element={
                        <>
                            <PageDetails />
                        </>
                    }
                />

                {/* CMS */}
                {/* Rute untuk halaman CMS countries */}
                <Route
                    path="/countries"
                    element={
                        <ProtectedRoute roleRequired="admin">
                            <Header />
                            <div className="flex bg-gray-900">
                                <Sidebar />
                                <main className="flex-1 p-8">
                                    <CountriesPage />
                                </main>
                            </div>
                        </ProtectedRoute>
                    }
                />
                {/* Rute untuk halaman CMS comments */}
                <Route
                    path="/comments"
                    element={
                        <ProtectedRoute roleRequired="admin">
                            <Header />
                            <div className="flex bg-gray-900">
                                <Sidebar />
                                <main className="flex-1 p-8">
                                    <CommentsPage />
                                </main>
                            </div>
                        </ProtectedRoute>
                    }
                />
                {/* Rute untuk halaman CMS actors */}
                <Route
                    path="/actors"
                    element={
                        <ProtectedRoute roleRequired="admin">
                            <Header />
                            <div className="flex bg-gray-900">
                                <Sidebar />
                                <main className="flex-1 p-8">
                                    <ActorsPage />
                                </main>
                            </div>
                        </ProtectedRoute>
                    }
                />
                {/* Rute untuk halaman CMS users */}
                <Route
                    path="/users"
                    element={
                        <ProtectedRoute roleRequired="admin">
                            <Header />
                            <div className="flex bg-gray-900">
                                <Sidebar />
                                <main className="flex-1 p-8">
                                    <UsersPage />
                                </main>
                            </div>
                        </ProtectedRoute>
                    }
                />
                {/* Rute untuk halaman CMS movie */}
                <Route
                    path='/dramas'
                    element={
                        <ProtectedRoute roleRequired="admin">
                            <CMSMovie />
                        </ProtectedRoute>
                    }
                />
                {/* Rute untuk halaman validasi movie */}
                <Route
                    path='/validate-movie'
                    element={
                        <ProtectedRoute roleRequired="admin">
                            <ValidasiMovie />
                        </ProtectedRoute>
                    }
                />
                {/* Rute untuk halaman CMS Award */}
                <Route
                    path='/awards'
                    element={
                        <ProtectedRoute roleRequired="admin">
                            <CMSAwards />
                        </ProtectedRoute>
                    }
                />
                {/* Rute untuk halaman CMS Genre */}
                <Route
                    path='/genres'
                    element={
                        <ProtectedRoute roleRequired="admin">
                            <CMSGenres />
                        </ProtectedRoute>
                    }
                />
                {/* Rute untuk halaman input movie */}
                <Route
                    path='/input-movie'
                    element={
                        <>
                            <CMSMovieInput />
                        </>
                    }
                />
                <Route
                    path='/edit-movie/:movieId'
                    element={
                        <>
                            <CMSMovieEdit />
                        </>
                    }
                />
            </Routes>
        </div>
    );
};

export default App;
