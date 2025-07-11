import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaCcVisa,
  FaCcPaypal,
  FaCcMastercard,
} from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 px-4 dark:bg-white">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 border-b border-gray-700 pb-8">
        {/* GETbooks */}
        <div>
          <h2 className="text-xl font-bold mb-4">GETBOOKS</h2>
          <p className="text-sm">
            Get Books was established in 2025 with the vision to provide an
            extensive library of books in digital format for free on the
            Internet.
          </p>
        </div>

        {/* Pages */}
        <div>
          <h2 className="text-xl font-bold mb-4">PAGES</h2>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:underline">Home</a></li>
            <li><a href="#" className="hover:underline">Contact us</a></li>
            <li><a href="#" className="hover:underline">Terms and Conditions</a></li>
            <li><a href="#" className="hover:underline">Privacy Policy</a></li>
          </ul>
        </div>

        {/* Our Company */}
        <div>
          <h2 className="text-xl font-bold mb-4">OUR COMPANY</h2>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:underline">About Us</a></li>
            <li><a href="#" className="hover:underline">Books</a></li>
            <li><a href="#" className="hover:underline">Blog</a></li>
            <li><a href="#" className="hover:underline">Categories</a></li>
          </ul>
        </div>

        {/* Stay Connected */}
        <div>
          <h2 className="text-xl font-bold mb-4">STAY CONNECTED</h2>
          <div className="flex space-x-4 mb-4">
            <a href="#" className="hover:text-white"><FaTwitter size={20} /></a>
            <a href="#" className="hover:text-white"><FaFacebookF size={20} /></a>
            <a href="#" className="hover:text-white"><FaInstagram size={20} /></a>
          </div>
          <p className="text-sm">Email: <a href="mailto:info@Getbooks.com" className="hover:underline">info@Getbooks.com</a></p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between mt-6 pt-6 border-t border-gray-700 text-sm">
        <p className="mb-4 md:mb-0">© 2025 <span className="font-bold">GET Books</span> Made with <span className="text-red-500">♥</span> by getbooks</p>
        <div className="flex space-x-4 ">
          <FaCcVisa className="h-6 w-6 text-gray-100 dark:text-gray-400" />
          <FaCcPaypal className="h-6 w-6 text-gray-100 dark:text-gray-400" />
          <FaCcMastercard className="h-6 w-6 text-gray-100 dark:text-gray-400" />

        </div>
      </div>
    </footer>
  );
}

export default Footer;
