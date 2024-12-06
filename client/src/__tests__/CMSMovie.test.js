import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { MemoryRouter } from "react-router-dom";
import CMSMovie from '../pages/CMSMovie'; // Sesuaikan path-nya
import MovieDataService from '../services/movie.service';
import { act } from 'react';

jest.mock('../services/movie.service'); // Mock service

const mockMovies = [
  {
    movie_id: 1,
    title: 'Moon Knight',
    Actors: [{ actor_name: 'Oscar Isaac' }],
    Genres: [{ genre: 'Action' }],
    synopsis: "Steven Grant discovers he's been granted the powers of an Egyptian moon god. But he soon finds out that these newfound powers can be both a blessing and a curse to his troubled life.",
    status: 'approved',
  },
  {
    movie_id: 2,
    title: 'Avenger : Endgame',
    Actors: [{ actor_name: 'Chris Evans' }],
    Genres: [{ genre: 'Action' }],
    synopsis: "After the devastating events of Avengers: Infinity War (2018), the universe is in ruins. With the help of remaining allies, the Avengers assemble once more in order to reverse Thanos' actions and restore balance to the universe.",
    status: 'approved',
  },
];

// Mock window.confirm
globalThis.confirm = jest.fn();

global.alert = jest.fn();

describe('CMSMovie Page', () => {
  it('should retrieve and display movies', async () => {
    // Mock API response
    MovieDataService.getAll.mockResolvedValueOnce({ data: mockMovies });

    render(
      <MemoryRouter>
        <CMSMovie />
      </MemoryRouter>
    );

    // Verify API call
    expect(MovieDataService.getAll).toHaveBeenCalledTimes(1);

    // Wait for movies to be rendered
    await waitFor(() => {
      const movieRows = screen.getAllByRole('row'); // Each movie is rendered as a row
      expect(movieRows).toHaveLength(mockMovies.length + 1); // +1 for header row
    });

    // Check if specific movie data is displayed
    mockMovies.forEach((movie) => {
      expect(screen.getByText(movie.title)).toBeInTheDocument();
      // expect(screen.getByText(movie.status)).toBeInTheDocument();
    });
  });
});

describe('CMSMovie - Delete Movie Functionality', () => {
  it('should call deleteMovie and remove movie from the list on successful deletion', async () => {
    // Mock getAll untuk memuat film awal
    MovieDataService.getAll.mockResolvedValueOnce({ data: mockMovies });

    // Mock deleteMovie untuk penghapusan berhasil
    MovieDataService.deleteMovie.mockResolvedValueOnce({});

    globalThis.confirm.mockReturnValue(true);
    global.alert.mockReturnValue(true);

    await act(async () => {
      render(
        <MemoryRouter>
          <CMSMovie />
        </MemoryRouter>
      );
    });

    // Patikan film dimuat
    expect(screen.getByText('Moon Knight')).toBeInTheDocument();
    expect(screen.getByText('Avenger : Endgame')).toBeInTheDocument();

    // Klik tombol delete untuk movie_id 1
    const deleteButton = screen.getAllByText('Delete')[0];
    await act(async () => {
      fireEvent.click(deleteButton);
    });

    // Pastikan API deleteMovie dipanggil dengan ID yang benar
    expect(MovieDataService.deleteMovie).toHaveBeenCalledWith(1);

    // Pastikan film dengan ID 1 dihapus dari daftar
    expect(screen.queryByText('Moon Knight')).not.toBeInTheDocument();
    expect(screen.getByText('Avenger : Endgame')).toBeInTheDocument();
  });

  it('should not delete movie if confirm is canceled', async () => {
    // Mock getAll untuk memuat film awal
    MovieDataService.getAll.mockResolvedValueOnce({ data: mockMovies });

    // Mock deleteMovie untuk penghapusan berhasil
    MovieDataService.deleteMovie.mockResolvedValueOnce({});

    globalThis.confirm.mockReturnValue(false);

    await act(async () => {
      render(
        <MemoryRouter>
          <CMSMovie />
        </MemoryRouter>
      );
    });

    // Patikan film dimuat
    expect(screen.getByText('Moon Knight')).toBeInTheDocument();
    expect(screen.getByText('Avenger : Endgame')).toBeInTheDocument();

    // Klik tombol delete untuk movie_id 1
    const deleteButton = screen.getAllByText('Delete')[0];
    await act(async () => {
      fireEvent.click(deleteButton);
    });

    // Pastikan API deleteMovie tidak dipanggil
    expect(MovieDataService.deleteMovie).not.toHaveBeenCalled();

    // Pastikan film tidak dihapus
    expect(screen.getByText('Moon Knight')).toBeInTheDocument();
    expect(screen.getByText('Avenger : Endgame')).toBeInTheDocument();
  });

  it('should handle error if deleteMovie fails', async () => {
    // Mock getAll untuk memuat film awal
    MovieDataService.getAll.mockResolvedValueOnce({ data: mockMovies });

    // Mock deleteMovie untuk penghapusan gagal
    MovieDataService.deleteMovie.mockRejectedValueOnce(new Error('Failed to delete movie'));

    // Mock confirm agar selalu mengembalikan true
    globalThis.confirm.mockReturnValue(true);

    // Render komponen
    await act(async () => {
      render(
        <MemoryRouter>
          <CMSMovie />
        </MemoryRouter>
      );
    });

    // Klik tombol delete untuk movie_id 1
    const deleteButton = screen.getAllByText('Delete')[0];
    await act(async () => {
      fireEvent.click(deleteButton);
    });

    // Pastikan API deleteMovie dipanggil dengan ID yang benar
    expect(MovieDataService.deleteMovie).toHaveBeenCalledWith(1);

    // Pastikan film tetap ada di daftar karena penghapusan gagal
    expect(screen.getByText('Moon Knight')).toBeInTheDocument();
  });
});