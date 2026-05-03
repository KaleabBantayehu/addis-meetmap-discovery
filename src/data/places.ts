export type Vibe = "quiet" | "date" | "work-friendly" | "business" | "busy" | "romantic";
export type Price = "$" | "$$" | "$$$";

export interface Review {
  id: string;
  author: string;
  rating: number;
  text: string;
  tags: string[];
  date: string;
}

export interface Place {
  id: string;
  name: string;
  area: string;
  category: "Cafe" | "Restaurant" | "Lounge";
  rating: number;
  reviewCount: number;
  price: Price;
  vibes: Vibe[];
  lat: number;
  lng: number;
  image: string;
  description: string;
  reviews: Review[];
}

const img = (q: string) =>
  `https://images.unsplash.com/${q}?auto=format&fit=crop&w=900&q=80`;

export const places: Place[] = [
  {
    id: "tomoca-piassa",
    name: "Tomoca Coffee — Piassa",
    area: "Piassa",
    category: "Cafe",
    rating: 4.7,
    reviewCount: 312,
    price: "$",
    vibes: ["quiet", "work-friendly"],
    lat: 9.0357,
    lng: 38.7515,
    image: img("photo-1495474472287-4d71bcdd2085"),
    description:
      "An Addis institution since 1953. Standing-room espresso bar with the city's most consistent buna. Great for a quick caffeine reset between meetings.",
    reviews: [
      {
        id: "r1",
        author: "Hanna T.",
        rating: 5,
        text: "Best macchiato in town. The roast is dark, full-bodied, and the price hasn't changed much in years. Go early — it gets packed by 10am.",
        tags: ["service", "price"],
        date: "2 weeks ago",
      },
      {
        id: "r2",
        author: "Dawit M.",
        rating: 4,
        text: "Authentic Addis coffee experience. No seats really, more of a stand-and-sip place. Don't expect wifi or laptop space.",
        tags: ["environment"],
        date: "1 month ago",
      },
    ],
  },
  {
    id: "kategna-bole",
    name: "Kategna Restaurant",
    area: "Bole",
    category: "Restaurant",
    rating: 4.5,
    reviewCount: 528,
    price: "$$",
    vibes: ["business", "busy"],
    lat: 8.9931,
    lng: 38.7892,
    image: img("photo-1555939594-58d7cb561ad1"),
    description:
      "Reliable Ethiopian classics — kitfo, tibs, and a beyaynetu that actually fills the plate. Solid choice for hosting friends from out of town.",
    reviews: [
      {
        id: "r1",
        author: "Sara A.",
        rating: 5,
        text: "Took my visiting cousins here. Kitfo was perfectly seasoned and the injera was fresh. Service a bit slow on Friday nights but worth the wait.",
        tags: ["service", "environment"],
        date: "1 week ago",
      },
      {
        id: "r2",
        author: "Yonas K.",
        rating: 4,
        text: "Good food, fair price for the portion size. Parking is the only headache — come by Ride if you can.",
        tags: ["price"],
        date: "3 weeks ago",
      },
    ],
  },
  {
    id: "lime-tree-bole",
    name: "Lime Tree",
    area: "Bole",
    category: "Cafe",
    rating: 4.4,
    reviewCount: 246,
    price: "$$",
    vibes: ["work-friendly", "quiet"],
    lat: 9.0102,
    lng: 38.7869,
    image: img("photo-1554118811-1e0d58224f24"),
    description:
      "Bright, plant-filled cafe with reliable wifi and proper espresso. A go-to for freelancers and remote teams holding standups over a flat white.",
    reviews: [
      {
        id: "r1",
        author: "Mahlet G.",
        rating: 5,
        text: "My second office. Wifi rarely drops, outlets at most tables, and the avocado toast is genuinely good. Staff don't rush you.",
        tags: ["environment", "service"],
        date: "5 days ago",
      },
    ],
  },
  {
    id: "yod-abyssinia",
    name: "Yod Abyssinia Cultural",
    area: "Bole",
    category: "Restaurant",
    rating: 4.6,
    reviewCount: 891,
    price: "$$$",
    vibes: ["busy", "romantic"],
    lat: 8.9856,
    lng: 38.7935,
    image: img("photo-1414235077428-338989a2e8c0"),
    description:
      "Traditional cultural restaurant with live music, dancing, and a proper coffee ceremony. Touristy but the food holds up — perfect for special occasions.",
    reviews: [
      {
        id: "r1",
        author: "Bethel N.",
        rating: 5,
        text: "Took my partner here for our anniversary. The Eskista performance was incredible and the doro wat was rich and slow-cooked. Pricey but you're paying for the show too.",
        tags: ["environment", "service"],
        date: "2 weeks ago",
      },
      {
        id: "r2",
        author: "Michael F.",
        rating: 4,
        text: "Great for first-time visitors to Addis. Locals might find it a bit performative but the quality of the tibs is genuinely high.",
        tags: ["price"],
        date: "1 month ago",
      },
    ],
  },
  {
    id: "kaldis-kazanchis",
    name: "Kaldi's Coffee — Kazanchis",
    area: "Kazanchis",
    category: "Cafe",
    rating: 4.1,
    reviewCount: 174,
    price: "$",
    vibes: ["business", "busy"],
    lat: 9.0153,
    lng: 38.7702,
    image: img("photo-1453614512568-c4024d13c247"),
    description:
      "The Ethiopian Starbucks. Predictable menu, fast service, and a meeting-friendly layout. Useful when you need a known quantity.",
    reviews: [
      {
        id: "r1",
        author: "Robel A.",
        rating: 4,
        text: "Met a client here — easy to find, decent coffee, clean bathrooms. Not exciting but it does the job.",
        tags: ["service"],
        date: "3 days ago",
      },
    ],
  },
  {
    id: "sishu-old-airport",
    name: "Sishu",
    area: "Old Airport",
    category: "Restaurant",
    rating: 4.3,
    reviewCount: 198,
    price: "$$",
    vibes: ["date", "quiet"],
    lat: 8.9869,
    lng: 38.7596,
    image: img("photo-1517248135467-4c7edcad34c4"),
    description:
      "Garden-style spot with a thoughtful fusion menu. Quiet enough for real conversation. Their pasta and Ethiopian-fusion dishes are the standouts.",
    reviews: [
      {
        id: "r1",
        author: "Liya B.",
        rating: 5,
        text: "Date night winner. The garden seating with string lights is genuinely romantic, not cheesy. The lamb tibs pasta sounds weird but works.",
        tags: ["environment"],
        date: "1 week ago",
      },
    ],
  },
  {
    id: "sky-bistro",
    name: "Sky Bistro",
    area: "CMC",
    category: "Lounge",
    rating: 4.2,
    reviewCount: 156,
    price: "$$$",
    vibes: ["date", "romantic"],
    lat: 9.0283,
    lng: 38.8244,
    image: img("photo-1551632436-cbf8dd35adfa"),
    description:
      "Rooftop with a real view of Addis at dusk. Cocktail program is solid, food is fine. Come for the view and the second drink.",
    reviews: [
      {
        id: "r1",
        author: "Nahom T.",
        rating: 4,
        text: "View is worth the trip. Drinks priced for the skyline, not the pour. Reserve a window seat.",
        tags: ["environment", "price"],
        date: "2 weeks ago",
      },
    ],
  },
  {
    id: "mokarar-megenagna",
    name: "Mokarar Coffee",
    area: "Megenagna",
    category: "Cafe",
    rating: 4.5,
    reviewCount: 203,
    price: "$",
    vibes: ["quiet", "work-friendly"],
    lat: 9.0202,
    lng: 38.8011,
    image: img("photo-1521017432531-fbd92d768814"),
    description:
      "Quiet neighborhood roaster with single-origin Yirgacheffe and Sidamo. The pour-over is the move. Real plants, no music too loud to think.",
    reviews: [
      {
        id: "r1",
        author: "Eyerusalem K.",
        rating: 5,
        text: "Finally a place that takes pour-over seriously. The Yirgacheffe was floral and bright — they brewed it properly. Bonus: outlets everywhere.",
        tags: ["service", "environment"],
        date: "4 days ago",
      },
    ],
  },
];

export const allVibes: Vibe[] = ["quiet", "date", "work-friendly", "business", "busy", "romantic"];
export const allPrices: Price[] = ["$", "$$", "$$$"];
