/* Original SVG line art for the 80-page coloring book.
   Every paintable region has data-part; eyes, smiles, and small lines stay dark. */

const cp = (part, tag, attrs) => `<${tag} class="paint" data-part="${part}" ${attrs}/>`;
const cpPath = (part, d) => cp(part, 'path', `d="${d}"`);
const cpCircle = (part, cx, cy, r) => cp(part, 'circle', `cx="${cx}" cy="${cy}" r="${r}"`);
const cpEllipse = (part, cx, cy, rx, ry) => cp(part, 'ellipse', `cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}"`);
const cpRect = (part, x, y, w, h, r = 8) => cp(part, 'rect', `x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}"`);
const cpPoly = (part, points) => cp(part, 'polygon', `points="${points}"`);
const ink = (tag, attrs) => `<${tag} class="detail" ${attrs}/>`;
const inkCircle = (cx, cy, r) => ink('circle', `cx="${cx}" cy="${cy}" r="${r}"`);
const inkPath = (d) => ink('path', `d="${d}" fill="none" stroke="#2b2b3d" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"`);

/* A light wrapper keeps every page white-filled and dark-outlined until colored. */
const cpFrame = (paint, detail = '') =>
  `<g class="line-art" fill="#fff" stroke="#2b2b3d" stroke-width="4" stroke-linejoin="round" stroke-linecap="round">${paint}</g>` +
  (detail ? `<g class="detail-art" fill="none" stroke="#2b2b3d" stroke-width="4" stroke-linecap="round" stroke-linejoin="round">${detail}</g>` : '');

const COLORING_PAGES = [
  { word: 'cat', emoji: '🐱', category: 'Animals', letter: 'C', fact: 'Cats say meow and love cozy naps.', art: 'cat' },
  { word: 'dog', emoji: '🐶', category: 'Animals', letter: 'D', fact: 'Dogs wag tails when they feel happy.', art: 'dog' },
  { word: 'fish', emoji: '🐟', category: 'Animals', letter: 'F', fact: 'Fish swim with fins and breathe underwater.', art: 'fish' },
  { word: 'bird', emoji: '🐦', category: 'Animals', letter: 'B', fact: 'Birds have feathers and many can fly.', art: 'bird' },
  { word: 'duck', emoji: '🦆', category: 'Animals', letter: 'D', fact: 'Ducks paddle on ponds and quack loudly.', art: 'duck' },
  { word: 'frog', emoji: '🐸', category: 'Animals', letter: 'F', fact: 'Frogs hop far and croak near water.', art: 'frog' },
  { word: 'lion', emoji: '🦁', category: 'Animals', letter: 'L', fact: 'Lions roar and live with their prides.', art: 'lion' },
  { word: 'bear', emoji: '🐻', category: 'Animals', letter: 'B', fact: 'Bears sniff for berries and honey.', art: 'bear' },
  { word: 'monkey', emoji: '🐵', category: 'Animals', letter: 'M', fact: 'Monkeys climb trees and peel bananas.', art: 'monkey' },
  { word: 'rabbit', emoji: '🐰', category: 'Animals', letter: 'R', fact: 'Rabbits hop quickly with long, soft ears.', art: 'rabbit' },
  { word: 'tiger', emoji: '🐯', category: 'Animals', letter: 'T', fact: 'Tigers have stripes and powerful paws.', art: 'tiger' },
  { word: 'panda', emoji: '🐼', category: 'Animals', letter: 'P', fact: 'Pandas munch bamboo for many hours.', art: 'panda' },
  { word: 'horse', emoji: '🐴', category: 'Animals', letter: 'H', fact: 'Horses gallop and enjoy fresh grass.', art: 'horse' },
  { word: 'cow', emoji: '🐮', category: 'Animals', letter: 'C', fact: 'Cows chew grass and give us milk.', art: 'cow' },
  { word: 'pig', emoji: '🐷', category: 'Animals', letter: 'P', fact: 'Pigs roll in mud to stay cool.', art: 'pig' },
  { word: 'sheep', emoji: '🐑', category: 'Animals', letter: 'S', fact: 'Sheep grow fluffy wool each year.', art: 'sheep' },

  { word: 'apple', emoji: '🍎', category: 'Food', letter: 'A', fact: 'Apples grow on trees and crunch when bitten.', art: 'apple' },
  { word: 'banana', emoji: '🍌', category: 'Food', letter: 'B', fact: 'Bananas are yellow when they are ripe.', art: 'banana' },
  { word: 'cake', emoji: '🍰', category: 'Food', letter: 'C', fact: 'Cakes are sweet treats with creamy frosting.', art: 'cake' },
  { word: 'bread', emoji: '🍞', category: 'Food', letter: 'B', fact: 'Bread is baked from flour, water, and yeast.', art: 'bread' },
  { word: 'milk', emoji: '🥛', category: 'Food', letter: 'M', fact: 'Milk comes from cows, goats, or sheep.', art: 'milk' },
  { word: 'juice', emoji: '🧃', category: 'Food', letter: 'J', fact: 'Juice is a sweet drink made from fruit.', art: 'juice' },
  { word: 'pizza', emoji: '🍕', category: 'Food', letter: 'P', fact: 'Pizza has crust, sauce, cheese, and toppings.', art: 'pizza' },
  { word: 'egg', emoji: '🥚', category: 'Food', letter: 'E', fact: 'Eggs can be boiled, scrambled, or made into omelets.', art: 'egg' },
  { word: 'cheese', emoji: '🧀', category: 'Food', letter: 'C', fact: 'Cheese is made from milk and comes in flavors.', art: 'cheese' },
  { word: 'grape', emoji: '🍇', category: 'Food', letter: 'G', fact: 'Grapes grow in bunches on vines.', art: 'grape' },
  { word: 'lemon', emoji: '🍋', category: 'Food', letter: 'L', fact: 'Lemons taste sour and add zing to food.', art: 'lemon' },
  { word: 'orange', emoji: '🍊', category: 'Food', letter: 'O', fact: 'Oranges are juicy citrus fruits full of vitamin C.', art: 'orange' },
  { word: 'cookie', emoji: '🍪', category: 'Food', letter: 'C', fact: 'Cookies are small, sweet baked treats.', art: 'cookie' },
  { word: 'rice', emoji: '🍚', category: 'Food', letter: 'R', fact: 'Rice grains cook into a soft, fluffy side.', art: 'rice' },
  { word: 'soup', emoji: '🍲', category: 'Food', letter: 'S', fact: 'Soup is a warm bowl of tasty broth.', art: 'soup' },
  { word: 'ice cream', emoji: '🍦', category: 'Food', letter: 'I', fact: 'Ice cream is cold, creamy, and delightful.', art: 'icecream' },

  { word: 'sun', emoji: '☀️', category: 'Nature', letter: 'S', fact: 'The sun gives Earth light and warmth.', art: 'sun' },
  { word: 'moon', emoji: '🌙', category: 'Nature', letter: 'M', fact: 'The moon shines by reflecting sunlight.', art: 'moon' },
  { word: 'star', emoji: '⭐', category: 'Nature', letter: 'S', fact: 'Stars are hot balls of glowing gas.', art: 'star' },
  { word: 'tree', emoji: '🌳', category: 'Nature', letter: 'T', fact: 'Trees grow tall and give us shade.', art: 'tree' },
  { word: 'flower', emoji: '🌸', category: 'Nature', letter: 'F', fact: 'Flowers grow from seeds and bloom in spring.', art: 'flower' },
  { word: 'rainbow', emoji: '🌈', category: 'Nature', letter: 'R', fact: 'Rainbows appear when sunlight meets raindrops.', art: 'rainbow' },
  { word: 'cloud', emoji: '☁️', category: 'Nature', letter: 'C', fact: 'Clouds are made of tiny water drops.', art: 'cloud' },
  { word: 'rain', emoji: '🌧️', category: 'Nature', letter: 'R', fact: 'Rain falls from clouds as water droplets.', art: 'rain' },
  { word: 'snow', emoji: '❄️', category: 'Nature', letter: 'S', fact: 'Snowflakes are icy crystals that fall softly.', art: 'snow' },
  { word: 'mountain', emoji: '⛰️', category: 'Nature', letter: 'M', fact: 'Mountains rise high above the land.', art: 'mountain' },
  { word: 'sea', emoji: '🌊', category: 'Nature', letter: 'S', fact: 'The sea is a huge body of salt water.', art: 'sea' },
  { word: 'fire', emoji: '🔥', category: 'Nature', letter: 'F', fact: 'Fire gives heat and light, so stay careful.', art: 'fire' },
  { word: 'leaf', emoji: '🍃', category: 'Nature', letter: 'L', fact: 'Leaves help plants make food from sunlight.', art: 'leaf' },
  { word: 'seed', emoji: '🌰', category: 'Nature', letter: 'S', fact: 'Seeds grow into plants with water and sun.', art: 'seed' },
  { word: 'rock', emoji: '🪨', category: 'Nature', letter: 'R', fact: 'Rocks are hard and come in many shapes.', art: 'rock' },
  { word: 'sky', emoji: '🌌', category: 'Nature', letter: 'S', fact: 'The sky holds clouds, stars, and blue space.', art: 'sky' },

  { word: 'ball', emoji: '⚽', category: 'Things', letter: 'B', fact: 'Balls bounce, roll, and fly through the air.', art: 'ball' },
  { word: 'hat', emoji: '🎩', category: 'Things', letter: 'H', fact: 'Hats keep heads warm or shady.', art: 'hat' },
  { word: 'book', emoji: '📕', category: 'Things', letter: 'B', fact: 'Books tell stories and teach new things.', art: 'book' },
  { word: 'key', emoji: '🔑', category: 'Things', letter: 'K', fact: 'Keys open locks with their tiny teeth.', art: 'key' },
  { word: 'cup', emoji: '🥤', category: 'Things', letter: 'C', fact: 'Cups hold drinks for sipping anywhere.', art: 'cup' },
  { word: 'bed', emoji: '🛏️', category: 'Things', letter: 'B', fact: 'Beds give us a cozy place to sleep.', art: 'bed' },
  { word: 'chair', emoji: '🪑', category: 'Things', letter: 'C', fact: 'Chairs give us a place to sit.', art: 'chair' },
  { word: 'door', emoji: '🚪', category: 'Things', letter: 'D', fact: 'Doors open and close to guard rooms.', art: 'door' },
  { word: 'lamp', emoji: '💡', category: 'Things', letter: 'L', fact: 'Lamps brighten rooms when you flip a switch.', art: 'lamp' },
  { word: 'bag', emoji: '👜', category: 'Things', letter: 'B', fact: 'Bags carry toys, books, and snacks.', art: 'bag' },
  { word: 'phone', emoji: '📱', category: 'Things', letter: 'P', fact: 'Phones help people talk and play games.', art: 'phone' },
  { word: 'clock', emoji: '⌚', category: 'Things', letter: 'C', fact: 'Clocks help us know the time of day.', art: 'clock' },
  { word: 'toy', emoji: '🧸', category: 'Things', letter: 'T', fact: 'Toys make playtime bright and imaginative.', art: 'toy' },
  { word: 'pen', emoji: '🖊️', category: 'Things', letter: 'P', fact: 'Pens use ink to write words and draw.', art: 'pen' },
  { word: 'box', emoji: '📦', category: 'Things', letter: 'B', fact: 'Boxes hold things and stack up neatly.', art: 'box' },
  { word: 'brush', emoji: '🖌️', category: 'Things', letter: 'B', fact: 'Brushes help artists paint colorful pictures.', art: 'brush' },

  { word: 'car', emoji: '🚗', category: 'Vehicles', letter: 'C', fact: 'Cars carry people along roads on wheels.', art: 'car' },
  { word: 'bus', emoji: '🚌', category: 'Vehicles', letter: 'B', fact: 'Buses carry many passengers at once.', art: 'bus' },
  { word: 'bike', emoji: '🚲', category: 'Vehicles', letter: 'B', fact: 'Bikes roll on two wheels and need pedaling.', art: 'bike' },
  { word: 'train', emoji: '🚂', category: 'Vehicles', letter: 'T', fact: 'Trains follow tracks and carry many people.', art: 'train' },
  { word: 'plane', emoji: '✈️', category: 'Vehicles', letter: 'P', fact: 'Planes fly high through the sky.', art: 'plane' },
  { word: 'boat', emoji: '⛵', category: 'Vehicles', letter: 'B', fact: 'Boats float on water and can carry people.', art: 'boat' },
  { word: 'truck', emoji: '🚚', category: 'Vehicles', letter: 'T', fact: 'Trucks haul big loads from place to place.', art: 'truck' },
  { word: 'taxi', emoji: '🚕', category: 'Vehicles', letter: 'T', fact: 'Taxis take passengers to where they need.', art: 'taxi' },
  { word: 'van', emoji: '🚐', category: 'Vehicles', letter: 'V', fact: 'Vans carry people and gear in roomy spaces.', art: 'van' },
  { word: 'rocket', emoji: '🚀', category: 'Vehicles', letter: 'R', fact: 'Rockets blast off to explore outer space.', art: 'rocket' },
  { word: 'scooter', emoji: '🛴', category: 'Vehicles', letter: 'S', fact: 'Scooters roll along on small wheels.', art: 'scooter' },
  { word: 'tractor', emoji: '🚜', category: 'Vehicles', letter: 'T', fact: 'Tractors help farmers work in fields.', art: 'tractor' },
  { word: 'ambulance', emoji: '🚑', category: 'Vehicles', letter: 'A', fact: 'Ambulances rush to help sick or hurt people.', art: 'ambulance' },
  { word: 'fire truck', emoji: '🚒', category: 'Vehicles', letter: 'F', fact: 'Fire trucks carry hoses and brave firefighters.', art: 'firetruck' },
  { word: 'helicopter', emoji: '🚁', category: 'Vehicles', letter: 'H', fact: 'Helicopters fly with spinning rotor blades.', art: 'helicopter' },
  { word: 'submarine', emoji: '🛳️', category: 'Vehicles', letter: 'S', fact: 'Submarines travel deep under the sea.', art: 'submarine' },
  { word: 'wolf', emoji: '🐺', category: 'Animals', letter: 'W', fact: 'Wolves howl and live in close packs.', art: 'wolf' },
  { word: 'deer', emoji: '🦌', category: 'Animals', letter: 'D', fact: 'Deer have antlers and nibble leaves.', art: 'deer' },
  { word: 'fox', emoji: '🦊', category: 'Animals', letter: 'F', fact: 'Foxes have bushy tails and clever tricks.', art: 'fox' },
  { word: 'owl', emoji: '🦉', category: 'Animals', letter: 'O', fact: 'Owls see well in the dark.', art: 'owl' },
  { word: 'seal', emoji: '🦭', category: 'Animals', letter: 'S', fact: 'Seals swim and clap with flippers.', art: 'seal' },
  { word: 'whale', emoji: '🐳', category: 'Animals', letter: 'W', fact: 'Whales sing songs in the ocean.', art: 'whale' },
  { word: 'crab', emoji: '🦀', category: 'Animals', letter: 'C', fact: 'Crabs walk sideways on the sand.', art: 'crab' },
  { word: 'turtle', emoji: '🐢', category: 'Animals', letter: 'T', fact: 'Turtles carry shells on their backs.', art: 'turtle' },
  { word: 'peach', emoji: '🍑', category: 'Food', letter: 'P', fact: 'Peaches are soft and sweet.', art: 'peach' },
  { word: 'pear', emoji: '🍐', category: 'Food', letter: 'P', fact: 'Pears are juicy and shaped like a bell.', art: 'pear' },
  { word: 'carrot', emoji: '🥕', category: 'Food', letter: 'C', fact: 'Carrots crunch and help eyes stay healthy.', art: 'carrot' },
  { word: 'corn', emoji: '🌽', category: 'Food', letter: 'C', fact: 'Corn grows on tall stalks.', art: 'corn' },
  { word: 'potato', emoji: '🥔', category: 'Food', letter: 'P', fact: 'Potatoes grow underground.', art: 'potato' },
  { word: 'donut', emoji: '🍩', category: 'Food', letter: 'D', fact: 'Donuts are round treats with a hole.', art: 'donut' },
  { word: 'popcorn', emoji: '🍿', category: 'Food', letter: 'P', fact: 'Popcorn pops when it gets hot.', art: 'popcorn' },
  { word: 'candy', emoji: '🍬', category: 'Food', letter: 'C', fact: 'Candy is a sweet little treat.', art: 'candy' },
  { word: 'planet', emoji: '🪐', category: 'Nature', letter: 'P', fact: 'Planets travel around a star.', art: 'planet' },
  { word: 'comet', emoji: '☄️', category: 'Nature', letter: 'C', fact: 'Comets have glowing tails in space.', art: 'comet' },
  { word: 'volcano', emoji: '🌋', category: 'Nature', letter: 'V', fact: 'Volcanoes can puff smoke and lava.', art: 'volcano' },
  { word: 'island', emoji: '🏝️', category: 'Nature', letter: 'I', fact: 'An island is land surrounded by water.', art: 'island' },
  { word: 'cactus', emoji: '🌵', category: 'Nature', letter: 'C', fact: 'Cacti store water in their stems.', art: 'cactus' },
  { word: 'mushroom', emoji: '🍄', category: 'Nature', letter: 'M', fact: 'Mushrooms grow in damp, shady places.', art: 'mushroom' },
  { word: 'shell', emoji: '🐚', category: 'Nature', letter: 'S', fact: 'Shells are hard homes for sea animals.', art: 'shell' },
  { word: 'feather', emoji: '🪶', category: 'Nature', letter: 'F', fact: 'Feathers help birds fly and stay warm.', art: 'feather' },
  { word: 'kite', emoji: '🪁', category: 'Things', letter: 'K', fact: 'Kites dance in the wind.', art: 'kite' },
  { word: 'drum', emoji: '🥁', category: 'Things', letter: 'D', fact: 'Drums make a loud thump-thump beat.', art: 'drum' },
  { word: 'guitar', emoji: '🎸', category: 'Things', letter: 'G', fact: 'Guitars sing when you strum strings.', art: 'guitar' },
  { word: 'crown', emoji: '👑', category: 'Things', letter: 'C', fact: 'A crown sits on a king or queen.', art: 'crown' },
  { word: 'gift', emoji: '🎁', category: 'Things', letter: 'G', fact: 'Gifts are fun surprises to open.', art: 'gift' },
  { word: 'candle', emoji: '🕯️', category: 'Things', letter: 'C', fact: 'Candles glow with a warm flame.', art: 'candle' },
  { word: 'camera', emoji: '📷', category: 'Things', letter: 'C', fact: 'Cameras capture pictures and videos.', art: 'camera' },
  { word: 'robot', emoji: '🤖', category: 'Things', letter: 'R', fact: 'Robots can follow instructions.', art: 'robot' },
  { word: 'jeep', emoji: '🚙', category: 'Vehicles', letter: 'J', fact: 'Jeeps drive on rough roads.', art: 'jeep' },
  { word: 'tram', emoji: '🚊', category: 'Vehicles', letter: 'T', fact: 'Trams roll along city tracks.', art: 'tram' },
  { word: 'ship', emoji: '🚢', category: 'Vehicles', letter: 'S', fact: 'Ships carry people across the sea.', art: 'ship' },
  { word: 'balloon', emoji: '🎈', category: 'Vehicles', letter: 'B', fact: 'Balloons float up in the air.', art: 'balloon' },
  { word: 'sled', emoji: '🛷', category: 'Vehicles', letter: 'S', fact: 'Sleds slide over snow.', art: 'sled' },
  { word: 'skateboard', emoji: '🛹', category: 'Vehicles', letter: 'S', fact: 'Skateboards roll on little wheels.', art: 'skateboard' },
  { word: 'canoe', emoji: '🛶', category: 'Vehicles', letter: 'C', fact: 'Canoes glide quietly on water.', art: 'canoe' },
  { word: 'subway', emoji: '🚇', category: 'Vehicles', letter: 'S', fact: 'Subways carry people underground.', art: 'subway' }
];

const COLORING_ART = {
  cat: () => cpFrame(
    `${cpPoly('ear', '28,58 34,24 55,45')}${cpPoly('ear', '92,58 86,24 65,45')}${cpCircle('head', 60, 64, 34)}${cpEllipse('body', 60, 113, 28, 27)}${cpPath('tail', 'M86 116 Q110 112 105 86 Q103 75 94 78 Z')}`,
    `${inkCircle(48, 60, 3)}${inkCircle(72, 60, 3)}${inkPath('M54 72 Q60 78 66 72')}${inkPath('M45 70 L25 66 M45 74 L26 77 M75 70 L95 66 M75 74 L94 77')}`
  ),
  dog: () => cpFrame(
    `${cpPath('ear', 'M34 43 Q18 42 19 66 Q20 84 34 78 Z')}${cpPath('ear', 'M86 43 Q102 42 101 66 Q100 84 86 78 Z')}${cpCircle('head', 60, 62, 32)}${cpEllipse('body', 60, 112, 27, 28)}${cpEllipse('muzzle', 60, 78, 14, 11)}${cpPath('tail', 'M84 111 Q105 108 102 92 Z')}${cpRect('collar', 42, 92, 36, 7, 4)}`,
    `${inkCircle(48, 58, 3)}${inkCircle(72, 58, 3)}${inkCircle(60, 75, 4)}${inkPath('M60 79 Q60 86 54 86 M60 86 Q66 86 66 80')}`
  ),
  fish: () => cpFrame(
    `${cpPoly('tail', '92,75 112,52 108,98')}${cpPoly('fin', '50,52 64,34 76,54')}${cpPoly('fin', '50,98 60,116 74,98')}${cpEllipse('body', 58, 75, 36, 24)}`,
    `${inkCircle(44, 70, 3)}${inkPath('M36 82 Q46 90 56 82')}${inkPath('M62 64 Q68 70 62 76 M76 70 Q82 76 76 82')}`
  ),
  bird: () => cpFrame(
    `${cpPoly('tail', '72,104 92,128 82,96')}${cpEllipse('body', 58, 80, 28, 32)}${cpCircle('head', 62, 48, 22)}${cpPath('wing', 'M42 74 Q24 62 30 90 Q36 104 48 92 Z')}${cpPoly('beak', '82,48 102,53 82,59')}`,
    `${inkCircle(68, 44, 3)}${inkPath('M48 116 L44 128 M58 116 L56 128')}`
  ),
  duck: () => cpFrame(
    `${cpPoly('tail', '22,96 8,82 26,84')}${cpEllipse('body', 55, 98, 34, 24)}${cpCircle('head', 72, 60, 22)}${cpPath('wing', 'M38 90 Q20 84 27 106 Q36 114 50 104 Z')}${cpPoly('beak', '92,62 112,67 92,73')}`,
    `${inkCircle(76, 55, 3)}${inkPath('M94 70 Q104 74 110 68')}`
  ),
  frog: () => cpFrame(
    `${cpEllipse('leg', 30, 112, 14, 9)}${cpEllipse('leg', 90, 112, 14, 9)}${cpEllipse('body', 60, 94, 30, 26)}${cpCircle('eye bump', 42, 38, 12)}${cpCircle('eye bump', 78, 38, 12)}${cpEllipse('head', 60, 58, 34, 25)}`,
    `${inkCircle(42, 38, 4)}${inkCircle(78, 38, 4)}${inkPath('M48 68 Q60 78 72 68')}`
  ),
  lion: () => cpFrame(
    `${cpCircle('mane', 60, 66, 40)}${cpCircle('ear', 38, 42, 9)}${cpCircle('ear', 82, 42, 9)}${cpEllipse('body', 60, 116, 26, 22)}${cpPath('tail', 'M84 114 Q108 112 104 92 Z')}${cpCircle('tuft', 104, 88, 9)}${cpCircle('face', 60, 66, 27)}`,
    `${inkCircle(50, 62, 3)}${inkCircle(70, 62, 3)}${inkPath('M54 76 Q60 84 66 76')}${inkCircle(60, 73, 3)}${inkPath('M44 72 L28 68 M44 76 L29 80 M76 72 L92 68 M76 76 L91 80')}`
  ),
  bear: () => cpFrame(
    `${cpCircle('ear', 35, 43, 11)}${cpCircle('ear', 85, 43, 11)}${cpEllipse('body', 60, 114, 29, 28)}${cpEllipse('arm', 33, 108, 10, 18)}${cpEllipse('arm', 87, 108, 10, 18)}${cpCircle('head', 60, 64, 32)}${cpEllipse('muzzle', 60, 77, 15, 11)}`,
    `${inkCircle(48, 60, 3)}${inkCircle(72, 60, 3)}${inkCircle(60, 74, 4)}${inkPath('M60 78 Q60 84 54 84 M60 84 Q66 84 66 78')}`
  ),
  monkey: () => cpFrame(
    `${cpPath('tail', 'M84 116 Q112 116 106 86 Q102 70 92 78 Z')}${cpEllipse('body', 60, 116, 25, 25)}${cpCircle('ear', 28, 65, 11)}${cpCircle('ear', 92, 65, 11)}${cpCircle('head', 60, 64, 31)}${cpEllipse('face', 60, 72, 21, 22)}`,
    `${inkCircle(52, 66, 3)}${inkCircle(68, 66, 3)}${inkCircle(56, 76, 2)}${inkCircle(64, 76, 2)}${inkPath('M52 84 Q60 90 68 84')}`
  ),
  rabbit: () => cpFrame(
    `${cpEllipse('ear', 47, 32, 10, 25)}${cpEllipse('ear', 73, 32, 10, 25)}${cpEllipse('inner ear', 47, 32, 5, 17)}${cpEllipse('inner ear', 73, 32, 5, 17)}${cpCircle('tail', 88, 120, 9)}${cpEllipse('body', 60, 116, 26, 25)}${cpCircle('head', 60, 68, 29)}`,
    `${inkCircle(50, 64, 3)}${inkCircle(70, 64, 3)}${inkCircle(60, 75, 3)}${inkPath('M60 78 Q60 84 54 84 M60 84 Q66 84 66 78')}${inkPath('M45 76 L28 72 M45 80 L29 84 M75 76 L92 72 M75 80 L91 84')}`
  ),
  tiger: () => cpFrame(
    `${cpPoly('ear', '32,50 34,25 52,43')}${cpPoly('ear', '88,50 86,25 68,43')}${cpEllipse('body', 60, 114, 28, 26)}${cpPath('tail', 'M85 114 Q108 116 106 94 Z')}${cpCircle('head', 60, 64, 33)}${cpEllipse('muzzle', 60, 78, 16, 11)}`,
    `${inkCircle(49, 60, 3)}${inkCircle(71, 60, 3)}${inkCircle(60, 75, 4)}${inkPath('M60 79 Q60 85 54 85 M60 85 Q66 85 66 79')}${inkPath('M46 36 L50 50 M60 32 L60 48 M74 36 L70 50 M30 62 L42 64 M90 62 L78 64')}`
  ),
  panda: () => cpFrame(
    `${cpCircle('ear', 34, 42, 11)}${cpCircle('ear', 86, 42, 11)}${cpEllipse('body', 60, 116, 28, 25)}${cpEllipse('arm', 34, 108, 10, 17)}${cpEllipse('arm', 86, 108, 10, 17)}${cpCircle('head', 60, 64, 32)}${cpEllipse('patch', 47, 61, 9, 12)}${cpEllipse('patch', 73, 61, 9, 12)}`,
    `${inkCircle(47, 61, 3)}${inkCircle(73, 61, 3)}${inkCircle(60, 76, 4)}${inkPath('M60 80 Q60 86 54 86 M60 86 Q66 86 66 80')}`
  ),
  horse: () => cpFrame(
    `${cpPath('mane', 'M42 34 Q28 50 36 72 Q30 88 42 96 Z')}${cpPoly('ear', '44,32 42,12 54,28')}${cpPoly('ear', '76,32 78,12 66,28')}${cpPath('body', 'M48 94 Q34 104 38 126 Q60 136 82 126 Q86 104 72 94 Z')}${cpPath('head', 'M42 36 Q60 24 78 36 L82 74 Q82 92 64 96 L48 92 Q38 82 40 66 Z')}${cpEllipse('muzzle', 60, 88, 18, 13)}`,
    `${inkCircle(52, 60, 3)}${inkCircle(72, 60, 3)}${inkCircle(54, 90, 2)}${inkCircle(66, 90, 2)}${inkPath('M54 98 Q60 104 66 98')}`
  ),
  cow: () => cpFrame(
    `${cpPoly('horn', '38,42 30,26 48,38')}${cpPoly('horn', '82,42 90,26 72,38')}${cpEllipse('ear', 30, 58, 13, 8)}${cpEllipse('ear', 90, 58, 13, 8)}${cpEllipse('body', 60, 118, 30, 24)}${cpEllipse('spot', 48, 112, 9, 7)}${cpEllipse('spot', 77, 122, 8, 6)}${cpEllipse('head', 60, 64, 32, 30)}${cpEllipse('muzzle', 60, 82, 20, 13)}`,
    `${inkCircle(49, 60, 3)}${inkCircle(71, 60, 3)}${inkCircle(53, 82, 2)}${inkCircle(67, 82, 2)}${inkPath('M52 90 Q60 96 68 90')}`
  ),
  pig: () => cpFrame(
    `${cpEllipse('body', 60, 116, 29, 25)}${cpRect('foot', 40, 132, 12, 8, 4)}${cpRect('foot', 68, 132, 12, 8, 4)}${cpPath('tail', 'M87 112 Q102 108 98 98 Q94 92 90 98 Z')}${cpPoly('ear', '32,50 34,28 50,42')}${cpPoly('ear', '88,50 86,28 70,42')}${cpCircle('head', 60, 66, 32)}${cpEllipse('snout', 60, 78, 17, 12)}`,
    `${inkCircle(48, 60, 3)}${inkCircle(72, 60, 3)}${inkCircle(54, 78, 2)}${inkCircle(66, 78, 2)}${inkPath('M52 88 Q60 94 68 88')}`
  ),
  sheep: () => cpFrame(
    `${cpEllipse('body', 60, 116, 32, 24)}${cpRect('leg', 46, 132, 8, 10, 3)}${cpRect('leg', 66, 132, 8, 10, 3)}${cpCircle('puff', 40, 105, 10)}${cpCircle('puff', 80, 105, 10)}${cpCircle('puff', 60, 100, 11)}${cpEllipse('ear', 33, 60, 11, 7)}${cpEllipse('ear', 87, 60, 11, 7)}${cpCircle('wool head', 60, 60, 34)}${cpEllipse('face', 60, 72, 18, 20)}`,
    `${inkCircle(53, 69, 3)}${inkCircle(67, 69, 3)}${inkPath('M54 80 Q60 86 66 80')}`
  ),
  apple: () => cpFrame(
    `${cpPath('body', 'M60 46 C38 42 26 60 30 82 C34 106 50 122 60 122 C70 122 86 106 90 82 C94 60 82 42 60 46 Z')}${cpPath('leaf', 'M62 44 Q68 26 84 28 Q78 44 62 44 Z')}${cpEllipse('shine', 47, 70, 6, 10)}`,
    `${inkPath('M60 48 Q60 32 64 28')}${inkPath('M64 38 Q72 34 80 30')}`
  ),
  banana: () => cpFrame(
    `${cpPath('banana', 'M26 48 C30 88 58 116 94 112 C76 128 38 120 22 84 C14 66 18 52 26 48 Z')}${cpPoly('tip', '90,108 102,104 96,116')}${cpPath('peel', 'M28 50 Q36 46 40 54 Z')}`,
    `${inkPath('M34 60 C38 92 62 108 84 108')}`
  ),
  cake: () => cpFrame(
    `${cpEllipse('plate', 60, 128, 42, 8)}${cpRect('layer', 30, 92, 60, 32, 8)}${cpPath('frosting', 'M30 94 Q40 80 50 94 Q60 80 70 94 Q80 80 90 94 L90 100 L30 100 Z')}${cpRect('candle', 56, 62, 8, 26, 3)}${cpPath('flame', 'M60 58 Q54 48 60 40 Q66 48 60 58 Z')}`,
    `${inkPath('M56 70 L64 70 M56 78 L64 78')}${inkPath('M40 108 L44 112 M60 108 L64 112 M76 108 L80 112')}`
  ),
  bread: () => cpFrame(
    `${cpPath('bread', 'M24 92 C24 60 40 44 60 44 C80 44 96 60 96 92 Q96 116 60 116 Q24 116 24 92 Z')}${cpPath('crust', 'M32 92 C32 66 44 54 60 54 C76 54 88 66 88 92 L80 92 C80 72 72 62 60 62 C48 62 40 72 40 92 Z')}${cpRect('slice', 42, 64, 36, 44, 8)}`,
    `${inkPath('M48 76 L54 70 M60 80 L66 74 M72 84 L78 78')}`
  ),

  milk: () => cpFrame(
    `${cpPoly('glass', '38,52 82,52 76,126 44,126')}${cpPoly('milk', '43,78 77,78 74,122 46,122')}${cpRect('straw', 70, 26, 7, 40, 2)}${cpCircle('bubble', 54, 96, 4)}`,
    `${inkPath('M44 82 Q60 88 76 82')}`
  ),
  juice: () => cpFrame(
    `${cpPoly('carton', '38,38 82,38 88,126 32,126')}${cpPoly('front', '44,56 76,56 80,120 40,120')}${cpRect('straw', 68, 18, 7, 32, 2)}${cpCircle('fruit', 60, 82, 10)}`,
    `${inkPath('M60 72 Q64 64 72 64')}${inkPath('M50 104 L70 104 M50 112 L66 112')}`
  ),
  pizza: () => cpFrame(
    `${cpPoly('slice', '60,22 104,118 16,118')}${cpPath('crust', 'M16 118 Q60 134 104 118 L96 108 Q60 120 24 108 Z')}${cpCircle('pepperoni', 52, 76, 8)}${cpCircle('pepperoni', 72, 92, 8)}${cpCircle('pepperoni', 44, 104, 7)}${cpCircle('cheese', 62, 58, 6)}`,
    `${inkPath('M38 88 Q44 84 48 88 M80 74 Q86 70 90 74')}`
  ),
  egg: () => cpFrame(
    `${cpPath('white', 'M24 86 C24 58 42 46 60 50 C78 42 98 60 96 88 C94 114 76 124 60 118 C40 126 22 110 24 86 Z')}${cpCircle('yolk', 60, 84, 18)}${cpCircle('shine', 54, 78, 5)}`,
    ''
  ),
  cheese: () => cpFrame(
    `${cpPoly('wedge', '24,110 98,110 88,56 34,56')}${cpRect('rind', 24, 102, 74, 10, 4)}${cpCircle('hole', 48, 88, 8)}${cpCircle('hole', 72, 94, 10)}${cpCircle('hole', 62, 72, 6)}`,
    ''
  ),
  grape: () => cpFrame(
    `${cpCircle('grape', 46, 64, 11)}${cpCircle('grape', 66, 62, 11)}${cpCircle('grape', 38, 84, 11)}${cpCircle('grape', 56, 82, 11)}${cpCircle('grape', 76, 82, 11)}${cpCircle('grape', 48, 104, 11)}${cpCircle('grape', 68, 104, 11)}${cpCircle('grape', 58, 122, 10)}${cpPath('stem', 'M56 50 Q58 34 68 28 Z')}${cpPath('leaf', 'M62 34 Q70 18 86 22 Q80 36 62 34 Z')}`,
    ''
  ),
  lemon: () => cpFrame(
    `${cpPoly('tip', '20,82 10,72 12,92')}${cpPoly('tip', '100,82 110,72 108,92')}${cpEllipse('body', 60, 82, 38, 28)}${cpPath('leaf', 'M64 56 Q70 38 86 40 Q80 56 64 56 Z')}`,
    `${inkPath('M62 54 Q62 44 68 40')}`
  ),
  orange: () => cpFrame(
    `${cpCircle('body', 60, 82, 35)}${cpCircle('slice', 60, 88, 20)}${cpPath('leaf', 'M62 48 Q68 30 86 32 Q80 48 62 48 Z')}`,
    `${inkPath('M60 50 Q60 38 66 34')}${inkPath('M60 68 L60 108 M42 88 L78 88 M48 76 L72 100 M72 76 L48 100')}`
  ),
  cookie: () => cpFrame(
    `${cpCircle('cookie', 60, 82, 40)}${cpCircle('chip', 44, 66, 6)}${cpCircle('chip', 72, 62, 7)}${cpCircle('chip', 58, 84, 6)}${cpCircle('chip', 80, 96, 6)}${cpCircle('chip', 40, 100, 7)}`,
    ''
  ),
  rice: () => cpFrame(
    `${cpPath('bowl', 'M24 82 Q60 112 96 82 L90 122 Q60 134 30 122 Z')}${cpPath('rice', 'M28 84 Q38 56 60 58 Q82 56 92 84 Q60 96 28 84 Z')}${cpEllipse('grain', 46, 72, 4, 7)}${cpEllipse('grain', 60, 66, 4, 7)}${cpEllipse('grain', 74, 74, 4, 7)}`,
    `${inkPath('M34 124 Q60 132 86 124')}`
  ),
  soup: () => cpFrame(
    `${cpPath('bowl', 'M20 78 Q60 116 100 78 L94 120 Q60 136 26 120 Z')}${cpEllipse('soup', 60, 80, 39, 14)}${cpPath('steam', 'M44 62 Q38 50 48 40 Z')}${cpPath('steam', 'M62 60 Q56 48 66 36 Z')}${cpPath('steam', 'M80 62 Q74 50 84 40 Z')}`,
    ''
  ),
  icecream: () => cpFrame(
    `${cpPoly('cone', '38,74 82,74 60,132')}${cpCircle('scoop', 46, 62, 18)}${cpCircle('scoop', 74, 62, 18)}${cpCircle('scoop', 60, 46, 20)}${cpCircle('cherry', 60, 26, 7)}`,
    `${inkPath('M46 84 L52 92 M60 84 L60 94 M74 84 L68 92')}${inkPath('M60 20 Q64 12 70 12')}`
  ),
  sun: () => cpFrame(
    `${cpPoly('ray', '56,20 64,20 62,42 58,42')}${cpPoly('ray', '58,106 62,106 64,128 56,128')}${cpPoly('ray', '18,68 18,76 42,74 42,70')}${cpPoly('ray', '78,70 78,74 102,76 102,68')}${cpPoly('ray', '28,32 36,26 50,44 44,50')}${cpPoly('ray', '84,26 92,32 76,50 70,44')}${cpPoly('ray', '28,116 36,122 50,104 44,98')}${cpPoly('ray', '92,116 84,122 70,104 76,98')}${cpCircle('center', 60, 74, 26)}`,
    `${inkCircle(51, 68, 3)}${inkCircle(69, 68, 3)}${inkPath('M50 80 Q60 90 70 80')}`
  ),
  moon: () => cpFrame(
    `${cpPath('cloud', 'M20 112 Q18 100 30 100 Q34 90 46 96 Q56 92 60 104 Q68 104 68 112 Z')}${cpPath('moon', 'M78 28 Q38 34 34 74 Q30 114 70 122 Q50 104 56 76 Q62 48 78 28 Z')}${cpPoly('star', '88,46 92,56 102,58 94,64 96,74 88,68 80,74 82,64 74,58 84,56')}${cpCircle('star', 76, 100, 5)}`,
    `${inkCircle(50, 70, 3)}${inkPath('M46 84 Q54 90 62 84')}`
  ),
  star: () => cpFrame(
    `${cpPoly('star', '60,18 72,54 110,56 80,78 90,114 60,94 30,114 40,78 10,56 48,54')}${cpPoly('sparkle', '96,16 100,28 112,32 100,36 96,48 92,36 80,32 92,28')}${cpCircle('sparkle', 22, 110, 6)}`,
    `${inkCircle(54, 58, 3)}${inkCircle(66, 58, 3)}${inkPath('M54 70 Q60 76 66 70')}`
  ),
  tree: () => cpFrame(
    `${cpEllipse('ground', 60, 136, 40, 7)}${cpRect('trunk', 50, 96, 20, 38, 6)}${cpCircle('crown', 60, 56, 34)}${cpCircle('crown', 38, 70, 20)}${cpCircle('crown', 82, 70, 20)}${cpCircle('fruit', 46, 58, 5)}${cpCircle('fruit', 72, 52, 5)}${cpCircle('fruit', 62, 74, 5)}`,
    ''
  ),
  flower: () => cpFrame(
    `${cpRect('stem', 56, 80, 8, 52, 4)}${cpPath('leaf', 'M58 108 Q36 92 30 110 Q44 122 58 108 Z')}${cpPath('leaf', 'M62 96 Q84 82 90 100 Q76 112 62 96 Z')}${cpEllipse('petal', 60, 20, 12, 20)}${cpEllipse('petal', 60, 60, 12, 20)}${cpEllipse('petal', 36, 34, 20, 12)}${cpEllipse('petal', 84, 34, 20, 12)}${cpEllipse('petal', 42, 56, 13, 17)}${cpEllipse('petal', 78, 56, 13, 17)}${cpCircle('center', 60, 42, 13)}`,
    `${inkCircle(56, 40, 2)}${inkCircle(64, 40, 2)}${inkPath('M55 47 Q60 51 65 47')}`
  ),
  rainbow: () => cpFrame(
    `${cpPath('band', 'M18 118 A42 42 0 0 1 102 118 L94 118 A34 34 0 0 0 26 118 Z')}${cpPath('band', 'M26 118 A34 34 0 0 1 94 118 L86 118 A26 26 0 0 0 34 118 Z')}${cpPath('band', 'M34 118 A26 26 0 0 1 86 118 L78 118 A18 18 0 0 0 42 118 Z')}${cpPath('band', 'M42 118 A18 18 0 0 1 78 118 L70 118 A10 10 0 0 0 50 118 Z')}${cpPath('band', 'M50 118 A10 10 0 0 1 70 118 L66 118 A2 2 0 0 0 54 118 Z')}${cpPath('cloud', 'M16 116 Q10 104 22 104 Q26 94 38 100 Q48 98 52 108 Q60 110 56 116 Z')}${cpPath('cloud', 'M64 116 Q60 106 72 106 Q78 98 88 104 Q98 104 100 116 Z')}`,
    ''
  ),
  cloud: () => cpFrame(
    `${cpPath('cloud', 'M28 108 Q14 108 16 94 Q18 82 32 84 Q38 66 56 72 Q68 60 80 74 Q98 74 98 92 Q110 96 104 108 Z')}${cpPath('small cloud', 'M22 56 Q12 56 14 46 Q16 38 26 40 Q32 30 44 36 Q54 36 56 46 Q62 48 60 56 Z')}${cpPath('small cloud', 'M76 54 Q68 54 70 46 Q72 40 80 42 Q86 34 96 40 Q104 40 106 48 Q112 50 110 54 Z')}`,
    `${inkCircle(50, 92, 3)}${inkCircle(72, 92, 3)}${inkPath('M52 100 Q60 106 68 100')}`
  ),
  rain: () => cpFrame(
    `${cpPath('cloud', 'M26 66 Q14 66 16 52 Q18 42 30 44 Q36 28 52 34 Q64 24 76 38 Q92 38 92 54 Q104 58 98 66 Z')}${cpPath('drop', 'M34 78 Q28 90 34 98 Q40 90 34 78 Z')}${cpPath('drop', 'M58 82 Q52 94 58 102 Q64 94 58 82 Z')}${cpPath('drop', 'M82 78 Q76 90 82 98 Q88 90 82 78 Z')}${cpPath('drop', 'M46 108 Q40 120 46 128 Q52 120 46 108 Z')}${cpPath('drop', 'M72 110 Q66 122 72 130 Q78 122 72 110 Z')}${cpEllipse('puddle', 60, 138, 34, 6)}`,
    ''
  ),

  snow: () => cpFrame(
    `${cpPoly('arm', '57,24 63,24 63,126 57,126')}${cpPoly('arm', '18,57 18,63 102,63 102,57')}${cpPoly('arm', '30,34 36,30 90,84 84,90')}${cpPoly('arm', '84,30 90,34 36,90 30,84')}${cpCircle('center', 60, 75, 10)}`,
    `${inkPath('M57 34 L47 44 M63 34 L73 44 M57 116 L47 106 M63 116 L73 106')}${inkPath('M28 57 L40 63 M92 57 L80 63 M34 40 L44 50 M86 40 L76 50')}`
  ),
  mountain: () => cpFrame(
    `${cpPath('cloud', 'M20 30 Q14 20 26 18 Q32 8 44 16 Q56 14 58 26 Q66 28 62 34 L18 34 Z')}${cpPoly('mountain', '10,122 48,42 78,92 96,62 112,122')}${cpPoly('snow', '48,42 62,66 48,60 36,66')}${cpPoly('snow', '96,62 108,82 96,76 86,82')}${cpEllipse('ground', 60, 132, 48, 8)}`,
    ''
  ),
  sea: () => cpFrame(
    `${cpPath('wave', 'M8 84 Q28 68 48 84 Q68 100 88 84 Q104 72 114 84 L114 132 L8 132 Z')}${cpCircle('sun', 84, 40, 18)}${cpPoly('hull', '30,56 74,56 68,70 36,70')}${cpPoly('sail', '54,18 54,56 70,56')}${cpPath('wave', 'M8 106 Q28 90 48 106 Q68 122 88 106 Q104 94 114 106 L114 138 L8 138 Z')}`,
    ''
  ),
  fire: () => cpFrame(
    `${cpPath('flame', 'M60 18 Q84 54 88 86 Q92 122 60 130 Q28 122 32 86 Q36 54 60 18 Z')}${cpPath('flame', 'M60 52 Q74 76 74 98 Q74 118 60 122 Q46 118 46 98 Q46 76 60 52 Z')}${cpPath('flame', 'M60 80 Q68 96 66 108 Q64 118 60 118 Q56 118 54 108 Q52 96 60 80 Z')}${cpRect('log', 34, 124, 52, 10, 5)}${cpRect('log', 46, 134, 30, 9, 4)}`,
    ''
  ),
  leaf: () => cpFrame(
    `${cpPath('leaf', 'M24 108 Q28 44 96 26 Q104 92 44 116 Q30 120 24 108 Z')}${cpPath('leaflet', 'M52 80 Q38 66 24 68 Q34 84 52 80 Z')}${cpPath('leaflet', 'M70 58 Q62 42 50 42 Q56 58 70 58 Z')}${cpPath('stem', 'M26 110 Q18 122 14 132 L20 134 Q24 122 32 112 Z')}`,
    `${inkPath('M28 108 Q60 76 92 34')}${inkPath('M48 82 Q38 74 28 72 M66 60 Q60 50 54 46')}`
  ),
  seed: () => cpFrame(
    `${cpEllipse('seed', 60, 84, 26, 36)}${cpPath('shell', 'M38 84 Q60 60 82 84 Q60 108 38 84 Z')}${cpPath('sprout', 'M58 52 Q58 34 70 24 L74 28 Q64 38 64 52 Z')}${cpPath('leaf', 'M70 26 Q82 14 94 20 Q88 34 70 26 Z')}${cpPath('leaf', 'M60 38 Q46 26 34 32 Q42 46 60 38 Z')}`,
    ''
  ),
  rock: () => cpFrame(
    `${cpPoly('rock', '20,118 30,72 62,52 94,68 104,118')}${cpPoly('highlight', '34,110 40,78 62,64 58,104')}${cpEllipse('pebble', 90, 126, 12, 7)}${cpEllipse('pebble', 28, 128, 9, 5)}`,
    `${inkPath('M62 70 L58 88 L70 96')}`
  ),
  sky: () => cpFrame(
    `${cpRect('sky', 12, 18, 96, 116, 16)}${cpPoly('star', '30,40 34,50 44,52 36,58 38,68 30,62 22,68 24,58 16,52 26,50')}${cpCircle('star', 84, 42, 5)}${cpCircle('star', 68, 64, 4)}${cpPath('moon', 'M82 96 Q64 94 62 110 Q60 126 78 128 Q68 118 74 108 Q78 100 82 96 Z')}${cpPath('cloud', 'M24 100 Q18 90 30 88 Q36 78 48 86 Q58 84 62 94 Q70 96 66 102 Z')}`,
    ''
  ),
  ball: () => cpFrame(
    `${cpCircle('ball', 60, 80, 42)}${cpPoly('panel', '60,44 84,62 74,92 46,92 36,62')}${cpPoly('patch', '60,44 72,52 66,62 54,62 48,52')}${cpPoly('patch', '36,62 48,62 44,76 32,78')}${cpPoly('patch', '84,62 72,62 76,76 88,78')}${cpPoly('patch', '46,92 74,92 68,108 52,108')}`,
    ''
  ),
  hat: () => cpFrame(
    `${cpEllipse('brim', 60, 118, 44, 10)}${cpPath('crown', 'M36 116 L40 48 Q60 38 80 48 L84 116 Z')}${cpRect('band', 38, 96, 44, 12, 4)}${cpEllipse('top', 60, 46, 20, 7)}`,
    ''
  ),
  book: () => cpFrame(
    `${cpRect('cover', 24, 30, 72, 96, 8)}${cpRect('page', 32, 38, 56, 80, 5)}${cpRect('spine', 24, 30, 10, 96, 5)}${cpRect('label', 44, 58, 32, 20, 4)}`,
    `${inkPath('M42 98 L78 98 M42 106 L72 106')}`
  ),
  key: () => cpFrame(
    `${cpCircle('ring', 42, 46, 18)}${cpRect('shaft', 54, 42, 46, 10, 3)}${cpRect('tooth', 86, 52, 9, 18, 2)}${cpRect('tooth', 98, 52, 9, 18, 2)}`,
    `${inkCircle(42, 46, 8)}`
  ),
  cup: () => cpFrame(
    `${cpPoly('cup', '32,56 88,56 80,128 40,128')}${cpRect('lid', 28, 46, 64, 12, 6)}${cpRect('straw', 68, 16, 7, 36, 3)}${cpRect('label', 44, 80, 32, 24, 5)}`,
    `${inkPath('M40 66 L80 66')}`
  ),
  bed: () => cpFrame(
    `${cpRect('headboard', 12, 58, 10, 62, 5)}${cpRect('footboard', 98, 58, 10, 62, 5)}${cpRect('frame', 16, 86, 88, 34, 8)}${cpRect('mattress', 24, 74, 72, 18, 7)}${cpEllipse('pillow', 38, 72, 18, 9)}${cpPath('blanket', 'M62 74 L96 74 L96 106 L62 106 Z')}${cpRect('leg', 20, 120, 8, 12, 3)}${cpRect('leg', 92, 120, 8, 12, 3)}`,
    ''
  ),
  chair: () => cpFrame(
    `${cpRect('back', 32, 30, 56, 52, 8)}${cpRect('seat', 28, 84, 64, 14, 5)}${cpRect('leg', 34, 98, 9, 38, 3)}${cpRect('leg', 77, 98, 9, 38, 3)}${cpRect('rung', 38, 116, 44, 7, 3)}`,
    ''
  ),
  door: () => cpFrame(
    `${cpRect('frame', 28, 22, 64, 112, 6)}${cpRect('panel', 36, 30, 48, 96, 4)}${cpRect('window', 44, 40, 32, 30, 4)}${cpCircle('knob', 76, 84, 5)}${cpRect('step', 24, 134, 72, 8, 4)}`,
    `${inkPath('M60 40 L60 70 M44 55 L76 55')}`
  ),

  lamp: () => cpFrame(
    `${cpCircle('glow', 60, 90, 16)}${cpEllipse('base', 60, 132, 28, 8)}${cpRect('stem', 56, 78, 8, 52, 3)}${cpPoly('shade', '32,78 88,78 100,40 20,40')}${cpCircle('bulb', 60, 90, 10)}`,
    `${inkPath('M28 28 L32 38 M92 28 L88 38 M16 66 L26 68 M104 66 L94 68')}`
  ),
  bag: () => cpFrame(
    `${cpPath('handle', 'M42 66 Q42 26 60 26 Q78 26 78 66 L70 66 Q70 36 60 36 Q50 36 50 66 Z')}${cpPath('body', 'M30 66 L90 66 L96 126 L24 126 Z')}${cpPath('flap', 'M30 66 Q60 90 90 66 L86 84 Q60 104 34 84 Z')}${cpRect('clasp', 54, 88, 12, 10, 3)}`,
    ''
  ),
  phone: () => cpFrame(
    `${cpRect('body', 34, 22, 52, 106, 10)}${cpRect('screen', 40, 36, 40, 72, 5)}${cpCircle('home', 60, 122, 5)}${cpRect('speaker', 52, 28, 16, 4, 2)}`,
    ''
  ),
  clock: () => cpFrame(
    `${cpRect('band', 48, 26, 24, 12, 5)}${cpRect('band', 48, 114, 24, 12, 5)}${cpCircle('case', 60, 76, 42)}${cpCircle('face', 60, 76, 34)}${cpPath('hand', 'M58 76 L58 50 L64 50 L64 76 Z')}${cpPath('hand', 'M59 76 L78 86 L75 91 L57 80 Z')}`,
    `${inkCircle(60, 42, 2)}${inkCircle(94, 76, 2)}${inkCircle(60, 110, 2)}${inkCircle(26, 76, 2)}`
  ),
  toy: () => cpFrame(
    `${cpCircle('ear', 36, 42, 11)}${cpCircle('ear', 84, 42, 11)}${cpEllipse('body', 60, 116, 28, 26)}${cpEllipse('arm', 34, 108, 10, 17)}${cpEllipse('arm', 86, 108, 10, 17)}${cpEllipse('leg', 46, 134, 11, 9)}${cpEllipse('leg', 74, 134, 11, 9)}${cpCircle('head', 60, 62, 30)}${cpEllipse('muzzle', 60, 76, 14, 10)}`,
    `${inkCircle(49, 58, 3)}${inkCircle(71, 58, 3)}${inkCircle(60, 73, 4)}${inkPath('M60 77 Q60 83 54 83 M60 83 Q66 83 66 77')}`
  ),
  pen: () => cpFrame(
    `${cpRect('cap', 48, 24, 24, 24, 5)}${cpRect('body', 48, 34, 24, 86, 6)}${cpPoly('tip', '48,120 72,120 60,142')}${cpRect('band', 48, 108, 24, 6, 2)}${cpRect('clip', 68, 22, 6, 24, 3)}`,
    ''
  ),
  box: () => cpFrame(
    `${cpPoly('top', '26,66 40,42 108,42 94,66')}${cpPoly('side', '94,66 108,42 108,100 94,124')}${cpRect('front', 26, 66, 68, 58, 4)}${cpPoly('tape', '58,66 70,66 82,42 68,42')}${cpPoly('flap', '40,42 68,42 58,66 26,66')}`,
    ''
  ),
  brush: () => cpFrame(
    `${cpPath('bristles', 'M46 60 Q46 28 60 22 Q74 28 74 60 Z')}${cpPath('paint', 'M48 60 Q60 74 72 60 Q82 68 76 80 Q60 88 44 80 Q38 68 48 60 Z')}${cpRect('ferrule', 48, 60, 24, 18, 4)}${cpRect('handle', 52, 74, 16, 60, 8)}`,
    ''
  ),
  car: () => cpFrame(
    `${cpPath('body', 'M18 92 Q20 72 40 70 L52 52 Q56 46 68 46 L84 46 Q94 46 100 58 L106 74 Q114 78 114 96 L114 112 L18 112 Z')}${cpPoly('window', '48,72 56,54 68,52 68,72')}${cpPoly('window', '72,52 84,52 96,72 72,72')}${cpCircle('wheel', 36, 112, 12)}${cpCircle('wheel', 90, 112, 12)}${cpCircle('hub', 36, 112, 5)}${cpCircle('hub', 90, 112, 5)}${cpCircle('light', 108, 88, 5)}`,
    ''
  ),
  bus: () => cpFrame(
    `${cpRect('body', 14, 42, 92, 72, 10)}${cpRect('window', 22, 52, 76, 30, 5)}${cpRect('door', 78, 54, 16, 54, 3)}${cpCircle('wheel', 34, 116, 11)}${cpCircle('wheel', 86, 116, 11)}${cpCircle('light', 104, 92, 5)}`,
    `${inkPath('M42 52 L42 82 M62 52 L62 82')}`
  ),
  bike: () => cpFrame(
    `${cpCircle('wheel', 32, 106, 24)}${cpCircle('wheel', 88, 106, 24)}${cpPath('frame', 'M32 106 L54 68 L76 106 Z')}${cpPath('frame', 'M54 68 L70 68 L88 106 Z')}${cpRect('seat', 48, 60, 18, 6, 3)}${cpPath('handle', 'M70 68 L78 56 L90 56 Z')}${cpCircle('pedal', 62, 106, 6)}`,
    ''
  ),
  train: () => cpFrame(
    `${cpRect('chimney', 30, 38, 14, 30, 4)}${cpRect('cab', 70, 38, 30, 34, 6)}${cpRect('engine', 20, 68, 80, 44, 8)}${cpRect('window', 76, 44, 18, 18, 4)}${cpCircle('wheel', 36, 116, 11)}${cpCircle('wheel', 62, 116, 11)}${cpCircle('wheel', 88, 116, 11)}${cpPoly('cowcatcher', '16,112 20,132 36,112')}`,
    ''
  ),
  plane: () => cpFrame(
    `${cpPath('body', 'M14 76 Q18 66 34 66 L86 66 L106 50 L112 56 L96 76 L112 96 L106 102 L86 86 L34 86 Q18 86 14 76 Z')}${cpPoly('wing', '48,66 72,30 82,30 68,66')}${cpPoly('wing', '48,86 72,122 82,122 68,86')}${cpPoly('tail', '24,66 34,44 44,44 38,66')}${cpCircle('window', 94, 74, 5)}`,
    ''
  ),
  boat: () => cpFrame(
    `${cpPoly('hull', '18,96 102,96 88,124 32,124')}${cpPoly('sail', '58,20 58,92 88,92')}${cpPoly('sail', '54,32 54,92 30,92')}${cpRect('mast', 56, 18, 5, 76, 2)}${cpPoly('flag', '60,20 84,26 60,32')}${cpPath('wave', 'M12 128 Q32 120 52 128 Q72 136 92 128 Q106 122 112 128 L112 140 L12 140 Z')}`,
    ''
  ),
  truck: () => cpFrame(
    `${cpRect('cargo', 66, 56, 38, 56, 6)}${cpPath('cab', 'M20 72 L66 72 L66 112 L20 112 Z')}${cpRect('window', 28, 78, 28, 20, 4)}${cpCircle('wheel', 36, 114, 11)}${cpCircle('wheel', 86, 114, 11)}${cpRect('bumper', 14, 104, 8, 14, 3)}`,
    ''
  ),
  taxi: () => cpFrame(
    `${cpPath('body', 'M18 92 Q20 72 40 70 L52 52 Q56 46 68 46 L84 46 Q94 46 100 58 L106 74 Q114 78 114 96 L114 112 L18 112 Z')}${cpRect('sign', 50, 34, 20, 10, 3)}${cpPoly('window', '48,72 56,54 68,52 68,72')}${cpPoly('window', '72,52 84,52 96,72 72,72')}${cpRect('stripe', 22, 88, 76, 8, 3)}${cpCircle('wheel', 36, 112, 12)}${cpCircle('wheel', 90, 112, 12)}`,
    ''
  ),
  van: () => cpFrame(
    `${cpPath('roof', 'M24 52 L34 34 L86 34 L96 52 Z')}${cpRect('body', 16, 52, 88, 60, 10)}${cpRect('window', 28, 58, 32, 26, 4)}${cpRect('window', 68, 58, 26, 26, 4)}${cpCircle('wheel', 36, 114, 11)}${cpCircle('wheel', 86, 114, 11)}`,
    `${inkPath('M62 58 L62 112')}`
  ),
  rocket: () => cpFrame(
    `${cpPath('flame', 'M48 112 Q60 140 72 112 Q66 124 60 124 Q54 124 48 112 Z')}${cpPoly('fin', '38,84 18,118 38,110')}${cpPoly('fin', '82,84 102,118 82,110')}${cpPath('body', 'M60 16 Q82 40 82 92 L82 112 L38 112 L38 92 Q38 40 60 16 Z')}${cpCircle('window', 60, 62, 12)}${cpPoly('nose', '60,16 68,34 52,34')}`,
    ''
  ),
  scooter: () => cpFrame(
    `${cpCircle('wheel', 30, 130, 11)}${cpCircle('wheel', 88, 130, 11)}${cpPath('deck', 'M22 116 L84 116 L92 128 L22 128 Z')}${cpRect('pole', 82, 52, 7, 64, 3)}${cpRect('handle', 72, 44, 30, 7, 3)}`,
    `${inkPath('M30 130 L30 138 M88 130 L88 138')}`
  ),
  tractor: () => cpFrame(
    `${cpCircle('wheel', 34, 110, 17)}${cpCircle('wheel', 88, 110, 22)}${cpRect('hood', 20, 78, 18, 26, 5)}${cpRect('body', 30, 70, 56, 38, 8)}${cpRect('cab', 54, 36, 30, 38, 6)}${cpRect('window', 58, 42, 22, 24, 4)}${cpCircle('hub', 34, 110, 7)}${cpCircle('hub', 88, 110, 9)}`,
    ''
  ),
  ambulance: () => cpFrame(
    `${cpCircle('light', 96, 36, 5)}${cpPath('cab', 'M74 58 L88 42 L104 42 L104 58 Z')}${cpRect('body', 16, 58, 88, 54, 8)}${cpRect('window', 80, 46, 20, 10, 3)}${cpRect('cross v', 54, 68, 12, 30, 2)}${cpRect('cross h', 45, 77, 30, 12, 2)}${cpCircle('wheel', 36, 114, 11)}${cpCircle('wheel', 88, 114, 11)}`,
    ''
  ),
  firetruck: () => cpFrame(
    `${cpCircle('light', 98, 40, 5)}${cpPath('cab', 'M76 64 L88 46 L106 46 L106 64 Z')}${cpRect('body', 14, 64, 92, 48, 8)}${cpRect('window', 82, 50, 20, 12, 3)}${cpRect('ladder', 24, 48, 48, 8, 3)}${cpRect('stripe', 22, 96, 76, 8, 3)}${cpCircle('wheel', 36, 114, 11)}${cpCircle('wheel', 90, 114, 11)}`,
    `${inkPath('M32 48 L32 56 M44 48 L44 56 M56 48 L56 56 M68 48 L68 56')}`
  ),
  helicopter: () => cpFrame(
    `${cpRect('tail', 90, 76, 22, 10, 4)}${cpPoly('fin', '108,76 116,54 116,80')}${cpRect('rotor', 18, 48, 84, 7, 3)}${cpRect('mast', 56, 54, 6, 12, 2)}${cpRect('skid', 34, 122, 52, 7, 3)}${cpRect('skid', 42, 112, 7, 14, 3)}${cpRect('skid', 72, 112, 7, 14, 3)}${cpEllipse('body', 58, 84, 36, 28)}${cpCircle('window', 50, 80, 12)}`,
    ''
  ),
  submarine: () => cpFrame(
    `${cpPoly('fin', '18,84 8,66 26,74')}${cpPoly('propeller', '104,78 116,68 114,100')}${cpEllipse('body', 60, 84, 44, 26)}${cpRect('tower', 48, 50, 24, 20, 6)}${cpRect('periscope', 64, 34, 6, 20, 2)}${cpCircle('window', 42, 82, 8)}${cpCircle('window', 64, 82, 8)}${cpCircle('window', 86, 82, 8)}`,
    `${inkPath('M18 128 Q34 122 50 128 Q66 134 82 128 Q98 122 110 128')}`
  ),
  wolf: () => cpFrame(
    `${cpPoly('ear', '30,58 34,24 54,46')}${cpPoly('ear', '90,58 86,24 66,46')}${cpCircle('head', 60, 66, 33)}${cpEllipse('body', 60, 116, 28, 24)}${cpPath('tail', 'M84 116 Q108 112 102 86 Q99 76 90 82 Z')}`,
    `${inkCircle(48, 62, 3)}${inkCircle(72, 62, 3)}${inkPath('M54 76 Q60 82 66 76')}`
  ),
  deer: () => cpFrame(
    `${cpPath('antler', 'M44 46 L34 20 M34 20 L26 14 M34 20 L40 12')}${cpPath('antler', 'M76 46 L86 20 M86 20 L94 14 M86 20 L80 12')}${cpEllipse('ear', 32, 56, 12, 6)}${cpEllipse('ear', 88, 56, 12, 6)}${cpEllipse('head', 60, 64, 26, 30)}${cpEllipse('body', 60, 108, 30, 26)}${cpRect('leg', 42, 120, 8, 22, 3)}${cpRect('leg', 70, 120, 8, 22, 3)}`,
    `${inkCircle(51, 60, 3)}${inkCircle(69, 60, 3)}${inkCircle(60, 78, 4)}`
  ),
  fox: () => cpFrame(
    `${cpPoly('ear', '28,58 32,22 54,46')}${cpPoly('ear', '92,58 88,22 66,46')}${cpCircle('head', 60, 66, 32)}${cpPoly('muzzle', '60,74 38,88 60,96 82,88')}${cpEllipse('body', 60, 116, 26, 22)}${cpPath('tail', 'M82 116 Q116 112 108 78 Q102 66 92 76 Z')}`,
    `${inkCircle(49, 62, 3)}${inkCircle(71, 62, 3)}${inkCircle(60, 92, 4)}`
  ),
  owl: () => cpFrame(
    `${cpPoly('tuft', '36,48 32,26 50,42')}${cpPoly('tuft', '84,48 88,26 70,42')}${cpEllipse('body', 60, 84, 36, 44)}${cpEllipse('wing', 30, 92, 10, 26)}${cpEllipse('wing', 90, 92, 10, 26)}${cpCircle('eyeDisk', 48, 70, 14)}${cpCircle('eyeDisk', 72, 70, 14)}${cpPoly('beak', '60,78 54,90 66,90')}`,
    `${inkCircle(48, 70, 4)}${inkCircle(72, 70, 4)}`
  ),
  seal: () => cpFrame(
    `${cpEllipse('body', 58, 86, 36, 42)}${cpCircle('head', 58, 48, 22)}${cpPath('flipper', 'M30 88 Q10 100 24 112 Q34 108 38 96 Z')}${cpPath('flipper', 'M86 88 Q106 100 92 112 Q82 108 78 96 Z')}${cpPoly('tail', '58,124 40,140 58,134 76,140')}`,
    `${inkCircle(50, 46, 3)}${inkCircle(66, 46, 3)}${inkPath('M54 56 Q58 60 62 56')}`
  ),
  whale: () => cpFrame(
    `${cpPoly('tail', '16,78 4,60 26,68 30,86')}${cpEllipse('body', 62, 84, 46, 30)}${cpPoly('fin', '56,108 40,132 74,112')}${cpPath('spout', 'M60 54 Q52 34 60 24 Q68 34 60 54 Z')}`,
    `${inkCircle(80, 78, 3)}${inkPath('M84 92 Q92 96 98 90')}`
  ),
  crab: () => cpFrame(
    `${cpEllipse('shell', 60, 86, 38, 26)}${cpCircle('claw', 22, 70, 13)}${cpCircle('claw', 98, 70, 13)}${cpPath('leg', 'M34 100 L18 120 M46 106 L38 132 M74 106 L82 132 M86 100 L102 120')}${cpCircle('eyeStalk', 50, 58, 4)}${cpCircle('eyeStalk', 70, 58, 4)}`,
    `${inkCircle(50, 54, 3)}${inkCircle(70, 54, 3)}${inkPath('M52 92 Q60 98 68 92')}`
  ),
  turtle: () => cpFrame(
    `${cpEllipse('shell', 60, 86, 38, 30)}${cpCircle('head', 60, 44, 18)}${cpEllipse('flipper', 26, 104, 12, 8)}${cpEllipse('flipper', 94, 104, 12, 8)}${cpEllipse('flipper', 34, 66, 10, 7)}${cpEllipse('flipper', 86, 66, 10, 7)}${cpPoly('tail', '24,86 10,92 24,98')}`,
    `${inkCircle(53, 42, 3)}${inkCircle(67, 42, 3)}${inkPath('M46 84 L74 84 M52 72 L68 100 M68 72 L52 100')}`
  ),
  peach: () => cpFrame(
    `${cpPath('fruit', 'M60 42 C90 42 100 70 88 102 C78 128 42 128 32 102 C20 70 30 42 60 42 Z')}${cpPath('leaf', 'M62 42 Q82 24 96 36 Q82 50 62 42 Z')}`,
    `${inkPath('M60 44 L60 30')}`
  ),
  pear: () => cpFrame(
    `${cpPath('fruit', 'M60 38 C74 38 78 56 72 70 C66 84 92 96 84 116 C76 136 44 136 36 116 C28 96 54 84 48 70 C42 56 46 38 60 38 Z')}${cpPath('leaf', 'M62 38 Q78 22 92 34 Q78 46 62 38 Z')}`,
    `${inkPath('M60 38 L60 26')}`
  ),
  carrot: () => cpFrame(
    `${cpPoly('root', '38,60 82,60 60,138')}${cpPath('leaf', 'M60 60 Q42 44 40 24 Q56 34 60 60')}${cpPath('leaf', 'M60 60 Q60 38 72 20 Q76 42 60 60')}${cpPath('leaf', 'M60 60 Q78 48 92 34 Q84 56 60 60')}`,
    `${inkPath('M48 78 L54 82 M70 82 L76 78 M52 100 L58 104 M68 104 L74 100')}`
  ),
  corn: () => cpFrame(
    `${cpEllipse('cob', 60, 76, 18, 42)}${cpPath('husk', 'M42 76 Q22 100 30 134 Q46 118 48 90')}${cpPath('husk', 'M78 76 Q98 100 90 134 Q74 118 72 90')}`,
    `${inkPath('M48 56 L72 56 M46 68 L74 68 M46 80 L74 80 M48 92 L72 92 M52 104 L68 104')}`
  ),
  potato: () => cpFrame(
    `${cpEllipse('potato', 60, 86, 42, 32)}${cpCircle('spot', 42, 76, 4)}${cpCircle('spot', 80, 94, 5)}${cpCircle('spot', 62, 66, 3)}`,
    `${inkPath('M40 104 Q60 114 82 102')}`
  ),
  donut: () => cpFrame(
    `${cpCircle('icing', 60, 82, 42)}${cpCircle('hole', 60, 82, 15)}${cpCircle('sprinkle', 42, 62, 3)}${cpCircle('sprinkle', 80, 64, 3)}${cpCircle('sprinkle', 44, 100, 3)}${cpCircle('sprinkle', 78, 102, 3)}`,
    ''
  ),
  popcorn: () => cpFrame(
    `${cpCircle('pop', 40, 56, 12)}${cpCircle('pop', 62, 44, 12)}${cpCircle('pop', 84, 58, 12)}${cpCircle('pop', 52, 70, 12)}${cpCircle('pop', 74, 72, 12)}${cpPoly('bowl', '26,78 94,78 82,132 38,132')}${cpRect('stripe', 34, 96, 52, 8, 4)}`,
    ''
  ),
  candy: () => cpFrame(
    `${cpPoly('wrapper', '20,68 40,58 40,106 20,96')}${cpPoly('wrapper', '100,68 80,58 80,106 100,96')}${cpEllipse('center', 60, 82, 24, 28)}`,
    `${inkPath('M50 72 L70 92 M70 72 L50 92')}`
  ),
  planet: () => cpFrame(
    `${cpCircle('world', 60, 76, 34)}${cpEllipse('ring', 60, 76, 52, 14)}${cpCircle('spot', 46, 64, 7)}${cpCircle('spot', 74, 88, 6)}`,
    `${inkPath('M20 84 Q60 100 100 68')}`
  ),
  comet: () => cpFrame(
    `${cpPoly('tail', '88,46 112,26 104,64 96,58')}${cpPoly('tail', '84,84 116,96 90,104 80,96')}${cpCircle('head', 46, 74, 26)}${cpCircle('glow', 42, 68, 10)}`,
    ''
  ),
  volcano: () => cpFrame(
    `${cpPoly('mountain', '10,132 48,58 72,58 110,132')}${cpPath('lava', 'M50 62 L58 102 L64 86 L70 62 Z')}${cpCircle('smoke', 52, 40, 12)}${cpCircle('smoke', 70, 30, 14)}${cpCircle('smoke', 86, 42, 10)}`,
    `${inkPath('M30 132 Q46 118 60 132 Q78 146 96 130')}`
  ),
  island: () => cpFrame(
    `${cpEllipse('water', 60, 122, 56, 18)}${cpEllipse('sand', 60, 106, 42, 14)}${cpRect('trunk', 56, 66, 8, 36, 3)}${cpCircle('leaves', 60, 58, 22)}`,
    `${inkPath('M20 124 Q34 118 48 124 M72 124 Q86 118 100 124')}`
  ),
  cactus: () => cpFrame(
    `${cpRect('stem', 48, 52, 24, 78, 12)}${cpPath('arm', 'M48 86 Q28 86 30 68 L30 60')}${cpPath('arm', 'M72 76 Q92 76 90 58 L90 50')}${cpRect('pot', 38, 124, 44, 20, 5)}`,
    `${inkPath('M54 70 L60 66 M66 86 L72 82 M54 102 L60 98 M66 116 L72 112')}`
  ),
  mushroom: () => cpFrame(
    `${cpPath('cap', 'M20 78 Q20 28 60 28 Q100 28 100 78 Z')}${cpRect('stem', 48, 76, 24, 52, 10)}${cpCircle('spot', 40, 54, 8)}${cpCircle('spot', 76, 50, 9)}${cpCircle('spot', 60, 70, 7)}`,
    ''
  ),
  shell: () => cpFrame(
    `${cpPath('shell', 'M60 128 Q12 96 28 56 Q44 26 60 30 Q76 26 92 56 Q108 96 60 128 Z')}${cpPoly('base', '46,124 74,124 68,138 52,138')}`,
    `${inkPath('M60 34 L60 126 M44 38 L36 112 M76 38 L84 112 M30 58 L26 92 M90 58 L94 92')}`
  ),
  feather: () => cpFrame(
    `${cpPath('vane', 'M34 126 Q22 66 60 22 Q98 66 86 126 Z')}${cpPath('split', 'M60 22 Q60 80 60 132')}${cpCircle('tip', 60, 22, 6)}`,
    `${inkPath('M42 54 L60 66 M78 54 L60 66 M40 76 L60 88 M80 76 L60 88 M44 100 L60 110 M76 100 L60 110')}`
  ),
  kite: () => cpFrame(
    `${cpPoly('kite', '60,18 98,66 60,114 22,66')}${cpPoly('patch', '60,18 98,66 60,66')}${cpPoly('patch', '22,66 60,66 60,114')}${cpPath('tail', 'M60 114 Q48 126 60 136 Q72 146 60 150')}${cpPoly('bow', '48,126 36,118 38,134')}${cpPoly('bow', '72,140 84,132 82,148')}`,
    `${inkPath('M22 66 L98 66 M60 18 L60 114')}`
  ),
  drum: () => cpFrame(
    `${cpEllipse('top', 60, 64, 42, 14)}${cpRect('body', 18, 64, 84, 54, 6)}${cpEllipse('bottom', 60, 118, 42, 12)}${cpRect('band', 18, 78, 84, 8, 3)}${cpRect('band', 18, 100, 84, 8, 3)}`,
    `${inkPath('M34 40 L48 60 M86 40 L72 60')}`
  ),
  guitar: () => cpFrame(
    `${cpCircle('body', 48, 108, 28)}${cpCircle('body', 76, 92, 24)}${cpRect('neck', 66, 24, 12, 66, 3)}${cpRect('head', 62, 12, 20, 16, 4)}${cpCircle('hole', 62, 98, 9)}`,
    `${inkPath('M70 24 L70 88 M74 24 L74 88 M68 20 L68 8 M78 20 L78 8')}`
  ),
  crown: () => cpFrame(
    `${cpPoly('crown', '16,108 24,44 46,72 60,28 74,72 96,44 104,108')}${cpRect('band', 16, 104, 88, 20, 6)}${cpCircle('gem', 60, 112, 7)}${cpCircle('gem', 34, 112, 5)}${cpCircle('gem', 86, 112, 5)}`,
    ''
  ),
  gift: () => cpFrame(
    `${cpRect('box', 20, 68, 80, 62, 6)}${cpRect('ribbonV', 52, 68, 16, 62, 3)}${cpRect('ribbonH', 20, 92, 80, 14, 3)}${cpCircle('bow', 48, 58, 12)}${cpCircle('bow', 72, 58, 12)}`,
    ''
  ),
  candle: () => cpFrame(
    `${cpRect('wax', 40, 62, 40, 66, 8)}${cpPath('flame', 'M60 20 Q78 42 60 58 Q42 42 60 20 Z')}${cpEllipse('holder', 34, 126, 52, 10)}`,
    `${inkPath('M60 24 Q66 40 60 52')}`
  ),
  camera: () => cpFrame(
    `${cpRect('body', 16, 54, 88, 66, 10)}${cpRect('top', 38, 40, 32, 16, 5)}${cpCircle('lens', 60, 86, 24)}${cpCircle('lensInner', 60, 86, 13)}${cpCircle('button', 88, 48, 6)}`,
    ''
  ),
  robot: () => cpFrame(
    `${cpRect('antenna', 58, 18, 4, 18, 2)}${cpCircle('antennaTip', 60, 14, 6)}${cpRect('head', 32, 34, 56, 42, 10)}${cpRect('body', 26, 84, 68, 46, 10)}${cpRect('arm', 10, 88, 12, 36, 5)}${cpRect('arm', 98, 88, 12, 36, 5)}${cpRect('mouth', 44, 62, 32, 8, 3)}`,
    `${inkCircle(48, 50, 4)}${inkCircle(72, 50, 4)}`
  ),
  jeep: () => cpFrame(
    `${cpRect('body', 12, 70, 96, 44, 8)}${cpRect('hood', 76, 58, 32, 16, 5)}${cpRect('window', 34, 54, 36, 18, 4)}${cpRect('grill', 88, 80, 18, 18, 3)}${cpCircle('wheel', 34, 116, 12)}${cpCircle('wheel', 86, 116, 12)}`,
    `${inkPath('M34 54 L34 72 M70 54 L70 72')}`
  ),
  tram: () => cpFrame(
    `${cpRect('body', 14, 52, 92, 68, 10)}${cpRect('window', 24, 64, 22, 22, 4)}${cpRect('window', 52, 64, 22, 22, 4)}${cpRect('window', 80, 64, 18, 22, 4)}${cpCircle('wheel', 34, 122, 9)}${cpCircle('wheel', 86, 122, 9)}${cpPath('pole', 'M60 52 L60 14 L86 14')}`,
    ''
  ),
  ship: () => cpFrame(
    `${cpPoly('hull', '12,96 108,96 92,132 28,132')}${cpRect('cabin', 36, 66, 44, 30, 6)}${cpRect('window', 46, 74, 12, 10, 3)}${cpRect('window', 66, 74, 12, 10, 3)}${cpRect('mast', 58, 16, 5, 50, 2)}${cpPoly('flag', '63,18 88,26 63,34')}`,
    `${inkPath('M20 108 Q60 118 100 108')}`
  ),
  balloon: () => cpFrame(
    `${cpEllipse('balloon', 60, 64, 38, 46)}${cpPoly('stripe', '60,18 74,24 66,106 54,106 46,24')}${cpRect('basket', 48, 116, 24, 20, 4)}`,
    `${inkPath('M48 104 L52 116 M72 104 L68 116')}`
  ),
  sled: () => cpFrame(
    `${cpRect('seat', 24, 70, 72, 18, 6)}${cpRect('back', 84, 42, 10, 48, 4)}${cpPath('runner', 'M18 92 Q12 128 36 132 L96 132 Q106 130 102 120')}${cpPath('runner', 'M30 92 Q26 122 46 126 L92 126')}`,
    ''
  ),
  skateboard: () => cpFrame(
    `${cpPath('deck', 'M14 88 Q14 74 32 74 L88 74 Q106 74 106 88 Q106 102 88 102 L32 102 Q14 102 14 88 Z')}${cpCircle('wheel', 34, 114, 9)}${cpCircle('wheel', 86, 114, 9)}${cpRect('truck', 30, 100, 10, 12, 3)}${cpRect('truck', 80, 100, 10, 12, 3)}`,
    `${inkPath('M30 88 L90 88')}`
  ),
  canoe: () => cpFrame(
    `${cpPath('hull', 'M12 94 Q60 62 108 94 Q96 130 60 132 Q24 130 12 94 Z')}${cpEllipse('seat', 60, 96, 26, 6)}${cpRect('paddle', 78, 34, 6, 96, 3)}${cpPoly('blade', '74,30 88,30 84,58 78,58')}`,
    `${inkPath('M22 100 Q60 116 98 100')}`
  ),
  subway: () => cpFrame(
    `${cpRect('body', 10, 54, 100, 66, 14)}${cpRect('window', 22, 68, 22, 20, 4)}${cpRect('window', 50, 68, 22, 20, 4)}${cpRect('window', 78, 68, 20, 20, 4)}${cpRect('stripe', 10, 100, 100, 10, 4)}${cpCircle('wheel', 32, 124, 9)}${cpCircle('wheel', 88, 124, 9)}${cpCircle('light', 20, 112, 5)}${cpCircle('light', 100, 112, 5)}`,
    ''
  )
};

if (typeof window !== 'undefined') {
  window.COLORING_PAGES = COLORING_PAGES;
  window.COLORING_ART = COLORING_ART;
}

