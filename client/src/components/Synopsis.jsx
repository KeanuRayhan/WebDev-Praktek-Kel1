import React from 'react';

const Synopsis = ({ synopsis }) => {
    return (
        <section className="mt-12">
            <h2 className="text-xl font-bold text-white">Synopsis</h2>
            <p className="text-gray-400 mt-4">
                {synopsis}
            </p>
        </section>
    );
};

export default Synopsis;
