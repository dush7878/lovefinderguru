import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Image */}
      <div className="hidden md:flex w-1/2 bg-dark-blue items-center justify-center p-8">
        <img
          src="https://source.unsplash.com/600x600/?chat,technology"
          alt="Chat Illustration"
          className="rounded-2xl shadow-lg max-h-[80%] object-cover"
        />
      </div>

      {/* Right Panel - Content */}
      <div className="w-full md:w-1/2 bg-black text-white flex flex-col justify-between p-8">
        {/* App Name */}
        <div>
          <h1 className="text-5xl font-bold text-center text-white mb-4">
            ChatSync
          </h1>
          <p className="text-center text-gray-400 mb-10">
            Simple & Secure Real-Time Chat
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col items-center gap-4">
          <Link to="/login" className="w-full max-w-xs">
            <button className="w-full bg-dark-blue text-white py-3 rounded-xl hover:bg-blue-800 transition-all">
              Login
            </button>
          </Link>
          <Link to="/register" className="w-full max-w-xs">
            <button className="w-full bg-white text-black py-3 rounded-xl hover:bg-gray-200 transition-all">
              Register
            </button>
          </Link>
        </div>

        {/* Footer */}
        <footer className="text-center text-sm  text-gray-500 mt-10 ">
          &copy; {new Date().getFullYear()} ChatSync. All rights reserved.
        </footer>
      </div>
    </div>
  );
};

export default Home;
