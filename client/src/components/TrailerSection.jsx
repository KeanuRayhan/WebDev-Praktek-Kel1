import React from 'react';

const TrailerSection = ({ videoUrl }) => {
    const getEmbedUrl = (url) => {
        if (!url) return '';
        
        const urlParts = new URL(url);
        const videoId = urlParts.searchParams.get('v');
        if (!videoId) return ''; 
        
        return `https://www.youtube.com/embed/${videoId}`;
    };

    const embedUrl = getEmbedUrl(videoUrl);
    console.log('Embed URL:', embedUrl);

    return (
        <div className="w-auto mx-auto mt-2">
            <div className="mt-4">
                <iframe
                    width="100%"
                    height="480"
                    src={embedUrl}
                    title="Trailer"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="rounded border border-gray-700"
                ></iframe>
            </div>
        </div>
    );
};

export default TrailerSection;
