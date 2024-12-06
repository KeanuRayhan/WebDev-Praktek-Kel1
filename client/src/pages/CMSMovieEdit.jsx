import Header from "../components/Header";
import EditMovieForm from "../components/EditMovieForm";
import Sidebar from "../components/Sidebar";
import { useParams } from "react-router-dom";

const CMSMovieEdit = () => {
    const { movieId } = useParams();
    return (
        <div className="bg-gray-900 text-white min-h-screen">
            <Header />
            <div className="flex">
                <Sidebar />
                <EditMovieForm movieId={movieId} />
            </div>
        </div>
    );
};

export default CMSMovieEdit;
