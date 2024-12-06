import React from 'react';

const ActorsList = ({ actors }) => {
    return (
        <div className="mt-8 grid grid-cols-10 gap-1">
            {actors.map((actor, index) => {
                return (
                    <div key={index} className="text-center">
                        <img 
                            src={`https://webdev-praktek-kel1-production.up.railway.app/uploads/actors/${actor.url_photo}`} 
                            alt={actor.actor_name} 
                            className="w-24 h-36 mx-auto rounded bg-gray-700 object-cover" 
                        />
                        <p className="mt-2">{actor.actor_name}</p>
                    </div>
                )
            })}
        </div>
    );
};

export default ActorsList;
