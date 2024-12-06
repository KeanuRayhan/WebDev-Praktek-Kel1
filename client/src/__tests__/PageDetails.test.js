import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { Routes, MemoryRouter, Route, useParams } from "react-router-dom";
import PageDetails from "../pages/PageDetails";
import MovieDataService from "../services/movie.service";

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useParams: jest.fn(),
}));

jest.mock('../services/movie.service');

describe('PageDetails', () => {
    const mockMovies = {
        id: 1,
        title: 'Moon Knight',
        year: 2022,
        link_trailer: 'https://www.youtube.com/watch?v=x7Krla_UxRg',
        synopsis: "Steven Grant discovers he's been granted the powers of an Egyptian moon god. But he soon finds out that these newfound powers can be both a blessing and a curse to his troubled life.",
        rating: 8.5,
        Genres: [{ genre: 'Action' }, { genre: 'Adventure' }],
        Platforms: [{ platform: 'Disney+' }],
        Actors: [{ actor_name: 'Oscar Isaac' }],
        review: [],
    };

    // Pengujian render halaman detail film
    it('renders movie details page correctly', async () => {
        MovieDataService.get.mockResolvedValue({ data: mockMovies });
        
        useParams.mockReturnValue({ id: 1 });

        render(
            <MemoryRouter initialEntries={['/movies/1']}>
                <Routes>
                    <Route 
                        path="/movies/:id" 
                        element={<PageDetails />}
                    />
                </Routes>
            </MemoryRouter>
        );

        // Verifikasi "Loading..." tampil sebelum data film tersedia
        expect(screen.getByText(/Loading.../i)).toBeInTheDocument();

        // Tunggu hingga data film muncul
        await waitFor(() => screen.getByText(mockMovies.title));

        // Verifikasi data film yang ditampilkan pada halaman
        expect(screen.getByText(mockMovies.title)).toBeInTheDocument();
        expect(screen.getByText(mockMovies.year)).toBeInTheDocument();

        expect(screen.getByText(/Action/i)).toBeInTheDocument();
        expect(screen.getByText(/Adventure/i)).toBeInTheDocument();

        expect(screen.getByText('8.5 / 10')).toBeInTheDocument();
        expect(screen.getByText('Disney+')).toBeInTheDocument();
        expect(screen.getByText(mockMovies.synopsis)).toBeInTheDocument();

        // Verifikasi Actor
        expect(screen.getByText('Oscar Isaac')).toBeInTheDocument();

        // Verifikasi Trailer
        expect(screen.getByTitle('Trailer')).toBeInTheDocument();
    });
});