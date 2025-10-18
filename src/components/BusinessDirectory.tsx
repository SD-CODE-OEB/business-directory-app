import React, { useState, useEffect, useRef } from "react";
import {
  getBusinessesByCategory,
  getBusinessById,
  searchBusinesses,
  getFeaturedBusinesses,
} from "../utils";
import { categories, businesses } from "../data/mockData";
import Header from "./Header";
import Footer from "./Footer";
import CategoryCard from "./CategoryCard";
import BusinessCard from "./BusinessCard";
import FeaturedBusinessCard from "./FeaturedBusinessCard";
import BusinessDetails from "./BusinessDetails";
import { ChevronUp, ArrowUpDown } from "lucide-react";

const BusinessDirectory: React.FC = () => {
  const [currentPage, setCurrentPage] = useState("home");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    null
  );
  const [selectedBusinessId, setSelectedBusinessId] = useState<string | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [itemsPerPage] = useState(8);
  const [sortOption, setSortOption] = useState<"rating" | "name" | "reviews">(
    "rating"
  );
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [showBackToTop, setShowBackToTop] = useState(false);
  const mainRef = useRef<HTMLDivElement>(null);

  // Monitor scroll position to show/hide back to top button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Simulate loading when changing pages
  const simulateLoading = (callback: () => void) => {
    setLoading(true);
    setTimeout(() => {
      callback();
      setLoading(false);
    }, 500); // 500ms loading simulation
  };

  // Navigation handlers with loading simulation
  const navigateToHome = () => {
    simulateLoading(() => {
      setCurrentPage("home");
      setSelectedCategoryId(null);
      setSelectedBusinessId(null);
      setPageNumber(1);
    });
  };

  const navigateToCategory = (categoryId: string) => {
    simulateLoading(() => {
      setCurrentPage("category");
      setSelectedCategoryId(categoryId);
      setSelectedBusinessId(null);
      setPageNumber(1);
    });
  };

  const navigateToBusiness = (businessId: string) => {
    simulateLoading(() => {
      setCurrentPage("business");
      setSelectedBusinessId(businessId);
    });
  };

  const handleSearch = (query: string) => {
    simulateLoading(() => {
      setSearchQuery(query);
      setCurrentPage("search");
      setSelectedCategoryId(null);
      setSelectedBusinessId(null);
      setPageNumber(1);
    });
  };

  // View all businesses function
  const handleViewAll = () => {
    simulateLoading(() => {
      setCurrentPage("all");
      setSelectedCategoryId(null);
      setSelectedBusinessId(null);
      setPageNumber(1);
    });
  };

  // Sorting functions
  const toggleSortDirection = () => {
    setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  const handleSortChange = (option: "rating" | "name" | "reviews") => {
    setSortOption(option);
  };

  // Sort businesses based on selected option and direction
  const sortBusinesses = <
    T extends { rating: number; name: string; reviewCount: number }
  >(
    businessList: T[]
  ): T[] => {
    return [...businessList].sort((a, b) => {
      let comparison = 0;

      if (sortOption === "rating") {
        comparison = a.rating - b.rating;
      } else if (sortOption === "name") {
        comparison = a.name.localeCompare(b.name);
      } else if (sortOption === "reviews") {
        comparison = a.reviewCount - b.reviewCount;
      }

      return sortDirection === "asc" ? comparison : -comparison;
    });
  };

  // Pagination
  const paginate = <T,>(items: T[]): T[] => {
    const startIndex = (pageNumber - 1) * itemsPerPage;
    return items.slice(startIndex, startIndex + itemsPerPage);
  };

  // Pagination controls
  const PaginationControls = ({ totalItems }: { totalItems: number }) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    return (
      <div className="flex justify-center mt-8 space-x-2">
        <button
          className={`px-4 py-2 rounded-md ${
            pageNumber === 1
              ? "bg-gray-200 text-gray-500 cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
          onClick={() => setPageNumber((prev) => Math.max(prev - 1, 1))}
          disabled={pageNumber === 1}
        >
          Previous
        </button>
        <div className="flex items-center space-x-1">
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              className={`w-10 h-10 rounded-md ${
                pageNumber === i + 1
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
              onClick={() => setPageNumber(i + 1)}
            >
              {i + 1}
            </button>
          ))}
        </div>
        <button
          className={`px-4 py-2 rounded-md ${
            pageNumber === totalPages
              ? "bg-gray-200 text-gray-500 cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
          onClick={() =>
            setPageNumber((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={pageNumber === totalPages}
        >
          Next
        </button>
      </div>
    );
  };

  // Sorting controls component
  const SortingControls = () => (
    <div className="mb-6 bg-white p-4 rounded-lg shadow-sm">
      <div className="flex flex-wrap items-center gap-4">
        <div className="font-medium">Sort by:</div>
        <div className="flex space-x-2">
          <button
            onClick={() => handleSortChange("rating")}
            className={`px-3 py-1 rounded ${
              sortOption === "rating"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            Rating
          </button>
          <button
            onClick={() => handleSortChange("name")}
            className={`px-3 py-1 rounded ${
              sortOption === "name"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            Name
          </button>
          <button
            onClick={() => handleSortChange("reviews")}
            className={`px-3 py-1 rounded ${
              sortOption === "reviews"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            Review Count
          </button>
        </div>
        <button
          onClick={toggleSortDirection}
          className="flex items-center px-3 py-1 rounded bg-gray-200 hover:bg-gray-300"
        >
          {sortDirection === "desc" ? "Descending" : "Ascending"}
          <ArrowUpDown size={16} className="ml-2" />
        </button>
      </div>
    </div>
  );

  // Loading indicator component
  const LoadingIndicator = () => (
    <div className="flex justify-center items-center py-12">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
    </div>
  );

  // Render the home page
  const renderHomePage = () => {
    // Get top businesses by popularity
    const featuredBusinesses = getFeaturedBusinesses(3);

    return (
      <div className="w-full px-4 py-8 animate-fadeIn">
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Browse Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {categories.map((category) => (
              <CategoryCard
                key={category.id}
                category={category}
                onClick={navigateToCategory}
              />
            ))}
          </div>
        </section>

        <section className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold">Featured Businesses</h2>
            <button
              onClick={handleViewAll}
              className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
            >
              View All
            </button>
          </div>

          <div className="rounded-none p-6 mb-8">
            <div className="text-left mb-6">
              <h3 className="text-xl font-semibold">
                Highest Rated Local Favorites
              </h3>
              <p className="">
                Discover exceptional businesses loved by the community
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredBusinesses.map((business) => (
                <FeaturedBusinessCard
                  key={business.id}
                  business={business}
                  onClick={navigateToBusiness}
                />
              ))}
            </div>
          </div>
        </section>

        <section>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold">Recently Added</h2>
            <button
              onClick={handleViewAll}
              className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
            >
              View All
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {businesses.slice(0, 4).map((business) => (
              <BusinessCard
                key={business.id}
                business={business}
                onClick={navigateToBusiness}
              />
            ))}
          </div>
        </section>
      </div>
    );
  };

  // Render the category page
  const renderCategoryPage = () => {
    const category = categories.find((cat) => cat.id === selectedCategoryId);
    const allCategoryBusinesses = getBusinessesByCategory(
      selectedCategoryId || ""
    );
    const sortedBusinesses = sortBusinesses(allCategoryBusinesses);
    const currentBusinesses = paginate(sortedBusinesses);

    if (!category) return null;

    return (
      <div className="container mx-auto px-4 py-8 animate-fadeIn">
        <div className="mb-8">
          <button
            onClick={navigateToHome}
            className="flex items-center cursor-pointer text-blue-600 hover:text-blue-800 mb-4 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
            Back to Categories
          </button>

          <div className="flex items-center">
            <span className="text-4xl mr-4">{category.icon}</span>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                {category.name}
              </h1>
              <p className="text-gray-600">
                {allCategoryBusinesses.length} businesses
              </p>
            </div>
          </div>
        </div>

        <SortingControls />

        {loading ? (
          <LoadingIndicator />
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {currentBusinesses.map((business) => (
                <BusinessCard
                  key={business.id}
                  business={business}
                  onClick={navigateToBusiness}
                />
              ))}
            </div>

            {allCategoryBusinesses.length > itemsPerPage && (
              <PaginationControls totalItems={allCategoryBusinesses.length} />
            )}
          </>
        )}
      </div>
    );
  };

  // Render the business details page
  const renderBusinessPage = () => {
    const business = getBusinessById(selectedBusinessId);

    return (
      <div className="container mx-auto px-4 py-8 animate-fadeIn">
        {loading ? (
          <LoadingIndicator />
        ) : (
          <BusinessDetails
            business={business}
            goBack={() => {
              if (selectedCategoryId) {
                navigateToCategory(selectedCategoryId);
              } else if (currentPage === "search") {
                setCurrentPage("search");
                setSelectedBusinessId(null);
              } else if (currentPage === "all") {
                setCurrentPage("all");
                setSelectedBusinessId(null);
              } else {
                navigateToHome();
              }
            }}
          />
        )}
      </div>
    );
  };

  // Render the search results page
  const renderSearchPage = () => {
    const allResults = searchBusinesses(searchQuery);
    const sortedResults = sortBusinesses(allResults);
    const currentResults = paginate(sortedResults);

    return (
      <div className="container mx-auto px-4 py-8 animate-fadeIn">
        <div className="mb-8">
          <button
            onClick={navigateToHome}
            className="flex items-center text-blue-600 hover:text-blue-800 mb-4 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
            Back to Home
          </button>

          <h1 className="text-3xl font-bold text-gray-800">
            Search Results for "{searchQuery}"
          </h1>
          <p className="text-gray-600">{allResults.length} businesses found</p>
        </div>

        {allResults.length > 0 && <SortingControls />}

        {loading ? (
          <LoadingIndicator />
        ) : (
          <>
            {allResults.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {currentResults.map((business) => (
                    <BusinessCard
                      key={business.id}
                      business={business}
                      onClick={navigateToBusiness}
                    />
                  ))}
                </div>

                {allResults.length > itemsPerPage && (
                  <PaginationControls totalItems={allResults.length} />
                )}
              </>
            ) : (
              <div className="bg-gray-50 rounded-lg p-8 text-center">
                <h3 className="text-xl font-semibold mb-2">No results found</h3>
                <p className="text-gray-600 mb-4">
                  We couldn't find any businesses matching your search.
                </p>
                <button
                  onClick={navigateToHome}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                >
                  Browse Categories
                </button>
              </div>
            )}
          </>
        )}
      </div>
    );
  };

  // Render all businesses page
  const renderAllBusinessesPage = () => {
    const allBusinesses = sortBusinesses(businesses);
    const currentBusinesses = paginate(allBusinesses);

    return (
      <div className="container mx-auto px-4 py-8 animate-fadeIn">
        <div className="mb-8">
          <button
            onClick={navigateToHome}
            className="flex items-center text-blue-600 hover:text-blue-800 mb-4 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
            Back to Home
          </button>

          <h1 className="text-3xl font-bold text-gray-800">All Businesses</h1>
          <p className="text-gray-600">{businesses.length} businesses found</p>
        </div>

        <SortingControls />

        {loading ? (
          <LoadingIndicator />
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {currentBusinesses.map((business) => (
                <BusinessCard
                  key={business.id}
                  business={business}
                  onClick={navigateToBusiness}
                />
              ))}
            </div>

            {businesses.length > itemsPerPage && (
              <PaginationControls totalItems={businesses.length} />
            )}
          </>
        )}
      </div>
    );
  };

  // Determine what to render based on current page
  const renderContent = () => {
    switch (currentPage) {
      case "home":
        return renderHomePage();
      case "category":
        return renderCategoryPage();
      case "business":
        return renderBusinessPage();
      case "search":
        return renderSearchPage();
      case "all":
        return renderAllBusinessesPage();
      default:
        return renderHomePage();
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100"
      ref={mainRef}
    >
      <Header onSearch={handleSearch} />
      <main className="flex-grow transition-opacity duration-300 ease-in-out">
        {renderContent()}
      </main>
      <Footer />

      {/* Back to top button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-110"
          aria-label="Back to top"
        >
          <ChevronUp size={24} />
        </button>
      )}
    </div>
  );
};

export default BusinessDirectory;
