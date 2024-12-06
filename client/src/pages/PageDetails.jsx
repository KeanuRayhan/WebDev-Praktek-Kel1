import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import TrailerSection from '../components/TrailerSection';
import ActorsList from '../components/ActorsList';
import ReviewsSection from '../components/ReviewsSection';
import SidebarHome from '../components/SidebarHome';
import Dramadetails from '../components/Dramadetails';
import Synopsis from '../components/Synopsis';
import MovieDataService from '../services/movie.service';
import AddReviewSection from '../components/AddReviewSection';

const PageDetails = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);

    useEffect(() => {
        MovieDataService.get(id)
            .then((response) => {
                setMovie(response.data);
                console.log(response.data);
            })
            .catch((e) => {
                console.log(e);
            });
    }, [id]);

    const handleReviewAdded = (newReview) => {
        setMovie((prevMovie) => ({
            ...prevMovie,
            reviews: [...(prevMovie.reviews || []), newReview]
        }));
    };

    return (
        <div className="bg-slate-900 min-h-screen text-white">
            {/* Header Section */}
            <Header />
            
            {/* Main Content with Sidebar */}
            <div className="flex">
                {/* Sidebar */}
                <SidebarHome />

                {/* Main Content */}
                <main className="w-5/6 p-4 ml-[16.67%]">
                    {movie ? (
                        <> 
                            {/* Trailer Section */}
                            <TrailerSection videoUrl={movie.link_trailer}/>
                            {/* Movie Details Section */}
                            <section className="mb-8">
                                <Dramadetails 
                                    poster={movie.url_photo}
                                    title={movie.title}
                                    year={movie.year}
                                    genres={movie.Genres.map((genre) => genre.genre)}
                                    availability={movie.Platforms.map((platform) => platform.platform)}
                                    rating={movie.rating}
                                />
                            </section>

                            {/* Synopsis Section */}
                            <Synopsis 
                                synopsis={movie.synopsis}
                            />

                            {/* Actors List Section */}
                            <section className="mt-12">
                                <h2 className="text-xl font-bold text-white">Cast</h2>
                                <ActorsList actors={movie.Actors}/>
                            </section>

                            {/* Reviews Section */}
                            <section className="mt-12">
                                <ReviewsSection reviews={movie.reviews}/>
                            </section>

                            <section className="mt-8">
                                <AddReviewSection movieId={id} onReviewAdded={handleReviewAdded} />
                            </section>
                        </>
                    ) : (
                        <p>Loading...</p>
                    )}
                </main>
            </div>
        </div>
    );
};

export default PageDetails;
