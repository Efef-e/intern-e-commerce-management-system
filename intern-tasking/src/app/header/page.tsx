import Link from "next/link";
import { useState, useEffect, useRef } from "react";

const Header = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchResults, setSearchResults] = useState<any[]>(
    []
  );
  const [products, setProducts] = useState<any[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] =
    useState<boolean>(false);
  const [activeIndex, setActiveIndex] =
    useState<number>(-1);
  const dropdownRef = useRef<HTMLUListElement | null>(null);

  useEffect(() => {
    const storedProducts = JSON.parse(
      localStorage.getItem("products") ?? "[]"
    );
    setProducts(storedProducts);
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const results = products.filter((product) =>
        product.name
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      );
      setSearchResults(results);
      setIsDropdownOpen(true);
    } else {
      setSearchResults([]);
      setIsDropdownOpen(false);
    }
  }, [searchTerm, products]);

  const handleSearchChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchTerm(e.target.value);
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "ArrowDown") {
      setActiveIndex(
        (prevIndex) =>
          (prevIndex + 1) % searchResults.length
      );
    } else if (e.key === "ArrowUp") {
      setActiveIndex(
        (prevIndex) =>
          (prevIndex - 1 + searchResults.length) %
          searchResults.length
      );
    } else if (e.key === "Escape") {
      setIsDropdownOpen(false);
    } else if (e.key === "Enter" && activeIndex >= 0) {
      window.location.href = `/productdetail/${searchResults[activeIndex].id}`;
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener(
      "mousedown",
      handleClickOutside
    );
    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  return (
    <header className="bg-darkBlue text-white py-4">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-6">
        <h1 className="text-2xl font-bold text-emerald text-center md:text-left mb-4 md:mb-0">
          <Link href={"/"}>E-Commerce</Link>
        </h1>
        <div className="relative text-black w-full md:w-1/3 flex justify-center md:justify-between">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            onKeyDown={handleKeyDown}
            placeholder="Search products..."
            className="bg-white w-full px-4 py-2 border border-emerald rounded borderbg-emerald text-darkBlue"
          />
          {isDropdownOpen && searchResults.length > 0 && (
            <ul
              ref={dropdownRef}
              className="absolute left-0 top-full bg-white border rounded mt-1 w-full max-w-lg z-50"
            >
              {searchResults.map((product, index) => (
                <li
                  key={product.id}
                  className={`px-4 py-2 cursor-pointer ${
                    index === activeIndex
                      ? "bg-emerald"
                      : ""
                  }`}
                >
                  <Link
                    href={`/productdetail/${product.id}`}
                    className="text-darkBlue"
                  >
                    {product.name}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
        <nav className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4">
          <Link
            href="/productadd"
            className="px-6 py-3 bg-emerald text-white rounded-lg hover:bg-darkBlue transition-colors duration-500"
          >
            Add Product
          </Link>
          <Link
            href="/productlist"
            className="px-6 py-3 bg-emerald text-white rounded-lg hover:bg-darkBlue transition-colors duration-500"
          >
            Product List
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
