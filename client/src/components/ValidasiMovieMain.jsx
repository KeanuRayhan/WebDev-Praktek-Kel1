import DramaHeader from "./DramaHeader";
import TrailerSection from "./TrailerSection";
import ActorsList from "./ActorsList";
import ActorsSection from "./ActorsSection";

const ValidasiMovieMain = () => {
    return (
        <main className="flex-1 p-8">
          <div className="flex items-center mb-4 justify-between">
            <h1 className="text-2xl font-bold">Validate Movie</h1>
            <div className="flex justify-end space-x-4">
              <button className="bg-green-500 hover:bg-green-700 text-white text-xl py-2 px-4 rounded ml-2">Approve</button>
              <button className="bg-red-500 hover:bg-red-700 text-white text-xl py-2 px-4 rounded ml-2">Delete</button>
            </div>
          </div>
    
          <DramaHeader />
          <ActorsSection />
          <TrailerSection />
        </main>
    );
};

export default ValidasiMovieMain;