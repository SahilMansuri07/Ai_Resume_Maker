import { useState } from "react";
import { FaUserAlt, FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Header({ user, handleLogout }) {
  const [menuOpen, setMenuOpen] = useState(false);

  // Closes mobile menu when clicking any link
  const handleLinkClick = () => setMenuOpen(false);

  return (
    <header className="bg-gradient-to-r from-[#14032e] via-[#1d1936] to-[#3b157e] shadow-lg z-50">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex-1 flex items-center gap-3">
            <Link to={"/"} className="block" onClick={handleLinkClick}>
              <h2 className="text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-purple-300 to-indigo-400 drop-shadow">
                ResumeGenie AI
              </h2>
            </Link>
          </div>

          {/* Hamburger for mobile */}
          <div className="flex md:hidden">
            <button
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              className="text-gray-200 focus:outline-none text-2xl"
            >
              {menuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:gap-12">
            <nav aria-label="Global">
              <ul className="flex items-center gap-6 text-base">
                <li>
                  <Link
                    to={"/about"}
                    className="text-gray-200 hover:text-purple-300 transition font-medium"
                  >
                    About
                  </Link>
                </li>
                {user && (
                  <>
                    <li>
                      <Link
                        to={"/CheckScore"}
                        className="text-gray-200 hover:text-purple-300 transition font-medium"
                      >
                        Check Score
                      </Link>
                    </li>
                    <li>
                      <Link
                        to={"/Addresume"}
                        className="text-gray-200 hover:text-purple-300 transition font-medium"
                      >
                        Add Resume
                      </Link>
                    </li>
                    <li>
                      <Link
                        to={"/dashboard/resumes"}
                        className="text-gray-200 hover:text-purple-300 transition font-medium"
                      >
                        Dashboard
                      </Link>
                    </li>
                  </>
                )}
                <li>
                  <Link
                    to={"/contact"}
                    className="text-gray-200 hover:text-purple-300 transition font-medium"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </nav>

            {/* Auth Buttons or User Name */}
            <div className="flex items-center gap-4">
              <div className="sm:flex sm:gap-4">
                {!user ? (
                  <>
                    <Link
                      to={"/login"}
                      className="rounded-md bg-gradient-to-r from-purple-600 via-indigo-500 to-purple-700 px-5 py-2.5 text-sm font-semibold text-white shadow hover:from-purple-700 hover:to-indigo-800 transition"
                    >
                      Login
                    </Link>
                    <div className="hidden sm:flex">
                      <Link
                        to={"/register"}
                        className="rounded-md border border-purple-500 px-5 py-2.5 text-sm font-semibold text-gray-200 hover:bg-purple-700 hover:text-white hover:border-purple-700 transition"
                      >
                        Register
                      </Link>
                    </div>
                  </>
                ) : (
                  <>
                    <span className="text-gray-200 text-base px-4 py-2 flex items-center justify-center gap-2 rounded bg-white/10 border border-purple-600">
                      <FaUserAlt />
                      Hello, {user.username}
                    </span>
                    <button
                      onClick={handleLogout}
                      className="rounded-md border border-purple-500 px-4 py-2 text-sm font-semibold text-gray-200 hover:bg-purple-700 hover:text-white hover:border-purple-700 transition"
                    >
                      Logout
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setMenuOpen(false)}
        />
      )}
      {/* Mobile Slide-in Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-gradient-to-b from-[#14032e] via-[#2d175f] to-[#3b157e] shadow-2xl transform ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 z-50 md:hidden`}
      >
        <nav className="p-7">
          <ul className="flex flex-col gap-7 text-lg">
            <li>
              <Link
                to={"/about"}
                className="text-gray-200 hover:text-purple-300 transition font-medium"
                onClick={handleLinkClick}
              >
                About
              </Link>
            </li>
            {user && (
              <>
                <li>
                  <Link
                    to={"/CheckScore"}
                    className="text-gray-200 hover:text-purple-300 transition font-medium"
                    onClick={handleLinkClick}
                  >
                    Check Score
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/Addresume"}
                    className="text-gray-200 hover:text-purple-300 transition font-medium"
                    onClick={handleLinkClick}
                  >
                    Add Resume
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/feedback"}
                    className="text-gray-200 hover:text-purple-300 transition font-medium"
                    onClick={handleLinkClick}
                  >
                    Feedback
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/dashboard/resumes"}
                    className="text-gray-200 hover:text-purple-300 transition font-medium"
                    onClick={handleLinkClick}
                  >
                    Dashboard
                  </Link>
                </li>
              </>
            )}
            <li>
              <Link
                to={"/contact"}
                className="text-gray-200 hover:text-purple-300 transition font-medium"
                onClick={handleLinkClick}
              >
                Contact
              </Link>
            </li>
            <li>
              {!user ? (
                <>
                  <Link
                    to={"/login"}
                    className="rounded-md bg-gradient-to-r from-purple-600 via-indigo-500 to-purple-700 px-5 py-2.5 text-sm font-semibold text-white shadow hover:from-purple-700 hover:to-indigo-800 transition block"
                    onClick={handleLinkClick}
                  >
                    Login
                  </Link>
                  <Link
                    to={"/register"}
                    className="rounded-md border border-purple-500 px-5 py-2.5 text-sm font-semibold text-gray-200 hover:bg-purple-700 hover:text-white hover:border-purple-700 transition block mt-3"
                    onClick={handleLinkClick}
                  >
                    Register
                  </Link>
                </>
              ) : (
                <>
                  <span className="text-gray-200 text-base flex items-center gap-2 px-2 py-1 bg-white/10 border border-purple-600 rounded">
                    <FaUserAlt />
                    Hello, {user.username}
                  </span>
                  <button
                    onClick={() => {
                      setMenuOpen(false);
                      handleLogout();
                    }}
                    className="rounded-md border border-purple-500 px-4 py-2 text-sm font-semibold text-gray-200 hover:bg-purple-700 hover:text-white hover:border-purple-700 transition mt-3"
                  >
                    Logout
                  </button>
                </>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}