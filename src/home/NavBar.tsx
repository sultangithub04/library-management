

import { FaSearch } from "react-icons/fa";


const NavBar = () => {



    return (
        <div>
           
            <div>
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between p-4">
                    {/* Logo */}
                    <div className="flex items-center mb-4 md:mb-0">
                        <span className="text-orange-600 font-bold text-xl">GetBooks</span>
                    </div>

                    {/* Search Bar */}
                    <div className="flex flex-1 max-w-xl mb-4 md:mb-0">
                        <input
                            type="text"
                            placeholder="Search entire store here..."
                            className="flex-grow px-4 py-2 border border-gray-300 rounded-l bg-gray-100 text-sm focus:outline-none"
                        />
                        <button className="bg-orange-600 text-white px-4 rounded-r">
                            <FaSearch />
                        </button>
                    </div>

                    {/* Auth Buttons */}
                    <div className="flex space-x-2">
                        <button className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700 text-sm">
                            Login
                        </button>
                        <button className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700 text-sm">
                            Signup
                        </button>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default NavBar;