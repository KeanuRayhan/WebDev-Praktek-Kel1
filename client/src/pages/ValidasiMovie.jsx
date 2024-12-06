import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import ValidasiMovieMain from "../components/ValidasiMovieMain";

const ValidasiMovie = () => {
    return (
        <div className="bg-slate-950 text-white min-h-screen">
            <Header />
            <div className="flex">
                <Sidebar />
                <ValidasiMovieMain />
            </div>
        </div>
    )
};

export default ValidasiMovie;