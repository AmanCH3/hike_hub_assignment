import React from 'react';

export default function Footer() {
  return (
    <div className="bg-green-500 py-16 px-6  ">
      <div className="flex flex-col justify-center items-center text-center space-y-6  mx-auto">
        <h1 className="text-4xl md:text-5xl text-white font-bold">
          Ready for Your Next Adventure?
        </h1>
        <p className="text-white text-lg max-w-2xl">
          Join our community of hikers today and discover beautiful trails, connect with fellow adventurers, and track your hiking journey.
        </p>
        <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-6 py-3 rounded-md transition">
          Get Started
        </button>
      </div>
    </div>
  );
}
