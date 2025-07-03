import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Image */}
      <div className="hidden md:flex w-8/12 bg-dark-blue items-center justify-center ">
        <img
          src="/homepage.png"
          alt="Chat Illustration"
          className=" max-h-screen object-cover"
        />
      </div>

      {/* Right Panel - Content */}
      <div className="w-full md:w-1/2 bg-black text-white flex flex-col justify-between p-8">
        {/* App Name */}
        <div>
          <h1 className="text-5xl font-bold text-center text-white mb-4">
           Love Finder
          </h1>
          <p className="text-center text-gray-400 mb-10">
            Simple & Secure Real-Time Chat
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col items-center gap-4">
          <Link to="/login" className="w-full max-w-xs">
            <button className="w-full bg-dark-blue border-white border-2 font-bold text-white py-3 rounded-xl hover:bg-blue-800 transition-all">
              Login
            </button>
          </Link>
          <Link to="/register" className="w-full max-w-xs">
            <button className="w-full font-bold  bg-white text-black py-3 rounded-xl hover:bg-gray-200 transition-all">
              Register
            </button>
          </Link>
        </div>

        {/* Footer */}
        <footer className="text-center text-sm  text-gray-500 mt-10 ">
          &copy; {new Date().getFullYear()} Love Finder. All rights reserved.
        </footer>
      </div>
    </div>
  );
};

export default Home;
