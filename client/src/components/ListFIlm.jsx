const ListFilm = () => {
    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <div className="flex space-x-4">
                    <select className="border rounded-base p-2 bg-gray-700">
                        <option>Year</option>
                    </select>
                    <select className="border rounded-base p-2 bg-gray-700">
                        <option>Genre</option>
                    </select>
                    <select className="border rounded-base p-2 bg-gray-700">
                        <option>Status</option>
                    </select>
                    <select className="border rounded-base p-2 bg-gray-700">
                        <option>Availability</option>
                    </select>
                    <select className="border rounded-base p-2 bg-gray-700">
                        <option>Award</option>
                    </select>
                </div>
                <button className="px-4 py-2 bg-yellow-500 text-black font-bold rounded hover:bg-yellow-600">Submit</button>
                <select className="border rounded-base p-2 bg-gray-700">
                    <option>Alphabetics</option>
                </select>
            </div>

            {/* <!-- Drama List --> */}
            <div className="grid grid-cols-5 gap-4">
                {/* <!-- Drama Card --> */}
                <div className=" bg-gray-800 border border-gray-700 shadow rounded-base p-4">
                    <div className="bg-gray-200 h-56 mb-4"></div>
                    <h2 className="text-base leading-5 font-bold mb-2 text-white">Title of the drama 1 that makes two lines</h2>
                    <p className="text-sm">2024</p>
                    <p className="text-sm">Genre 1, Genre 2, Genre 3</p>
                    <p className="text-sm">Rate 3.5/5</p>
                    <p className="text-sm">19 views</p>
                </div>

                {/* <!-- Repeat Drama Card for each drama --> */}
                {/* <!-- (copy the above div for multiple cards) --> */}

                {/* <!-- Placeholder Cards --> */}
                <div className=" bg-gray-800 border border-gray-700 shadow rounded-base p-4">
                    <div className="bg-gray-200 h-56 mb-4"></div>
                    <h2 className="text-base leading-5 font-bold mb-2 text-white">Title of the drama 1 that makes two lines</h2>
                    <p className="text-sm">2024</p>
                    <p className="text-sm">Genre 1, Genre 2, Genre 3</p>
                    <p className="text-sm">Rate 3.5/5</p>
                    <p className="text-sm">19 views</p>
                </div>

                <div className=" bg-gray-800 border border-gray-700 shadow rounded-base p-4">
                    <div className="bg-gray-200 h-56 mb-4"></div>
                    <h2 className="text-base leading-5 font-bold mb-2 text-white">Title of the drama 1 that makes two lines</h2>
                    <p className="text-sm">2024</p>
                    <p className="text-sm">Genre 1, Genre 2, Genre 3</p>
                    <p className="text-sm">Rate 3.5/5</p>
                    <p className="text-sm">19 views</p>
                </div>

                <div className=" bg-gray-800 border border-gray-700 shadow rounded-base p-4">
                    <div className="bg-gray-200 h-56 mb-4"></div>
                    <h2 className="text-base leading-5 font-bold mb-2 text-white">Title of the drama 1 that makes two lines</h2>
                    <p className="text-sm">2024</p>
                    <p className="text-sm">Genre 1, Genre 2, Genre 3</p>
                    <p className="text-sm">Rate 3.5/5</p>
                    <p className="text-sm">19 views</p>
                </div>

                {/* <!-- Row 2 --> */}
                <div className=" bg-gray-800 border border-gray-700 shadow rounded-base p-4">
                    <div className="bg-gray-200 h-56 mb-4"></div>
                    <h2 className="text-base leading-5 font-bold mb-2 text-white">Title of the drama 1 that makes two lines</h2>
                    <p className="text-sm">2024</p>
                    <p className="text-sm">Genre 1, Genre 2, Genre 3</p>
                    <p className="text-sm">Rate 3.5/5</p>
                    <p className="text-sm">19 views</p>
                </div>

                <div className=" bg-gray-800 border border-gray-700 shadow rounded-base p-4">
                    <div className="bg-gray-200 h-56 mb-4"></div>
                    <h2 className="text-base leading-5 font-bold mb-2 text-white">Title of the drama 1 that makes two lines</h2>
                    <p className="text-sm">2024</p>
                    <p className="text-sm">Genre 1, Genre 2, Genre 3</p>
                    <p className="text-sm">Rate 3.5/5</p>
                    <p className="text-sm">19 views</p>
                </div>

                <div className=" bg-gray-800 border border-gray-700 shadow rounded-base p-4">
                    <div className="bg-gray-200 h-56 mb-4"></div>
                    <h2 className="text-base leading-5 font-bold mb-2 text-white">Title of the drama 1 that makes two lines</h2>
                    <p className="text-sm">2024</p>
                    <p className="text-sm">Genre 1, Genre 2, Genre 3</p>
                    <p className="text-sm">Rate 3.5/5</p>
                    <p className="text-sm">19 views</p>
                </div>

                <div className=" bg-gray-800 border border-gray-700 shadow rounded-base p-4">
                    <div className="bg-gray-200 h-56 mb-4"></div>
                    <h2 className="text-base leading-5 font-bold mb-2 text-white">Title of the drama 1 that makes two lines</h2>
                    <p className="text-sm">2024</p>
                    <p className="text-sm">Genre 1, Genre 2, Genre 3</p>
                    <p className="text-sm">Rate 3.5/5</p>
                    <p className="text-sm">19 views</p>
                </div>

                <div className=" bg-gray-800 border border-gray-700 shadow rounded-base p-4">
                    <div className="bg-gray-200 h-56 mb-4"></div>
                    <h2 className="text-base leading-5 font-bold mb-2 text-white">Title of the drama 1 that makes two lines</h2>
                    <p className="text-sm">2024</p>
                    <p className="text-sm">Genre 1, Genre 2, Genre 3</p>
                    <p className="text-sm">Rate 3.5/5</p>
                    <p className="text-sm">19 views</p>
                </div>

                <div className=" bg-gray-800 border border-gray-700 shadow rounded-base p-4">
                    <div className="bg-gray-200 h-56 mb-4"></div>
                    <h2 className="text-base leading-5 font-bold mb-2 text-white">Title of the drama 1 that makes two lines</h2>
                    <p className="text-sm">2024</p>
                    <p className="text-sm">Genre 1, Genre 2, Genre 3</p>
                    <p className="text-sm">Rate 3.5/5</p>
                    <p className="text-sm">19 views</p>
                </div>

            </div>
        </div>

    )
}

export default ListFilm