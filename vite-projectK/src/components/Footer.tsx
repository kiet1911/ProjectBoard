import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-(--footer-bg-color) text-mist-300">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 justify-items-start content-center">
          <div>
            <div className="w-25 aspect-3/2.5 ">
              <img
                className="h-full w-full object-fill"
                src="./src/assets/logoBrand.png"
                alt="projectK Brand Logo"
              />
            </div>
            <p className="text-sm">
              Vietnam's hub for board game lovers. Premium games and
              accessories, all in one place.
            </p>
          </div>

          <div>
            <h4 className=" font-semibold text-white mb-4">Categories</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/board-games" className="hover:text-white">
                  Board Games
                </Link>
              </li>
              <li>
                <Link to="/card-games" className="hover:text-white">
                  Card Games
                </Link>
              </li>
              <li>
                <Link to="/accessories" className="hover:text-white">
                  Accessories
                </Link>
              </li>
              <li>
                <Link to="/new-releases" className="hover:text-white">
                  New Releases
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/faq" className="hover:text-white">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="hover:text-white">
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link to="/returns" className="hover:text-white">
                  Returns & Refunds
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Connect With Us</h4>
            <div className="flex space-x-4 mb-6">
              <img
                className="size-8"
                src="https://simpleicons.org/icons/facebook.svg"
                alt="Facebook"
              />
              <img
                className="size-8"
                src="https://simpleicons.org/icons/instagram.svg"
                alt="Instagram"
              />
              <img
                className="size-8"
                src="https://simpleicons.org/icons/youtube.svg"
                alt="YouTube"
              />
              <img
                className="size-8"
                src="https://simpleicons.org/icons/tiktok.svg"
                alt="TikTok"
              />
            </div>
            <p className="text-sm">Subscribe to our newsletter</p>
            <form className="mt-2 flex text-sm">
              <input
                type="email"
                placeholder="Your email"
                className="max-md:w-1/2 px-4 py-2 rounded-l bg-gray-800 border-none focus:outline-none"
              />
              <button className="bg-red-600 px-4 py-2 rounded-r hover:bg-red-700">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-12 pt-8 text-center text-sm">
          <p>© {new Date().getFullYear()} projectK. All rights reserved.</p>
          <div className="mt-2 flex justify-center space-x-6">
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
