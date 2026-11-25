/**
 * Central content for the site. Everything Brian-specific lives here so it
 * can be edited in one place. Values marked PLACEHOLDER still need Brian's
 * real numbers or wording before launch.
 */

export const agent = {
  firstName: "Brian",
  lastName: "Macisaac",
  title: "Realtor®",
  /** PLACEHOLDER — RECO requires the brokerage name on all advertising. Add it here. */
  brokerage: "",
  license: "RECO Registered",
  phone: "(437) 233-6790",
  phoneHref: "tel:+14372336790",
  email: "brian.macisaac416@gmail.com",
  office: "10 Cottrelle Boulevard, Suite 302, Brampton, Ontario L6S 0E2",
  officeShort: "10 Cottrelle Blvd, Suite 302, Brampton, ON L6S 0E2",
  city: "Brampton",
  serviceArea: "Brampton & the Greater Toronto Area",
  photo: "/images/brian-macisaac.jpg",
  rating: 4.98, // PLACEHOLDER
  reviewCount: 120, // PLACEHOLDER
  yearsExperience: 2, // PLACEHOLDER
  homesSold: 10, // PLACEHOLDER
  salesVolume: 200, // PLACEHOLDER — in thousands
  socials: {
    // PLACEHOLDER — swap in Brian's real profile links
    instagram: "https://instagram.com/",
    linkedin: "https://linkedin.com/",
    facebook: "https://facebook.com/",
    x: "https://x.com/",
  },
  shortBio:
    "I help families, first-time buyers and investors across Brampton and the GTA buy and sell with a clear plan, honest pricing and steady communication from first call to closing day.",
  bio: [
    // PLACEHOLDER — replace with Brian's own story
    "Brampton is one of the fastest-changing cities in Canada, and knowing it street by street makes all the difference. I know which pockets have the best schools, where the new transit and development is heading, and what a fair price really looks like from Castlemore to Bramalea.",
    "My approach is simple: tell you the truth about the market, build a plan around your timeline, and stay reachable the entire way. Whether you're buying your first townhome or selling the house you raised your family in, you'll always know what happens next and why.",
  ],
}

export const navLinks = [
  { label: "Properties", href: "/properties" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Insights", href: "/insights" },
  { label: "Contact", href: "/contact" },
]

export type ListingStatus = "For Sale" | "For Lease" | "Sold"

export type Listing = {
  slug: string
  title: string
  location: string
  price: number
  priceSuffix?: string
  status: ListingStatus
  type: string
  beds: number
  baths: number
  sqft: number
  lot?: string
  year: number
  garage: number
  image: string
  gallery: string[]
  summary: string
  description: string[]
  features: string[]
}

// PLACEHOLDER — sample listings for layout. Replace with Brian's real listings.
export const listings: Listing[] = [
  {
    slug: "castlemore-executive-detached",
    title: "Castlemore Executive Detached",
    location: "Castlemore, Brampton",
    price: 1749000,
    status: "For Sale",
    type: "Detached",
    beds: 5,
    baths: 5,
    sqft: 3650,
    lot: "50 × 110 ft",
    year: 2016,
    garage: 3,
    image: "/images/on-modern-snow.jpg",
    gallery: [
      "/images/on-modern-snow.jpg",
      "/images/interior-1.jpg",
      "/images/interior-4.jpg",
    ],
    summary:
      "Open-concept living, a chef's kitchen and a three-car garage on a premium lot.",
    description: [
      "Set on a quiet crescent in one of Brampton's most sought-after neighbourhoods, this executive home is filled with natural light. Ten-foot ceilings on the main floor flow from a formal dining room into a chef's kitchen and a family room with a gas fireplace.",
      "Upstairs, every bedroom has its own ensuite or semi-ensuite, and the finished basement adds a rec room, gym and guest bedroom. Minutes to Highway 427, top-rated schools and Claireville Conservation Area.",
    ],
    features: [
      "Three-car garage",
      "Finished basement",
      "Chef's kitchen",
      "Gas fireplace",
      "Premium lot",
      "Near Hwy 427",
    ],
  },
  {
    slug: "downtown-brampton-condo",
    title: "Downtown Brampton Condo",
    location: "Downtown Brampton",
    price: 2650,
    priceSuffix: "/mo",
    status: "For Lease",
    type: "Condo",
    beds: 2,
    baths: 2,
    sqft: 950,
    year: 2019,
    garage: 1,
    image: "/images/on-condo.jpg",
    gallery: [
      "/images/on-condo.jpg",
      "/images/interior-2.jpg",
      "/images/interior-3.jpg",
    ],
    summary: "Bright two-bedroom steps from the GO station and Garden Square.",
    description: [
      "A modern two-bedroom, two-bathroom suite with floor-to-ceiling windows and a large balcony. Walk to Brampton GO, Garden Square, the Rose Theatre and the downtown shops and restaurants.",
      "Available for a 12-month lease. Includes one underground parking spot, a storage locker and in-suite laundry. Building has a gym, party room and 24-hour concierge.",
    ],
    features: [
      "Walk to Brampton GO",
      "Underground parking",
      "Locker included",
      "In-suite laundry",
      "Concierge",
      "Large balcony",
    ],
  },
  {
    slug: "mount-pleasant-family-home",
    title: "Mount Pleasant Family Home",
    location: "Mount Pleasant, Brampton",
    price: 1149000,
    status: "For Sale",
    type: "Detached",
    beds: 4,
    baths: 4,
    sqft: 2400,
    lot: "36 × 100 ft",
    year: 2012,
    garage: 2,
    image: "/images/on-brick-1.jpg",
    gallery: [
      "/images/on-brick-1.jpg",
      "/images/interior-1.jpg",
      "/images/interior-2.jpg",
    ],
    summary:
      "A move-in ready brick detached close to Mount Pleasant GO and great schools.",
    description: [
      "A well-kept brick detached on a family-friendly street near Mount Pleasant Village. The main floor has hardwood throughout, an updated kitchen with quartz counters and a walk-out to a fenced backyard.",
      "Four generous bedrooms upstairs, including a primary suite with walk-in closet and five-piece ensuite. Walk to Mount Pleasant GO, Cassie Campbell Community Centre and nearby schools.",
    ],
    features: [
      "Near Mount Pleasant GO",
      "Quartz kitchen",
      "Fenced backyard",
      "Hardwood floors",
      "Double garage",
      "Walk to schools",
    ],
  },
  {
    slug: "heart-lake-detached",
    title: "Heart Lake Detached",
    location: "Heart Lake, Brampton",
    price: 1089000,
    status: "Sold",
    type: "Detached",
    beds: 4,
    baths: 3,
    sqft: 2150,
    year: 1998,
    garage: 2,
    image: "/images/on-brick-2.jpg",
    gallery: [
      "/images/on-brick-2.jpg",
      "/images/interior-4.jpg",
      "/images/interior-3.jpg",
    ],
    summary: "Sold over asking in 8 days with multiple offers.",
    description: [
      "A classic Heart Lake family home on a mature, tree-lined street, refreshed with new paint, lighting and landscaping before launch. We staged, photographed and listed within one week.",
      "The home drew multiple offers and sold over asking for the sellers, who were moving closer to family in Halifax.",
    ],
    features: [
      "Mature trees",
      "Near Heart Lake Conservation",
      "Refreshed interior",
      "Large backyard",
      "Double garage",
      "Sold over asking",
    ],
  },
  {
    slug: "caledon-country-estate",
    title: "Caledon Country Estate",
    location: "Caledon, Ontario",
    price: 2395000,
    status: "For Sale",
    type: "Country Home",
    beds: 4,
    baths: 4,
    sqft: 3200,
    lot: "1.6 acres",
    year: 2006,
    garage: 3,
    image: "/images/on-country.jpg",
    gallery: [
      "/images/on-country.jpg",
      "/images/interior-4.jpg",
      "/images/interior-1.jpg",
    ],
    summary:
      "Space, privacy and sunsets on 1.6 acres, 15 minutes from Brampton.",
    description: [
      "A custom-built country home on 1.6 private acres with rolling views and mature trees. The great room features a stone fireplace and walls of windows framing the property.",
      "A wraparound deck, three-car garage and a walk-out lower level make it ideal for families who want room to breathe while staying close to the city.",
    ],
    features: [
      "1.6-acre lot",
      "Stone fireplace",
      "Walk-out basement",
      "Wraparound deck",
      "Three-car garage",
      "15 min to Brampton",
    ],
  },
  {
    slug: "springdale-townhome",
    title: "Springdale Townhome",
    location: "Springdale, Brampton",
    price: 3100,
    priceSuffix: "/mo",
    status: "For Lease",
    type: "Townhome",
    beds: 3,
    baths: 3,
    sqft: 1650,
    year: 2015,
    garage: 1,
    image: "/images/on-townhomes.jpg",
    gallery: [
      "/images/on-townhomes.jpg",
      "/images/interior-3.jpg",
      "/images/interior-2.jpg",
    ],
    summary: "A freehold-style townhome near Trinity Common and Highway 410.",
    description: [
      "This three-bedroom townhome has an open main floor, a modern kitchen with stainless steel appliances and a private backyard. Close to Trinity Common Mall, Brampton Civic Hospital and Highway 410.",
      "Available now on a one-year lease. Tenant pays utilities. Small pets considered.",
    ],
    features: [
      "Near Hwy 410",
      "Private backyard",
      "Stainless appliances",
      "Attached garage",
      "Near Civic Hospital",
      "Small pets OK",
    ],
  },
  {
    slug: "streetsville-character-home",
    title: "Streetsville Character Home",
    location: "Streetsville, Mississauga",
    price: 1525000,
    status: "Sold",
    type: "Heritage",
    beds: 4,
    baths: 3,
    sqft: 2300,
    year: 1925,
    garage: 1,
    image: "/images/on-heritage.jpg",
    gallery: [
      "/images/on-heritage.jpg",
      "/images/interior-4.jpg",
      "/images/interior-1.jpg",
    ],
    summary: "Represented the buyers — secured before it hit the open market.",
    description: [
      "A lovingly restored century home with a wraparound porch, steps from Queen Street's shops and cafes. My buyers wanted character and walkability; we secured it quietly before public launch.",
      "Negotiated a credit for roof and electrical updates, saving the buyers thousands in post-closing work.",
    ],
    features: [
      "Century home",
      "Wraparound porch",
      "Walk to Queen St",
      "Off-market purchase",
      "Restored details",
      "Mature lot",
    ],
  },
  {
    slug: "bramalea-detached-legal-basement",
    title: "Bramalea Detached with Legal Basement",
    location: "Bramalea, Brampton",
    price: 949000,
    status: "For Sale",
    type: "Income Property",
    beds: 5,
    baths: 3,
    sqft: 1900,
    year: 2004,
    garage: 1,
    image: "/images/on-suburb.jpg",
    gallery: [
      "/images/on-suburb.jpg",
      "/images/interior-2.jpg",
      "/images/interior-3.jpg",
    ],
    summary:
      "Live upstairs and let the registered second unit help pay the mortgage.",
    description: [
      "A detached home with a registered two-bedroom basement apartment and separate side entrance — a great fit for first-time buyers or investors looking for rental income.",
      "Three bedrooms on the upper level, two in the lower unit, separate laundry for each. Close to Bramalea City Centre, Bramalea GO and Chinguacousy Park.",
    ],
    features: [
      "Registered second unit",
      "Separate entrance",
      "Two laundry rooms",
      "Near Bramalea GO",
      "Near Bramalea City Centre",
      "Rental income",
    ],
  },
]

export type Service = {
  slug: string
  title: string
  short: string
  image: string
  intro: string
  included: string[]
  faqs: { q: string; a: string }[]
}

export const services: Service[] = [
  {
    slug: "buying-a-home",
    title: "Buying a Home",
    short:
      "Find the right home, write a winning offer and close without surprises.",
    image: "/images/on-porch.jpg",
    intro:
      "The GTA market moves fast. I help you get clear on what you want, see the right homes first, and write offers that win without overpaying.",
    included: [
      "Buyer consultation and budget plan",
      "Early access to exclusive and coming-soon homes",
      "Neighbourhood and comparable sales analysis",
      "Offer strategy and negotiation",
      "Home inspection, financing and lawyer coordination",
      "Trusted mortgage broker, inspector and contractor referrals",
    ],
    faqs: [
      {
        q: "How much do I need for a down payment?",
        a: "In Canada the minimum down payment starts at 5% of the purchase price, with higher minimums on more expensive homes. Less than 20% down means mortgage default insurance. I'll connect you with a mortgage professional who can map out your real numbers in one call.",
      },
      {
        q: "How long does it take to buy a home?",
        a: "Most of my buyers find a home within one to three months. Closing dates are negotiated with the seller and are typically 30 to 90 days after an accepted offer.",
      },
      {
        q: "Do you help with exclusive or off-market homes?",
        a: "Yes. A good share of my buyers' purchases come through my agent network before homes are listed publicly.",
      },
    ],
  },
  {
    slug: "selling-your-home",
    title: "Selling Your Home",
    short: "Pricing, staging and marketing that brings strong offers fast.",
    image: "/images/on-brick-1.jpg",
    intro:
      "The first two weeks on the market decide most sales. I prepare, price and launch your home so it lands with the right buyers and draws competitive offers.",
    included: [
      "Pricing strategy based on live market data",
      "Staging consultation and prep checklist",
      "Professional photography, video and floor plans",
      "MLS® listing and targeted digital advertising",
      "Open houses and private showings",
      "Offer review, negotiation and closing coordination",
    ],
    faqs: [
      {
        q: "What is my home worth?",
        a: "Request a free valuation and I'll send a detailed report with recent comparable sales, current competition and a recommended price range within 48 hours.",
      },
      {
        q: "Should I renovate before selling?",
        a: "Usually small, targeted updates — paint, lighting, landscaping — return more than big renovations. I'll walk the home with you and tell you exactly what's worth doing.",
      },
      {
        q: "Should I hold offers or take them any time?",
        a: "It depends on your home and the current market. We'll look at recent sales on your street and choose the strategy most likely to get you the best price and terms.",
      },
    ],
  },
  {
    slug: "first-time-buyers",
    title: "First-Time Buyers",
    short: "A patient, step-by-step guide for your very first purchase.",
    image: "/images/interior-1.jpg",
    intro:
      "Your first home should feel exciting, not overwhelming. I explain every step in plain language and make sure you understand each document before you sign.",
    included: [
      "First-time buyer strategy session",
      "Guidance on the FHSA and RRSP Home Buyers' Plan",
      "Ontario land transfer tax rebate overview",
      "Mortgage pre-approval introductions",
      "Home tours with honest pros and cons",
      "Post-closing checklist for new homeowners",
    ],
    faqs: [
      {
        q: "Can I buy with less than 20% down?",
        a: "Yes. Most first-time buyers put down far less than 20%. Programs like the First Home Savings Account (FHSA) and the RRSP Home Buyers' Plan can also help you save faster.",
      },
      {
        q: "Are there tax breaks for first-time buyers in Ontario?",
        a: "Eligible first-time buyers can get a refund on part or all of the Ontario land transfer tax. Your lawyer applies it at closing — I'll make sure you know what to expect.",
      },
      {
        q: "Is there a cost to work with you?",
        a: "Our first consultation is free. We'll review how buyer representation works and agree on everything in writing before we tour homes.",
      },
    ],
  },
  {
    slug: "investment-properties",
    title: "Investment Properties",
    short:
      "Rental, multi-unit and second-suite opportunities with real numbers.",
    image: "/images/on-lowrise.jpg",
    intro:
      "Whether it's your first rental or your next multiplex, I help you evaluate deals on cash flow, appreciation and risk — not just curb appeal.",
    included: [
      "Investment goals and return analysis",
      "Rent comparables and cash-flow projections",
      "Legal second-unit and basement apartment reviews",
      "Pre-construction and assignment guidance",
      "Property manager referrals",
      "Portfolio review and sale planning",
    ],
    faqs: [
      {
        q: "Do you work with out-of-province or overseas investors?",
        a: "Yes. I provide video walkthroughs, detailed reports and handle local coordination so you can buy confidently from anywhere.",
      },
      {
        q: "What should I know about basement apartments in Brampton?",
        a: "A legal, registered second unit can add real rental income and resale value. Before you buy, we'll check whether an existing unit is registered or what it would take to make it legal.",
      },
      {
        q: "Which areas are best for rentals?",
        a: "It depends on your goals. We'll compare rents, vacancy and appreciation across Brampton, Mississauga and Caledon before you commit.",
      },
    ],
  },
]

export const processSteps = [
  {
    title: "Discovery Call",
    text: "We talk through your goals, timeline and budget so the plan fits your life.",
  },
  {
    title: "Strategy & Pricing",
    text: "You get a clear game plan with real market data, not guesswork.",
  },
  {
    title: "Tours & Marketing",
    text: "Buyers see the right homes first. Sellers launch with standout marketing.",
  },
  {
    title: "Negotiation",
    text: "I negotiate price, conditions and closing dates to protect your interests.",
  },
  {
    title: "Closing & Beyond",
    text: "I work with your lawyer and lender to closing day and stay your go-to resource after.",
  },
]

export const smarterWay = [
  {
    title: "Start with a plan",
    text: "One focused call to map your goals, budget and timeline before you spend a weekend at open houses.",
  },
  {
    title: "See the right homes first",
    text: "Get coming-soon and exclusive listings matched to your wishlist before they reach the big portals.",
  },
  {
    title: "Make offers that win",
    text: "Pricing data and seller insight shape every offer, so you compete without overpaying.",
  },
  {
    title: "Close with confidence",
    text: "Inspections, financing and your lawyer are coordinated for you, with updates at every milestone.",
  },
]

export const stats = [
  {
    value: agent.salesVolume,
    prefix: "$",
    suffix: "K+",
    label: "In Career Sales",
  },
  { value: agent.homesSold, suffix: "+", label: "Homes Sold" },
  { value: 99, suffix: "%", label: "Average Sale-to-List Price" }, // PLACEHOLDER
  { value: agent.yearsExperience, suffix: "+", label: "Years in the GTA" },
]

// PLACEHOLDER — review summary shown beside the testimonials. Update from real review data.
export const reviewSummary = {
  breakdown: [
    { stars: 5, percent: 94 },
    { stars: 4, percent: 5 },
    { stars: 3, percent: 1 },
    { stars: 2, percent: 0 },
    { stars: 1, percent: 0 },
  ],
  mentions: ["Honest advice", "Fast replies", "Knows Brampton", "Strong negotiator", "Stress-free closing", "Great with first-time buyers"],
}

// PLACEHOLDER — sample reviews. Replace with real client testimonials (with permission).
export const testimonials = [
  {
    name: "Sarah & Tom K.",
    location: "Castlemore, Brampton",
    image: "/images/p-1.jpg",
    rating: 5,
    quote:
      "Brian found us a home before it was even listed. He was honest about every house we saw, and the whole process felt calm.",
  },
  {
    name: "Marcus D.",
    location: "Mount Pleasant, Brampton",
    image: "/images/p-2.jpg",
    rating: 5,
    quote:
      "As first-time buyers we had a hundred questions about the FHSA and closing costs. Brian answered every one, usually within minutes.",
  },
  {
    name: "Emily R.",
    location: "Streetsville, Mississauga",
    image: "/images/p-3.jpg",
    rating: 5,
    quote:
      "He priced our home perfectly and we had multiple offers the first weekend. The staging advice alone was worth it.",
  },
  {
    name: "David L.",
    location: "Caledon, Ontario",
    image: "/images/p-4.jpg",
    rating: 5,
    quote:
      "Sold over asking in eight days. Brian handled everything while we were moving out of province — completely stress-free.",
  },
]

// PLACEHOLDER — median prices and sales counts are illustrative.
export const neighborhoods = [
  {
    name: "Castlemore",
    tagline: "Executive homes, big lots",
    image: "/images/on-modern-snow.jpg",
    median: "$1.7M",
    sold: 48,
  },
  {
    name: "Mount Pleasant",
    tagline: "Family-friendly & GO-connected",
    image: "/images/on-brick-1.jpg",
    median: "$1.1M",
    sold: 62,
  },
  {
    name: "Downtown Brampton",
    tagline: "Condos, culture & transit",
    image: "/images/on-lowrise.jpg",
    median: "$650K",
    sold: 37,
  },
  {
    name: "Caledon",
    tagline: "Country living, close to the city",
    image: "/images/on-country.jpg",
    median: "$1.8M",
    sold: 29,
  },
]

export type Post = {
  slug: string
  title: string
  excerpt: string
  date: string
  readTime: string
  category: string
  image: string
  body: { heading?: string; text: string }[]
}

export const posts: Post[] = [
  {
    slug: "how-to-choose-the-right-neighbourhood-in-brampton",
    title: "How to Choose the Right Neighbourhood in Brampton",
    excerpt:
      "Commute, schools, transit and future development — the questions I ask every buyer before we tour a single home.",
    date: "2026-10-14",
    readTime: "5 min read",
    category: "Buying",
    image: "/images/street.jpg",
    body: [
      {
        text: "The right home in the wrong neighbourhood is still the wrong home. Before we tour, I ask every buyer to picture a normal Tuesday: where you drive, where you get groceries, where your kids go to school.",
      },
      {
        heading: "Test the commute at rush hour",
        text: "Highways 410, 427 and 401 behave very differently at 8am. Drive the route — or ride the GO — at the times you'll actually travel before you fall in love with a house.",
      },
      {
        heading: "Look past the school ranking",
        text: "Visit the school, check French immersion and program options, and talk to parents at pickup. Rankings tell only part of the story.",
      },
      {
        heading: "Check what's planned nearby",
        text: "New transit, the Hurontario LRT and major developments can raise values; a new arterial road might not. I pull city planning data for every serious contender.",
      },
      {
        heading: "Walk it in the evening",
        text: "Street parking, noise and lighting change after dark. A short evening walk can save you years of frustration.",
      },
    ],
  },
  {
    slug: "pricing-your-home-to-sell",
    title: "Pricing Your Home to Sell: What the Data Says",
    excerpt:
      "Why the first two weeks matter most, and how smart pricing creates competition instead of price cuts.",
    date: "2026-09-02",
    readTime: "6 min read",
    category: "Selling",
    image: "/images/on-brick-2.jpg",
    body: [
      {
        text: "Overpricing is the most expensive mistake a seller can make. Homes that sit get discounted twice — once by the market and once by buyers who wonder what's wrong.",
      },
      {
        heading: "The two-week window",
        text: "Buyer interest peaks in the first 14 days. Pricing right from day one captures that attention while it's strongest.",
      },
      {
        heading: "Price for the search filter",
        text: "Buyers search in brackets. A home at $1,010,000 misses everyone searching up to $1M.",
      },
      {
        heading: "Let competition do the work",
        text: "A well-priced home invites multiple offers, which often pushes the final price higher than an inflated list price would.",
      },
    ],
  },
  {
    slug: "first-time-buyer-checklist-ontario",
    title: "The First-Time Buyer Checklist for Ontario",
    excerpt:
      "From the FHSA to closing day, a step-by-step list to keep your first purchase calm and on track.",
    date: "2026-07-21",
    readTime: "4 min read",
    category: "First-Time Buyers",
    image: "/images/interior-2.jpg",
    body: [
      {
        text: "Buying your first home is a big step, and a checklist keeps it manageable. Here's the order I recommend.",
      },
      {
        heading: "Get pre-approved first",
        text: "A mortgage pre-approval tells you your real budget and makes your offers stronger.",
      },
      {
        heading: "Use the programs available to you",
        text: "Look into the First Home Savings Account (FHSA), the RRSP Home Buyers' Plan and the Ontario land transfer tax refund for first-time buyers.",
      },
      {
        heading: "Budget for closing costs",
        text: "Plan for land transfer tax, legal fees, title insurance, a home inspection and moving costs — plus a cushion for the first few months.",
      },
      {
        heading: "Know your must-haves",
        text: "Separate the non-negotiables from the nice-to-haves before you tour.",
      },
    ],
  },
  {
    slug: "is-a-legal-basement-apartment-worth-it",
    title: "Is a Legal Basement Apartment Worth It in Brampton?",
    excerpt:
      "Rental income, resale value and the registration process — a clear-eyed look for buyers and investors.",
    date: "2026-05-30",
    readTime: "7 min read",
    category: "Investing",
    image: "/images/interior-3.jpg",
    body: [
      {
        text: "Basement apartments are part of what makes Brampton such an interesting market. Done right, a second unit can help cover your mortgage and broaden your pool of future buyers.",
      },
      {
        heading: "Legal vs. existing",
        text: "Many homes have a basement unit, but not all are registered with the city. Before you buy, we confirm the unit's status and what it would take to make it legal.",
      },
      {
        heading: "Run the real numbers",
        text: "Use conservative rent estimates and include vacancy, maintenance, insurance and utilities.",
      },
      {
        heading: "Think about resale",
        text: "A registered second unit can make your home appealing to both families and investors when it's time to sell.",
      },
    ],
  },
]

export const formatPrice = (price: number, suffix?: string) =>
  `$${price.toLocaleString("en-CA")}${suffix ?? ""}`

export const formatDate = (iso: string) =>
  new Date(iso + "T12:00:00").toLocaleDateString("en-CA", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })
