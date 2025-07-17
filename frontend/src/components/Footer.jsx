// components/Footer.jsx
import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-gray-100 border-t">
      <div className="max-w-6xl mx-auto py-10 px-4 grid md:grid-cols-4 grid-cols-2 gap-8">
        <div>
          <h4 className="text-lg font-semibold mb-4">Frames</h4>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>All Frames</li>
            <li>Birthday</li>
            <li>Marriage</li>
            <li>Background</li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-4">Company</h4>
          <ul className="space-y-2 text-sm text-gray-600">
            <li><Link to={"/about"}>About Us</Link></li>
            <li><Link to={"/contact"}>Contact Us</Link></li>
            {/* <li>Careers</li> */}
            <li><Link to={"/blogs"}>Blog</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-4">Support</h4>
          <ul className="space-y-2 text-sm text-gray-600">
            <li><Link to={'/contact'}>FAQs</Link></li>
            <li><Link to={"/contact"}>Help Center</Link></li>
            <li>Returns</li>
            <li>Shipping Info</li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-4">Newsletter</h4>
          <p className="text-sm text-gray-600 mb-2">
            Subscribe to get latest updates.
          </p>
          <input
            type="email"
            placeholder="Your email"
            className="w-full p-2 rounded border border-gray-300 text-sm"
          />
          <button className="mt-2 w-full bg-green-600 text-white py-2 rounded text-sm">
            Subscribe
          </button>
        </div>
      </div>
      <div className="text-center py-4 border-t text-sm text-gray-500">
        © 2025 Frames Store. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
