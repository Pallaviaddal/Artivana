import React from "react";

function Careers() {
  return (
    <div className="bg-white px-6 py-16 max-w-6xl mx-auto mt-20">
      <h1 className="text-4xl font-bold text-center text-green-900 mb-4">Careers at Frames Store</h1>
      <p className="text-center text-gray-700 mb-12">
        Join our mission to bring happiness and creativity into homes through beautiful frames.
      </p>

      {/* Open Positions */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Job Card */}
        <div className="border p-6 rounded-lg shadow hover:shadow-md transition">
          <h2 className="text-xl font-semibold text-green-800">Frontend Developer</h2>
          <p className="text-gray-600 mt-2">
            We are looking for a creative React developer who can build beautiful user experiences for our online store.
          </p>
          <ul className="mt-4 text-sm text-gray-700 list-disc pl-5 space-y-1">
            <li>Experience with React.js & Tailwind CSS</li>
            <li>Good eye for design and UX</li>
            <li>Understanding of REST APIs</li>
          </ul>
          <button className="mt-4 inline-block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
            Apply Now
          </button>
        </div>

        <div className="border p-6 rounded-lg shadow hover:shadow-md transition">
          <h2 className="text-xl font-semibold text-green-800">Graphic Designer</h2>
          <p className="text-gray-600 mt-2">
            Design posters, frames, and marketing material. Your creativity will shape how we inspire customers.
          </p>
          <ul className="mt-4 text-sm text-gray-700 list-disc pl-5 space-y-1">
            <li>Proficiency in Photoshop/Illustrator</li>
            <li>Strong portfolio</li>
            <li>Attention to visual detail</li>
          </ul>
          <button className="mt-4 inline-block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
            Apply Now
          </button>
        </div>
      </div>

      {/* Call to Action */}
      <div className="mt-16 text-center">
        <h3 className="text-xl font-semibold mb-2 text-gray-800">Didn't find a role that suits you?</h3>
        <p className="text-gray-600">
          We're always on the lookout for talented people. Email us at{" "}
          <a href="mailto:careers@framestore.com" className="text-blue-500 underline">
            careers@framestore.com
          </a>{" "}
          and tell us why you’d be a great fit!
        </p>
      </div>
    </div>
  );
}

export default Careers;
