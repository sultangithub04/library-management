import { NavLink } from "react-router";
import AddBookModal from "./AddBookModal";

export default function Header() {


    const links = <>
        <li><NavLink to="/">All Books</NavLink></li>
        <li><AddBookModal></AddBookModal></li>

        <li><NavLink to="/borrowsummary">Borrow Summary</NavLink></li>
    </>
    return (
        <header className="sticky top-0 bg-white z-50 shadow">


            {/* Nav Menu */}
            <nav className="bg-black">
                <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-2 text-white">
                    <ul className="hidden md:flex space-x-6 font-bold text-sm text-white">
                        <li><a href="#" className="hover:underline"><NavLink to="/">All Books</NavLink></a></li>
                        <li><a href="#" className="hover:underline"><AddBookModal /></a></li>
                        <li><a href="#" className="hover:underline"><NavLink to="/borrowsummary">Borrow Summary</NavLink></a></li>

                    </ul>
                    {/* Mobile Menu Icon */}
                    <div className="md:hidden">
                        <div className="dropdown">
                            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                            </div>
                            <ul
                                tabIndex={0}
                                className="menu menu-sm dropdown-content bg-orange-600 rounded-box z-1 mt-3 w-52 p-2 shadow">
                                {links}

                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
}

