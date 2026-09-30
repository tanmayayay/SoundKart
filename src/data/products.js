import heroImg from '../assets/hero.webp'
import guitarImg from '../assets/product-guitar.webp'
import headphonesImg from '../assets/product-headphones.webp'
import keyboardImg from '../assets/product-keyboard.webp'
import drumsImg from '../assets/product-drums.webp'
import speakersImg from '../assets/product-speakers.webp'
import micImg from '../assets/product-mic.webp'
import stringsImg from '../assets/product-strings.webp'
import synthImg from '../assets/product-synth.webp'

export const inr = (n) => '₹' + n.toLocaleString('en-IN')

/* Sample catalogue — 28 SKUs. Real brand/manufacturer import replaces this
   file's `products` array (same shape) or loads from Supabase.
   Brand names below are illustrative sample data only.               */
export const products = [
  // ——— guitars ———
  { id: 'acoustic-dread', slug: 'acoustic-dread', name: 'Acoustic Guitar · Dreadnought', brand: 'Fender', category: 'guitars', price: 12999, mrp: 15999, rating: 4.7, reviews: 2314, tag: 'Bestseller', img: guitarImg,
    blurb: 'Solid spruce top with a warm, room-filling voice — the acoustic most beginners grow up on, and plenty of pros never outgrow.',
    specs: ['Solid spruce top, mahogany back & sides', 'Dreadnought body, 20 frets, 25.5" scale', 'Includes padded gig bag & picks'],
    variants: [{ name: 'Natural', priceDelta: 0 }, { name: 'Sunburst', priceDelta: 1000 }] },
  { id: 'electric-s', slug: 'electric-s', name: 'Electric Guitar · S-Style', brand: 'Yamaha', category: 'guitars', price: 21999, mrp: null, rating: 4.6, reviews: 1187, tag: null, img: guitarImg,
    blurb: 'Alder body, maple neck, three single coils — the do-everything electric for rock, blues and everything between.',
    specs: ['Alder body, bolt-on maple neck', 'SSS pickup configuration, 5-way switch', 'Tremolo bridge, die-cast tuners'],
    variants: [{ name: 'Black', priceDelta: 0 }, { name: '3-Tone Sunburst', priceDelta: 1500 }] },
  { id: 'classical-nylon', slug: 'classical-nylon', name: 'Classical Guitar · Nylon', brand: 'Yamaha', category: 'guitars', price: 9499, mrp: 11499, rating: 4.5, reviews: 640, tag: null, img: guitarImg,
    blurb: 'Gentle on the fingers, rich in tone — the classical choice for students and fingerstyle players.',
    specs: ['Spruce top, nato back & sides', '52mm nut width, rosewood fingerboard', 'Nylon strings, classical tuning machines'] },
  { id: 'bass-4', slug: 'bass-4', name: 'Bass Guitar · 4-String', brand: 'Ibanez', category: 'guitars', price: 18499, mrp: null, rating: 4.6, reviews: 412, tag: 'Pro pick', img: guitarImg,
    blurb: 'Slim, fast neck and punchy low end — a stage-ready bass that sits perfectly in any mix.',
    specs: ['Poplar body, maple neck', 'Split-coil + single-coil pickups', '34" scale, 20 frets'] },

  // ——— keyboards & synths ———
  { id: 'midi-49', slug: 'midi-49', name: '49-Key MIDI Keyboard', brand: 'Novation', category: 'keyboards', price: 18999, mrp: 22999, rating: 4.8, reviews: 1930, tag: 'Bestseller', img: keyboardImg,
    blurb: 'Velocity-sensitive keys, drum pads and USB-C — the control centre of a thousand bedroom studios.',
    specs: ['49 full-size velocity-sensitive keys', '8 RGB drum pads, 9 faders', 'USB-C, MIDI out, sustain input'],
    variants: [{ name: 'Standard', priceDelta: 0 }] },
  { id: 'workstation-61', slug: 'workstation-61', name: '61-Key Workstation Synth', brand: 'Roland', category: 'keyboards', price: 34999, mrp: null, rating: 4.7, reviews: 845, tag: 'Pro pick', img: synthImg,
    blurb: '1000+ tones, aftertouch keys and a 16-track sequencer — compose, perform and produce from one board.',
    specs: ['61 semi-weighted keys with aftertouch', '1000+ tones, 16-track sequencer', 'USB audio/MIDI, balanced outputs'] },
  { id: 'digital-piano-88', slug: 'digital-piano-88', name: '88-Key Digital Piano', brand: 'Casio', category: 'keyboards', price: 27999, mrp: 32999, rating: 4.6, reviews: 977, tag: null, img: keyboardImg,
    blurb: 'Graded hammer action and a concert-grand sample — the practice piano that feels like the real thing.',
    specs: ['88 graded hammer-action keys', '10 premium tones, 60 songs', 'Dual headphone jacks, 3-pedal input'] },
  { id: 'mini-synth', slug: 'mini-synth', name: '37-Key Analog Synth', brand: 'Korg', category: 'keyboards', price: 42999, mrp: null, rating: 4.8, reviews: 356, tag: 'Pro pick', img: synthImg,
    blurb: 'True analog oscillators and a hands-on knob-per-function panel — bass lines that shake the floor.',
    specs: ['37 slim keys, monophonic analog engine', '2 VCOs, sub oscillator, arpeggiator', 'CV/gate, MIDI in/out'] },

  // ——— drums & percussion ———
  { id: 'drum-kit-5pc', slug: 'drum-kit-5pc', name: '5-Piece Drum Kit', brand: 'Pearl', category: 'drums', price: 54999, mrp: 64999, rating: 4.7, reviews: 523, tag: 'Pro pick', img: drumsImg,
    blurb: 'Poplar shells, brass cymbals and double-braced hardware — a complete kit that gigs straight out of the box.',
    specs: ['22" kick, 10"/12"/16" toms, 14" snare', 'Hi-hat, crash & ride cymbals included', 'Double-braced stands, throne & sticks'] },
  { id: 'cajon-birch', slug: 'cajon-birch', name: 'Cajón · Birchwood', brand: 'Meinl', category: 'drums', price: 6499, mrp: null, rating: 4.6, reviews: 2104, tag: 'Bestseller', img: drumsImg,
    blurb: 'Adjustable snare wires and a Baltic birch playing surface — the whole drum kit, in a box you sit on.',
    specs: ['Baltic birch frontplate', 'Adjustable snare wires', 'Padded carry bag included'] },
  { id: 'tabla-set', slug: 'tabla-set', name: 'Tabla Set · Hand-Tuned', brand: 'SoundKart Select', category: 'drums', price: 8999, mrp: 10999, rating: 4.5, reviews: 388, tag: null, img: drumsImg,
    blurb: 'Hand-tuned dayan and bayan with fitted covers — classical tone for students and accompanists.',
    specs: ['Sheesham dayan, nickel bayan', 'Hand-tuned pudi, fitted covers', 'Tuning hammer & rings included'] },

  // ——— headphones ———
  { id: 'hd280', slug: 'hd280', name: 'Studio Headphones · Closed-back', brand: 'Sennheiser', category: 'headphones', price: 7499, mrp: 9999, rating: 4.7, reviews: 3412, tag: 'Bestseller', img: headphonesImg,
    blurb: '45mm drivers, 32Ω, isolation you can mix in — the tracking headphone in studios everywhere.',
    specs: ['45mm drivers, 8Hz–25kHz', '32Ω impedance, closed-back isolation', 'Folding design, coiled cable'] },
  { id: 'm40x', slug: 'm40x', name: 'Monitor Headphones · Studio', brand: 'Audio-Technica', category: 'headphones', price: 9749, mrp: null, rating: 4.6, reviews: 1876, tag: null, img: headphonesImg,
    blurb: 'Flat, honest response for mixing on the move — folds flat, built to tour.',
    specs: ['40mm drivers, 15Hz–24kHz', '90° swivelling earcups', 'Detachable coiled & straight cables'] },
  { id: 'dt770', slug: 'dt770', name: 'Studio Headphones · 80Ω', brand: 'Beyerdynamic', category: 'headphones', price: 14499, mrp: 16999, rating: 4.8, reviews: 1204, tag: 'Pro pick', img: headphonesImg,
    blurb: 'The 80Ω classic — velour pads, sparkling detail, and comfort for all-day sessions.',
    specs: ['45mm drivers, 5Hz–35kHz', '80Ω, velour ear pads', 'Single-sided detachable cable'] },

  // ——— speakers & monitors ———
  { id: 'jbl-305p', slug: 'jbl-305p', name: 'Studio Monitors · 5" Pair', brand: 'JBL', category: 'speakers', price: 24999, mrp: 29999, rating: 4.8, reviews: 1543, tag: 'Pro pick', img: speakersImg,
    blurb: '5" woofers, 70W bi-amped, boundary EQ — hear your mix the way the world will.',
    specs: ['5" woofer + 1" tweeter per monitor', '70W bi-amped Class-D', 'Boundary & HF trim EQ'] },
  { id: 'eris-35', slug: 'eris-35', name: 'Studio Monitors · 3.5" Pair', brand: 'PreSonus', category: 'speakers', price: 15499, mrp: null, rating: 4.5, reviews: 689, tag: null, img: speakersImg,
    blurb: 'Compact 3.5" monitors with surprising low end — the honest upgrade from desktop speakers.',
    specs: ['3.5" woofer + 1" tweeter per monitor', '50W Class-AB bi-amped', 'Acoustic tuning controls'] },
  { id: 'rokit-5', slug: 'rokit-5', name: 'Studio Monitors · 5" Pair Pro', brand: 'KRK', category: 'speakers', price: 33999, mrp: null, rating: 4.7, reviews: 512, tag: null, img: speakersImg,
    blurb: 'The yellow-cone icon, fourth generation — DSP room tuning and a front port for tight placement.',
    specs: ['5" Kevlar woofer + 1" tweeter', 'DSP-driven graphic EQ, 25 presets', 'Front-firing port'] },
  { id: 'pa-speaker', slug: 'pa-speaker', name: 'PA Speaker · 12" 1000W', brand: 'JBL', category: 'speakers', price: 28999, mrp: 34999, rating: 4.6, reviews: 377, tag: null, img: speakersImg,
    blurb: '1000W of room-filling sound with Bluetooth and a mic input — gigs, events and house parties.',
    specs: ['12" woofer, 1000W peak', 'Bluetooth 5.0 + mic/line inputs', 'Pole-mountable, 16kg'] },

  // ——— strings & cables ———
  { id: 'acoustic-strings', slug: 'acoustic-strings', name: 'Acoustic Strings · 3-Pack', brand: "D'Addario", category: 'strings', price: 1299, mrp: 1599, rating: 4.8, reviews: 5230, tag: 'Bestseller', img: stringsImg,
    blurb: 'Phosphor bronze, 3-pack — the strings half of India plays, fresh out of the packet.',
    specs: ['Phosphor bronze wound', 'Pack of 3 sets', 'Corrosion-resistant packaging'],
    variants: [{ name: 'Light .012–.053', priceDelta: 0 }, { name: 'Medium .013–.056', priceDelta: 0 }] },
  { id: 'electric-strings', slug: 'electric-strings', name: 'Electric Strings · Nickel', brand: 'Ernie Ball', category: 'strings', price: 749, mrp: 899, rating: 4.7, reviews: 4102, tag: null, img: stringsImg,
    blurb: 'Nickel-wound slinkies — bright, bendy, and the choice of rock guitarists for decades.',
    specs: ['Nickel-plated steel wound', 'Regular slinky gauge .010–.046', 'Sealed fresh packaging'] },
  { id: 'cable-10ft', slug: 'cable-10ft', name: 'Instrument Cable · 10ft', brand: 'SoundKart Select', category: 'strings', price: 899, mrp: null, rating: 4.5, reviews: 1876, tag: null, img: stringsImg,
    blurb: 'Oxygen-free copper, braided shield, silent switching — the cable that never crackles mid-solo.',
    specs: ['10ft, straight-to-right-angle jacks', 'Braided copper shield', 'Lifetime warranty'] },

  // ——— mics & recording ———
  { id: 'sm58', slug: 'sm58', name: 'Dynamic Vocal Mic', brand: 'Shure', category: 'mics', price: 9999, mrp: null, rating: 4.9, reviews: 2876, tag: 'Bestseller', img: micImg,
    blurb: 'The most famous mic on earth — indestructible, feedback-resistant, and on every stage that matters.',
    specs: ['Cardioid dynamic capsule', '50Hz–15kHz tailored vocal response', 'Pneumatic shock mount, steel grille'] },
  { id: 'at2020', slug: 'at2020', name: 'Condenser Mic · Cardioid', brand: 'Audio-Technica', category: 'mics', price: 9499, mrp: 11499, rating: 4.7, reviews: 1980, tag: null, img: micImg,
    blurb: 'The gateway condenser — crisp, detailed vocals and acoustic instruments for home studios.',
    specs: ['Cardioid condenser capsule', '20Hz–20kHz, 144dB max SPL', 'Pivoting stand mount included'] },
  { id: 'nt1', slug: 'nt1', name: 'Large-Diaphragm Condenser', brand: 'Rode', category: 'mics', price: 17999, mrp: null, rating: 4.8, reviews: 764, tag: 'Pro pick', img: micImg,
    blurb: 'The world\'s quietest studio mic at 4.5dBA self-noise — vocals that sound expensive.',
    specs: ['1" cardioid condenser capsule', '4.5dBA self-noise', 'Shock mount, pop filter & cable included'] },
  { id: 'scarlett-solo', slug: 'scarlett-solo', name: 'Audio Interface · 2i2 USB', brand: 'Focusrite', category: 'mics', price: 14999, mrp: 17499, rating: 4.8, reviews: 2310, tag: 'Bestseller', img: micImg,
    blurb: 'Two inputs, legendary preamps, USB-C — plug a mic and guitar straight into your DAW.',
    specs: ['2-in/2-out USB-C interface', 'Air-enabled mic preamp', 'Includes recording software bundle'] },
  { id: 'um2-basic', slug: 'um2-basic', name: 'USB Audio Interface · Budget', brand: 'Behringer', category: 'mics', price: 6999, mrp: null, rating: 4.4, reviews: 1543, tag: null, img: micImg,
    blurb: 'The cheapest honest way into recording — one mic pre, one instrument in, zero excuses.',
    specs: ['2-in/2-out USB interface', 'XENYX mic preamp', '48V phantom power'] },

  // ——— studio bundles ———
  { id: 'producer-bundle', slug: 'producer-bundle', name: 'Bedroom Producer Bundle', brand: 'SoundKart Select', category: 'bundles', price: 44999, mrp: 52999, rating: 4.8, reviews: 342, tag: 'Bundle deal', img: heroImg,
    blurb: 'Interface + monitors + headphones + mic, matched and discounted — everything a first studio needs in one box.',
    specs: ['2i2 USB interface', '5" studio monitors (pair)', 'Closed-back studio headphones', 'Dynamic vocal mic + cables'] },
  { id: 'podcaster-bundle', slug: 'podcaster-bundle', name: 'Podcaster Starter Bundle', brand: 'SoundKart Select', category: 'bundles', price: 18999, mrp: 22999, rating: 4.7, reviews: 518, tag: 'Bundle deal', img: heroImg,
    blurb: 'USB interface + condenser mic + monitoring headphones — record your first episode this weekend.',
    specs: ['Budget USB interface', 'Cardioid condenser mic', 'Studio monitoring headphones'] },
]

export const categories = [
  { slug: 'guitars', name: 'Guitars', note: 'Acoustic, electric, classical & bass', img: guitarImg },
  { slug: 'keyboards', name: 'Keyboards & Synths', note: 'MIDI, workstations & pianos', img: keyboardImg },
  { slug: 'drums', name: 'Drums & Percussion', note: 'Kits, cajóns & tabla', img: drumsImg },
  { slug: 'headphones', name: 'Headphones', note: 'Studio, monitor & DJ', img: headphonesImg },
  { slug: 'speakers', name: 'Speakers & Monitors', note: 'Studio monitors & PA', img: speakersImg },
  { slug: 'strings', name: 'Strings & Cables', note: 'Strings, cables & accessories', img: stringsImg },
  { slug: 'mics', name: 'Mics & Recording', note: 'Mics, interfaces & studio', img: micImg },
  { slug: 'bundles', name: 'Studio Bundles', note: 'Complete starter kits', img: heroImg },
]

export const brands = [...new Set(products.map((p) => p.brand))].sort()

export const catName = (slug) =>
  categories.find((c) => c.slug === slug)?.name || 'Shop all'

export const getProduct = (id) => products.find((p) => p.id === id)
export const byCategory = (slug) => products.filter((p) => p.category === slug)
