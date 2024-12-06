import { Link } from "react-router-dom";

const DramaTable = ({ movies, onDelete, startIndex }) => {
    return (
      <table className="min-w-full bg-gray-800 shadow-lg rounded-lg">
        <thead className="bg-gray-700 text-white">
          <tr>
            <th className="py-2 px-4 text-left border-b border-gray-500">No</th>
            <th className="py-2 px-4 text-left w-2/12 border-b border-gray-500">Movie</th>
            <th className="py-2 px-4 text-left w-2/12 border-b border-gray-500">Actors</th>
            <th className="py-2 px-4 text-left w-2/12 border-b border-gray-500">Genres</th>
            <th className="py-2 px-4 text-left w-3/12 border-b border-gray-500">Synopsis</th>
            <th className="py-2 px-4 text-left w-2/12 border-b border-gray-500">Status</th>
            <th className="py-2 px-4 text-left w-1/12 border-b border-gray-500">Action</th>
          </tr>
        </thead>
        <tbody>
          {movies && movies.map((movie, index) => (
            <tr className="border-t border-gray-600 hover:bg-gray-700 transition" key={movie.movie_id}>
              <td className="p-4">{startIndex + index}</td>
              <td className="p-4">
                <p>{movie.title}</p>
              </td>
              <td className="p-4">
                <span>{movie.Actors.map(actor => actor.actor_name).join(', ')}</span>
              </td>
              <td className="p-4">
                <p>{movie.Genres.map(genre => genre.genre).join(', ')}</p>
              </td>
              <td className="p-4">
                <p>{movie.synopsis}</p>
              </td>
              <td className="p-4">
                <p>{movie.status}</p>
              </td>
              <td className="p-4">
                <Link
                  to={`/edit-movie/${movie.movie_id}`}
                  className="bg-blue-500 text-white font-bold py-1 px-3 rounded hover:bg-blue-600 transition mr-2"
                >
                  Edit
                </Link>
                <button
                  onClick={() => onDelete(movie.movie_id)}
                  className="bg-red-500 text-white font-bold py-1 px-3 rounded hover:bg-red-600 transition mt-2"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
};

export default DramaTable;