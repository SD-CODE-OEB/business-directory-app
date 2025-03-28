import { Business, Category, Review } from "../types";

// Mock data generator
export const generateReviews = (
  count: number,
  averageRating: number
): Review[] => {
  const reviews: Review[] = [];
  const names = [
    "Michael Scott",
    "Jim Halpert",
    "Pam Beesly",
    "Dwight Schrute",
    "Angela Martin",
    "Kevin Malone",
    "Oscar Martinez",
    "Stanley Hudson",
    "Ryan Howard",
    "Kelly Kapoor",
  ];

  const comments = [
    "Great experience! Would definitely recommend.",
    "The service was outstanding and the staff were very friendly.",
    "Good quality but a bit overpriced for what you get.",
    "Excellent service! Will be coming back again.",
    "Had some issues but they were quickly resolved.",
    "The location is convenient and the staff is very professional.",
    "Was hoping for better service given the reputation.",
    "A hidden gem! So glad I discovered this place.",
    "Mediocre experience. Nothing special but gets the job done.",
    "Above and beyond what I expected. Very pleased!",
  ];

  const today = new Date();

  for (let i = 0; i < count; i++) {
    const nameIndex = Math.floor(Math.random() * names.length);
    const commentIndex = Math.floor(Math.random() * comments.length);

    // Rating that tends toward the average but with some variance
    const rating = Math.max(
      1,
      Math.min(5, Math.round(averageRating + (Math.random() - 0.5) * 2))
    );

    // Random date within the last 6 months
    const randomDate = new Date(today);
    randomDate.setDate(today.getDate() - Math.floor(Math.random() * 180));

    reviews.push({
      id: `review-${i}-${Date.now()}`,
      userId: `user-${nameIndex}`,
      userName: names[nameIndex],
      userAvatar: `/api/placeholder/40/40`,
      rating,
      comment: comments[commentIndex],
      date: randomDate.toISOString().split("T")[0],
    });
  }

  return reviews;
};

// Helper function to count businesses per category
const countBusinessesPerCategory = (businessList: Business[]) => {
  const counts: Record<string, number> = {};

  businessList.forEach((business) => {
    business.category.forEach((catId) => {
      counts[catId] = (counts[catId] || 0) + 1;
    });
  });

  return counts;
};

// Add more businesses to the mock data
export const businesses: Business[] = [
  // Existing businesses
  {
    id: "tech-innovation-labs",
    name: "TechInnovation Labs",
    description:
      "A cutting-edge software development company specializing in AI and machine learning solutions for businesses of all sizes.",
    logo: "https://images.unsplash.com/photo-1535378620166-273708d44e4c?w=100&h=100&fit=crop",
    coverImage:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&h=300&fit=crop",
    category: ["tech"],
    address: {
      street: "123 Tech Avenue",
      city: "San Francisco",
      state: "CA",
      zip: "94105",
      coordinates: {
        lat: 37.7749,
        lng: -122.4194,
      },
    },
    contact: {
      phone: "(415) 555-1234",
      email: "info@techinnovationlabs.com",
      website: "https://techinnovationlabs.com",
    },
    socialMedia: {
      facebook: "techinnovationlabs",
      twitter: "techinnovlabs",
      instagram: "techinnovlabs",
      linkedin: "techinnovation-labs",
    },
    hours: [
      { day: "Monday", open: "09:00", close: "18:00" },
      { day: "Tuesday", open: "09:00", close: "18:00" },
      { day: "Wednesday", open: "09:00", close: "18:00" },
      { day: "Thursday", open: "09:00", close: "18:00" },
      { day: "Friday", open: "09:00", close: "17:00" },
      { day: "Saturday", isClosed: true, open: "", close: "" },
      { day: "Sunday", isClosed: true, open: "", close: "" },
    ],
    features: [
      "Custom Software Development",
      "AI Solutions",
      "Cloud Services",
      "Mobile App Development",
      "IT Consulting",
    ],
    rating: 4.7,
    reviewCount: 42,
    reviews: generateReviews(8, 4.7),
    verified: true,
    founded: "2015",
    priceRange: "$$$",
  },
  {
    id: "green-earth-cafe",
    name: "Green Earth Café",
    description:
      "An eco-friendly café serving organic, locally-sourced food and beverages in a sustainable environment.",
    logo: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=100&h=100&fit=crop",
    coverImage:
      "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&h=300&fit=crop",
    category: ["restaurants"],
    address: {
      street: "456 Organic Way",
      city: "Portland",
      state: "OR",
      zip: "97204",
      coordinates: {
        lat: 45.5231,
        lng: -122.6765,
      },
    },
    contact: {
      phone: "(503) 555-6789",
      email: "hello@greenearthcafe.com",
      website: "https://greenearthcafe.com",
    },
    socialMedia: {
      facebook: "greenearthcafe",
      twitter: "greenearthcafe",
      instagram: "greenearthcafe",
    },
    hours: [
      { day: "Monday", open: "07:00", close: "20:00" },
      { day: "Tuesday", open: "07:00", close: "20:00" },
      { day: "Wednesday", open: "07:00", close: "20:00" },
      { day: "Thursday", open: "07:00", close: "20:00" },
      { day: "Friday", open: "07:00", close: "22:00" },
      { day: "Saturday", open: "08:00", close: "22:00" },
      { day: "Sunday", open: "08:00", close: "18:00" },
    ],
    features: [
      "Organic Menu",
      "Fair Trade Coffee",
      "Vegan Options",
      "Gluten-Free Options",
      "Eco-Friendly Packaging",
    ],
    rating: 4.5,
    reviewCount: 128,
    reviews: generateReviews(10, 4.5),
    verified: true,
    founded: "2018",
    priceRange: "$$",
  },
  {
    id: "wellness-retreat-spa",
    name: "Wellness Retreat Spa",
    description:
      "A luxurious spa offering a variety of treatments and wellness programs designed to rejuvenate your body and mind.",
    logo: "https://images.unsplash.com/photo-1470259078422-826894b933aa?w=100&h=100&fit=crop",
    coverImage:
      "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&h=300&fit=crop",
    category: ["health"],
    address: {
      street: "789 Serenity Blvd",
      city: "Sedona",
      state: "AZ",
      zip: "86336",
      coordinates: {
        lat: 34.8697,
        lng: -111.761,
      },
    },
    contact: {
      phone: "(928) 555-9876",
      email: "relax@wellnessretreatspa.com",
      website: "https://wellnessretreatspa.com",
    },
    socialMedia: {
      facebook: "wellnessretreatspa",
      instagram: "wellnessretreat_spa",
    },
    hours: [
      { day: "Monday", open: "10:00", close: "19:00" },
      { day: "Tuesday", open: "10:00", close: "19:00" },
      { day: "Wednesday", open: "10:00", close: "19:00" },
      { day: "Thursday", open: "10:00", close: "19:00" },
      { day: "Friday", open: "10:00", close: "21:00" },
      { day: "Saturday", open: "09:00", close: "21:00" },
      { day: "Sunday", open: "09:00", close: "17:00" },
    ],
    features: [
      "Massage Therapy",
      "Facials",
      "Body Treatments",
      "Wellness Coaching",
      "Meditation Classes",
      "Yoga Studio",
    ],
    rating: 4.8,
    reviewCount: 86,
    reviews: generateReviews(9, 4.8),
    verified: true,
    founded: "2016",
    priceRange: "$$$$",
  },
  {
    id: "urban-threads-boutique",
    name: "Urban Threads Boutique",
    description:
      "A trendy clothing boutique offering unique, locally-designed apparel and accessories for the fashion-forward individual.",
    logo: "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=100&h=100&fit=crop",
    coverImage:
      "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=800&h=300&fit=crop",
    category: ["retail"],
    address: {
      street: "101 Fashion Ave",
      city: "Brooklyn",
      state: "NY",
      zip: "11201",
      coordinates: {
        lat: 40.7128,
        lng: -74.006,
      },
    },
    contact: {
      phone: "(718) 555-2345",
      email: "shop@urbanthreadsboutique.com",
      website: "https://urbanthreadsboutique.com",
    },
    socialMedia: {
      facebook: "urbanthreadsboutique",
      instagram: "urbanthreads_boutique",
      twitter: "urbanthreads",
    },
    hours: [
      { day: "Monday", open: "11:00", close: "19:00" },
      { day: "Tuesday", open: "11:00", close: "19:00" },
      { day: "Wednesday", open: "11:00", close: "19:00" },
      { day: "Thursday", open: "11:00", close: "20:00" },
      { day: "Friday", open: "11:00", close: "21:00" },
      { day: "Saturday", open: "10:00", close: "21:00" },
      { day: "Sunday", open: "12:00", close: "18:00" },
    ],
    features: [
      "Local Designers",
      "Sustainable Fashion",
      "Custom Alterations",
      "Personal Styling",
      "Accessories",
    ],
    rating: 4.3,
    reviewCount: 57,
    reviews: generateReviews(7, 4.3),
    verified: true,
    founded: "2019",
    priceRange: "$$$",
  },
  {
    id: "summit-financial-advisors",
    name: "Summit Financial Advisors",
    description:
      "A trusted financial advisory firm providing personalized investment management and retirement planning services.",
    logo: "https://images.unsplash.com/photo-1606189933498-bdb4b0b40b31?w=100&h=100&fit=crop",
    coverImage:
      "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&h=300&fit=crop",
    category: ["finance", "professional"],
    address: {
      street: "555 Prosperity Road",
      city: "Chicago",
      state: "IL",
      zip: "60601",
      coordinates: {
        lat: 41.8781,
        lng: -87.6298,
      },
    },
    contact: {
      phone: "(312) 555-7890",
      email: "info@summitfinancialadvisors.com",
      website: "https://summitfinancialadvisors.com",
    },
    socialMedia: {
      linkedin: "summit-financial-advisors",
      facebook: "summitfinancialadvisors",
      twitter: "summitfinancial",
    },
    hours: [
      { day: "Monday", open: "08:30", close: "17:00" },
      { day: "Tuesday", open: "08:30", close: "17:00" },
      { day: "Wednesday", open: "08:30", close: "17:00" },
      { day: "Thursday", open: "08:30", close: "17:00" },
      { day: "Friday", open: "08:30", close: "16:00" },
      { day: "Saturday", isClosed: true, open: "", close: "" },
      { day: "Sunday", isClosed: true, open: "", close: "" },
    ],
    features: [
      "Investment Management",
      "Retirement Planning",
      "Estate Planning",
      "Tax Strategies",
      "Financial Education",
    ],
    rating: 4.6,
    reviewCount: 32,
    reviews: generateReviews(6, 4.6),
    verified: true,
    founded: "2010",
    priceRange: "$$$",
  },
  // New businesses
  {
    id: "data-driven-analytics",
    name: "Data Driven Analytics",
    description:
      "Expert data analysis and visualization services to help businesses make data-driven decisions and gain competitive advantages.",
    logo: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=100&h=100&fit=crop",
    coverImage:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=300&fit=crop",
    category: ["tech", "professional"],
    address: {
      street: "789 Data Way",
      city: "Boston",
      state: "MA",
      zip: "02108",
      coordinates: {
        lat: 42.3601,
        lng: -71.0589,
      },
    },
    contact: {
      phone: "(617) 555-8901",
      email: "info@datadrivenanalytics.com",
      website: "https://datadrivenanalytics.com",
    },
    socialMedia: {
      linkedin: "data-driven-analytics",
      twitter: "datadriven",
      facebook: "datadrivenanalytics",
    },
    hours: [
      { day: "Monday", open: "09:00", close: "18:00" },
      { day: "Tuesday", open: "09:00", close: "18:00" },
      { day: "Wednesday", open: "09:00", close: "18:00" },
      { day: "Thursday", open: "09:00", close: "18:00" },
      { day: "Friday", open: "09:00", close: "17:00" },
      { day: "Saturday", isClosed: true, open: "", close: "" },
      { day: "Sunday", isClosed: true, open: "", close: "" },
    ],
    features: [
      "Business Intelligence",
      "Data Visualization",
      "Predictive Analytics",
      "Market Research",
      "Performance Metrics",
    ],
    rating: 4.6,
    reviewCount: 38,
    reviews: generateReviews(7, 4.6),
    verified: true,
    founded: "2017",
    priceRange: "$$$",
  },
  {
    id: "sunrise-yoga-studio",
    name: "Sunrise Yoga Studio",
    description:
      "A peaceful yoga studio offering a variety of classes for all skill levels, with a focus on mindfulness and holistic wellness.",
    logo: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=100&h=100&fit=crop",
    coverImage:
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&h=300&fit=crop",
    category: ["health"],
    address: {
      street: "456 Zen Avenue",
      city: "Austin",
      state: "TX",
      zip: "78701",
      coordinates: {
        lat: 30.2672,
        lng: -97.7431,
      },
    },
    contact: {
      phone: "(512) 555-1212",
      email: "namaste@sunriseyoga.com",
      website: "https://sunriseyogastudio.com",
    },
    socialMedia: {
      instagram: "sunrise_yoga",
      facebook: "sunriseyogastudio",
    },
    hours: [
      { day: "Monday", open: "06:00", close: "21:00" },
      { day: "Tuesday", open: "06:00", close: "21:00" },
      { day: "Wednesday", open: "06:00", close: "21:00" },
      { day: "Thursday", open: "06:00", close: "21:00" },
      { day: "Friday", open: "06:00", close: "21:00" },
      { day: "Saturday", open: "08:00", close: "18:00" },
      { day: "Sunday", open: "08:00", close: "16:00" },
    ],
    features: [
      "Hot Yoga",
      "Meditation Classes",
      "Private Sessions",
      "Beginner Workshops",
      "Teacher Training",
    ],
    rating: 4.9,
    reviewCount: 67,
    reviews: generateReviews(8, 4.9),
    verified: true,
    founded: "2014",
    priceRange: "$$",
  },
  {
    id: "gourmet-burger-bar",
    name: "Gourmet Burger Bar",
    description:
      "A casual dining establishment specializing in artisanal burgers made with locally-sourced, organic ingredients.",
    logo: "https://images.unsplash.com/photo-1586816001966-79b736744398?w=100&h=100&fit=crop",
    coverImage:
      "https://images.unsplash.com/photo-1551782450-a2132b4ba21d?w=800&h=300&fit=crop",
    category: ["restaurants"],
    address: {
      street: "123 Flavor Street",
      city: "Denver",
      state: "CO",
      zip: "80202",
      coordinates: {
        lat: 39.7392,
        lng: -104.9903,
      },
    },
    contact: {
      phone: "(303) 555-7890",
      email: "eat@gourmetburgerbar.com",
      website: "https://gourmetburgerbar.com",
    },
    socialMedia: {
      instagram: "gourmet_burger",
      facebook: "gourmetburgerbar",
      twitter: "gourmetburger",
    },
    hours: [
      { day: "Monday", open: "11:00", close: "22:00" },
      { day: "Tuesday", open: "11:00", close: "22:00" },
      { day: "Wednesday", open: "11:00", close: "22:00" },
      { day: "Thursday", open: "11:00", close: "23:00" },
      { day: "Friday", open: "11:00", close: "00:00" },
      { day: "Saturday", open: "11:00", close: "00:00" },
      { day: "Sunday", open: "12:00", close: "21:00" },
    ],
    features: [
      "Organic Ingredients",
      "Craft Beer Selection",
      "Vegetarian Options",
      "Gluten-Free Options",
      "Outdoor Seating",
    ],
    rating: 4.7,
    reviewCount: 142,
    reviews: generateReviews(10, 4.7),
    verified: true,
    founded: "2018",
    priceRange: "$$",
  },
  {
    id: "vintage-vinyl-records",
    name: "Vintage Vinyl Records",
    description:
      "A nostalgic record store offering a vast collection of vinyl records, turntables, and audio equipment for music enthusiasts.",
    logo: "https://images.unsplash.com/photo-1461360228754-6e81c478b882?w=100&h=100&fit=crop",
    coverImage:
      "https://images.unsplash.com/photo-1603732551658-5fabbafa84eb?w=800&h=300&fit=crop",
    category: ["retail", "entertainment"],
    address: {
      street: "567 Melody Lane",
      city: "Nashville",
      state: "TN",
      zip: "37203",
      coordinates: {
        lat: 36.1627,
        lng: -86.7816,
      },
    },
    contact: {
      phone: "(615) 555-3456",
      email: "shop@vintagevinyl.com",
      website: "https://vintagevinylrecords.com",
    },
    socialMedia: {
      instagram: "vintage_vinyl",
      facebook: "vintagevinylrecords",
      twitter: "vintagevinyl",
    },
    hours: [
      { day: "Monday", open: "10:00", close: "19:00" },
      { day: "Tuesday", open: "10:00", close: "19:00" },
      { day: "Wednesday", open: "10:00", close: "19:00" },
      { day: "Thursday", open: "10:00", close: "19:00" },
      { day: "Friday", open: "10:00", close: "21:00" },
      { day: "Saturday", open: "10:00", close: "21:00" },
      { day: "Sunday", open: "12:00", close: "18:00" },
    ],
    features: [
      "Rare Collections",
      "Record Cleaning",
      "Audio Equipment",
      "Listening Stations",
      "Special Orders",
    ],
    rating: 4.8,
    reviewCount: 93,
    reviews: generateReviews(9, 4.8),
    verified: true,
    founded: "2009",
    priceRange: "$$",
  },
  {
    id: "city-bike-rentals",
    name: "City Bike Rentals",
    description:
      "Offering affordable bike rentals for tourists and locals, with a wide selection of bicycles and guided city tours.",
    logo: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=100&h=100&fit=crop",
    coverImage:
      "https://images.unsplash.com/photo-1529422643029-d4585747aaf2?w=800&h=300&fit=crop",
    category: ["entertainment", "automotive"],
    address: {
      street: "789 Pedal Path",
      city: "San Diego",
      state: "CA",
      zip: "92101",
      coordinates: {
        lat: 32.7157,
        lng: -117.1611,
      },
    },
    contact: {
      phone: "(619) 555-7890",
      email: "ride@citybikerentals.com",
      website: "https://citybikerentals.com",
    },
    socialMedia: {
      instagram: "city_bikes",
      facebook: "citybikerentals",
      twitter: "citybikes",
    },
    hours: [
      { day: "Monday", open: "08:00", close: "19:00" },
      { day: "Tuesday", open: "08:00", close: "19:00" },
      { day: "Wednesday", open: "08:00", close: "19:00" },
      { day: "Thursday", open: "08:00", close: "19:00" },
      { day: "Friday", open: "08:00", close: "20:00" },
      { day: "Saturday", open: "07:00", close: "20:00" },
      { day: "Sunday", open: "07:00", close: "19:00" },
    ],
    features: [
      "City Tours",
      "Mountain Bikes",
      "Electric Bikes",
      "Family Packages",
      "Bike Repairs",
    ],
    rating: 4.6,
    reviewCount: 78,
    reviews: generateReviews(8, 4.6),
    verified: true,
    founded: "2012",
    priceRange: "$$",
  },
  {
    id: "elite-learning-academy",
    name: "Elite Learning Academy",
    description:
      "A premier educational institution offering specialized programs for students of all ages, with a focus on STEM and creative arts.",
    logo: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=100&h=100&fit=crop",
    coverImage:
      "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=800&h=300&fit=crop",
    category: ["education"],
    address: {
      street: "234 Scholar Avenue",
      city: "Seattle",
      state: "WA",
      zip: "98101",
      coordinates: {
        lat: 47.6062,
        lng: -122.3321,
      },
    },
    contact: {
      phone: "(206) 555-1234",
      email: "info@elitelearning.edu",
      website: "https://elitelearningacademy.edu",
    },
    socialMedia: {
      facebook: "elitelearningacademy",
      twitter: "elite_learning",
      instagram: "elite_academy",
    },
    hours: [
      { day: "Monday", open: "08:00", close: "18:00" },
      { day: "Tuesday", open: "08:00", close: "18:00" },
      { day: "Wednesday", open: "08:00", close: "18:00" },
      { day: "Thursday", open: "08:00", close: "18:00" },
      { day: "Friday", open: "08:00", close: "17:00" },
      { day: "Saturday", open: "09:00", close: "14:00" },
      { day: "Sunday", isClosed: true, open: "", close: "" },
    ],
    features: [
      "STEM Programs",
      "Arts Education",
      "Small Class Sizes",
      "After School Activities",
      "Summer Camps",
    ],
    rating: 4.8,
    reviewCount: 45,
    reviews: generateReviews(7, 4.8),
    verified: true,
    founded: "2005",
    priceRange: "$$$",
  },
  {
    id: "luxury-home-renovations",
    name: "Luxury Home Renovations",
    description:
      "Specializing in high-end home renovations and interior design, transforming ordinary spaces into extraordinary living environments.",
    logo: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?w=100&h=100&fit=crop",
    coverImage:
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&h=300&fit=crop",
    category: ["home", "professional"],
    address: {
      street: "567 Designer Circle",
      city: "Miami",
      state: "FL",
      zip: "33101",
      coordinates: {
        lat: 25.7617,
        lng: -80.1918,
      },
    },
    contact: {
      phone: "(305) 555-9876",
      email: "designs@luxuryhomerenovations.com",
      website: "https://luxuryhomerenovations.com",
    },
    socialMedia: {
      instagram: "luxury_renovations",
      facebook: "luxuryhomerenovations",
      twitter: "luxuryrenovations",
    },
    hours: [
      { day: "Monday", open: "09:00", close: "17:00" },
      { day: "Tuesday", open: "09:00", close: "17:00" },
      { day: "Wednesday", open: "09:00", close: "17:00" },
      { day: "Thursday", open: "09:00", close: "17:00" },
      { day: "Friday", open: "09:00", close: "16:00" },
      { day: "Saturday", open: "10:00", close: "14:00" },
      { day: "Sunday", isClosed: true, open: "", close: "" },
    ],
    features: [
      "Custom Design",
      "Kitchen Remodeling",
      "Bathroom Renovations",
      "Whole Home Makeovers",
      "Sustainable Materials",
    ],
    rating: 4.9,
    reviewCount: 36,
    reviews: generateReviews(6, 4.9),
    verified: true,
    founded: "2008",
    priceRange: "$$$$",
  },
  {
    id: "precision-auto-care",
    name: "Precision Auto Care",
    description:
      "Full-service automotive repair and maintenance facility with certified technicians and state-of-the-art diagnostic equipment.",
    logo: "https://images.unsplash.com/photo-1493238792000-8113da705763?w=100&h=100&fit=crop",
    coverImage:
      "https://images.unsplash.com/photo-1504222490345-c075b6008014?w=800&h=300&fit=crop",
    category: ["automotive"],
    address: {
      street: "890 Mechanic Street",
      city: "Dallas",
      state: "TX",
      zip: "75201",
      coordinates: {
        lat: 32.7767,
        lng: -96.797,
      },
    },
    contact: {
      phone: "(214) 555-3456",
      email: "service@precisionautocare.com",
      website: "https://precisionautocare.com",
    },
    socialMedia: {
      facebook: "precisionautocare",
      instagram: "precision_auto",
    },
    hours: [
      { day: "Monday", open: "08:00", close: "18:00" },
      { day: "Tuesday", open: "08:00", close: "18:00" },
      { day: "Wednesday", open: "08:00", close: "18:00" },
      { day: "Thursday", open: "08:00", close: "18:00" },
      { day: "Friday", open: "08:00", close: "18:00" },
      { day: "Saturday", open: "09:00", close: "16:00" },
      { day: "Sunday", isClosed: true, open: "", close: "" },
    ],
    features: [
      "Diagnostics",
      "Oil Changes",
      "Brake Service",
      "Engine Repair",
      "Tire Services",
    ],
    rating: 4.7,
    reviewCount: 74,
    reviews: generateReviews(8, 4.7),
    verified: true,
    founded: "2011",
    priceRange: "$$",
  },
  {
    id: "legal-eagles-lawfirm",
    name: "Legal Eagles Law Firm",
    description:
      "A respected law firm with expertise in business law, personal injury, estate planning, and family law matters.",
    logo: "https://images.unsplash.com/photo-1589391886645-d51941baf7fb?w=100&h=100&fit=crop",
    coverImage:
      "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&h=300&fit=crop",
    category: ["professional"],
    address: {
      street: "123 Justice Avenue",
      city: "Philadelphia",
      state: "PA",
      zip: "19103",
      coordinates: {
        lat: 39.9526,
        lng: -75.1652,
      },
    },
    contact: {
      phone: "(215) 555-7890",
      email: "info@legaleagles.com",
      website: "https://legaleagleslawfirm.com",
    },
    socialMedia: {
      linkedin: "legal-eagles-law",
      facebook: "legaleagleslawfirm",
      twitter: "legal_eagles",
    },
    hours: [
      { day: "Monday", open: "09:00", close: "17:30" },
      { day: "Tuesday", open: "09:00", close: "17:30" },
      { day: "Wednesday", open: "09:00", close: "17:30" },
      { day: "Thursday", open: "09:00", close: "17:30" },
      { day: "Friday", open: "09:00", close: "17:00" },
      { day: "Saturday", isClosed: true, open: "", close: "" },
      { day: "Sunday", isClosed: true, open: "", close: "" },
    ],
    features: [
      "Business Law",
      "Personal Injury",
      "Estate Planning",
      "Family Law",
      "Free Consultation",
    ],
    rating: 4.8,
    reviewCount: 51,
    reviews: generateReviews(7, 4.8),
    verified: true,
    founded: "2003",
    priceRange: "$$$",
  },
  {
    id: "dream-home-realty",
    name: "Dream Home Realty",
    description:
      "A full-service real estate agency helping clients buy, sell, and rent properties with personalized service and local expertise.",
    logo: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=100&h=100&fit=crop",
    coverImage:
      "https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=800&h=300&fit=crop",
    category: ["home", "professional"],
    address: {
      street: "456 Homestead Lane",
      city: "Charlotte",
      state: "NC",
      zip: "28202",
      coordinates: {
        lat: 35.2271,
        lng: -80.8431,
      },
    },
    contact: {
      phone: "(704) 555-2345",
      email: "agents@dreamhomerealty.com",
      website: "https://dreamhomerealty.com",
    },
    socialMedia: {
      facebook: "dreamhomerealty",
      instagram: "dream_home_realty",
      linkedin: "dream-home-realty",
    },
    hours: [
      { day: "Monday", open: "09:00", close: "18:00" },
      { day: "Tuesday", open: "09:00", close: "18:00" },
      { day: "Wednesday", open: "09:00", close: "18:00" },
      { day: "Thursday", open: "09:00", close: "18:00" },
      { day: "Friday", open: "09:00", close: "17:00" },
      { day: "Saturday", open: "10:00", close: "15:00" },
      { day: "Sunday", isClosed: true, open: "", close: "" },
    ],
    features: [
      "Residential Properties",
      "Commercial Properties",
      "Property Management",
      "Virtual Tours",
      "Market Analysis",
    ],
    rating: 4.6,
    reviewCount: 89,
    reviews: generateReviews(9, 4.6),
    verified: true,
    founded: "2010",
    priceRange: "$$",
  },
];

// Calculate actual counts for each category based on the businesses data
const categoryCounts = countBusinessesPerCategory(businesses);

// Mock Categories with accurate counts
export const categories: Category[] = [
  {
    id: "restaurants",
    name: "Restaurants",
    icon: "🍽️",
    count: categoryCounts["restaurants"] || 0,
  },
  {
    id: "retail",
    name: "Retail & Shopping",
    icon: "🛍️",
    count: categoryCounts["retail"] || 0,
  },
  {
    id: "health",
    name: "Health & Wellness",
    icon: "🏥",
    count: categoryCounts["health"] || 0,
  },
  {
    id: "tech",
    name: "Technology",
    icon: "💻",
    count: categoryCounts["tech"] || 0,
  },
  {
    id: "finance",
    name: "Financial Services",
    icon: "💰",
    count: categoryCounts["finance"] || 0,
  },
  {
    id: "entertainment",
    name: "Entertainment",
    icon: "🎭",
    count: categoryCounts["entertainment"] || 0,
  },
  {
    id: "education",
    name: "Education",
    icon: "🎓",
    count: categoryCounts["education"] || 0,
  },
  {
    id: "home",
    name: "Home Services",
    icon: "🏠",
    count: categoryCounts["home"] || 0,
  },
  {
    id: "automotive",
    name: "Automotive",
    icon: "🚗",
    count: categoryCounts["automotive"] || 0,
  },
  {
    id: "professional",
    name: "Professional Services",
    icon: "👔",
    count: categoryCounts["professional"] || 0,
  },
];
