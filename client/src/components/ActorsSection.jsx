const ActorsSection = () => {
    const actors = ['actor1.png', 'actor2.png', 'actor3.png', 'actor4.png', 'actor5.png'];
  
    return (
      <div className="mt-8 grid grid-cols-10 gap-1">
        {actors.map((actor, index) => (
          <div className="text-center" key={index}>
            <img src={actor} alt={`Actor ${index + 1}`} className="w-24 h-36 mx-auto rounded bg-gray-700 object-cover" />
            <p className="mt-2">Actor Name</p>
          </div>
        ))}
      </div>
    );
};

export default ActorsSection;