import { useEffect } from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { toggleTheme } from "./themeSlice";



const ThemeSwitcher = () => {
  const dispatch = useAppDispatch();
  const theme = useAppSelector((state) => state.theme)||"light";


  useEffect(() => {
    const localTheme = localStorage.getItem('theme');
    if (localTheme) {
      dispatch({ type: localTheme.toUpperCase() });
    }
  }, [dispatch]);

  const handleToggle = () => {
    dispatch(toggleTheme());
  };

  const isDarkMode = theme.theme === "dark";


  return (
    <div className="flex items-center">
      <button
        onClick={handleToggle}
        className={`px-2 py-2 ml-1 mb-2 rounded-full transition-colors duration-300 ${
          isDarkMode ? "bg-gray-200 hover:bg-gray-400 hover:text-yellow-700 text-yellow-500" : "bg-gray-200 text-gray-600 hover:bg-gray-400"
        }`}
        aria-label="Toggle Theme"
      >
        {isDarkMode ? (
          <FaSun className="text-md" />
        ) : (
          <FaMoon className="text-md" />
        )}
      </button>
    </div>
  );
};

export default ThemeSwitcher;
