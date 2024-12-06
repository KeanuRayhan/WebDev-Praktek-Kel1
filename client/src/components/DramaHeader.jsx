const DramaHeader = () => {
    return (
      <div className="mt-8 flex space-x-8">
        <img src="poster.png" alt="Poster Drama" className="w-1/3 h-96 rounded bg-gray-700 object-cover" />
        <div className="space-y-4">
          <h1 className="text-3xl font-bold text-white">Title of the Drama That Makes Two Lines</h1>
          <p><strong>Other titles:</strong> Title 2, Title 3, Title 4</p>
          <p><strong>Year:</strong> 2024</p>
          <p><strong>Synopsis:</strong> Some long synopsis where I don’t know what I’m writing. But let’s make it two genres. I must include genres and actors. That’s what I must do. Blah blah blah...</p>
          <p><strong>Genres:</strong> Genre 1, Genre 2, Genre 3</p>
          <p><strong>Rating:</strong> 9.8</p>
          <p><strong>Availability:</strong> Available @website.on.XYZ</p>
        </div>
      </div>
    );
};

export default DramaHeader;