import React from 'react';

const Banner = () => {
  return (
    <div className="bg-gradient-to-r from-yellow-300 via-orange-400 to-red-500 p-6 text-white text-center rounded-lg shadow-lg max-w-4xl mx-auto mt-8">

      <div className="flex justify-center space-x-4">
        <img
          src="https://placekitten.com/200/300"
          alt="Cute Cat 1"
          className="w-40 h-40 object-cover rounded-lg shadow-lg"
        />
        <img
          src="https://placekitten.com/250/350"
          alt="Cute Cat 2"
          className="w-40 h-40 object-cover rounded-lg shadow-lg"
        />
      </div>
    </div>
  );
};

export default Banner;
