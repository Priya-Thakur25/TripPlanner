export const SelectTravelsList = [
    {
        id: 1,
        title: 'Just Me',
        desc: 'A solve travels in Exploration',
        icon: '✈️',
        people: '1'
    },
    {
        id: 2,
        title: 'A Couple',
        desc: 'Two Traveles in tandem',
        icon: '🥂',
        people: '2 People'
    },
    {
        id: 3,
        title: 'Family',
        desc: 'A group of fun loving adv',
        icon: '🏡',
        people: '3 to 5 people'
    },
    {
        id: 4,
        title: 'Friends',
        desc: 'A bunch of Thrill-seekes',
        icon: '🍾',
        people: '5 to 10 people'
    },
]


export const SelectBudgetOptions = [
    {
        id: 1,
        title: 'Cheap',
        desc: 'Stay Concious of costs',
        icon: '💼'
    },
    {
        id: 2,
        title: 'Moderate',
        desc: 'Keep cost on the average side',
        icon: '💰'
    },
    {
        id: 3,
        title: 'Luxury',
        desc: 'Dont worry about cost',
        icon: '👑'
    }
]

export const AI_PROMPT  = 'Generate Travel Plan for Location: {location}, for {days} Days for {people} with a {budget} budget, Give me a Hotels options list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and suggest itinerary with placeName, Place Details, Place Image Url, Geo Coordinates, ticket Pricing, Time t travel each of the location for {days} days with each day plan with best time to visit in JSON format.'