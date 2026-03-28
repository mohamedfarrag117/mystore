import { Link } from "react-router-dom";

function Footer(): JSX.Element {
  return (
    <footer className="bg-[#1a1a1a] text-gray-300">
      {/* ======================MAIN FOOTER============= */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-7xl mx-auto px-10 py-12 ">
        {/* ===================GENERAL INFO==================== */}
        <div>
          <Link to="/" className="flex items-center gap-2 mb-4">
            <i className="fa-brands fa-shopify text-3xl text-[#F83539]"></i>
            <span className="font-bold text-xl text-white">MY SHOP</span>
          </Link>
          <p className="text-gray-400">
            Discover the best products with amazing prices. Your one-stop
            destination for quality shopping.
          </p>

          {/* =====================SOCIAL SECTION=============== */}
          <div className="flex gap-4 mt-6">
            <a
              href="#"
              className="w-10 h-10 bg-[#2b2b2b] rounded-full flex items-center justify-center text-gray-400 hover:bg-[#F83539] hover:text-white transition duration-300"
            >
              <i className="fa-brands fa-facebook-f"></i>
            </a>
            <a
              href="#"
              className="w-10 h-10 bg-[#2b2b2b] rounded-full flex items-center justify-center text-gray-400 hover:bg-[#F83539] hover:text-white transition duration-300"
            >
              <i className="fa-brands fa-twitter"></i>
            </a>
            <a
              href="#"
              className="w-10 h-10 bg-[#2b2b2b] rounded-full flex items-center justify-center text-gray-400 hover:bg-[#F83539] hover:text-white transition duration-300"
            >
              <i className="fa-brands fa-instagram"></i>
            </a>
            <a
              href="#"
              className="w-10 h-10 bg-[#2b2b2b] rounded-full flex items-center justify-center text-gray-400 hover:bg-[#F83539] hover:text-white transition duration-300"
            >
              <i className="fa-brands fa-github"></i>
            </a>
          </div>
        </div>

        {/* ==============================QUICK LINKS======================== */}
        <div>
          <h3 className="text-white font-semibold text-lg mb-4 relative">
            Quick Links
            <span className="block w-10 h-[3px] bg-[#F83539] mt-2 rounded"></span>
          </h3>
          <ul className="space-y-3">
            <li>
              <Link
                to="/"
                className="hover:text-[#F83539] transition flex items-center gap-2"
              >
                <i className="fa-solid fa-chevron-right text-xs text-[#F83539]"></i>
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/products"
                className="hover:text-[#F83539] transition flex items-center gap-2"
              >
                <i className="fa-solid fa-chevron-right text-xs text-[#F83539]"></i>
                Products
              </Link>
            </li>
            <li>
              <Link
                to="/cart"
                className="hover:text-[#F83539] transition flex items-center gap-2"
              >
                <i className="fa-solid fa-chevron-right text-xs text-[#F83539]"></i>
                Cart
              </Link>
            </li>
            <li>
              <Link
                to="/login"
                className="hover:text-[#F83539] transition flex items-center gap-2"
              >
                <i className="fa-solid fa-chevron-right text-xs text-[#F83539]"></i>
                Login
              </Link>
            </li>
          </ul>
        </div>

        {/* ==================CONTACT============== */}
        <div>
          <h3 className="relative text-white font-semibold text-lg mb-4">
            Contact Us
            <span className="block w-10 h-[3px] bg-[#F83539] mt-2 rounded"></span>
          </h3>
          <ul className="space-y-4">
            <li className="flex items-center gap-3">
              <i className="fa-solid fa-location-dot text-[#F83539]"></i>
              <span>123 Street, Cairo, Egypt</span>
            </li>
            <li className="flex items-center gap-3">
              <i className="fa-solid fa-phone text-[#F83539]"></i>
              <span>+20 1014127293</span>
            </li>
            <li className="flex items-center gap-3">
              <i className="fa-solid fa-envelope text-[#F83539]"></i>
              <span>support@myshop.com</span>
            </li>
            <li className="flex items-center gap-3">
              <i className="fa-solid fa-clock text-[#F83539]"></i>
              <span>Sat - Thu: 9:00 AM - 10:00 PM</span>
            </li>
          </ul>
        </div>
      </div>

      {/* =========================BOTTOM SECTION================== */}
      <div className="border-t border-gray-800">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 max-w-7xl mx-auto px-10 py-5 ">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()}{" "}
            <span className="text-[#F83539] font-semibold">MY SHOP</span>. All
            rights reserved.
          </p>

          <div className="flex items-center gap-4 text-gray-500 text-sm">
            <a href="#" className="hover:text-[#F83539] transition">
              Privacy Policy
            </a>
            <span>•</span>
            <a href="#" className="hover:text-[#F83539] transition">
              Terms of Service
            </a>
            <span>•</span>
            <a href="#" className="hover:text-[#F83539] transition">
              FAQ
            </a>
          </div>

          {/* ==============================PAYMENT METHODS==================== */}
          <div className="flex items-center gap-3 text-gray-500">
            <i className="fa-brands fa-cc-visa text-2xl hover:text-[#F83539] transition"></i>
            <i className="fa-brands fa-cc-mastercard text-2xl hover:text-[#F83539] transition"></i>
            <i className="fa-brands fa-cc-paypal text-2xl hover:text-[#F83539] transition"></i>
            <i className="fa-brands fa-cc-apple-pay text-2xl hover:text-[#F83539] transition"></i>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
