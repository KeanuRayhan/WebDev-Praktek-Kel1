import React from 'react';

const Dramalist = () => (
  <div className="grid grid-cols-5 gap-4">
    {/* Drama Card */}
    <div className="bg-gray-800 border border-gray-700 shadow rounded-lg p-4">
      <div className="bg-gray-200 h-80 mb-4"></div>
      <h2 className="text-lg leading-5 font-bold mb-2 text-white">Title of the drama 1 that makes two lines</h2>
      <p className="text-base">2024</p>
      <p className="text-base">Genre 1, Genre 2, Genre 3</p>
      <p className="text-base">Rate 3.5/5</p>
      <p className="text-base">19 views</p>
    </div>
    {/* Repeat Drama Card for other dramas */}
  </div>
);

export default Dramalist;
