const MovieDataService = {
    getAll: jest.fn(),
    deleteMovie: jest.fn(),
    createMovie: jest
      .fn()
      .mockResolvedValue({
        data: { message: 'Movie created successfully' },
      })
      .mockRejectedValueOnce(new Error('Failed to create movie')),
  };
  
  export default MovieDataService;
  