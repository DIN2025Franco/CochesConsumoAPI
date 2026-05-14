function SearchBar({ searchTerm, onSearchChange, placeholder = "Buscar...", className = "" }) {
    return (
        <div className={`w-full ${className}`}>
            <label htmlFor="search-input" className="sr-only">
                {placeholder}
            </label>
            <input
                id="search-input"
                type="text"
                placeholder={placeholder}
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full p-4 border-2 border-gray-300 rounded-xl shadow-sm
                        focus:outline-none focus:ring-2 focus:ring-[#d4af37] focus:border-[#d4af37] transition
                        duration-150 ease-in-out bg-white text-lg"
                aria-label={placeholder}
            />
        </div>
    );
}
export default SearchBar;