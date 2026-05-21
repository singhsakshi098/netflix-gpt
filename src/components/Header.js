import { onAuthStateChanged, signOut } from "firebase/auth"; 
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { auth } from "../utils/firebase";
import { addUser, removeUser } from "../utils/userSlice";
import { LOGO, SUPPORTED_LANGUAGES } from "../utils/constants";
import { toggleGptSearchView } from "../utils/gptSlice";
import { changeLanguage } from "../utils/configSlice";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(store => store.user);
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleSignOut = () => {
    signOut(auth).then(() => {}).catch(() => navigate("/error"));
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(addUser({ uid, email, displayName, photoURL }));
        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });
    return () => unsubscribe();
  }, []);

  const handleGptSearchClick = () => {
    dispatch(toggleGptSearchView());
    setMenuOpen(false);
  };
  const handleLanguageChange = (e) => dispatch(changeLanguage(e.target.value));

return (
  <div className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-8 py-2 sm:py-3
    bg-gradient-to-b from-black/70 to-transparent
    flex justify-between items-center">

    {/* Netflix Logo */}
    <img
      className="w-20 sm:w-28 md:w-36"
      src={LOGO}
      alt="logo"
    />

    {user && (
      <>
        {/* Desktop nav — hidden on small screens */}
        <div className="hidden sm:flex items-center gap-2 sm:gap-4">

          {showGptSearch && (
            <select
              className="p-1.5 sm:p-2 bg-gray-900 text-white rounded 
                text-xs sm:text-sm border border-gray-700"
              onChange={handleLanguageChange}
            >
              {SUPPORTED_LANGUAGES.map((lang) => (
                <option key={lang.identifier} value={lang.identifier}>
                  {lang.name}
                </option>
              ))}
            </select>
          )}

          <button
            className="py-1 sm:py-1.5 px-3 sm:px-4 bg-purple-700 hover:bg-purple-600
              text-white rounded-lg text-xs sm:text-sm font-medium transition-colors whitespace-nowrap"
            onClick={handleGptSearchClick}
          >
            {showGptSearch ? "← Home" : "🔍 Search"}
          </button>

          <img
            className="w-7 h-7 sm:w-8 sm:h-8 rounded cursor-pointer hover:opacity-80"
            alt="user avatar"
            src={user?.photoURL || "https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"}
          />

          <button
            onClick={handleSignOut}
            className="text-white text-xs sm:text-sm font-semibold 
              hover:text-gray-300 transition-colors whitespace-nowrap"
          >
            Sign Out
          </button>
        </div>

        {/* Mobile hamburger — visible only on small screens */}
        <div className="flex sm:hidden items-center gap-2">
          <button
            className="py-1 px-3 bg-purple-700 hover:bg-purple-600
              text-white rounded-lg text-xs font-medium transition-colors"
            onClick={handleGptSearchClick}
          >
            {showGptSearch ? "← Home" : "🔍"}
          </button>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-white p-1.5 rounded hover:bg-white/10 transition-colors"
            aria-label="Menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile dropdown menu */}
        {menuOpen && (
          <div className="absolute top-full right-4 mt-1 sm:hidden
            bg-black/95 border border-gray-700 rounded-lg shadow-2xl
            py-2 min-w-[180px] backdrop-blur-md">

            <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-700">
              <img
                className="w-8 h-8 rounded"
                alt="user avatar"
                src={user?.photoURL || "https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"}
              />
              <span className="text-white text-sm truncate">
                {user?.displayName || user?.email}
              </span>
            </div>

            {showGptSearch && (
              <div className="px-4 py-3 border-b border-gray-700">
                <select
                  className="w-full p-2 bg-gray-800 text-white rounded 
                    text-sm border border-gray-600"
                  onChange={handleLanguageChange}
                >
                  {SUPPORTED_LANGUAGES.map((lang) => (
                    <option key={lang.identifier} value={lang.identifier}>
                      {lang.name}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <button
              onClick={() => { handleSignOut(); setMenuOpen(false); }}
              className="w-full text-left px-4 py-3 text-red-400 text-sm font-semibold 
                hover:bg-white/10 transition-colors"
            >
              Sign Out
            </button>
          </div>
        )}
      </>
    )}
  </div>
);
};

export default Header;