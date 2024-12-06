import Header from '../components/Header';
import TrailerSection from '../components/TrailerSection';
import ActorsList from '../components/ActorsList';
import ReviewsSection from '../components/ReviewsSection';
import SidebarHome from '../components/SidebarHome';

const MovieDetails = () => {
    return (
        <div className="bg-black min-h-screen text-white">
            {/* Header Section */}
            <Header />
            
            {/* Main Content with Sidebar */}
            <div className="flex">
                {/* Sidebar */}
                <SidebarHome />

                {/* Main Content */}
                <main className="w-5/6 p-4">
                    {/* Movie Title and Summary */}
                    <section className="mb-8">
                        <h1 className="text-4xl font-bold mb-4">Movie Title</h1>
                        <p className="text-gray-400">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque volutpat...</p>
                    </section>

                    {/* Trailer Section */}
                    <TrailerSection />

                    {/* Actors List Section */}
                    <section className="mt-12">
                        <h2 className="text-xl font-bold text-white">Cast</h2>
                        <ActorsList />
                    </section>

                    {/* Reviews Section */}
                    <section className="mt-12">
                        <ReviewsSection />
                    </section>
                </main>
            </div>
        </div>
    );
};

export default MovieDetails;
