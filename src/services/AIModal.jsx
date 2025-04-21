import { GoogleGenerativeAI } from "@google/generative-ai";


const apiKey = import.meta.env.VITE_GOOGLE_GEMINI_API_KEY;

const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

export const chatSession = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [
        {
          text: `Generate Travel Plan for Location: Las Vegas, for 3 Days for Couple with a Cheap budget. 
  Give me a Hotels options list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions 
  and suggest itinerary with placeName, Place Details, Place Image Url, Geo Coordinates, ticket Pricing, 
  Time to travel each of the location for 3 days with each day plan with best time to visit in JSON format.`,
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: `I cannot access real-time information, including live pricing for hotels, availability, or dynamically generated image URLs.  Therefore, I cannot provide the image URLs, exact pricing, and real-time availability for hotels.  Hotel prices are also extremely dynamic and change constantly.

However, I can give you a JSON structure that you can populate with the information you find using online travel agencies like Expedia, Booking.com, Kayak, etc.  Remember to always check multiple sites for the best deals!


\`\`\`json
{
  "trip": {
    "location": "Las Vegas, Nevada",
    "duration": "3 Days",
    "travelers": "Couple",
    "budget": "Cheap"
  },
  "hotels": [
    {
      "hotelName": "Hotel Name 1",
      "hotelAddress": "Street Address, Las Vegas, NV, Zip Code",
      "price": { "range": "$$$", "note": "Price varies greatly by season and booking time. Check online travel agencies."},
      "imageUrl": "Insert image URL here",
      "geoCoordinates": { "latitude": 36.1699, "longitude": -115.1398 },  //Example coordinates - replace with actual coordinates
      "rating": 4.0,
      "description": "Short description of the hotel - amenities, proximity to attractions, etc."
    },
    {
      "hotelName": "Hotel Name 2",
      "hotelAddress": "Street Address, Las Vegas, NV, Zip Code",
      "price": {"range": "$$", "note": "Price varies greatly by season and booking time. Check online travel agencies."},
      "imageUrl": "Insert image URL here",
      "geoCoordinates": { "latitude": 36.1699, "longitude": -115.1398 }, //Example coordinates - replace with actual coordinates
      "rating": 3.5,
      "description": "Short description of the hotel - amenities, proximity to attractions, etc."
    },
    {
      "hotelName": "Hotel Name 3",
      "hotelAddress": "Street Address, Las Vegas, NV, Zip Code",
      "price": {"range": "$", "note": "Price varies greatly by season and booking time. Check online travel agencies."},
      "imageUrl": "Insert image URL here",
      "geoCoordinates": { "latitude": 36.1699, "longitude": -115.1398 }, //Example coordinates - replace with actual coordinates
      "rating": 3.0,
      "description": "Short description of the hotel - amenities, proximity to attractions, etc."
    }

  ],
  "itinerary": {
    "day1": [
      {
        "placeName": "Fremont Street Experience",
        "placeDetails": "Free outdoor pedestrian mall with light shows, street performers, and casinos.",
        "imageUrl": "Insert image URL here",
        "geoCoordinates": { "latitude": 36.1699, "longitude": -115.1400}, //Example coordinates - replace with actual coordinates
        "ticketPricing": "Free",
        "timeToTravel": "30 minutes walk/short cab ride from most hotels"
      },
      {
        "placeName": "Neon Museum",
        "placeDetails": "Outdoor museum showcasing vintage Las Vegas signs.",
        "imageUrl": "Insert image URL here",
        "geoCoordinates": { "latitude": 36.1699, "longitude": -115.1400 }, //Example coordinates - replace with actual coordinates
        "ticketPricing": "Check website for pricing",
        "timeToTravel": "15-20 minutes travel from Fremont Street"
      }
    ],
    "day2": [
      {
        "placeName": "The Strip (walking tour)",
        "placeDetails": "Walk south along The Strip, admiring the hotels and atmosphere.",
        "imageUrl": "Insert image URL here",
        "geoCoordinates": { "latitude": 36.1146, "longitude": -115.1728 }, // Example coordinates - replace with actual coordinates
        "ticketPricing": "Free",
        "timeToTravel": "Flexible, depending on how much you walk."
      },
      {
        "placeName": "Bellagio Fountains",
        "placeDetails": "Free water show with music and lights.",
        "imageUrl": "Insert image URL here",
        "geoCoordinates": { "latitude": 36.1146, "longitude": -115.1728 }, //Example coordinates - replace with actual coordinates
        "ticketPricing": "Free",
        "timeToTravel": "Located on The Strip"
      }
    ],
    "day3": [
      {
        "placeName": "Red Rock Canyon National Conservation Area",
        "placeDetails": "Scenic drives and hiking trails outside of Las Vegas. Requires car rental or Uber/Lyft.",
        "imageUrl": "Insert image URL here",
        "geoCoordinates": { "latitude": 36.2034, "longitude": -115.8325 }, //Example coordinates - replace with actual coordinates
        "ticketPricing": "Small entry fee per vehicle",
        "timeToTravel": "30-45 minutes drive outside the city."
      },
      {
        "placeName": "Seven Magic Mountains",
        "placeDetails": "Colorful art installation south of the city. Requires car rental or Uber/Lyft.",
        "imageUrl": "Insert image URL here",
        "geoCoordinates": { "latitude": 35.9685, "longitude": -114.9260}, //Example coordinates - replace with actual coordinates
        "ticketPricing": "Free",
        "timeToTravel": "30-45 minute drive south of the city"
      }
    ]
  }
}
\`\`\`

Remember to replace the placeholder information with your research.  Consider using free activities like walking The Strip, enjoying free shows (check show schedules!), and utilizing public transportation where possible to keep costs down.  Enjoy your trip!
`,
        },
      ],
    },
  ],
});
