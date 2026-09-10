import type { Locale } from "../i18n/index.js";

export interface BenchmarkQuestion {
	q: string;
	options: string[];
	correct: number;
}

export interface BenchmarkPassage {
	id: string;
	title: string;
	text: string;
	wordCount: number;
	questions: BenchmarkQuestion[];
}

export const BENCHMARK_PASSAGES: BenchmarkPassage[] = [
	{
		id: "deep-ocean",
		title: "The Deep Ocean",
		wordCount: 311,
		text: `The deep ocean covers more than sixty percent of Earth's surface, yet until the twentieth century humans knew almost nothing about it. For most of history the sea floor was a mystery: too dark, too cold, and too deep to explore. That changed when technology allowed scientists to descend beyond the reach of sunlight.

The first systematic surveys of the deep sea began in the 1870s, when the British research vessel HMS Challenger spent four years crossing the world's oceans. The crew dropped weighted lines to measure depths and dragged nets along the bottom to collect specimens. They found that the ocean floor was not flat and featureless as many had assumed, but marked by vast mountain ranges, wide plains, and very deep trenches.

Modern ocean science uses very different tools. Sonar maps the sea floor by emitting sound pulses and measuring how long they take to return. Remotely operated vehicles, or ROVs, carry cameras and robotic arms to depths of several kilometres. These machines have revealed entire ecosystems clustered around hydrothermal vents — cracks in the ocean floor where superheated water rich in minerals escapes from within the Earth. Communities of tube worms, shrimp, and crabs thrive there without any sunlight at all, drawing energy from chemicals rather than from the sun.

The deepest point in the ocean is the Challenger Deep, located in the western Pacific at the southern end of the Mariana Trench. It reaches approximately eleven kilometres below the surface, making it deeper than Mount Everest is tall. Only a handful of crewed submersibles have ever reached the bottom. The pressure there is more than a thousand times the pressure at sea level.

Scientists think the deep ocean may hold clues about the origins of life on Earth and possibly about conditions on other worlds where liquid water exists beneath frozen surfaces.`,
		questions: [
			{
				q: "What fraction of Earth's surface is covered by the deep ocean?",
				options: ["About 30%", "About 40%", "More than 60%", "About 80%"],
				correct: 2,
			},
			{
				q: "What was the name of the British research vessel that conducted the first systematic deep-sea surveys in the 1870s?",
				options: [
					"HMS Discovery",
					"HMS Challenger",
					"HMS Endeavour",
					"HMS Beagle",
				],
				correct: 1,
			},
			{
				q: "What did early scientists discover about the ocean floor?",
				options: [
					"It was completely flat and featureless",
					"It was covered entirely in sand",
					"It had mountain ranges, plains, and deep trenches",
					"It was too deep to measure",
				],
				correct: 2,
			},
			{
				q: "How does sonar map the sea floor?",
				options: [
					"By taking photographs from satellites",
					"By sending down divers with cameras",
					"By emitting sound pulses and measuring return time",
					"By dragging weighted nets along the bottom",
				],
				correct: 2,
			},
			{
				q: "What are hydrothermal vents?",
				options: [
					"Underwater volcanoes that erupt lava",
					"Cracks where superheated mineral-rich water escapes from within the Earth",
					"Tunnels dug by deep-sea creatures",
					"Cold water springs on the ocean floor",
				],
				correct: 1,
			},
			{
				q: "How do creatures living near hydrothermal vents obtain energy?",
				options: [
					"From sunlight filtered through deep water",
					"From chemicals, not sunlight",
					"By feeding on fish that sink from above",
					"From heat radiation alone",
				],
				correct: 1,
			},
			{
				q: "Where is the Challenger Deep located?",
				options: [
					"In the Atlantic Ocean near the Azores",
					"In the Indian Ocean south of Sri Lanka",
					"In the western Pacific at the southern end of the Mariana Trench",
					"In the Arctic Ocean near Greenland",
				],
				correct: 2,
			},
			{
				q: "How deep is the Challenger Deep approximately?",
				options: [
					"About 5 kilometres",
					"About 8 kilometres",
					"About 11 kilometres",
					"About 15 kilometres",
				],
				correct: 2,
			},
			{
				q: "How does the pressure at the Challenger Deep compare to sea-level pressure?",
				options: [
					"About 10 times greater",
					"About 100 times greater",
					"More than 1,000 times greater",
					"About 500 times greater",
				],
				correct: 2,
			},
			{
				q: "What do scientists think the deep ocean might provide clues about?",
				options: [
					"The age of the universe",
					"The origins of life on Earth and conditions on other worlds with liquid water",
					"The causes of earthquakes and volcanic eruptions only",
					"The composition of Earth's atmosphere millions of years ago",
				],
				correct: 1,
			},
		],
	},
	{
		id: "sleep-science",
		title: "The Science of Sleep",
		wordCount: 308,
		text: `Sleep occupies roughly a third of a human life, yet for centuries it was thought to be little more than a passive state of rest. Modern neuroscience has overturned that view. Sleep is now understood as a period of intense biological activity, essential for memory, immune function, emotional regulation, and the clearance of metabolic waste from the brain.

During sleep, the brain cycles through several distinct stages. The earliest stages show slow, synchronised electrical activity as the body relaxes and temperature drops. After about ninety minutes, the brain enters REM, or rapid eye movement sleep, when brain activity resembles wakefulness. Most vivid dreaming happens in REM. A typical night has four to six of these cycles, with REM periods growing longer toward morning.

A major discovery of recent decades is a system called the glymphatic network. During sleep, channels around the brain's blood vessels widen, allowing cerebrospinal fluid to flush through brain tissue and clear away proteins that build up during waking hours. One of these proteins is amyloid-beta, which is linked to Alzheimer's disease when it accumulates. Poor sleep over many years may increase the risk of neurodegenerative conditions.

Memory consolidation also happens in sleep. While people are awake, the hippocampus records new experiences in a fast but temporary form. During deep sleep, those memories are replayed and transferred to the cortex for long-term storage. Students who sleep well after studying remember more than those who stay awake.

Sleep needs vary with age. Newborns require up to seventeen hours, adolescents around nine, and most adults between seven and nine hours per night. Chronic sleep restriction, even by just one or two hours a night, accumulates into what researchers call a sleep debt that impairs cognition and mood significantly.`,
		questions: [
			{
				q: "How did scientists historically view sleep?",
				options: [
					"As a period of intense brain activity",
					"As a passive state of rest",
					"As essential for memory only",
					"As a state similar to being awake",
				],
				correct: 1,
			},
			{
				q: "What is REM sleep?",
				options: [
					"The earliest stage with slow brain activity",
					"A phase where the body temperature rises rapidly",
					"A phase of brain activity resembling wakefulness where most vivid dreaming occurs",
					"A stage unique to children",
				],
				correct: 2,
			},
			{
				q: "How long does a typical sleep cycle last before the first REM phase?",
				options: [
					"About 30 minutes",
					"About 60 minutes",
					"About 90 minutes",
					"About 120 minutes",
				],
				correct: 2,
			},
			{
				q: "What is the glymphatic network?",
				options: [
					"A system of neurons responsible for dreaming",
					"Channels around brain blood vessels that flush away metabolic waste during sleep",
					"The part of the brain that controls REM cycles",
					"A hormone system that regulates sleep timing",
				],
				correct: 1,
			},
			{
				q: "Which protein is associated with Alzheimer's disease when it builds up?",
				options: ["Serotonin", "Dopamine", "Amyloid-beta", "Cortisol"],
				correct: 2,
			},
			{
				q: "Where does the brain initially store new experiences during wakefulness?",
				options: [
					"The cortex",
					"The cerebellum",
					"The hippocampus",
					"The amygdala",
				],
				correct: 2,
			},
			{
				q: "What happens to memories during deep sleep?",
				options: [
					"They are erased to free up space",
					"They are replayed and transferred from the hippocampus to the cortex",
					"They are locked in the hippocampus permanently",
					"They are converted to dreams",
				],
				correct: 1,
			},
			{
				q: "How many sleep cycles does a typical night contain?",
				options: ["One to two", "Two to three", "Four to six", "Eight to ten"],
				correct: 2,
			},
			{
				q: "How many hours of sleep do most adults need per night?",
				options: ["5–6 hours", "6–7 hours", "7–9 hours", "10–12 hours"],
				correct: 2,
			},
			{
				q: "What did research show about students who sleep well after studying?",
				options: [
					"They perform worse on tests due to reduced alertness",
					"They remember more than those who stay awake",
					"They experience more vivid dreams about the material",
					"Sleep has no significant effect on memory retention",
				],
				correct: 1,
			},
		],
	},
	{
		id: "urban-forests",
		title: "Urban Forests",
		wordCount: 302,
		text: `Cities are often seen as hostile to nature: expanses of concrete, glass, and steel with little room for living things. Research shows that trees in urban settings provide such clear benefits that many planners now treat them as essential infrastructure, on a par with roads and water pipes.

The most immediate effect of urban trees is thermal. A single mature tree can transpire hundreds of litres of water per day, cooling the surrounding air through evaporation in much the same way that sweating cools the human body. In dense cities, where asphalt and dark rooftops absorb and re-radiate heat, this effect can reduce local temperatures by several degrees. As global temperatures rise, planners in many cities now treat tree canopy coverage as a formal target, measuring it alongside indicators like air quality and flood risk.

Trees also intercept rainfall. Their leaves and branches slow the descent of water, giving soil time to absorb it rather than allowing it to run off directly into drains. A mature oak can intercept tens of thousands of litres of rainfall per year, reducing the burden on sewer systems during heavy storms — a problem that becomes more acute as precipitation events grow more intense with climate change.

The psychological effects are less obvious but have been studied. Work using satellite imagery and self-reported wellbeing data has found consistent links between street tree density and lower rates of depression, anxiety, and stress. Proximity to greenery appears to restore attention and reduce physiological markers of tension, even in brief exposures.

Despite these benefits, urban trees are expensive to plant and maintain, and many cities in lower-income regions lack the budgets to establish meaningful canopy cover. Researchers argue that closing this gap is both an environmental and a public health equity issue.`,
		questions: [
			{
				q: "How do urban trees help cool cities?",
				options: [
					"By blocking sunlight with their canopies alone",
					"By transpiring water which cools the surrounding air through evaporation",
					"By absorbing heat into their trunks",
					"By creating wind tunnels between buildings",
				],
				correct: 1,
			},
			{
				q: "What happens to heat in dense cities with lots of asphalt?",
				options: [
					"It is reflected back into space",
					"It is absorbed by the ground and dissipates overnight",
					"It is absorbed and re-radiated by asphalt and dark rooftops",
					"It has no effect on local temperature",
				],
				correct: 2,
			},
			{
				q: "How do urban trees help manage rainfall?",
				options: [
					"They pump water underground into aquifers",
					"Their leaves and branches slow water's descent, giving soil time to absorb it",
					"They channel rainwater directly into rivers",
					"They have no significant effect on water management",
				],
				correct: 1,
			},
			{
				q: "Approximately how much rainfall can a mature oak intercept per year?",
				options: [
					"Hundreds of litres",
					"Thousands of litres",
					"Tens of thousands of litres",
					"Hundreds of thousands of litres",
				],
				correct: 2,
			},
			{
				q: "What psychological benefits have been linked to street trees?",
				options: [
					"Improved mathematical performance",
					"Lower rates of depression, anxiety, and stress",
					"Better sleep quality only",
					"Increased social aggression",
				],
				correct: 1,
			},
			{
				q: "What data did researchers use to study trees and wellbeing?",
				options: [
					"Hospital records and pollution sensors",
					"Satellite imagery and self-reported wellbeing data",
					"Soil samples and air quality monitors",
					"Traffic data and crime statistics",
				],
				correct: 1,
			},
			{
				q: "How are urban trees now being regarded by city planners?",
				options: [
					"As decorative features with limited practical value",
					"As essential infrastructure on a par with roads and water pipes",
					"As an obstacle to urban development",
					"As a luxury only wealthy cities can afford",
				],
				correct: 1,
			},
			{
				q: "What makes rainfall events worse with climate change, according to the passage?",
				options: [
					"Cities get more snow instead of rain",
					"Drainage systems are being removed",
					"Precipitation events grow more intense",
					"Soil becomes permanently saturated",
				],
				correct: 2,
			},
			{
				q: "What is described as a barrier to urban tree planting in some regions?",
				options: [
					"Lack of suitable tree species",
					"Opposition from residents",
					"Limited budgets in lower-income cities",
					"Soil that cannot support large trees",
				],
				correct: 2,
			},
			{
				q: "What does the passage argue about the gap in urban tree coverage?",
				options: [
					"It is mainly an aesthetic problem",
					"It is not worth addressing given the cost",
					"It is an issue of public health equity, not just environment",
					"It only matters in tropical climates",
				],
				correct: 2,
			},
		],
	},
	{
		id: "invention-writing",
		title: "The Invention of Writing",
		wordCount: 305,
		text: `Writing is so central to modern life that it is easy to forget how recently it was invented. For the vast majority of human history, knowledge was transmitted orally — through story, song, and memory. The earliest writing systems emerged only around five thousand years ago, and their invention appears to have been driven not by a desire to record literature or preserve history, but by the mundane demands of trade and administration.

The oldest known writing comes from ancient Mesopotamia, the region between the Tigris and Euphrates rivers in what is now Iraq. Archaeologists have excavated clay tablets inscribed with small pictograms representing goods and numbers. These early records were essentially receipts — lists of grain deliveries, livestock counts, and temple revenues. The system that produced them, called cuneiform, evolved over several centuries from simple pictures into abstract wedge-shaped marks pressed into wet clay with a reed stylus.

A similar story unfolded in ancient Egypt, where hieroglyphics developed as an independent writing system around the same period. Egyptian writing combined pictorial symbols representing objects with phonetic signs representing sounds, allowing scribes to transcribe names and spoken language more precisely. A third independent writing system emerged in China, and possibly a fourth in Mesoamerica, suggesting that the invention of writing, while rare, is something that human societies under sufficient organisational pressure tend to discover.

The spread of writing transformed societies. It allowed laws to be codified and applied consistently, contracts to be enforced across time and distance, and knowledge to accumulate beyond what any single memory could hold. Literate civilisations could coordinate larger populations, sustain more complex institutions, and preserve what they learned across generations.

Yet writing also created new inequalities. Literacy required training and access to materials, which meant that for most of human history, only a small elite could read and write.`,
		questions: [
			{
				q: "What primarily drove the invention of writing, according to the passage?",
				options: [
					"A desire to record poetry and literature",
					"Religious ceremonies requiring sacred texts",
					"Trade and administrative demands",
					"The wish to preserve historical events",
				],
				correct: 2,
			},
			{
				q: "Where did the oldest known writing originate?",
				options: [
					"Ancient Egypt",
					"Ancient China",
					"Ancient Mesopotamia",
					"Ancient Mesoamerica",
				],
				correct: 2,
			},
			{
				q: "What were the earliest clay tablets mainly used to record?",
				options: [
					"Military strategies and battle plans",
					"Religious texts and prayers",
					"Receipts like grain deliveries and livestock counts",
					"Poetry and folk songs",
				],
				correct: 2,
			},
			{
				q: "What tool was used to press cuneiform marks into clay?",
				options: [
					"A bone stylus",
					"A reed stylus",
					"A metal engraving tool",
					"A wooden stamp",
				],
				correct: 1,
			},
			{
				q: "How did Egyptian hieroglyphics differ from early Mesopotamian cuneiform?",
				options: [
					"Hieroglyphics used only pictorial symbols with no phonetic component",
					"Hieroglyphics combined pictorial symbols with phonetic signs representing sounds",
					"Hieroglyphics were carved in stone only, never written",
					"Hieroglyphics developed much later than cuneiform",
				],
				correct: 1,
			},
			{
				q: "How many fully independent writing systems does the passage mention?",
				options: [
					"Two",
					"Three",
					"At least three, possibly four",
					"Five or more",
				],
				correct: 2,
			},
			{
				q: "What does the emergence of writing in multiple cultures suggest?",
				options: [
					"Writing was invented once and spread through trade",
					"Writing is something societies under sufficient organisational pressure tend to discover",
					"Writing only developed where there was contact between civilisations",
					"Writing was always invented by religious leaders",
				],
				correct: 1,
			},
			{
				q: "Which of the following was a benefit of writing mentioned in the passage?",
				options: [
					"It eliminated the need for oral tradition",
					"It made all people equally literate",
					"It allowed laws to be codified and applied consistently",
					"It reduced the complexity of institutions",
				],
				correct: 2,
			},
			{
				q: "What inequality did writing create?",
				options: [
					"Wealthy traders could write faster than farmers",
					"Only men were allowed to become scribes",
					"Only a small elite had access to literacy",
					"Written laws favoured one region over another",
				],
				correct: 2,
			},
			{
				q: "Approximately how long ago did the earliest writing systems emerge?",
				options: [
					"About 1,000 years ago",
					"About 3,000 years ago",
					"About 5,000 years ago",
					"About 10,000 years ago",
				],
				correct: 2,
			},
		],
	},
	{
		id: "microbiome",
		title: "The Human Microbiome",
		wordCount: 299,
		text: `The human body contains trillions of microorganisms (bacteria, fungi, viruses, and other microscopic life) that collectively form the microbiome. These are not passive hitchhikers; they are deeply integrated into human physiology. Research over the past two decades has shown that the microbiome affects digestion, immune function, and even mental health, and has changed how scientists think about the body.

Most of the body's microorganisms live in the gut, particularly in the large intestine. Here, communities of bacteria ferment dietary fibre that human digestive enzymes cannot break down, producing short-chain fatty acids that nourish the cells lining the intestine. These same bacteria synthesise vitamins, including certain B vitamins and vitamin K, that the body cannot make on its own. Disrupting the gut microbiome — through illness, poor diet, or antibiotic use — has been associated with conditions ranging from inflammatory bowel disease to metabolic disorders.

The link between the gut microbiome and the brain has received a lot of research attention. A pathway called the gut-brain axis connects the intestinal nervous system to the central nervous system via the vagus nerve. Studies in animals and humans have found that changes in gut bacteria can influence mood, anxiety, and behaviour. Germ-free mice, raised without any microbiome, show elevated stress responses and abnormal social behaviour that can be partly reversed by reintroducing specific bacterial strains.

The composition of an individual's microbiome is shaped by diet, geography, early-life exposures, and genetics. Babies born vaginally acquire their initial microbiome from their mother during birth, while those delivered by caesarean section have a different early microbial profile. Breastfeeding further shapes the infant gut, introducing specialised bacteria that help digest milk sugars.

Understanding the microbiome is leading to new medical options, including probiotics, faecal transplants, and personalised diet interventions.`,
		questions: [
			{
				q: "Where do most of the body's microorganisms live?",
				options: [
					"The skin surface",
					"The lungs",
					"The large intestine",
					"The bloodstream",
				],
				correct: 2,
			},
			{
				q: "What do gut bacteria produce by fermenting dietary fibre?",
				options: [
					"Simple sugars and glucose",
					"Short-chain fatty acids that nourish intestinal cells",
					"Proteins used by the immune system",
					"Bile acids needed for fat digestion",
				],
				correct: 1,
			},
			{
				q: "Which vitamins do gut bacteria help synthesise?",
				options: [
					"Vitamins A and C",
					"Vitamins D and E",
					"Certain B vitamins and vitamin K",
					"Vitamins C and D only",
				],
				correct: 2,
			},
			{
				q: "What is the gut-brain axis?",
				options: [
					"A region of the brain that controls digestion",
					"A pathway connecting the intestinal nervous system to the brain via the vagus nerve",
					"A type of gut bacteria that produces neurotransmitters",
					"A surgical procedure linking gut and brain signals",
				],
				correct: 1,
			},
			{
				q: "What behaviour did germ-free mice (without a microbiome) show?",
				options: [
					"They were more social and curious than normal mice",
					"They showed no differences from normal mice",
					"They showed elevated stress responses and abnormal social behaviour",
					"They were healthier and lived longer",
				],
				correct: 2,
			},
			{
				q: "How can the behaviour of germ-free mice be partially reversed?",
				options: [
					"By giving them antibiotic treatments",
					"By reintroducing specific bacterial strains",
					"By feeding them a high-fibre diet",
					"By stimulating the vagus nerve electrically",
				],
				correct: 1,
			},
			{
				q: "How do babies born vaginally acquire their initial microbiome?",
				options: [
					"From the hospital environment after birth",
					"From breast milk only",
					"From their mother during birth",
					"From the air they first breathe",
				],
				correct: 2,
			},
			{
				q: "Which of the following was NOT listed as a factor shaping the microbiome?",
				options: ["Diet", "Geography", "Blood type", "Early-life exposures"],
				correct: 2,
			},
			{
				q: "What is one medical application mentioned that uses microbiome knowledge?",
				options: [
					"Gene therapy targeting gut DNA",
					"Faecal transplants",
					"Surgical removal of harmful bacteria",
					"Hormone replacement therapy",
				],
				correct: 1,
			},
			{
				q: "What happens to the microbiome when antibiotics are used?",
				options: [
					"The microbiome strengthens and diversifies",
					"Antibiotics only affect harmful bacteria, leaving beneficial ones untouched",
					"Disruption of the microbiome is associated with conditions like inflammatory bowel disease",
					"The gut bacteria multiply rapidly to compensate",
				],
				correct: 2,
			},
		],
	},
];

export const BENCHMARK_PASSAGES_PT: BenchmarkPassage[] = [
	{
		id: "deep-ocean",
		title: "O Oceano Profundo",
		wordCount: 318,
		text: `O oceano profundo cobre mais de sessenta por cento da superfície da Terra, mas, até o século XX, os seres humanos quase nada sabiam sobre ele. Durante a maior parte da história, o fundo do mar foi um mistério: escuro, frio e profundo demais para ser explorado. Isso mudou quando a tecnologia permitiu que cientistas descessem além do alcance da luz solar.

Os primeiros levantamentos sistemáticos das profundezas oceânicas começaram na década de 1870, quando o navio de pesquisa britânico HMS Challenger passou quatro anos cruzando os oceanos do mundo. A tripulação lançava linhas com pesos para medir profundidades e arrastava redes pelo fundo para coletar espécimes. Descobriu que o fundo oceânico não era plano e sem acidentes, como muitos supunham, mas marcado por enormes cadeias de montanhas, vastas planícies e fossas muito profundas.

A oceanografia moderna usa ferramentas muito diferentes. O sonar mapeia o fundo do mar emitindo pulsos sonoros e medindo quanto tempo levam para retornar. Veículos operados remotamente, ou ROVs, transportam câmeras e braços robóticos a profundidades de vários quilômetros. Essas máquinas revelaram ecossistemas inteiros agrupados ao redor de fontes hidrotermais — fissuras no fundo oceânico pelas quais água superaquecida e rica em minerais escapa do interior da Terra. Comunidades de vermes tubulares, camarões e caranguejos prosperam ali sem nenhuma luz solar, obtendo energia de substâncias químicas, e não do Sol.

O ponto mais profundo do oceano é o Abismo Challenger, localizado no Pacífico ocidental, na extremidade sul da Fossa das Marianas. Ele chega a aproximadamente onze quilômetros abaixo da superfície, sendo mais profundo do que a altura do Monte Everest. Apenas alguns submersíveis tripulados já alcançaram o fundo. Ali, a pressão é mais de mil vezes superior à pressão ao nível do mar.

Os cientistas acreditam que o oceano profundo talvez contenha pistas sobre as origens da vida na Terra e, possivelmente, sobre as condições em outros mundos onde existe água líquida sob superfícies congeladas.`,
		questions: [
			{
				q: "Que fração da superfície da Terra é coberta pelo oceano profundo?",
				options: [
					"Cerca de 30%",
					"Cerca de 40%",
					"Mais de 60%",
					"Cerca de 80%",
				],
				correct: 2,
			},
			{
				q: "Qual era o nome do navio de pesquisa britânico que realizou os primeiros levantamentos sistemáticos do oceano profundo na década de 1870?",
				options: [
					"HMS Discovery",
					"HMS Challenger",
					"HMS Endeavour",
					"HMS Beagle",
				],
				correct: 1,
			},
			{
				q: "O que os primeiros cientistas descobriram sobre o fundo oceânico?",
				options: [
					"Era completamente plano e sem acidentes",
					"Era inteiramente coberto de areia",
					"Tinha cadeias de montanhas, planícies e fossas profundas",
					"Era profundo demais para ser medido",
				],
				correct: 2,
			},
			{
				q: "Como o sonar mapeia o fundo do mar?",
				options: [
					"Tirando fotografias de satélites",
					"Enviando mergulhadores com câmeras",
					"Emitindo pulsos sonoros e medindo o tempo de retorno",
					"Arrastando redes com pesos pelo fundo",
				],
				correct: 2,
			},
			{
				q: "O que são fontes hidrotermais?",
				options: [
					"Vulcões submarinos que expelem lava",
					"Fissuras pelas quais água superaquecida e rica em minerais escapa do interior da Terra",
					"Túneis escavados por criaturas das profundezas",
					"Nascentes de água fria no fundo oceânico",
				],
				correct: 1,
			},
			{
				q: "Como as criaturas que vivem perto de fontes hidrotermais obtêm energia?",
				options: [
					"Da luz solar filtrada pela água profunda",
					"De substâncias químicas, não da luz solar",
					"Alimentando-se de peixes que afundam",
					"Somente da radiação térmica",
				],
				correct: 1,
			},
			{
				q: "Onde fica o Abismo Challenger?",
				options: [
					"No oceano Atlântico, perto dos Açores",
					"No oceano Índico, ao sul do Sri Lanka",
					"No Pacífico ocidental, na extremidade sul da Fossa das Marianas",
					"No oceano Ártico, perto da Groenlândia",
				],
				correct: 2,
			},
			{
				q: "Qual é a profundidade aproximada do Abismo Challenger?",
				options: [
					"Cerca de 5 quilômetros",
					"Cerca de 8 quilômetros",
					"Cerca de 11 quilômetros",
					"Cerca de 15 quilômetros",
				],
				correct: 2,
			},
			{
				q: "Como a pressão no Abismo Challenger se compara à pressão ao nível do mar?",
				options: [
					"Cerca de 10 vezes maior",
					"Cerca de 100 vezes maior",
					"Mais de 1.000 vezes maior",
					"Cerca de 500 vezes maior",
				],
				correct: 2,
			},
			{
				q: "Sobre o que os cientistas acreditam que o oceano profundo possa fornecer pistas?",
				options: [
					"A idade do universo",
					"As origens da vida na Terra e as condições em outros mundos com água líquida",
					"Somente as causas de terremotos e erupções vulcânicas",
					"A composição da atmosfera terrestre milhões de anos atrás",
				],
				correct: 1,
			},
		],
	},
	{
		id: "sleep-science",
		title: "A Ciência do Sono",
		wordCount: 338,
		text: `O sono ocupa cerca de um terço da vida humana, mas durante séculos foi considerado pouco mais que um estado passivo de repouso. A neurociência moderna derrubou essa visão. Hoje, o sono é entendido como um período de intensa atividade biológica, essencial para a memória, a função imunológica, a regulação emocional e a remoção de resíduos metabólicos do cérebro.

Durante o sono, o cérebro passa por vários estágios distintos em ciclos. Os estágios iniciais apresentam atividade elétrica lenta e sincronizada enquanto o corpo relaxa e a temperatura cai. Após cerca de noventa minutos, o cérebro entra no sono REM, ou de movimento rápido dos olhos, quando a atividade cerebral se assemelha à vigília. A maioria dos sonhos vívidos ocorre no REM. Uma noite típica tem de quatro a seis desses ciclos, e os períodos REM ficam mais longos perto da manhã.

Uma grande descoberta das últimas décadas é um sistema chamado rede glinfática. Durante o sono, canais ao redor dos vasos sanguíneos do cérebro se alargam, permitindo que o líquido cefalorraquidiano percorra o tecido cerebral e elimine proteínas que se acumulam durante as horas de vigília. Uma dessas proteínas é a beta-amiloide, associada à doença de Alzheimer quando se acumula. Dormir mal por muitos anos pode aumentar o risco de doenças neurodegenerativas.

A consolidação da memória também acontece durante o sono. Enquanto as pessoas estão acordadas, o hipocampo registra novas experiências de forma rápida, mas temporária. Durante o sono profundo, essas memórias são reproduzidas e transferidas para o córtex, onde ficam armazenadas por longo prazo. Estudantes que dormem bem depois de estudar lembram mais do que aqueles que permanecem acordados.

As necessidades de sono variam conforme a idade. Recém-nascidos precisam de até dezessete horas, adolescentes, de cerca de nove, e a maioria dos adultos, de sete a nove horas por noite. A restrição crônica do sono, mesmo que seja de apenas uma ou duas horas por noite, acumula-se no que os pesquisadores chamam de dívida de sono, que prejudica significativamente a cognição e o humor.`,
		questions: [
			{
				q: "Como os cientistas viam o sono historicamente?",
				options: [
					"Como um período de intensa atividade cerebral",
					"Como um estado passivo de repouso",
					"Como essencial apenas para a memória",
					"Como um estado semelhante à vigília",
				],
				correct: 1,
			},
			{
				q: "O que é o sono REM?",
				options: [
					"O estágio inicial com atividade cerebral lenta",
					"Uma fase em que a temperatura corporal sobe rapidamente",
					"Uma fase de atividade cerebral semelhante à vigília, na qual ocorre a maioria dos sonhos vívidos",
					"Um estágio exclusivo das crianças",
				],
				correct: 2,
			},
			{
				q: "Quanto tempo dura um ciclo de sono típico antes da primeira fase REM?",
				options: [
					"Cerca de 30 minutos",
					"Cerca de 60 minutos",
					"Cerca de 90 minutos",
					"Cerca de 120 minutos",
				],
				correct: 2,
			},
			{
				q: "O que é a rede glinfática?",
				options: [
					"Um sistema de neurônios responsável pelos sonhos",
					"Canais ao redor dos vasos sanguíneos do cérebro que eliminam resíduos metabólicos durante o sono",
					"A parte do cérebro que controla os ciclos REM",
					"Um sistema hormonal que regula os horários do sono",
				],
				correct: 1,
			},
			{
				q: "Qual proteína é associada à doença de Alzheimer quando se acumula?",
				options: ["Serotonina", "Dopamina", "Beta-amiloide", "Cortisol"],
				correct: 2,
			},
			{
				q: "Onde o cérebro armazena inicialmente as novas experiências durante a vigília?",
				options: ["No córtex", "No cerebelo", "No hipocampo", "Na amígdala"],
				correct: 2,
			},
			{
				q: "O que acontece com as memórias durante o sono profundo?",
				options: [
					"Elas são apagadas para liberar espaço",
					"Elas são reproduzidas e transferidas do hipocampo para o córtex",
					"Elas ficam permanentemente presas no hipocampo",
					"Elas são convertidas em sonhos",
				],
				correct: 1,
			},
			{
				q: "Quantos ciclos de sono há em uma noite típica?",
				options: [
					"De um a dois",
					"De dois a três",
					"De quatro a seis",
					"De oito a dez",
				],
				correct: 2,
			},
			{
				q: "De quantas horas de sono por noite a maioria dos adultos precisa?",
				options: ["5–6 horas", "6–7 horas", "7–9 horas", "10–12 horas"],
				correct: 2,
			},
			{
				q: "O que as pesquisas mostraram sobre estudantes que dormem bem depois de estudar?",
				options: [
					"Eles se saem pior nas provas por estarem menos alertas",
					"Eles lembram mais do que aqueles que permanecem acordados",
					"Eles têm sonhos mais vívidos sobre o conteúdo",
					"O sono não tem efeito significativo na retenção da memória",
				],
				correct: 1,
			},
		],
	},
	{
		id: "urban-forests",
		title: "Florestas Urbanas",
		wordCount: 336,
		text: `As cidades são muitas vezes vistas como ambientes hostis à natureza: extensões de concreto, vidro e aço com pouco espaço para seres vivos. Pesquisas mostram que as árvores em áreas urbanas oferecem benefícios tão evidentes que muitos planejadores agora as consideram infraestrutura essencial, no mesmo nível que ruas e tubulações de água.

O efeito mais imediato das árvores urbanas é térmico. Uma única árvore madura pode transpirar centenas de litros de água por dia, resfriando o ar ao redor por evaporação, de modo muito semelhante à forma como o suor resfria o corpo humano. Em cidades densas, onde o asfalto e os telhados escuros absorvem e reemitem calor, esse efeito pode reduzir as temperaturas locais em vários graus. À medida que as temperaturas globais sobem, planejadores de muitas cidades passaram a tratar a cobertura das copas das árvores como uma meta formal, medindo-a junto com indicadores como qualidade do ar e risco de enchentes.

As árvores também interceptam a chuva. Suas folhas e galhos retardam a descida da água, dando ao solo tempo para absorvê-la, em vez de deixá-la escoar diretamente para os bueiros. Um carvalho maduro pode interceptar dezenas de milhares de litros de chuva por ano, reduzindo a sobrecarga dos sistemas de esgoto durante tempestades fortes — problema que se agrava à medida que os episódios de precipitação ficam mais intensos com a mudança climática.

Os efeitos psicológicos são menos evidentes, mas já foram estudados. Trabalhos que usaram imagens de satélite e dados de bem-estar relatados pelas próprias pessoas encontraram relações consistentes entre a densidade de árvores nas ruas e índices menores de depressão, ansiedade e estresse. A proximidade de áreas verdes parece restaurar a atenção e reduzir indicadores fisiológicos de tensão, mesmo em exposições breves.

Apesar desses benefícios, plantar e manter árvores urbanas custa caro, e muitas cidades de regiões de renda mais baixa não têm orçamento para estabelecer uma cobertura arbórea significativa. Pesquisadores argumentam que reduzir essa desigualdade é uma questão tanto ambiental quanto de equidade em saúde pública.`,
		questions: [
			{
				q: "Como as árvores urbanas ajudam a resfriar as cidades?",
				options: [
					"Apenas bloqueando a luz solar com suas copas",
					"Transpirando água, que resfria o ar ao redor por evaporação",
					"Absorvendo calor em seus troncos",
					"Criando túneis de vento entre os edifícios",
				],
				correct: 1,
			},
			{
				q: "O que acontece com o calor em cidades densas com muito asfalto?",
				options: [
					"Ele é refletido de volta ao espaço",
					"É absorvido pelo solo e se dissipa durante a noite",
					"É absorvido e reemitido pelo asfalto e por telhados escuros",
					"Não tem efeito sobre a temperatura local",
				],
				correct: 2,
			},
			{
				q: "Como as árvores urbanas ajudam a controlar a água da chuva?",
				options: [
					"Bombeiam água para aquíferos subterrâneos",
					"Suas folhas e galhos retardam a descida da água, dando ao solo tempo para absorvê-la",
					"Canalizam a água da chuva diretamente para os rios",
					"Não têm efeito significativo no controle da água",
				],
				correct: 1,
			},
			{
				q: "Aproximadamente quanta chuva um carvalho maduro pode interceptar por ano?",
				options: [
					"Centenas de litros",
					"Milhares de litros",
					"Dezenas de milhares de litros",
					"Centenas de milhares de litros",
				],
				correct: 2,
			},
			{
				q: "Quais benefícios psicológicos foram associados às árvores nas ruas?",
				options: [
					"Melhora no desempenho em matemática",
					"Índices menores de depressão, ansiedade e estresse",
					"Apenas uma melhor qualidade do sono",
					"Aumento da agressividade social",
				],
				correct: 1,
			},
			{
				q: "Quais dados os pesquisadores usaram para estudar árvores e bem-estar?",
				options: [
					"Registros hospitalares e sensores de poluição",
					"Imagens de satélite e dados de bem-estar relatados pelas próprias pessoas",
					"Amostras de solo e monitores da qualidade do ar",
					"Dados de trânsito e estatísticas criminais",
				],
				correct: 1,
			},
			{
				q: "Como os planejadores urbanos passaram a considerar as árvores nas cidades?",
				options: [
					"Como elementos decorativos de pouco valor prático",
					"Como infraestrutura essencial, no mesmo nível que ruas e tubulações de água",
					"Como um obstáculo ao desenvolvimento urbano",
					"Como um luxo que somente cidades ricas podem pagar",
				],
				correct: 1,
			},
			{
				q: "Segundo o texto, o que agrava os episódios de chuva com a mudança climática?",
				options: [
					"As cidades recebem mais neve em vez de chuva",
					"Os sistemas de drenagem estão sendo removidos",
					"Os episódios de precipitação ficam mais intensos",
					"O solo fica permanentemente saturado",
				],
				correct: 2,
			},
			{
				q: "O que é descrito como uma barreira ao plantio de árvores urbanas em algumas regiões?",
				options: [
					"A falta de espécies de árvores adequadas",
					"A oposição dos moradores",
					"Os orçamentos limitados em cidades de renda mais baixa",
					"Um solo incapaz de sustentar árvores grandes",
				],
				correct: 2,
			},
			{
				q: "O que o texto afirma sobre a desigualdade na cobertura arbórea urbana?",
				options: [
					"É principalmente um problema estético",
					"Não vale a pena enfrentá-la devido ao custo",
					"É uma questão de equidade em saúde pública, não apenas ambiental",
					"Só importa em climas tropicais",
				],
				correct: 2,
			},
		],
	},
	{
		id: "invention-writing",
		title: "A Invenção da Escrita",
		wordCount: 347,
		text: `A escrita é tão central para a vida moderna que é fácil esquecer como foi inventada recentemente. Durante a maior parte da história humana, o conhecimento foi transmitido oralmente — por meio de histórias, canções e memória. Os primeiros sistemas de escrita surgiram apenas cerca de cinco mil anos atrás, e sua invenção parece ter sido impulsionada não pelo desejo de registrar literatura ou preservar a história, mas pelas necessidades corriqueiras do comércio e da administração.

A escrita mais antiga conhecida vem da Mesopotâmia antiga, região entre os rios Tigre e Eufrates, no território que hoje é o Iraque. Arqueólogos escavaram tabuletas de argila inscritas com pequenos pictogramas que representavam mercadorias e números. Esses registros iniciais eram essencialmente recibos — listas de entregas de grãos, contagens de animais e receitas de templos. O sistema que os produziu, chamado escrita cuneiforme, evoluiu ao longo de vários séculos, passando de imagens simples a marcas abstratas em forma de cunha, pressionadas na argila úmida com um estilete de junco.

Uma história semelhante ocorreu no Egito antigo, onde os hieróglifos se desenvolveram como um sistema de escrita independente por volta do mesmo período. A escrita egípcia combinava símbolos pictóricos que representavam objetos com sinais fonéticos que representavam sons, permitindo aos escribas transcrever nomes e a língua falada com maior precisão. Um terceiro sistema de escrita independente surgiu na China, e possivelmente um quarto na Mesoamérica, o que sugere que a invenção da escrita, embora rara, é algo que sociedades humanas sob pressão organizacional suficiente tendem a descobrir.

A difusão da escrita transformou as sociedades. Ela permitiu que leis fossem codificadas e aplicadas de modo consistente, que contratos fossem cumpridos através do tempo e da distância e que o conhecimento se acumulasse além do que qualquer memória individual poderia guardar. Civilizações letradas podiam coordenar populações maiores, sustentar instituições mais complexas e preservar o que aprendiam ao longo das gerações.

No entanto, a escrita também criou novas desigualdades. A alfabetização exigia treinamento e acesso a materiais, o que significou que, durante a maior parte da história humana, apenas uma pequena elite sabia ler e escrever.`,
		questions: [
			{
				q: "Segundo o texto, o que impulsionou principalmente a invenção da escrita?",
				options: [
					"O desejo de registrar poesia e literatura",
					"Cerimônias religiosas que exigiam textos sagrados",
					"As necessidades do comércio e da administração",
					"O desejo de preservar acontecimentos históricos",
				],
				correct: 2,
			},
			{
				q: "Onde se originou a escrita mais antiga conhecida?",
				options: [
					"No Egito antigo",
					"Na China antiga",
					"Na Mesopotâmia antiga",
					"Na Mesoamérica antiga",
				],
				correct: 2,
			},
			{
				q: "O que as primeiras tabuletas de argila registravam principalmente?",
				options: [
					"Estratégias militares e planos de batalha",
					"Textos religiosos e orações",
					"Recibos, como entregas de grãos e contagens de animais",
					"Poesia e canções populares",
				],
				correct: 2,
			},
			{
				q: "Que ferramenta era usada para pressionar marcas cuneiformes na argila?",
				options: [
					"Um estilete de osso",
					"Um estilete de junco",
					"Uma ferramenta de gravação de metal",
					"Um carimbo de madeira",
				],
				correct: 1,
			},
			{
				q: "Como os hieróglifos egípcios diferiam da escrita cuneiforme mesopotâmica inicial?",
				options: [
					"Usavam apenas símbolos pictóricos, sem componente fonético",
					"Combinavam símbolos pictóricos com sinais fonéticos que representavam sons",
					"Eram somente entalhados em pedra, nunca escritos",
					"Desenvolveram-se muito depois da escrita cuneiforme",
				],
				correct: 1,
			},
			{
				q: "Quantos sistemas de escrita totalmente independentes o texto menciona?",
				options: [
					"Dois",
					"Três",
					"Pelo menos três, possivelmente quatro",
					"Cinco ou mais",
				],
				correct: 2,
			},
			{
				q: "O que o surgimento da escrita em várias culturas sugere?",
				options: [
					"A escrita foi inventada uma vez e se espalhou pelo comércio",
					"A escrita é algo que sociedades sob pressão organizacional suficiente tendem a descobrir",
					"A escrita só se desenvolveu onde havia contato entre civilizações",
					"A escrita sempre foi inventada por líderes religiosos",
				],
				correct: 1,
			},
			{
				q: "Qual dos seguintes foi um benefício da escrita mencionado no texto?",
				options: [
					"Eliminou a necessidade da tradição oral",
					"Tornou todas as pessoas igualmente alfabetizadas",
					"Permitiu que leis fossem codificadas e aplicadas de modo consistente",
					"Reduziu a complexidade das instituições",
				],
				correct: 2,
			},
			{
				q: "Que desigualdade a escrita criou?",
				options: [
					"Comerciantes ricos escreviam mais rápido que agricultores",
					"Somente homens podiam se tornar escribas",
					"Apenas uma pequena elite tinha acesso à alfabetização",
					"Leis escritas favoreciam uma região em detrimento de outra",
				],
				correct: 2,
			},
			{
				q: "Há aproximadamente quanto tempo surgiram os primeiros sistemas de escrita?",
				options: [
					"Cerca de 1.000 anos atrás",
					"Cerca de 3.000 anos atrás",
					"Cerca de 5.000 anos atrás",
					"Cerca de 10.000 anos atrás",
				],
				correct: 2,
			},
		],
	},
	{
		id: "microbiome",
		title: "O Microbioma Humano",
		wordCount: 324,
		text: `O corpo humano contém trilhões de microrganismos (bactérias, fungos, vírus e outras formas de vida microscópicas) que, em conjunto, formam o microbioma. Eles não são passageiros passivos; estão profundamente integrados à fisiologia humana. Pesquisas das últimas duas décadas mostraram que o microbioma afeta a digestão, a função imunológica e até a saúde mental, além de terem mudado a maneira como os cientistas pensam sobre o corpo.

A maioria dos microrganismos do corpo vive no intestino, sobretudo no intestino grosso. Ali, comunidades de bactérias fermentam fibras alimentares que as enzimas digestivas humanas não conseguem decompor, produzindo ácidos graxos de cadeia curta que nutrem as células que revestem o intestino. Essas mesmas bactérias sintetizam vitaminas, incluindo certas vitaminas do complexo B e a vitamina K, que o corpo não consegue produzir sozinho. A perturbação do microbioma intestinal — por doenças, alimentação inadequada ou uso de antibióticos — tem sido associada a condições que vão da doença inflamatória intestinal a distúrbios metabólicos.

A ligação entre o microbioma intestinal e o cérebro tem recebido muita atenção dos pesquisadores. Uma via chamada eixo intestino-cérebro conecta o sistema nervoso intestinal ao sistema nervoso central por meio do nervo vago. Estudos em animais e seres humanos constataram que mudanças nas bactérias intestinais podem influenciar o humor, a ansiedade e o comportamento. Camundongos livres de germes, criados sem microbioma algum, apresentam respostas elevadas ao estresse e comportamento social anormal, que podem ser parcialmente revertidos pela reintrodução de cepas bacterianas específicas.

A composição do microbioma de cada pessoa é moldada pela alimentação, geografia, exposição no início da vida e genética. Bebês nascidos por parto vaginal adquirem seu microbioma inicial da mãe durante o nascimento, enquanto os que nascem por cesariana apresentam um perfil microbiano inicial diferente. A amamentação molda ainda mais o intestino do bebê, introduzindo bactérias especializadas que ajudam a digerir os açúcares do leite.

A compreensão do microbioma está levando a novas opções médicas, incluindo probióticos, transplantes fecais e intervenções alimentares personalizadas.`,
		questions: [
			{
				q: "Onde vive a maioria dos microrganismos do corpo?",
				options: [
					"Na superfície da pele",
					"Nos pulmões",
					"No intestino grosso",
					"Na corrente sanguínea",
				],
				correct: 2,
			},
			{
				q: "O que as bactérias intestinais produzem ao fermentar fibras alimentares?",
				options: [
					"Açúcares simples e glicose",
					"Ácidos graxos de cadeia curta que nutrem as células intestinais",
					"Proteínas usadas pelo sistema imunológico",
					"Ácidos biliares necessários à digestão de gorduras",
				],
				correct: 1,
			},
			{
				q: "Quais vitaminas as bactérias intestinais ajudam a sintetizar?",
				options: [
					"Vitaminas A e C",
					"Vitaminas D e E",
					"Certas vitaminas do complexo B e vitamina K",
					"Somente vitaminas C e D",
				],
				correct: 2,
			},
			{
				q: "O que é o eixo intestino-cérebro?",
				options: [
					"Uma região do cérebro que controla a digestão",
					"Uma via que conecta o sistema nervoso intestinal ao cérebro por meio do nervo vago",
					"Um tipo de bactéria intestinal que produz neurotransmissores",
					"Um procedimento cirúrgico que conecta sinais do intestino e do cérebro",
				],
				correct: 1,
			},
			{
				q: "Que comportamento apresentaram camundongos livres de germes, sem microbioma?",
				options: [
					"Eram mais sociáveis e curiosos que camundongos normais",
					"Não apresentaram diferenças em relação a camundongos normais",
					"Apresentaram respostas elevadas ao estresse e comportamento social anormal",
					"Eram mais saudáveis e viviam mais",
				],
				correct: 2,
			},
			{
				q: "Como o comportamento dos camundongos livres de germes pode ser parcialmente revertido?",
				options: [
					"Administrando tratamentos com antibióticos",
					"Reintroduzindo cepas bacterianas específicas",
					"Oferecendo uma dieta rica em fibras",
					"Estimulando eletricamente o nervo vago",
				],
				correct: 1,
			},
			{
				q: "Como bebês nascidos por parto vaginal adquirem seu microbioma inicial?",
				options: [
					"Do ambiente hospitalar após o nascimento",
					"Somente do leite materno",
					"Da mãe durante o nascimento",
					"Do ar que respiram pela primeira vez",
				],
				correct: 2,
			},
			{
				q: "Qual dos seguintes NÃO foi listado como fator que molda o microbioma?",
				options: [
					"Alimentação",
					"Geografia",
					"Tipo sanguíneo",
					"Exposição no início da vida",
				],
				correct: 2,
			},
			{
				q: "Qual é uma aplicação médica mencionada que utiliza o conhecimento sobre o microbioma?",
				options: [
					"Terapia genética direcionada ao DNA intestinal",
					"Transplantes fecais",
					"Remoção cirúrgica de bactérias nocivas",
					"Terapia de reposição hormonal",
				],
				correct: 1,
			},
			{
				q: "O que acontece com o microbioma quando antibióticos são usados?",
				options: [
					"O microbioma se fortalece e se diversifica",
					"Os antibióticos afetam apenas bactérias nocivas e preservam as benéficas",
					"A perturbação do microbioma é associada a condições como a doença inflamatória intestinal",
					"As bactérias intestinais se multiplicam rapidamente para compensar",
				],
				correct: 2,
			},
		],
	},
];

export function getBenchmarkPassages(locale: Locale): BenchmarkPassage[] {
	return locale === "pt-BR" ? BENCHMARK_PASSAGES_PT : BENCHMARK_PASSAGES;
}

export function pickPassage(excludeId?: string): BenchmarkPassage {
	const available = excludeId
		? BENCHMARK_PASSAGES.filter((p) => p.id !== excludeId)
		: BENCHMARK_PASSAGES;
	return available[Math.floor(Math.random() * available.length)];
}
