import { Business } from "../types";
import { businesses, categories } from "../data/mockData";

// Utility functions
export const getBusinessesByCategory = (categoryId: string): Business[] => {
  return businesses.filter((business) =>
    business.category.includes(categoryId)
  );
};

export const getBusinessById = (id: string | null): Business | undefined => {
  if (!id) return undefined;
  return businesses.find((business) => business.id === id);
};

export const searchBusinesses = (query: string): Business[] => {
  const lowerCaseQuery = query.toLowerCase();
  return businesses.filter(
    (business) =>
      business.name.toLowerCase().includes(lowerCaseQuery) ||
      business.description.toLowerCase().includes(lowerCaseQuery) ||
      business.features.some((feature) =>
        feature.toLowerCase().includes(lowerCaseQuery)
      ) ||
      business.category.some((cat) => {
        const category = categories.find((c) => c.id === cat);
        return category?.name.toLowerCase().includes(lowerCaseQuery);
      })
  );
};

export const formatHours = (day: {
  isClosed?: boolean;
  open: string;
  close: string;
}): string => {
  if (day.isClosed) return "Closed";
  return `${day.open} - ${day.close}`;
};

export const getTodayHours = (
  hours: { day: string; isClosed?: boolean; open: string; close: string }[]
) => {
  const today = new Date().getDay();
  const dayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const todayName = dayNames[today];
  return {
    todayName,
    todayHours: hours.find((day) => day.day === todayName),
  };
};

export const getFeaturedBusinesses = (count: number = 4): Business[] => {
  // Create a score for each business based on rating and review count
  return [...businesses]
    .map((business) => ({
      ...business,
      // Calculate popularity score (rating * log of review count)
      popularityScore: business.rating * Math.log(business.reviewCount + 1),
    }))
    .sort((a, b) => b.popularityScore - a.popularityScore) // Sort by popularity score descending
    .slice(0, count); // Take the top businesses
};
