import React, { useState, useEffect } from 'react';

const Carousel = () => {
    const images = [
        "https://lumiere-a.akamaihd.net/v1/images/deadpool_wolverine_mobile_640x480_ad8020fd.png",
        "https://support.musicgateway.com/wp-content/uploads/2021/05/movie-poster-examples-rogue-one-1-1.jpg",
        "https://webneel.com/wnet/file/images/11-16/8-xmen-movie-poster-design.jpg",
        "https://static-prod.adweek.com/wp-content/uploads/2019/05/john-wick-poster-qa-hed-page-2019.jpg.webp",
        "https://suaragong.com/wp-content/uploads/2024/03/kungfu-panda-4.webp",
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
    };

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    };

    // Auto-scroll effect
    useEffect(() => {
        const intervalId = setInterval(() => {
            nextSlide();
        }, 5000); // Ubah setiap 3 detik

        // Bersihkan interval saat komponen unmount
        return () => clearInterval(intervalId);
    }, []); // Kosong array, artinya efek ini hanya dijalankan sekali saat komponen pertama kali di-render

    return (
        <div className="relative w-full max-w-screen-xl mx-auto mb-8">
            <div className="relative h-56 overflow-hidden rounded-lg md:h-[400px]">
                {images.map((src, idx) => (
                    <div
                        key={idx}
                        className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                            idx === currentIndex ? 'opacity-100' : 'opacity-0'
                        }`}
                    >
                        <img
                            src={src}
                            className="block w-full h-full object-cover"
                            alt={`Carousel item ${idx + 1}`}
                        />
                    </div>
                ))}
            </div>
            {/* Slider controls */}
            <button
                onClick={prevSlide}
                className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
            >
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-white/50">
                    <svg
                        className="w-4 h-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 6 10"
                    >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 1 1 5l4 4"
                        />
                    </svg>
                </span>
            </button>
            <button
                onClick={nextSlide}
                className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
            >
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 group-hover:bg-white/50">
                    <svg
                        className="w-4 h-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 6 10"
                    >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="m1 9 4-4-4-4"
                        />
                    </svg>
                </span>
            </button>
        </div>
    );
};

export default Carousel;
