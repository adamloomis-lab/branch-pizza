// All site content for Branch Pizza. Single source of truth consumed by pages,
// components, and the SEO/JSON-LD layer.

export const company = {
  name: 'Branch Pizza',
  shortName: 'Branch Pizza',
  tagline: 'No Debate, Just Delicious',
  established: '1977',
  // One-liner used in hero / meta.
  shortBlurb:
    "Sunbury's award-winning pizzeria since 1977. Hand-crafted pizzas, our signature crisped pepperoni-cup pies, fresh-made knots, wings, subs and a full bar, right on the square in downtown Sunbury.",
  phone: '(740) 965-3383',
  phoneHref: 'tel:+17409653383',
  smsHref: 'sms:+17409653383',
  address: {
    street: '34 S Vernon St',
    city: 'Sunbury',
    state: 'OH',
    zip: '43074',
  },
  addressOneLine: '34 S Vernon St, Sunbury, OH 43074',
  geo: { lat: 40.242287, lng: -82.858145 },
  // Google Places id, powers the live reviews function + maps deep links.
  placeId: 'ChIJtX4d8NFZOIgRqvCIGTKnsR4',
  mapsDir:
    'https://www.google.com/maps/dir/?api=1&destination=Branch+Pizza+34+S+Vernon+St+Sunbury+OH+43074',
  mapsEmbed:
    'https://www.google.com/maps?q=34+S+Vernon+St+Sunbury+OH+43074&output=embed',
  mapsReviews: 'https://maps.google.com/?cid=2211732725634232490',
  social: {
    facebook: 'https://www.facebook.com/BranchPizza/',
    yelp: 'https://www.yelp.com/biz/branch-pizza-sunbury',
  },
  // Online ordering, Heartland is the restaurant's own system (no commission).
  order: {
    online: 'https://branchpizzasunbury.hrpos.heartland.us/menu',
  },
} as const

// ---------------------------------------------------------------------------
// Hours. dow matches Date.getDay() (0 = Sun).
// ---------------------------------------------------------------------------
export const hours = [
  { day: 'Sunday', short: 'Sun', dow: 0, time: '4:00 – 9:00 pm' },
  { day: 'Monday', short: 'Mon', dow: 1, time: '4:00 – 9:00 pm' },
  { day: 'Tuesday', short: 'Tue', dow: 2, time: '11:00 am – 9:00 pm' },
  { day: 'Wednesday', short: 'Wed', dow: 3, time: '11:00 am – 9:00 pm' },
  { day: 'Thursday', short: 'Thu', dow: 4, time: '11:00 am – 9:00 pm' },
  { day: 'Friday', short: 'Fri', dow: 5, time: '11:00 am – 10:00 pm' },
  { day: 'Saturday', short: 'Sat', dow: 6, time: '4:00 – 10:00 pm' },
]

export const hoursCompact = [
  { day: 'Mon', time: '4 – 9 pm' },
  { day: 'Tue – Thu', time: '11 am – 9 pm' },
  { day: 'Fri', time: '11 am – 10 pm' },
  { day: 'Sat', time: '4 – 10 pm' },
  { day: 'Sun', time: '4 – 9 pm' },
]

// Schema.org openingHoursSpecification
export const openingHours = [
  { days: ['Tuesday', 'Wednesday', 'Thursday'], opens: '11:00', closes: '21:00' },
  { days: ['Friday'], opens: '11:00', closes: '22:00' },
  { days: ['Saturday'], opens: '16:00', closes: '22:00' },
  { days: ['Sunday', 'Monday'], opens: '16:00', closes: '21:00' },
]

export const featurePillars = [
  {
    title: 'Since 1977',
    blurb:
      "Nearly 50 years of pizza on the Sunbury square. Same recipes, same hand-tossed crust, same hometown pride that's kept folks coming back for generations.",
  },
  {
    title: 'Award-Winning',
    blurb:
      "Crowned Grubhub's best pizza in town two years running, and a local favorite long before that. Order one pie and you'll get why.",
  },
  {
    title: 'Made From Scratch',
    blurb:
      'Dough, sauce and our signature crisped pepperoni cups, every pie is built to order by people who actually care how it tastes.',
  },
]

// ---------------------------------------------------------------------------
// MENU, transcribed from the in-house menu boards. Single prices are exact;
// the multi-size pizza grids are for reference, confirm current pricing on the
// live online-ordering menu.
// ---------------------------------------------------------------------------
export type MenuItem = { name: string; price?: string; desc?: string }
export type MenuGroup = { title: string; note?: string; items: MenuItem[] }

// Pizza sizes, the source of truth for the interactive size picker on the menu.
// `gf` is the 12″ gluten-free cauliflower crust (a different crust, not a size).
export type PizzaSizeKey = '10' | '12' | '14' | '16' | 'gf'
export const pizzaSizes: { key: PizzaSizeKey; label: string; sub: string }[] = [
  { key: '10', label: '10″', sub: 'Small' },
  { key: '12', label: '12″', sub: 'Medium' },
  { key: '14', label: '14″', sub: 'Large' },
  { key: '16', label: '16″', sub: 'X-Large' },
  { key: 'gf', label: '12″ GF', sub: 'Cauli' },
]

export type SpecialtyPizza = {
  name: string
  desc: string
  prices: Partial<Record<PizzaSizeKey, string>>
}

export const specialtyPizzas: SpecialtyPizza[] = [
  {
    name: 'Chicago Classic Pie',
    prices: { '10': '13.95', '12': '19.00', '14': '22.50', '16': '27.30', gf: '22.50' },
    desc: 'Signature garlic butter sauce, mozzarella, broccoli, spinach and grated Romano with an additional top crust.',
  },
  {
    name: "Founder's Favorite",
    prices: { '10': '13.95', '12': '15.95', '14': '19.95', '16': '24.95', gf: '21.00' },
    desc: 'Mozzarella, cheddar, mushroom, bacon and grated Romano.',
  },
  {
    name: 'Potato',
    prices: { '10': '13.95', '12': '15.95', '14': '20.95', '16': '25.95', gf: '18.95' },
    desc: 'Mashed potatoes, signature garlic butter sauce, mozzarella, cheddar and bacon. Served with sour cream.',
  },
  {
    name: 'Supreme',
    prices: { '10': '14.95', '12': '17.95', '14': '22.95', '16': '25.95', gf: '20.50' },
    desc: 'Mozzarella, pepperoni, Italian sausage, mushroom, green pepper, onions and grated Romano.',
  },
  {
    name: 'Taco',
    prices: { '10': '14.75', '12': '16.75', '14': '21.75', '16': '24.75', gf: '19.50' },
    desc: 'Signature enchilada sauce, mozzarella, cheddar, chorizo sausage, onions, jalapeños, lettuce, tomatoes and grated Romano. Served with sour cream and salsa.',
  },
  {
    name: 'Old World',
    prices: { '10': '12.95', '12': '15.95', '14': '19.95', '16': '23.95', gf: '18.95' },
    desc: 'Mozzarella, smoked provolone, Old World pepperoni and grated Romano.',
  },
  {
    name: 'Stromboli',
    prices: { '10': '13.25', '12': '15.50', '14': '17.65', '16': '19.80' },
    desc: 'Signature garlic butter sauce with a blend of spices, mozzarella, original pepperoni and grated Romano. Served with our signature red sauce for dipping. Additional toppings available with an upcharge.',
  },
  {
    name: 'Veggie Deluxe',
    prices: { '10': '13.95', '12': '16.95', '14': '19.95', '16': '23.95' },
    desc: 'Mozzarella, mushrooms, green peppers, onions, black olives, Roma tomatoes and grated Romano.',
  },
  {
    name: 'BBQ Chicken',
    prices: { '10': '13.95', '12': '16.95', '14': '21.95', '16': '24.95', gf: '18.95' },
    desc: 'Signature BBQ sauce, mozzarella, cheddar, grilled chicken, onions and grated Romano.',
  },
  {
    name: 'Buffalo Chicken',
    prices: { '10': '13.95', '12': '16.95', '14': '21.95', '16': '24.95', gf: '18.95' },
    desc: 'Signature mild sauce, ranch, mozzarella, cheddar, grilled chicken, onions and grated Romano.',
  },
  {
    name: 'Four Cheese',
    prices: { '10': '12.95', '12': '15.95', '14': '19.95', '16': '23.95', gf: '19.95' },
    desc: 'Mozzarella, smoked provolone, shaved parmesan and grated Romano.',
  },
  {
    name: 'Hawaiian',
    prices: { '10': '12.95', '12': '15.95', '14': '19.95', '16': '23.95', gf: '18.95' },
    desc: 'Mozzarella, bacon, smoked ham, pineapple and grated Romano.',
  },
  {
    name: "Meat Lover's",
    prices: { '10': '13.95', '12': '17.95', '14': '22.95', '16': '29.95', gf: '21.95' },
    desc: 'Mozzarella, pepperoni, Italian sausage, smoked ham, bacon and grated Romano.',
  },
  {
    name: 'BLT Pizza',
    prices: { '10': '12.95', '12': '15.95', '14': '18.95', '16': '21.95', gf: '17.95' },
    desc: 'Mayo for the sauce, mozzarella, bacon, lettuce and tomato.',
  },
  {
    name: 'Kibler Special',
    prices: { '10': '15.60', '12': '18.50', '14': '21.95', '16': '25.95', gf: '22.95' },
    desc: 'Thin crust, mozzarella, original pepperoni, Old World pepperoni, Italian sausage and extra mozzarella with grated Romano. Cooked extra crisp.',
  },
]

export const buildYourOwn = {
  prices: { '10': '9.75', '12': '12.95', '14': '14.25', '16': '16.25', gf: '16.50' } as Record<PizzaSizeKey, string>,
  toppings:
    'Mozzarella, provolone, cheddar, shredded parmesan, grated Romano, pepperoni, Old World pepperoni, Italian sausage, pinched Italian sausage, smoked ham, salami, bacon, capicola, homemade meatballs, grilled chicken, onions, red onions, green peppers, broccoli, spinach, mushrooms, banana peppers, green olives, black olives, jalapeños, tomatoes, pineapple and pickles.',
  note: 'Additional charge to add toppings or make it Chicago style.',
}

export const startersMenu: MenuGroup[] = [
  {
    title: 'Starters',
    items: [
      { name: 'Bosco Sticks', price: '6.50', desc: 'Served with sauce.' },
      { name: 'Breadsticks', price: '5.99', desc: 'Served with pizza sauce.' },
      { name: 'Breadsticks with Cheese', price: '6.99', desc: 'Served with pizza sauce.' },
      { name: 'Garlic Knots', price: '5 for 5.75 · 10 for 10.50', desc: 'Served with sauce.' },
      { name: 'Garlic Bread', price: '5.25' },
      { name: 'Garlic Bread with Cheese', price: '6.50' },
      { name: 'Mozzarella Sticks', price: '7.25', desc: 'Served with pizza sauce.' },
      { name: 'Mac & Cheese Bites', price: '7.25', desc: 'Served with pizza sauce.' },
      { name: 'Potato Skins', price: '7.25', desc: 'Served with sour cream.' },
      { name: 'Beer Battered Pickles', price: '7.25', desc: 'Served with chipotle ranch.' },
      { name: 'Chicken Tenders', price: '6.50' },
      { name: 'Side of Fries', price: '4.25' },
      { name: 'Meatball (plain)', price: '1.75' },
      { name: 'Meatball with Pizza Sauce & Mozzarella', price: '3.10' },
      { name: 'Chips', price: '1.25' },
    ],
  },
  {
    title: 'Salads',
    note: 'Dressings: house Italian, Caesar, buttermilk ranch, honey French, blue cheese, Thousand Island, honey mustard, balsamic vinaigrette. Extra dressing available.',
    items: [
      {
        name: 'House Salad',
        price: 'Small 6.25 · Large 8.50',
        desc: 'Lettuce, mozzarella, pepperoni, smoked ham, black olives and banana peppers. Served with dressing of choice.',
      },
      {
        name: 'Caesar Salad',
        price: 'Small 6.00 · Large 8.25',
        desc: 'Romaine lettuce, shredded parmesan, croutons and creamy Caesar dressing.',
      },
      {
        name: 'Grilled Chicken Salad',
        price: 'Small 7.50 · Large 9.25',
        desc: 'Lettuce, mozzarella, black olives, banana peppers and grilled chicken. Served with dressing of choice.',
      },
    ],
  },
  {
    title: 'Wings',
    note: 'Served in the sauce of your choice. Sauces: BBQ, citrus chipotle, mild, hot, garlic parmesan, kickin’ bourbon, stingin’ honey garlic, teriyaki, BQ sauce (mild & garlic parm mix). Dry rubs: Caribbean jerk, sweet habanero, Cajun, chipotle Carolina, JJ’s heat fixins.',
    items: [
      { name: 'Traditional Wings', price: '10 pc 18.95 · 20 pc 34.00' },
      { name: 'Flats', price: '10 pc 20.35 · 20 pc 35.40' },
      { name: 'Drummies', price: '10 pc 20.35 · 20 pc 35.40' },
      { name: 'Boneless Wings', price: '12 pc 15.99 · 24 pc 29.95' },
    ],
  },
]

export const subsMenu: MenuGroup[] = [
  {
    title: 'Subs',
    items: [
      {
        name: 'Italian Sub',
        price: '9.00',
        desc: 'Smoked ham, hard salami, capicola ham, provolone, lettuce, tomatoes, red onions, banana peppers and Italian dressing.',
      },
      {
        name: 'Ham & Cheese Sub',
        price: '9.00',
        desc: 'Smoked ham, provolone, lettuce, tomatoes, red onions, banana peppers and Italian dressing.',
      },
      {
        name: 'Pizza Sub',
        price: '9.00',
        desc: 'Signature pizza sauce, provolone, pepperoni and grated Romano. Served open-faced.',
      },
      {
        name: 'Meatball Sub',
        price: '9.00',
        desc: 'Homemade meatballs topped with signature pizza sauce, provolone and grated Romano.',
      },
      {
        name: 'Turkey Sub',
        price: '9.00',
        desc: 'Smoked honey-roasted turkey breast, provolone, lettuce, tomato, red onions, banana peppers and Italian dressing.',
      },
      {
        name: 'Turkey Sub with Bacon',
        price: '10.00',
        desc: 'Smoked honey-roasted turkey breast, bacon, provolone, lettuce, tomato, red onions, banana peppers and Italian dressing.',
      },
      {
        name: 'Steak Sub',
        price: '9.00',
        desc: 'Large steak patty, provolone, lettuce, tomato, red onions, banana peppers and Italian dressing.',
      },
      {
        name: 'Chicken Parmesan Sub',
        price: '9.00',
        desc: 'Chicken tenders, signature pizza sauce, provolone and grated Romano.',
      },
      {
        name: 'Grilled Chicken Sub',
        price: '9.00',
        desc: 'Grilled chicken, green peppers, onions, provolone, lettuce, tomatoes and Italian dressing.',
      },
      {
        name: 'Buffalo Chicken Sub',
        price: '9.00',
        desc: 'Chicken tenders, provolone, cheddar and signature buffalo sauce.',
      },
      {
        name: 'Veggie Sub',
        price: '9.00',
        desc: 'Mushrooms, green peppers, onions, provolone, black olives, lettuce, tomatoes and Italian dressing.',
      },
      { name: 'BLT Sub', price: '9.00', desc: 'Bacon, provolone, lettuce, tomato and mayo.' },
    ],
  },
  {
    title: 'Dinners',
    items: [
      { name: 'Lasagna Dinner', price: '13.50', desc: 'Served with garlic bread and side salad.' },
      { name: 'Lasagna', price: '7.50' },
      {
        name: 'Spaghetti & Meatball Dinner',
        price: '13.50',
        desc: 'Served with garlic bread and side salad.',
      },
      { name: 'Spaghetti & Meatball', price: '7.50' },
      { name: 'Chicken Tenders with Fries', price: '10.75' },
    ],
  },
  {
    title: 'Specials',
    items: [
      {
        name: 'Lunch Special',
        price: '10.00',
        desc: 'Sub of choice, chips and a can of Coke.',
      },
      {
        name: 'Dinner Special',
        price: '32.75',
        desc: '16″ one-topping pizza, 2 Italian subs and a 2-liter of choice.',
      },
    ],
  },
  {
    title: 'Dessert',
    items: [
      { name: 'Chocolate Brownie Cheesecake' },
      { name: 'Blueberry Cheesecake' },
      { name: "Choc’Late Lovin’ Spoon Cake" },
    ],
  },
  {
    title: 'Beverages',
    note: 'Coke products.',
    items: [
      { name: '2-Liter of Pop', price: '3.40' },
      { name: 'Can of Pop', price: '1.40' },
      {
        name: 'Fountain Pop',
        price: '2.40',
        desc: 'Coke, Diet Coke, Cherry Coke, Barq’s Root Beer, Sprite & lemonade. Free refills.',
      },
      { name: 'Gold Peak Iced Tea', price: '2.90', desc: 'Sweet or unsweetened.' },
    ],
  },
]

// Beer & wine, shown as simple lists (full bar).
// Each drink carries a style so the menu can color-code and tag it.
export type Drink = { name: string; style: string }
export const barMenu: { beer: Drink[]; wine: Drink[] } = {
  beer: [
    { name: 'Michelob Ultra', style: 'Light Lager' },
    { name: 'Budweiser', style: 'Lager' },
    { name: 'Bud Light', style: 'Light Lager' },
    { name: 'Miller Lite', style: 'Light Lager' },
    { name: 'Coors Light', style: 'Light Lager' },
    { name: 'Goose Island', style: 'IPA' },
    { name: 'Yuengling', style: 'Amber Lager' },
    { name: 'Yuengling Flight', style: 'Light Lager' },
    { name: 'Busch Light', style: 'Light Lager' },
    { name: 'Blue Moon', style: 'Wheat' },
    { name: 'Peroni', style: 'Lager' },
    { name: 'Kona Big Wave', style: 'Golden Ale' },
    { name: 'Truly', style: 'Seltzer' },
    { name: 'High Noon', style: 'Seltzer' },
    { name: 'Angry Orchard', style: 'Cider' },
    { name: 'CBC IPA', style: 'IPA' },
    { name: 'BrewDog Elvis Juice', style: 'IPA' },
    { name: 'White Claw', style: 'Seltzer' },
    { name: 'Seasonal Ale', style: 'Seasonal' },
  ],
  wine: [
    { name: 'Pinot Noir', style: 'Red' },
    { name: 'Pinot Grigio', style: 'White' },
  ],
}

// ---------------------------------------------------------------------------
// Reviews, baked from live Google data (fallback + SEO). The live ReviewsCard
// refreshes these from the Places API at runtime.
// ---------------------------------------------------------------------------
export const ratingSummary = { value: '4.5', count: 172 }

export const reviews = [
  {
    name: 'Kirsten Ayres',
    rating: 5,
    quote:
      'My husband and I recently moved here and we were in search of a new pizza place. This pizza exceeded everything we expected. Such a welcoming atmosphere, with the kindest woman that served us. So delicious it was hard to let it cool down, but worth every mouth burn! We will be back.',
  },
  {
    name: 'J L',
    rating: 5,
    quote:
      'Love Branch Pizza. You can actually taste each of the ingredients on the pizza. The sauce, cheese and toppings all have great flavor. The cheese is particularly good. Do yourself a favor and get a pizza.',
  },
  {
    name: 'Stacy Ross',
    rating: 5,
    quote:
      'We chose Branch because it was local. We had the Old World pizza and we agree that it’s some of the best we’ve had in quite a while. The garlic knots were fluffy and delicious. Overall great choice!',
  },
  {
    name: 'Scott Jason',
    rating: 5,
    quote:
      'The garlic knots are delicious! Excellent taste with the marinara. I do appreciate a hearty amount of meat and it’s pretty packed with it. The cheese pizza was devoured by my 5 year old. Friendly staff as well!',
  },
  {
    name: 'Julie',
    rating: 5,
    quote:
      'Delicious food and great service! We ordered a large pepperoni pizza, lasagna dinner and mozzarella sticks. Will definitely go again.',
  },
]

// ---------------------------------------------------------------------------
// Food & atmosphere gallery (owner-supplied). alt doubles as on-site captions.
// ---------------------------------------------------------------------------
export const gallery = [
  { src: '/images/pepperoni-cup-rack.webp', alt: 'Signature crisped pepperoni-cup pizza fresh off the rack' },
  { src: '/images/pepperoni-cup-top.webp', alt: 'Close-up of curled, crispy-edged pepperoni cups' },
  { src: '/images/classic-pepperoni.webp', alt: 'Classic pepperoni pizza held fresh from the oven' },
  { src: '/images/bacon-cheddar-bar.webp', alt: "Founder's Favorite bacon and cheddar pizza" },
  { src: '/images/bacon-cheddar-box.webp', alt: 'Bacon-cheddar pizza in the box with a side of ranch' },
  { src: '/images/white-bacon-pizza.webp', alt: 'White garlic-butter bacon pizza' },
  { src: '/images/pepperoni-pineapple.webp', alt: 'Pepperoni and pineapple pizza' },
  { src: '/images/bbq-chicken-pickle.webp', alt: 'BBQ chicken pizza topped with pickles' },
  { src: '/images/pepperoni-cup-bar.webp', alt: 'Hand-held pepperoni-cup pizza at the Branch Pizza bar' },
  { src: '/images/neon-love-pizza.webp', alt: '"All you need is love & pizza" neon sign inside Branch Pizza' },
  { src: '/images/storefront-neon-night.webp', alt: 'Branch Pizza storefront glowing at dusk on the Sunbury square' },
]

// Our-story timeline.
export const storyTimeline = [
  {
    year: '1977',
    title: 'Doors Open on the Square',
    body: 'Branch Pizza first fired up its ovens in downtown Sunbury, hand-tossing pies for a small Ohio town that quickly made them a Friday-night tradition.',
  },
  {
    year: 'The Recipe',
    title: 'Pepperoni That Curls',
    body: 'It’s the little things, real cheese you can taste, sauce made in-house, and Old World pepperoni that crisps up into golden cups. Regulars will tell you: accept no substitutes.',
  },
  {
    year: 'Today',
    title: 'Award-Winning & Family-Run',
    body: 'Voted Grubhub’s best in town two years running and proudly women-owned, Branch Pizza still serves the same hometown pride it did on day one, now with a full bar to go with your slice.',
  },
]
