import Header from "../components/Header"
import InputMovieForm from "../components/InputMovieForm"
import Sidebar from "../components/Sidebar"

const CMSMovieInput = () => {
    return (
        <div className="bg-gray-900 text-white min-h-screen">
            <Header />
            <div className="flex">
                <Sidebar />
                <InputMovieForm />
            </div>
        </div>
    );
};

export default CMSMovieInput;