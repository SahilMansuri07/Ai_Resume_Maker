import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div>
      <header className="bg-[#0d1117] shadow-lg">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <div className="flex-1 md:flex md:items-center md:gap-12">
              <Link to={"/"} className="block">
                <h2 className="text-2xl font-bold text-gray-100">ResumeGenie AI</h2>
              </Link>
            </div>

            {/* Navigation */}
            <div className="md:flex md:items-center md:gap-12">
              <nav aria-label="Global" className="hidden md:block">
                <ul className="flex items-center gap-6 text-sm">
                  <li>
                    <Link to={"/about"}
                      className="text-gray-300 hover:text-indigo-400 transition"
                      href="#"
                    >
                      About
                    </Link>
                  </li>
                  <li>
                    <Link to={"/CheckScore"}
                      className="text-gray-300 hover:text-indigo-400 transition"
                      href="#"
                    >
                      check Score
                    </Link>
                  </li>
                  <li>
                   <Link to={"/about"}
                      className="text-gray-300 hover:text-indigo-400 transition"
                      href="#"
                    >
                      Tamplates
                    </Link>
                  </li>
                  <li>
                   <Link to={"/Addresume"}
                      className="text-gray-300 hover:text-indigo-400 transition"
                      href="#"
                    >
                      Addresume
                    </Link>
                  </li>
                  <li>
                    <Link to={"/contact"}
                      className="text-gray-300 hover:text-indigo-400 transition"
                      
                    >
                      Contact
                    </Link>
                  </li>
                </ul>
              </nav>

              {/* Auth Buttons */}
              <div className="flex items-center gap-4">
                <div className="sm:flex sm:gap-4">
                  <Link to={"/login"}
                    className="rounded-md bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white shadow hover:bg-indigo-700"
                    
                  >
                    Login
                  </Link>
                  <div className="hidden sm:flex">
                    <Link to={"/register"}
                      className="rounded-md border border-indigo-600 px-5 py-2.5 text-sm font-medium text-gray-200 hover:bg-indigo-700 hover:text-white"
                      
                    >
                      Register
                    </Link>
                  </div>
                </div>

                {/* Mobile Menu */}
                <div className="block md:hidden">
                  <button className="rounded bg-[#161b22] p-2 text-gray-300 hover:text-white transition">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="size-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}
