// All Rental.ba content lives here — listings, team, testimonials, process,
// differentiators, market notes, FAQs, neighborhoods — kept separate from
// layout/motion code so it can be updated without touching components.
//
// Translatable fields use { en, bs } objects — resolve with
// localize(field, lang) from lib/i18n/LanguageContext.js. Proper nouns
// (names, addresses, prices, slugs, images) stay plain strings.

// Generic Rental.ba site photography (not tied to a specific listing) — used
// as background/detail imagery across the homepage, neighborhoods, and blog.
const CITY = [
  "/city/rental-stock-01.jpg",
  "/city/rental-stock-02.jpg",
  "/city/rental-stock-03.jpg",
  "/city/rental-stock-04.jpg",
  "/city/rental-stock-05.jpg",
  "/city/rental-stock-06.jpg",
  "/city/rental-stock-07.jpg",
  "/city/rental-stock-08.jpg",
  "/city/rental-stock-09.jpg",
  "/city/rental-stock-10.jpg",
  "/city/rental-stock-11.jpg",
  "/city/rental-stock-12.jpg",
];

export const listings = [
  {
    id: "nebo-je-granica",
    slug: "nebo-je-granica",
    name: "Eko kuća, Nebo je granica",
    address: "Hladivode, Donje Biosko",
    neighborhood: "Donje Biosko",
    type: "Kuća",
    price: "865.000 KM",
    priceValue: 865000,
    beds: 4,
    baths: 2,
    sqft: "250",
    tag: { en: "Eco house", bs: "Eko kuća" },
    size: "wide",
    agentSlug: "alma",
    mapPosition: { x: 12, y: 70 },
    image: "/property-photos/nebo-je-granica/nebo-je-granica-01.jpg",
    images: Array.from({ length: 28 }, (_, i) => `/property-photos/nebo-je-granica/nebo-je-granica-${String(i + 1).padStart(2, "0")}.jpg`),
    alt: {
      en: "Eco house and grounds in Donje Biosko",
      bs: "Eko kuća i imanje u Donjem Bisku",
    },
    description: {
      en: "An eco-house of 250 m² on five dulums (roughly 5,000 m²) of land in Donje Biosko, just five kilometres from central Sarajevo. Built by its owner for his own family, from natural materials and insulated with sheep's wool, with oak used throughout most of the interior — floors, staircase, built-in closets. It has four bedrooms and a large open living space where the kitchen, dining area, and living room gather around a hearth, an A energy rating, and heat-pump heating. The ground floor holds a fully separate unit with its own kitchen and bathroom — a guest apartment, a place for a grown child, a studio, or an office, depending on what you need. Around the house, across the five dulums of land, there's a vegetable and herb garden, cherry trees, quiet green hills, and a spot for a barefoot morning coffee in the grass. The house is currently rented out, making this a genuine investment opportunity with income from day one.",
      bs: "Ekološka kuća od 250 m² na pet duluma zemlje u Donjem Bisku, svega pet kilometara od centra Sarajeva. Kuću je vlasnik gradio za sebe, od prirodnih materijala, izolovanu ovčijom vunom, s hrastom u gotovo cijelom interijeru — podovima, stubištem, plakarima. Ima četiri spavaće sobe i veliki otvoreni prostor u kojem se kuhinja, trpezarija i dnevni boravak okupljaju oko ognjišta, energetski razred A, grijanje na toplotne pumpe. U prizemlju je potpuno odvojen prostor sa svojom kuhinjom i kupatilom — apartman za goste, stan za odraslo dijete, atelje ili kancelarija, prema potrebi. Oko kuće, na pet duluma zemlje, čeka vrt za povrće i začinsko bilje, stabla trešnje, tišina brežuljaka i mjesto za jutarnju kafu bosih nogu u travi. Kuća je trenutno iznajmljena, pa je ovo i prilika za ulaganje uz prihod već od danas.",
    },
    amenities: [
      { en: "5,000 m² of private land", bs: "5.000 m² vlastitog zemljišta" },
      { en: "Oak throughout the interior", bs: "Hrast u cijelom interijeru" },
      { en: "Energy class A, heat-pump heating", bs: "Energetski razred A, toplotne pumpe" },
      { en: "Separate ground-floor unit", bs: "Odvojen prizemni apartman" },
      { en: "Sauna and laundry room", bs: "Sauna i vešeraj" },
      { en: "Currently tenanted — income from day one", bs: "Trenutno izdana — prihod od prvog dana" },
    ],
  },
  {
    id: "akademik",
    slug: "akademik",
    name: "Trosoban stan i garaža, Akademik",
    address: "Muhameda Hadžijahića, Koševsko brdo",
    neighborhood: "Koševsko brdo",
    type: "Trosoban",
    price: "390.000 KM",
    priceValue: 390000,
    beds: 2,
    baths: 1,
    sqft: "72",
    tag: { en: "Garage available", bs: "Uz mogućnost garaže" },
    size: "tall",
    agentSlug: "mirza",
    mapPosition: { x: 55, y: 22 },
    image: "/property-photos/akademik/akademik-01.jpg",
    images: Array.from({ length: 16 }, (_, i) => `/property-photos/akademik/akademik-${String(i + 1).padStart(2, "0")}.jpg`),
    alt: {
      en: "Renovated apartment interior on Muhameda Hadžijahića, Koševsko brdo",
      bs: "Enterijer renoviranog stana na Muhameda Hadžijahića, Koševsko brdo",
    },
    description: {
      en: "A renovated, furnished three-room apartment with a registered area of 72 m², with a balcony and a loggia, on the 2nd floor of a quiet stretch of Muhameda Hadžijahića Street on Koševsko brdo. Renovated about fifteen years ago and carefully maintained ever since — PVC joinery, a solid security door, parquet and etison flooring, gas central heating. The layout is excellent: a long hallway opens onto a living/dining room with a separate windowed kitchen, a large bedroom with balcony access, a smaller bedroom opening onto the loggia, a separate bathroom and WC, plus a basement storage room. Greenery all around, close to a school and kindergarten. A private garage is also available for purchase alongside the apartment, separate from the listed price — a rare find in this location.",
      bs: "Renoviran i namješten trosoban stan od uknjiženih 72 m², s balkonom i lođom, na drugom spratu mirne ulice Muhameda Hadžijahića na Koševskom brdu. Stan je temeljito renoviran prije petnaestak godina i od tada pažljivo održavan — PVC stolarija, kvalitetna blindirana vrata, parket i etison, centralno etažno grijanje na plin. Raspored je fantastičan: iz dugačkog hodnika ulazi se u dnevni boravak s trpezarijom i odvojenom kuhinjom s prozorom, veliku spavaću sobu s izlazom na balkon, manju spavaću sobu s izlazom na lođu, odvojeni kupatilo i toalet, te podrumsku prostoriju. Zelenilo svuda unaokolo, blizina škole i vrtića. Uz stan se, odvojeno od navedene cijene, može kupiti i garaža — prava rijetkost na ovoj lokaciji.",
    },
    amenities: [
      { en: "Parquet & etison flooring", bs: "Parket i etison na podu" },
      { en: "Gas central heating", bs: "Centralno etažno grijanje na plin" },
      { en: "Balcony and loggia", bs: "Balkon i lođa" },
      { en: "Basement storage room", bs: "Podrumska prostorija" },
      { en: "Private garage available to purchase", bs: "Mogućnost dokupa garaže" },
    ],
  },
  {
    id: "jazz-na-mejtasu",
    slug: "jazz-na-mejtasu",
    name: "Dvosoban stan, Jazz na Mejtašu",
    address: "Nikole Kašikovića, Mejtaš",
    neighborhood: "Mejtaš",
    type: "Dvosoban",
    price: "370.000 KM",
    priceValue: 370000,
    beds: 1,
    baths: 1,
    sqft: "52",
    tag: { en: "Newly renovated", bs: "Novouređeno" },
    size: "regular",
    agentSlug: "srdjan",
    mapPosition: { x: 62, y: 46 },
    image: "/property-photos/jazz-na-mejtasu/jazz-na-mejtasu-01.jpg",
    images: Array.from({ length: 13 }, (_, i) => `/property-photos/jazz-na-mejtasu/jazz-na-mejtasu-${String(i + 1).padStart(2, "0")}.jpg`),
    alt: {
      en: "Renovated apartment interior on Nikole Kašikovića, Mejtaš",
      bs: "Enterijer renoviranog stana na Nikole Kašikovića, Mejtaš",
    },
    description: {
      en: "A dual-aspect, fully renovated two-room apartment on the high ground floor of a tidy building from the early 1970s, with a registered area of 52 m². The layout includes an entrance hallway, a comfortable living room, a kitchen with a dining area, a bedroom, and a bathroom. Modernly furnished with gas central heating — move-in ready, and well suited to short-term rental income. Nikole Kašikovića Street sits right next to Bošnjačka Gimnazija and the Catholic School Centre, and close to everything relevant in central Sarajevo. The building has a fenced courtyard with parking reserved for residents.",
      bs: "Dvostrano orijentisan, potpuno renoviran dvosoban stan u visokom prizemlju uredne zgrade iz ranih sedamdesetih, uknjižen na 52 m². Raspored čine ulazni hodnik, komforan dnevni boravak, kuhinja s trpezarijom, spavaća soba i kupatilo. Moderno namješten, s etažnim plinskim grijanjem — spreman za useljenje ili za rentijerski posao. Ulica Nikole Kašikovića nalazi se u neposrednoj blizini Bošnjačke gimnazije i Katoličkog školskog centra, te svega relevantnog u centru Sarajeva. Zgrada ima ograđeno dvorište s parkingom isključivo za stanare.",
    },
    amenities: [
      { en: "Newly renovated", bs: "Novouređen" },
      { en: "Modern furnishings", bs: "Namješten modernim namještajem" },
      { en: "Gas central heating", bs: "Centralno etažno grijanje na plin" },
      { en: "Fenced courtyard parking for residents", bs: "Ograđeno dvorište s parkingom za stanare" },
      { en: "Close to schools & the city centre", bs: "Blizina škola i centra grada" },
    ],
  },
  {
    id: "terezija-36",
    slug: "terezija-36",
    name: "Trosoban stan, Terezija 36",
    address: "Terezija 36, Skenderija",
    neighborhood: "Skenderija",
    type: "Trosoban",
    price: "Cijena na upit",
    priceValue: null,
    beds: 2,
    baths: 1,
    sqft: "79",
    tag: { en: "With parking space", bs: "Uz parking mjesto" },
    size: "regular",
    agentSlug: "alma",
    mapPosition: { x: 48, y: 52 },
    image: "/property-photos/terezija-36/terezija-36-01.jpg",
    images: Array.from({ length: 15 }, (_, i) => `/property-photos/terezija-36/terezija-36-${String(i + 1).padStart(2, "0")}.jpg`),
    alt: {
      en: "Furnished apartment interior at Terezija 36, Skenderija",
      bs: "Enterijer namještenog stana na Terezija 36, Skenderija",
    },
    description: {
      en: "A fully furnished and equipped three-room apartment of 79 m² with a balcony, on the first floor of a well-regarded new-build in Skenderija. The layout includes a large hallway, a living room, an open-concept kitchen and dining area opening onto the balcony, two bedrooms, a bathroom with WC, a separate toilet, and a storage room. Despite being on the first floor, the apartment is bright thanks to its dual-aspect orientation, with panoramic city views. Underfloor heating, 24-hour security, and video surveillance. A registered 15.5 m² parking space next to the building is included in the sale — a rare offering on the Sarajevo market, ideal for a family or as a rental investment.",
      bs: "Detaljno namješten i opremljen trosoban stan od 79 m² s balkonom, na prvom katu uspješne novogradnje na Skenderiji. Prostor čine veliki hodnik, dnevni boravak, kuhinja i trpezarija u otvorenom konceptu s izlazom na balkon, dvije spavaće sobe, kupatilo s toaletom, poseban toalet i ostava. Iako je na prvom katu, stan je svijetao zahvaljujući dvostranoj orijentaciji, s panoramskim pogledom na grad. Podno grijanje, 24-satno obezbjeđenje i videonadzor. Uz stan se u vlasništvo upisuje i parking mjesto od 15,5 m² pored zgrade — rijetka ponuda na sarajevskom tržištu, idealna za porodicu ili za rentijersko ulaganje.",
    },
    amenities: [
      { en: "Underfloor heating", bs: "Podno grijanje" },
      { en: "Panoramic city views", bs: "Panoramski pogled na grad" },
      { en: "24-hour security & video surveillance", bs: "Osiguranje 24h i videonadzor" },
      { en: "Registered parking space (15.5 m²)", bs: "Uknjiženo parking mjesto (15,5 m²)" },
      { en: "Fully furnished & equipped", bs: "Potpuno namješteno i opremljeno" },
    ],
  },
];

export function getListingBySlug(slug) {
  return listings.find((l) => l.slug === slug);
}

export const team = [
  {
    name: "Mirza Hadžijahić",
    slug: "mirza",
    role: { en: "Director", bs: "Direktor" },
    image: "/team/avatar-placeholder.svg",
    bio: {
      en: "Mirza Hadžijahić has worked at the agency since its earliest days, starting as an associate and agent before taking over the firm's leadership from his mother, Velida. He holds degrees in law and a master's in law and economics from Sarajevo and Bologna, with a thesis on the Bosnian real estate market in the context of EU integration. Today, as director, he stands behind every transaction the agency handles.",
      bs: "Mirza Hadžijahić radi u agenciji od samog starta, kao saradnik i agent, prije nego što je od majke Velide preuzeo vođenje firme. Diplomirao je i magistrirao pravo i ekonomiju u Sarajevu i Bologni, s tezom o tržištu nekretnina u Bosni i Hercegovini u kontekstu evropskih integracija. Danas, kao direktor, stoji iza svake transakcije agencije Rental.",
    },
    specialties: [
      { en: "Agency leadership", bs: "Vođenje agencije" },
      { en: "BiH real estate market", bs: "Tržište nekretnina u BiH" },
      { en: "Koševsko brdo", bs: "Koševsko brdo" },
    ],
    phone: "061 188 252",
    email: "info@rental.ba",
  },
  {
    name: "Alma Abdagić",
    slug: "alma",
    role: { en: "Executive Director", bs: "Izvršna direktorica" },
    image: "/team/avatar-placeholder.svg",
    bio: {
      en: "After a ten-year career as a TV editor and host on state television, Alma Abdagić joined her husband Mirza's family business. She holds a master's degree in social sciences and, as executive director, makes sure every client and every property gets a personal, attentive approach.",
      bs: "Nakon desetogodišnje karijere urednice i voditeljice na državnoj televiziji, Alma Abdagić se pridružila porodičnoj firmi supruga Mirze. Magistrica je društvenih nauka i danas, kao izvršna direktorica, brine da svaki klijent i svaka nekretnina dobiju ličan, pažljiv pristup.",
    },
    specialties: [
      { en: "Client relationships", bs: "Odnosi s klijentima" },
      { en: "Donje Biosko & Skenderija", bs: "Donje Biosko i Skenderija" },
      { en: "Luxury properties", bs: "Luksuzne nekretnine" },
    ],
    phone: "061 803 796",
    email: "info@rental.ba",
  },
  {
    name: "Srđan Sekulić",
    slug: "srdjan",
    role: { en: "Real Estate Agent", bs: "Agent za nekretnine" },
    image: "/team/avatar-placeholder.svg",
    bio: {
      en: "Srđan Sekulić is the agent clients most often mention by name in their reviews — for his kindness, professionalism, and speed in finding the right fit. If you're looking for an apartment in central Sarajevo, Srđan is your first point of contact.",
      bs: "Srđan Sekulić je agent kojeg klijenti u recenzijama najčešće spominju poimence — po ljubaznosti, profesionalnosti i brzini kojom pronađe pravo rješenje. Ako tražite stan u centru Sarajeva, Srđan je vaš prvi kontakt.",
    },
    specialties: [
      { en: "Centar & Mejtaš", bs: "Centar i Mejtaš" },
      { en: "Apartment sales", bs: "Kupoprodaja stanova" },
      { en: "Fast client response", bs: "Brz odgovor klijentima" },
    ],
    phone: "061 662 444",
    email: "info@rental.ba",
  },
  {
    name: "Emin",
    slug: "emin",
    role: { en: "Real Estate Agent", bs: "Agent za nekretnine" },
    image: "/team/avatar-placeholder.svg",
    bio: {
      en: "Emin is part of the Rental team and your contact for viewings and additional information about our current listings. Reach out to arrange a time.",
      bs: "Emin je dio Rental tima i vaš kontakt za razgledanja i dodatne informacije o nekretninama iz naše ponude. Javite mu se za dogovor termina.",
    },
    specialties: [
      { en: "Property viewings", bs: "Razgledanja nekretnina" },
      { en: "Buyer support", bs: "Podrška kupcima" },
    ],
    phone: "+387 33 210 208",
    email: "info@rental.ba",
  },
  {
    name: "Anel H.",
    slug: "anel-h",
    role: { en: "Real Estate Agent", bs: "Agent za nekretnine" },
    image: "/team/avatar-placeholder.svg",
    bio: {
      en: "Anel is part of the Rental team and your contact for viewings and additional information about our current listings. Reach out to arrange a time.",
      bs: "Anel je dio Rental tima i vaš kontakt za razgledanja i dodatne informacije o nekretninama iz naše ponude. Javite mu se za dogovor termina.",
    },
    specialties: [
      { en: "Property viewings", bs: "Razgledanja nekretnina" },
      { en: "Client support", bs: "Podrška klijentima" },
    ],
    phone: "+387 33 210 208",
    email: "info@rental.ba",
  },
  {
    name: "Velida Hadžijahić",
    slug: "velida",
    role: { en: "Founder", bs: "Osnivačica" },
    image: "/team/avatar-placeholder.svg",
    bio: {
      en: "Velida Hadžijahić is a civil engineer and the founder of Rental, which she started in 1998 in a post-war Sarajevo full of embassies, consulates, and foreign professionals in need of a home. After building the firm's foundations, she handed the agency to her son Mirza and now enjoys a well-earned retirement.",
      bs: "Velida Hadžijahić je inženjerka građevine i osnivačica agencije Rental, koju je pokrenula 1998. godine u poslijeratnom Sarajevu punom ambasada, konzulata i stranih stručnjaka kojima je bio potreban dom. Nakon što je izgradila čvrste temelje firme, agenciju je prepustila sinu Mirzi i danas uživa u zasluženoj penziji.",
    },
    specialties: [
      { en: "Agency founder", bs: "Osnivačica agencije" },
      { en: "27 years in real estate", bs: "27 godina iskustva u nekretninama" },
    ],
    phone: "+387 33 210 208",
    email: "info@rental.ba",
  },
];

export function getTeamBySlug(slug) {
  return team.find((t) => t.slug === slug);
}

// Real client reviews, drawn from Rental.ba's public Google Business profile
// (4.6★, 87 reviews) — quoted and lightly trimmed for length.
export const testimonials = [
  {
    quote: {
      en: "Alma, Mirza, and their team are above and beyond — not your ordinary real estate crew.",
      bs: "Alma, Mirzo i njihov tim su iznad i van očekivanog — nisu tipična ekipa za nekretnine.",
    },
    name: "Dževad Sarač",
    context: { en: "buyer & seller", bs: "kupac i prodavac" },
    featured: true,
  },
  {
    quote: {
      en: "My husband and I found a place to call home with the most gracious help from agent Srđan.",
      bs: "Uz nesebičnu pomoć agenta Srđana pronašli smo dom koji smo tražili.",
    },
    name: "Emine Agić",
    context: { en: "buyer", bs: "kupac" },
  },
  {
    quote: {
      en: "The best agency in town! Relaxed, professional, wonderful agents who go all-in so both sides are happy.",
      bs: "Najbolja agencija u gradu! Super opušteni, profesionalni, divni agenti koji se maksimalno trude da obje strane budu zadovoljne.",
    },
    name: "Nadja Kapetanović",
    context: { en: "local guide, 37 reviews", bs: "lokalni vodič, 37 recenzija" },
  },
];

export const columnTestimonials = [
  {
    text: {
      en: "All praise for Rental and agent Srđan — for the kindness and great service.",
      bs: "Sve pohvale za agenciju Rental i za agenta Srđana, za ljubaznost i sjajnu uslugu.",
    },
    image: "/team/quote-avatar-1.svg",
    name: "Dino",
    role: { en: "buyer", bs: "kupac" },
  },
  {
    text: {
      en: "Professional and very kind staff who work to match what buyers want with what's realistic, and offer the best solution.",
      bs: "Profesionalno i veoma ljubazno osoblje koje nastoji da uskladi želje i mogućnosti kupca i ponudi najbolje rješenje.",
    },
    image: "/team/quote-avatar-2.svg",
    name: "Amela Haračić",
    role: { en: "buyer", bs: "kupac" },
  },
  {
    text: {
      en: "We had a wonderful experience buying an apartment through this agency. Srđan and Alma were kind and professional throughout.",
      bs: "Imali smo vrlo lijepo iskustvo kupovine stana preko ove agencije. Srđan i Alma su bili jako ljubazni i profesionalni.",
    },
    image: "/team/quote-avatar-3.svg",
    name: "Pearl Y.",
    role: { en: "local guide, 212 reviews", bs: "lokalni vodič, 212 recenzija" },
  },
  {
    text: {
      en: "The staff at Rental.ba were amazing. New to the country, I saw several apartments and chose one with great advice from the staff. 5 stars for sure!",
      bs: "Osoblje agencije Rental.ba bilo je sjajno. Nov u zemlji, obišao sam nekoliko stanova i odabrao jedan uz odličan savjet osoblja. Definitivno 5 zvjezdica!",
    },
    image: "/team/quote-avatar-1.svg",
    name: "Michael Schuetz",
    role: { en: "buyer, relocated to Sarajevo", bs: "kupac, preselio u Sarajevo" },
  },
  {
    text: {
      en: "The agency is top-notch. The agents are great — kind, approachable, and always on top of things.",
      bs: "Agencija je vrhunska. Agenti su super, ljubazni, susretljivi, ažurni.",
    },
    image: "/team/quote-avatar-2.svg",
    name: "Alma Sivac",
    role: { en: "buyer", bs: "kupac" },
  },
  {
    text: {
      en: "Always my first-choice agency! Service and communication, top marks — special praise for agent Srđan.",
      bs: "Agencija koja je uvijek moj prvi izbor! Usluga i komunikacija za 10. Posebne pohvale agentu Srđanu.",
    },
    image: "/team/quote-avatar-3.svg",
    name: "Iman della Luna Glusac",
    role: { en: "buyer", bs: "kupac" },
  },
  {
    text: {
      en: "Srđan Sekulić is a great agent! Super straightforward and punctual — I found my apartment in no time.",
      bs: "Srđan Sekulić je odličan agent! Direktan i tačan, pronašao sam stan u rekordnom roku.",
    },
    image: "/team/quote-avatar-1.svg",
    name: "Denial Keco",
    role: { en: "buyer", bs: "kupac" },
  },
  {
    text: {
      en: "Thank you for everything! Communication, professionalism, responsiveness. Top, top, top!",
      bs: "Hvala na svemu! Komunikacija, profesionalizam, agilnost. TOP TOP TOP!",
    },
    image: "/team/quote-avatar-2.svg",
    name: "mahmutkula",
    role: { en: "client", bs: "klijent" },
  },
  {
    text: {
      en: "A recommendation for the best agency and a hardworking, professional team.",
      bs: "Preporuka za najbolju agenciju i vrlo vrijedan i profesionalan tim.",
    },
    image: "/team/quote-avatar-3.svg",
    name: "balkan gaming",
    role: { en: "client", bs: "klijent" },
  },
];

export const process = [
  {
    num: "01",
    title: { en: "Discover", bs: "Otkrivanje" },
    body: {
      en: "Over a coffee at our office on Mehmeda Spahe 6, or on-site at your property, we walk through what you're looking for — or, if you're selling, note down every detail, take photos, and sketch a floor plan.",
      bs: "Uz kafu u našoj kancelariji na Mehmeda Spahe 6, ili na licu mjesta u vašoj nekretnini, razgovaramo o tome šta tražite — ili, ako prodajete, bilježimo svaki detalj, fotografišemo i pravimo tlocrt.",
    },
  },
  {
    num: "02",
    title: { en: "Prepare", bs: "Priprema" },
    body: {
      en: "We write and publish the listing on our own site and every relevant portal, and personally match it against buyers already in our database looking for that location and price range.",
      bs: "Pišemo i objavljujemo oglas na našoj stranici i na svim relevantnim portalima, i lično ga upoređujemo s kupcima iz naše baze koji traže tu lokaciju i taj cjenovni razred.",
    },
  },
  {
    num: "03",
    title: { en: "Negotiate", bs: "Pregovaranje" },
    body: {
      en: "We organize viewings quickly, and once there's interest, we go through every offer together — price, terms, and timeline — until both sides are comfortable.",
      bs: "Brzo organizujemo razgledanja, a čim postoji interes, svaku ponudu razmatramo zajedno — cijenu, uslove i rokove — dok obje strane ne budu zadovoljne.",
    },
  },
  {
    num: "04",
    title: { en: "Close", bs: "Zaključenje" },
    body: {
      en: "We help gather the paperwork, stay with you at the notary for signing, and walk you through the 5% property tax and land registry filing — right through to the keys changing hands.",
      bs: "Pomažemo prikupiti dokumentaciju, pratimo vas kod notara pri potpisivanju, i provedemo vas kroz plaćanje poreza od 5% i uknjižbu — sve do primopredaje ključeva.",
    },
  },
];

export const differentiators = [
  {
    title: { en: "Since 1998", bs: "Od 1998. godine" },
    body: {
      en: "One of Sarajevo's longest-running agencies — active since the post-war rental boom of the late '90s.",
      bs: "Jedna od najdugovječnijih agencija u Sarajevu — aktivna od poslijeratnog buma iznajmljivanja krajem devedesetih.",
    },
  },
  {
    title: { en: "A family business", bs: "Porodična priča" },
    body: {
      en: "Three generations at the same desk — founder Velida, her son Mirza, and his wife Alma all still hands-on today.",
      bs: "Tri generacije za istim stolom — osnivačica Velida, njen sin Mirza i njegova supruga Alma i danas su aktivno uključeni.",
    },
  },
  {
    title: { en: "Direct contact", bs: "Direktan kontakt" },
    body: {
      en: "No call centers or middlemen — reach the agent responsible for a listing directly.",
      bs: "Bez pozivnih centara i posrednika — obratite se direktno agentu zaduženom za nekretninu.",
    },
  },
  {
    title: { en: "4.6★ on Google, 87 reviews", bs: "4,6★ na Google-u, 87 recenzija" },
    body: {
      en: "Word of mouth is still our best advertising — see what past clients say about working with us.",
      bs: "Preporuka od usta do usta je i dalje naša najbolja reklama — pogledajte šta o saradnji s nama kažu dosadašnji klijenti.",
    },
  },
];

export const marketNotes = [
  {
    slug: "proces-kupovine-nekretnine",
    title: {
      en: "What Buying a Property Through Rental Looks Like",
      bs: "Kako izgleda proces kupovine nekretnine kod Rental.ba",
    },
    category: { en: "Buying", bs: "Kupovina" },
    date: "2026-07-14",
    authorSlug: "mirza",
    image: CITY[0],
    excerpt: {
      en: "From your first coffee at our office to the keys in your hand — here's what actually happens at each step.",
      bs: "Od prve kafe u našoj kancelariji do ključeva u ruci — evo šta se zaista dešava u svakom koraku.",
    },
    body: [
      {
        en: "Come by our office at Mehmeda Spahe 6 in central Sarajevo — you can't miss the purple-and-green balcony — or write to us at info@rental.ba if you can't make it in person. Chances are we already have something that fits what you're looking for, and we can arrange a viewing quickly. If nothing in our current listings catches your eye, we'll run a personalized search based on what you've told us.",
        bs: "Svratite u našu kancelariju na Mehmeda Spahe 6 u centru Sarajeva — imamo ljubičasto-zeleni balkon i ne možete nas promašiti — ili nam pišite na info@rental.ba ako ne možete doći lično. Velike su šanse da već imamo nešto što bi vam odgovaralo, i brzo možemo organizovati pregled. Ako vam ništa iz trenutne ponude ne zapadne za oko, napravit ćemo personaliziranu pretragu prema onome što ste nam rekli.",
      },
      {
        en: "Once you've found the right property and agreed on a price, you reserve it through our agency — the reservation counts toward the final price, and the listing comes off the market immediately. Depending on how you're financing the purchase, cash or a loan, we leave enough time to gather the paperwork before signing at a licensed notary.",
        bs: "Kad pronađete pravu nekretninu i dogovorite cijenu, rezervišete je kod nas u agenciji — rezervacija ulazi u konačnu cijenu, a nekretnina se odmah povlači iz ponude. Zavisno od toga da li plaćate iz ličnih sredstava ili kreditom, ostavljamo dovoljno vremena za prikupljanje dokumentacije prije potpisa kod ovlaštenog notara.",
      },
      {
        en: "After signing and once the seller confirms payment received, you get the contracts needed to pay the property tax — 5% of the municipal assessed value — and register your ownership in the land registry. Every property we sell has been personally vetted by the agent handling it, so you can be confident it's ready for the process.",
        bs: "Nakon potpisa, kad prodavac potvrdi da je primio novac, dobijate ugovore potrebne za plaćanje poreza — 5% od procjene koju napravi općinska komisija — i uknjižbu vlasništva u zemljišnim knjigama. Svaku nekretninu koju prodajemo naš agent lično provjeri, tako da možete biti sigurni da je spremna za kupoprodajni proces.",
      },
    ],
  },
  {
    slug: "proces-prodaje-nekretnine",
    title: {
      en: "What Selling a Property Through Rental Looks Like",
      bs: "Kako izgleda proces prodaje nekretnine kod Rental.ba",
    },
    category: { en: "Selling", bs: "Prodaja" },
    date: "2026-06-09",
    authorSlug: "alma",
    image: CITY[1],
    excerpt: {
      en: "A warm, professional process from the first meeting to the closing 'slatka' — here's what to expect if you're selling.",
      bs: "Topao, profesionalan proces od prvog susreta do 'slatke' na kraju — evo šta možete očekivati ako prodajete.",
    },
    body: [
      {
        en: "After our first contact — by phone, email, or in person at Mehmeda Spahe 6 — we arrange a time to meet at the property itself. Over a coffee, we note the property's characteristics, take photographs, and sketch a floor plan. From you, we just need a good mood and your land registry extract (zk izvadak) so we can check the property's legal status.",
        bs: "Nakon prvog kontakta — telefonom, mailom, ili susretom u našoj kancelariji na Mehmeda Spahe 6 — dogovaramo termin susreta u samoj nekretnini. Uz šolju kafe bilježimo karakteristike nekretnine, fotografišemo je i pravimo tlocrt. Od vas tražimo samo dobro raspoloženje i zk izvadak kako bismo provjerili pravni status nekretnine.",
      },
      {
        en: "We build a listing that presents the property the way it deserves and publish it on our own site plus every relevant real estate portal, including paid placements where we have exclusive access — so your property reaches everyone actively searching for something like it. We handle every viewing personally, and keep you updated on interest and inquiries as they come in.",
        bs: "Pravimo oglas koji nekretninu predstavlja onako kako zaslužuje i objavljujemo ga na našoj stranici i na svim relevantnim portalima za nekretnine, uključujući plaćene ekskluzivne pozicije gdje ih imamo — kako bi vaša nekretnina stigla do svih koji aktivno traže nešto slično. Svako razgledanje vodimo lično i redovno vas obavještavamo o interesu i upitima.",
      },
      {
        en: "Once a buyer is found and terms are agreed, we stay with you step by step through the paperwork — tax clearance confirmations, utility clearance from Vodovod i Kanalizacija, Toplane or Gas, and your building's maintenance company — right through to the notary and the moment the sale price lands in your account. Then, as we like to say, we celebrate a job well done with a 'slatka'.",
        bs: "Kad se pronađe kupac i dogovore uslovi, pratimo vas korak po korak kroz papirologiju — potvrde o nepostojanju poreskih dugovanja, potvrde od Vodovoda i Kanalizacije, Toplana ili Gasa, i firme koja održava vašu zgradu — sve do notara i trenutka kad kupoprodajna cijena stigne na vaš račun. A onda, kako to mi volimo reći, uz najbolje želje popijemo 'slatku'.",
      },
    ],
  },
  {
    slug: "vodic-kroz-kvartove",
    title: {
      en: "A Short Guide to Our Four Neighborhoods",
      bs: "Kratak vodič kroz naša četiri kvarta",
    },
    category: { en: "Neighborhoods", bs: "Kvartovi" },
    date: "2026-05-12",
    authorSlug: "ena",
    image: CITY[2],
    excerpt: {
      en: "Koševsko brdo, Mejtaš, Donje Biosko, and Skenderija each suit a different way of living — here's what actually sets them apart.",
      bs: "Koševsko brdo, Mejtaš, Donje Biosko i Skenderija odgovaraju različitim stilovima života — evo šta ih zaista razlikuje.",
    },
    body: [
      {
        en: "Mejtaš and Skenderija both put you close to the historic core and the Miljacka riverbank — walkable, dense, well served by trams and buses, and close to schools, cafés, and shops. Skenderija in particular has seen a wave of quality new-builds in recent years, often with underfloor heating and 24-hour security that older Mejtaš buildings simply don't have.",
        bs: "Mejtaš i Skenderija su blizu historijske jezgre i obale Miljacke — pješački pristupačno, gusto naseljeno, dobro povezano tramvajima i autobusima, blizu škola, kafića i prodavnica. Skenderija je posljednjih godina doživjela talas kvalitetne novogradnje, često s podnim grijanjem i 24-satnim obezbjeđenjem kakvo starije zgrade na Mejtašu nemaju.",
      },
      {
        en: "Koševsko brdo sits higher up, on the hillside north of the center — quieter streets, more greenery, and a real neighborhood feel, while still being a short bus ride from downtown. It tends to offer better value per square meter than the riverside neighborhoods.",
        bs: "Koševsko brdo je smješteno više, na brdu sjeverno od centra — mirnije ulice, više zelenila i pravi kvartovski ugođaj, uz svega nekoliko minuta vožnje autobusom do centra. Obično nudi bolji odnos cijene i kvadrature od kvartova uz rijeku.",
      },
      {
        en: "Donje Biosko, about five kilometers out, is a different world entirely — houses on their own land, gardens, hills, and quiet, with the city still close enough for a daily commute. It's the right fit if you're looking for space rather than walkability.",
        bs: "Donje Biosko, oko pet kilometara dalje, potpuno je drugi svijet — kuće na vlastitoj zemlji, bašte, brežuljci i tišina, a grad je i dalje dovoljno blizu za svakodnevni posao. Pravi izbor ako tražite prostor, a ne pješačku dostupnost.",
      },
    ],
  },
  {
    slug: "upravljanje-nekretninama-za-investitore",
    title: {
      en: "Property Management for Investors and Landlords",
      bs: "Upravljanje nekretninama za investitore i zakupodavce",
    },
    category: { en: "Investing", bs: "Investiranje" },
    date: "2026-04-03",
    authorSlug: "mirza",
    image: CITY[3],
    excerpt: {
      en: "Through Rental Trading Company, we manage rental properties in Sarajevo end to end — especially useful if you live abroad.",
      bs: "Kroz Rental Trading Company upravljamo nekretninama za najam u Sarajevu od početka do kraja — posebno korisno ako živite u inostranstvu.",
    },
    body: [
      {
        en: "Under the Rental Trading Company banner, we manage rental properties on behalf of owners who don't have the time, local knowledge, or patience to do it themselves — physical maintenance through our network of trusted tradespeople, a legally compliant tenant application and approval process, and enforcement of your lease agreements.",
        bs: "Pod imenom Rental Trading Company upravljamo nekretninama za najam u ime vlasnika koji nemaju vremena, lokalnog poznavanja ili strpljenja da to rade sami — fizičko održavanje preko naše mreže provjerenih majstora, zakonski usklađen proces prijave i odobravanja zakupaca, te provođenje ugovora o najmu.",
      },
      {
        en: "For owners living outside Bosnia and Herzegovina, we also handle the everyday complications — paying utility bills on your behalf, so a property you own from abroad doesn't turn into a part-time job.",
        bs: "Za vlasnike koji žive izvan Bosne i Hercegovine, brinemo se i o svakodnevnim komplikacijama — plaćamo račune u vaše ime, kako nekretnina koju posjedujete iz inostranstva ne bi postala posao sa skraćenim radnim vremenom.",
      },
      {
        en: "We're deliberate about who moves into your property — sometimes that means the search takes a little longer, but we've found it's worth the wait. If you're weighing whether to rent out a property you own, get in touch and we'll talk through realistic pricing and occupancy for your specific street.",
        bs: "Pažljivo biramo ko useljava u vašu nekretninu — ponekad to znači da potraga malo duže traje, ali smo se uvjerili da se čekanje isplati. Ako razmišljate da li da iznajmite nekretninu koju posjedujete, javite nam se i razgovaraćemo o realnoj cijeni i popunjenosti za vašu konkretnu ulicu.",
      },
    ],
  },
];

export function getMarketNoteBySlug(slug) {
  return marketNotes.find((n) => n.slug === slug);
}

export const faqs = [
  {
    q: { en: "How do I book a viewing?", bs: "Kako da zakažem razgledanje?" },
    a: {
      en: "Call or message the number listed on the property you're interested in, call our office at +387 33 210 208, or email info@rental.ba — Emin or Anel will get back to you to arrange a time.",
      bs: "Pozovite ili pošaljite poruku na broj naveden uz nekretninu koja vas zanima, pozovite našu kancelariju na +387 33 210 208, ili pišite na info@rental.ba — Emin ili Anel će vam se javiti i dogovoriti termin.",
    },
  },
  {
    q: { en: "Is the price on each listing negotiable?", bs: "Je li cijena nekretnine podložna pregovaranju?" },
    a: {
      en: "Price is discussed directly with the agent, together with the owner of the property — get in touch and we'll talk through the options.",
      bs: "Cijena se dogovara direktno s agentom, u dogovoru s vlasnikom nekretnine — javite nam se i razgovaraćemo o mogućnostima.",
    },
  },
  {
    q: { en: "Can I sell or rent out my property through Rental?", bs: "Mogu li prodati ili iznajmiti svoju nekretninu preko agencije Rental?" },
    a: {
      en: "Yes — contact us by phone or email and we'll arrange a visit, a price estimate, and marketing for your property, or property management through Rental Trading Company if you're renting it out.",
      bs: "Da — kontaktirajte nas telefonom ili emailom, a mi ćemo dogovoriti obilazak, procjenu i oglašavanje vaše nekretnine, ili upravljanje nekretninom kroz Rental Trading Company ukoliko je iznajmljujete.",
    },
  },
  {
    q: { en: "Does Rental only handle the properties shown on this site?", bs: "Da li Rental pokriva samo nekretnine prikazane na sajtu?" },
    a: {
      en: "These are our current listings, but we work across Sarajevo and the rest of Bosnia and Herzegovina — reach out and we'll tell you honestly whether we can help.",
      bs: "Ovo su naše trenutne ponude, ali radimo širom Sarajeva i cijele Bosne i Hercegovine — javite nam se i iskreno ćemo vam reći možemo li pomoći.",
    },
  },
  {
    q: { en: "How long has Rental been in business?", bs: "Koliko dugo agencija Rental posluje?" },
    a: {
      en: "Since 1998 — rental d.o.o., Agencija za nekretnine, is a family business now in its third generation of ownership.",
      bs: "Od 1998. godine — rental d.o.o., Agencija za nekretnine, je porodična firma koja je danas u trećoj generaciji vlasništva.",
    },
  },
  {
    q: { en: "How can I get in touch with the agency?", bs: "Kako mogu stupiti u kontakt s agencijom?" },
    a: {
      en: "By phone at +387 33 210 208, by email at info@rental.ba, or in person at Mehmeda Spahe 6, 71000 Sarajevo.",
      bs: "Putem telefona na +387 33 210 208, emaila info@rental.ba, ili lično na adresi Mehmeda Spahe 6, 71000 Sarajevo.",
    },
  },
];

export const neighborhoods = [
  {
    slug: "kosevsko-brdo",
    name: "Koševsko brdo",
    caption: { en: "Koševsko brdo, above the city", bs: "Koševsko brdo, iznad grada" },
    tagline: { en: "Quiet hillside streets, minutes from downtown", bs: "Mirne uličice na brdu, minute od centra" },
    description: {
      en: "A residential hillside neighborhood just north of central Sarajevo, known for its greenery and quieter pace while staying a short bus ride from downtown — a solid choice for families who still want the city close by.",
      bs: "Stambeni kvart na brdu sjeverno od centra Sarajeva, poznat po zelenilu i mirnijem tempu, uz svega nekoliko minuta vožnje autobusom do centra grada — dobar izbor za porodice koje ipak žele grad nadohvat ruke.",
    },
    image: CITY[4],
    gallery: ["/property-photos/akademik/akademik-01.jpg", "/property-photos/akademik/akademik-02.jpg"],
  },
  {
    slug: "mejtas",
    name: "Mejtaš",
    caption: { en: "Mejtaš, central and walkable", bs: "Mejtaš, centralno i pješački pristupačno" },
    tagline: { en: "Tidy mid-century buildings, steps from the center", bs: "Uredne zgrade iz sredine vijeka, korak od centra" },
    description: {
      en: "A central, walkable neighborhood of tidy mid-century apartment buildings just next to the historic core — close to schools, cafés, and everything relevant in downtown Sarajevo.",
      bs: "Centralan, pješački pristupačan kvart urednih zgrada iz sredine dvadesetog vijeka, tik uz historijsku jezgru — blizu škola, kafića i svega relevantnog u centru Sarajeva.",
    },
    image: CITY[5],
    gallery: ["/property-photos/jazz-na-mejtasu/jazz-na-mejtasu-01.jpg", "/property-photos/jazz-na-mejtasu/jazz-na-mejtasu-02.jpg"],
  },
  {
    slug: "donje-biosko",
    name: "Donje Biosko",
    caption: { en: "Donje Biosko, green and unhurried", bs: "Donje Biosko, zeleno i bez žurbe" },
    tagline: { en: "Houses on their own land, hills, and quiet", bs: "Kuće na vlastitoj zemlji, brežuljci i tišina" },
    description: {
      en: "A green, semi-rural area about five kilometers from central Sarajevo, where houses sit on their own land among quiet hills — close enough for a daily commute, far enough to feel like a different pace of life.",
      bs: "Zeleno, polururalno područje oko pet kilometara od centra Sarajeva, gdje kuće stoje na vlastitoj zemlji među mirnim brežuljcima — dovoljno blizu za svakodnevni posao, dovoljno daleko za drugačiji ritam života.",
    },
    image: CITY[6],
    gallery: ["/property-photos/nebo-je-granica/nebo-je-granica-01.jpg", "/property-photos/nebo-je-granica/nebo-je-granica-02.jpg"],
  },
  {
    slug: "skenderija",
    name: "Skenderija",
    caption: { en: "Skenderija, riverside and modern", bs: "Skenderija, uz rijeku i moderno" },
    tagline: { en: "New-builds by the Miljacka, close to everything", bs: "Novogradnja uz Miljacku, blizu svega" },
    description: {
      en: "A central district along the Miljacka riverbank that has seen a wave of quality new construction in recent years, with the Skenderija cultural and sports center, cafés, and public transport all close at hand.",
      bs: "Centralni kvart uz obalu Miljacke koji je posljednjih godina doživio talas kvalitetne novogradnje, uz Kulturno-sportski centar Skenderija, kafiće i javni prevoz nadohvat ruke.",
    },
    image: CITY[7],
    gallery: ["/property-photos/terezija-36/terezija-36-01.jpg", "/property-photos/terezija-36/terezija-36-02.jpg"],
  },
];

export function getNeighborhoodBySlug(slug) {
  return neighborhoods.find((n) => n.slug === slug);
}
