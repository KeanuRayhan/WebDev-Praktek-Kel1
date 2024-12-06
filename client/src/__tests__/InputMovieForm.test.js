import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import InputMovieForm from '../components/InputMovieForm';
import { MemoryRouter } from 'react-router-dom';
import MovieDataService from '../services/movie.service';

jest.mock('../services/movie.service');
// jest.mock('axios');

describe('InputMovieForm', () => {
    beforeEach(() => {
        // Reset the mock implementation before each test
        MovieDataService.createMovie.mockResolvedValue({ data: { message: 'Movie created successfully' } });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    beforeAll(() => {
        jest.spyOn(window, 'alert').mockImplementation(() => {});
    });

    beforeAll(() => {
        jest.spyOn(console, 'log').mockImplementation(() => {});
    });

    it('renders form correctly', () => {
        render(
            <MemoryRouter>
                <InputMovieForm />
            </MemoryRouter>
        );

        // Check if form fields are rendered
        // Check if title input are rendered
        expect(screen.getByLabelText(/Title/i)).toBeInTheDocument();
        // Check if year input are rendered
        expect(screen.getByLabelText(/Year/i)).toBeInTheDocument();
        // Check if country input are rendered
        expect(screen.getByLabelText(/Country/i)).toBeInTheDocument();
    });   

    it('calls the submit function when form is submitted', async () => {
        render(
            <MemoryRouter>
                <InputMovieForm />
            </MemoryRouter>
        );

        // Fill in the form fields
        fireEvent.change(screen.getByLabelText(/Title/i), { target: { value: 'Unit Test Movie' } });
        fireEvent.change(screen.getByLabelText(/Year/i), { target: { value: '2024' } });
        fireEvent.change(screen.getByLabelText(/Synopsis/i), { target: { value: 'A movie for unit testing purposes.' } });
        fireEvent.change(screen.getByLabelText(/Country/i), { target: { value: '1' } });

        // Submit the form
        const submitButton = screen.getByRole('button', { name: /submit/i });

        // Use act to ensure async updates are handled
        await act(async () => {
            fireEvent.click(submitButton);
        });

        // Ensure the movie creation API is called
        await waitFor(() => {
            expect(MovieDataService.createMovie).toHaveBeenCalledTimes(1);
        });

        // Check if the success message is displayed
        // expect(screen.getByText(/Movie created successfully/i)).toBeInTheDocument();
    });
});