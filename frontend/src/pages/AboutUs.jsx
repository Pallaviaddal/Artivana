import React from "react";
// import SplashCursor from '../utils/SplashCursor'



function AboutUs() {
  return (
    <div className="bg-white">
      <section className="text-center py-10 px-4 max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-green-800 mb-4">About Us</h1>
        <p className="text-gray-600 text-lg mb-6">
          Welcome to <span className="font-semibold">Frames Store</span> — your one-stop
          destination for beautiful, handcrafted digital photo frames. Whether
          you're looking to celebrate a birthday, wedding, or simply decorate
          your home with style, we offer a curated collection to meet every mood
          and moment.
        </p>
        <p className="text-gray-600">
          Our mission is to bring joy, creativity, and elegance to your personal
          spaces through unique digital frames. Designed with care and delivered
          with love, every frame tells a story — your story.
        </p>
      </section>

      <section className="bg-gray-50 py-16 px-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 text-center">
          <div>
            <h3 className="text-xl font-semibold mb-2">Premium Designs</h3>
            <p className="text-gray-600 text-sm">
              Each frame is thoughtfully crafted to match your vibe, space, and occasion.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Customer First</h3>
            <p className="text-gray-600 text-sm">
              Your happiness matters. We ensure a smooth, delightful experience from browse to checkout.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Fast & Reliable</h3>
            <p className="text-gray-600 text-sm">
              Get instant downloads and updates with secure payment and support.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 max-w-4xl mx-auto">
        {/* <SplashCursor /> */}
        <h2 className="text-2xl font-bold text-center text-green-800 mb-6">
          Our Journey
        </h2>
        <p className="text-gray-600 text-center">
          Founded in 2024, Frames Store began as a passion project by creative
          minds who believed art and emotion could be digitally framed to last
          forever. Today, we’re proud to serve thousands of happy customers and
          keep growing every day with your support.
        </p>
      </section>
    </div>
  );
}

export default AboutUs;
