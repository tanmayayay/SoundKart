-- ═══════════════════════════════════════════════════════════
-- SOUNDKART · sample catalogue (28 products)
-- Idempotent: safe to re-run; existing rows are updated in place.
-- image_url values are filenames in the public `product-images`
-- storage bucket (see supabase/README.md). They are category-level
-- placeholders — swap in per-product filenames as real brand
-- photos arrive, then re-run this file.
-- Brand names are illustrative sample data only.
-- ═══════════════════════════════════════════════════════════

insert into products
  (id, name, brand, category, price_inr, mrp_inr, rating, reviews,
   badge, image_url, blurb, specs, in_stock)
values
  ('acoustic-dread', 'Acoustic Guitar · Dreadnought', 'Fender', 'guitars', 12999, 15999, 4.7, 2314,
   'Bestseller', 'product-guitar.webp',
   'Solid spruce top with a warm, room-filling voice — the acoustic most beginners grow up on.',
   '["Solid spruce top, mahogany back & sides", "Dreadnought body, 20 frets", "Padded gig bag & picks included"]', true),

  ('electric-s', 'Electric Guitar · S-Style', 'Yamaha', 'guitars', 21999, null, 4.6, 1187,
   null, 'product-guitar.webp',
   'Alder body, maple neck, three single coils — the do-everything electric for rock and blues.',
   '["Alder body, bolt-on maple neck", "SSS pickup configuration", "Tremolo bridge, die-cast tuners"]', true),

  ('classical-nylon', 'Classical Guitar · Nylon', 'Yamaha', 'guitars', 9499, 11499, 4.5, 640,
   null, 'product-guitar.webp',
   'Gentle on the fingers, rich in tone — the classical choice for students and fingerstyle players.',
   '["Spruce top, nato back & sides", "52mm nut width, rosewood fingerboard", "Nylon strings"]', true),

  ('bass-4', 'Bass Guitar · 4-String', 'Ibanez', 'guitars', 18499, null, 4.6, 412,
   'Pro pick', 'product-guitar.webp',
   'Slim, fast neck and punchy low end — a stage-ready bass that sits perfectly in any mix.',
   '["Poplar body, maple neck", "Split-coil + single-coil pickups", "34 inch scale, 20 frets"]', true),

  ('midi-49', '49-Key MIDI Keyboard', 'Novation', 'keyboards', 18999, 22999, 4.8, 1930,
   'Bestseller', 'product-keyboard.webp',
   'Velocity-sensitive keys, drum pads and USB-C — the control centre of a thousand bedroom studios.',
   '["49 full-size velocity-sensitive keys", "8 RGB drum pads, 9 faders", "USB-C, MIDI out, sustain input"]', true),

  ('workstation-61', '61-Key Workstation Synth', 'Roland', 'keyboards', 34999, null, 4.7, 845,
   'Pro pick', 'product-synth.webp',
   '1000+ tones, aftertouch keys and a 16-track sequencer — compose, perform and produce from one board.',
   '["61 semi-weighted keys with aftertouch", "1000+ tones, 16-track sequencer", "USB audio/MIDI, balanced outputs"]', true),

  ('digital-piano-88', '88-Key Digital Piano', 'Casio', 'keyboards', 27999, 32999, 4.6, 977,
   null, 'product-keyboard.webp',
   'Graded hammer action and a concert-grand sample — the practice piano that feels like the real thing.',
   '["88 graded hammer-action keys", "10 premium tones, 60 songs", "Dual headphone jacks, 3-pedal input"]', true),

  ('mini-synth', '37-Key Analog Synth', 'Korg', 'keyboards', 42999, null, 4.8, 356,
   'Pro pick', 'product-synth.webp',
   'True analog oscillators and a hands-on knob-per-function panel — bass lines that shake the floor.',
   '["37 slim keys, monophonic analog engine", "2 VCOs, sub oscillator, arpeggiator", "CV/gate, MIDI in/out"]', true),

  ('drum-kit-5pc', '5-Piece Drum Kit', 'Pearl', 'drums', 54999, 64999, 4.7, 523,
   'Pro pick', 'product-drums.webp',
   'Poplar shells, brass cymbals and double-braced hardware — a complete kit that gigs straight out of the box.',
   '["22 inch kick, 10/12/16 inch toms, 14 inch snare", "Hi-hat, crash & ride cymbals included", "Double-braced stands, throne & sticks"]', true),

  ('cajon-birch', 'Cajón · Birchwood', 'Meinl', 'drums', 6499, null, 4.6, 2104,
   'Bestseller', 'product-drums.webp',
   'Adjustable snare wires and a Baltic birch playing surface — the whole drum kit, in a box you sit on.',
   '["Baltic birch frontplate", "Adjustable snare wires", "Padded carry bag included"]', true),

  ('tabla-set', 'Tabla Set · Hand-Tuned', 'SoundKart Select', 'drums', 8999, 10999, 4.5, 388,
   null, 'product-drums.webp',
   'Hand-tuned dayan and bayan with fitted covers — classical tone for students and accompanists.',
   '["Sheesham dayan, nickel bayan", "Hand-tuned pudi, fitted covers", "Tuning hammer & rings included"]', true),

  ('hd280', 'Studio Headphones · Closed-back', 'Sennheiser', 'headphones', 7499, 9999, 4.7, 3412,
   'Bestseller', 'product-headphones.webp',
   '45mm drivers, 32 ohm, isolation you can mix in — the tracking headphone in studios everywhere.',
   '["45mm drivers, 8Hz-25kHz", "32 ohm, closed-back isolation", "Folding design, coiled cable"]', true),

  ('m40x', 'Monitor Headphones · Studio', 'Audio-Technica', 'headphones', 9749, null, 4.6, 1876,
   null, 'product-headphones.webp',
   'Flat, honest response for mixing on the move — folds flat, built to tour.',
   '["40mm drivers, 15Hz-24kHz", "90-degree swivelling earcups", "Detachable coiled & straight cables"]', true),

  ('dt770', 'Studio Headphones · 80Ω', 'Beyerdynamic', 'headphones', 14499, 16999, 4.8, 1204,
   'Pro pick', 'product-headphones.webp',
   'The 80-ohm classic — velour pads, sparkling detail, and comfort for all-day sessions.',
   '["45mm drivers, 5Hz-35kHz", "80 ohm, velour ear pads", "Single-sided detachable cable"]', true),

  ('jbl-305p', 'Studio Monitors · 5" Pair', 'JBL', 'speakers', 24999, 29999, 4.8, 1543,
   'Pro pick', 'product-speakers.webp',
   '5-inch woofers, 70W bi-amped, boundary EQ — hear your mix the way the world will.',
   '["5 inch woofer + 1 inch tweeter per monitor", "70W bi-amped Class-D", "Boundary & HF trim EQ"]', true),

  ('eris-35', 'Studio Monitors · 3.5" Pair', 'PreSonus', 'speakers', 15499, null, 4.5, 689,
   null, 'product-speakers.webp',
   'Compact 3.5-inch monitors with surprising low end — the honest upgrade from desktop speakers.',
   '["3.5 inch woofer + 1 inch tweeter per monitor", "50W Class-AB bi-amped", "Acoustic tuning controls"]', true),

  ('rokit-5', 'Studio Monitors · 5" Pair Pro', 'KRK', 'speakers', 33999, null, 4.7, 512,
   null, 'product-speakers.webp',
   'The yellow-cone icon, fourth generation — DSP room tuning and a front port for tight placement.',
   '["5 inch Kevlar woofer + 1 inch tweeter", "DSP-driven graphic EQ, 25 presets", "Front-firing port"]', true),

  ('pa-speaker', 'PA Speaker · 12" 1000W', 'JBL', 'speakers', 28999, 34999, 4.6, 377,
   null, 'product-speakers.webp',
   '1000W of room-filling sound with Bluetooth and a mic input — gigs, events and house parties.',
   '["12 inch woofer, 1000W peak", "Bluetooth 5.0 + mic/line inputs", "Pole-mountable, 16kg"]', true),

  ('acoustic-strings', 'Acoustic Strings · 3-Pack', 'D''Addario', 'strings', 1299, 1599, 4.8, 5230,
   'Bestseller', 'product-strings.webp',
   'Phosphor bronze, 3-pack — the strings half of India plays, fresh out of the packet.',
   '["Phosphor bronze wound", "Pack of 3 sets", "Corrosion-resistant packaging"]', true),

  ('electric-strings', 'Electric Strings · Nickel', 'Ernie Ball', 'strings', 749, 899, 4.7, 4102,
   null, 'product-strings.webp',
   'Nickel-wound slinkies — bright, bendy, and the choice of rock guitarists for decades.',
   '["Nickel-plated steel wound", "Regular slinky gauge .010-.046", "Sealed fresh packaging"]', true),

  ('cable-10ft', 'Instrument Cable · 10ft', 'SoundKart Select', 'strings', 899, null, 4.5, 1876,
   null, 'product-strings.webp',
   'Oxygen-free copper, braided shield, silent switching — the cable that never crackles mid-solo.',
   '["10ft, straight-to-right-angle jacks", "Braided copper shield", "Lifetime warranty"]', true),

  ('sm58', 'Dynamic Vocal Mic', 'Shure', 'mics', 9999, null, 4.9, 2876,
   'Bestseller', 'product-mic.webp',
   'The most famous mic on earth — indestructible, feedback-resistant, and on every stage that matters.',
   '["Cardioid dynamic capsule", "50Hz-15kHz tailored vocal response", "Pneumatic shock mount, steel grille"]', true),

  ('at2020', 'Condenser Mic · Cardioid', 'Audio-Technica', 'mics', 9499, 11499, 4.7, 1980,
   null, 'product-mic.webp',
   'The gateway condenser — crisp, detailed vocals and acoustic instruments for home studios.',
   '["Cardioid condenser capsule", "20Hz-20kHz, 144dB max SPL", "Pivoting stand mount included"]', true),

  ('nt1', 'Large-Diaphragm Condenser', 'Rode', 'mics', 17999, null, 4.8, 764,
   'Pro pick', 'product-mic.webp',
   'The world''s quietest studio mic at 4.5dBA self-noise — vocals that sound expensive.',
   '["1 inch cardioid condenser capsule", "4.5dBA self-noise", "Shock mount, pop filter & cable included"]', true),

  ('scarlett-solo', 'Audio Interface · 2i2 USB', 'Focusrite', 'mics', 14999, 17499, 4.8, 2310,
   'Bestseller', 'product-mic.webp',
   'Two inputs, legendary preamps, USB-C — plug a mic and guitar straight into your DAW.',
   '["2-in/2-out USB-C interface", "Air-enabled mic preamp", "Includes recording software bundle"]', true),

  ('um2-basic', 'USB Audio Interface · Budget', 'Behringer', 'mics', 6999, null, 4.4, 1543,
   null, 'product-mic.webp',
   'The cheapest honest way into recording — one mic pre, one instrument in, zero excuses.',
   '["2-in/2-out USB interface", "XENYX mic preamp", "48V phantom power"]', true),

  ('producer-bundle', 'Bedroom Producer Bundle', 'SoundKart Select', 'bundles', 44999, 52999, 4.8, 342,
   'Bundle deal', 'hero.webp',
   'Interface + monitors + headphones + mic, matched and discounted — everything a first studio needs in one box.',
   '["2i2 USB interface", "5 inch studio monitors (pair)", "Closed-back studio headphones", "Dynamic vocal mic + cables"]', true),

  ('podcaster-bundle', 'Podcaster Starter Bundle', 'SoundKart Select', 'bundles', 18999, 22999, 4.7, 518,
   'Bundle deal', 'hero.webp',
   'USB interface + condenser mic + monitoring headphones — record your first episode this weekend.',
   '["Budget USB interface", "Cardioid condenser mic", "Studio monitoring headphones"]', true)
on conflict (id) do update set
  name = excluded.name,
  brand = excluded.brand,
  category = excluded.category,
  price_inr = excluded.price_inr,
  mrp_inr = excluded.mrp_inr,
  rating = excluded.rating,
  reviews = excluded.reviews,
  badge = excluded.badge,
  image_url = excluded.image_url,
  blurb = excluded.blurb,
  specs = excluded.specs,
  in_stock = excluded.in_stock;
