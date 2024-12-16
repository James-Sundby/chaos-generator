// Chaotic Descriptors - emphasize the corruption, malevolence, and doomed nature of Chaos.
const chaoticDescriptors = [
    "Blood", "Shadow", "Warp", "Doom", "Hell", "Blighted", "Crimson", "Brazen",
    "Fell", "Black", "Ashen", "Infernal", "Malevolent", "Ravenous", "Ruinous", "Burning",
    "Venomous", "Cursed", "Shattered", "Darkened", "Eternal", "Chained", "Flayed", "Abyssal",
    "Grim", "Baleful", "Accursed", "Hollow", "Withered", "Seething", "Rotten", "Bleeding",
    "Broken", "Charnel"
];

// Dark Entities - the monstrous and supernatural beings or forces Chaos warbands might revere
const darkEntities = [
    "Daemon", "Abyss", "Corruption", "Fury", "Oblivion", "Torment", "Decay", "Pox", "Maggot",
    "Blight", "Horror", "Wraith", "Specter", "Ghoul", "Plague", "Chaos", "Nightmare", "Revenant",
    "Dread", "Void", "Phantom", "Inferno", "Shade", "Carrion", "Vermin",
    "Tyranny", "Desecration", "Desolation", "Entropy", "Discord", "Mutation", "Woe", "Anathema", "Rot",
    "Pestilence", "Shriek", "Chimera", "Eidolon", "Parasite"
];

// Warrior Terms - describe the warband's martial or brotherhood-like organization.
const warriorTerms = [
    "Warriors", "Blades", "Legion", "Host", "Brotherhood", "Swords", "Sons", "Claws",
    "Reavers", "Hunters", "Executioners", "Marauders", "Destroyers", "Raiders", "Cutthroats",
    "Heralds", "Avengers", "Knights", "Berserkers", "Stalkers", "Guard", "Annihilators", "Invaders",
    "Vanguard", "Scourge", "Harbingers", "Slayers", "Wolves", "Butchers", "Horde",
    "Wretches", "Ravagers", "Defilers", "Desecrators", "Prophets", "Tormentors", "Watchers",
    "Cult", "Order", "Disciples", "Pack", "Fanatics"
];

// Abstract Nouns - emotions, states of being, or thematic ideas tied to Chaos
const abstractNouns = [
    "Murder", "Slaughter", "Pain", "Wrath", "Despair", "Silence", "Eternity",
    "Carnage", "Hate", "Destruction", "Suffering", "Chaos", "Night", "Woe", "Fury",
    "Ruin", "Death", "Agony", "Sin", "Misery", "Annihilation", "Damnation", "Hunger",
    "Decay", "Corruption", "Terror", "Anguish", "Blight", "Oblivion", "Malice", "Desecration",
    "Entropy", "Fate", "Doom", "Shame", "Bloodshed", "Venom", "Treachery",
    "Depravity", "Collapse", "Shadows", "Obsession", "Vengeance"
];

// Adjectives - describe the warband's qualities, such as their cursed or unholy nature
const adjectives = [
    "Forsaken", "Brazen", "Bitter", "Wrathful", "Tainted", "Endless", "Malevolent",
    "Damned", "Cursed", "Infernal", "Unholy", "Ruinous", "Vile", "Pale", "Shattered",
    "Twisted", "Venomous", "Eternal", "Blackened", "Desolate", "Fell", "Relentless", "Savage",
    "Hollow", "Seething", "Corrupt", "Lamenting", "Accursed", "Desecrated", "Blighted",
    "Sinful", "Grotesque", "Reluctant", "Vicious", "Chained", "Lurking", "Unforgiven",
    "Insidious", "Malevolent", "Broken", "Spectral", "Grim", "Bleeding"
];

function generateWarbandName() {
    const randomElement = (array) => array[Math.floor(Math.random() * array.length)];

    const formulas = [
        () => `${randomElement(warriorTerms)} of ${randomElement(darkEntities)}`,
        () => `${randomElement(chaoticDescriptors)} ${randomElement(warriorTerms)}`,
        () => `${randomElement(abstractNouns)} ${randomElement(warriorTerms)}`,
        () => `${randomElement(adjectives)} ${randomElement(warriorTerms)} of ${randomElement(darkEntities)}`,
        () => `${randomElement(abstractNouns)} of ${randomElement([...darkEntities, ...chaoticDescriptors])}`,
        () => `The ${randomElement(adjectives)} ${randomElement(warriorTerms)}`,
        () => `Children of ${randomElement(chaoticDescriptors)}`,
        () => `${randomElement(adjectives)} ${randomElement(warriorTerms)} of ${randomElement(abstractNouns)}`,
        () => `The ${randomElement(chaoticDescriptors)} ${randomElement(warriorTerms)}`,
        () => `The ${randomElement(warriorTerms)} of ${randomElement(chaoticDescriptors)}`,
        () => `${randomElement(darkEntities)} ${randomElement(warriorTerms)}`

    ];

    //     [Warrior Term] of[Dark Entity]	                        Blades of Oblivion
    //     [Chaotic Descriptor][Warrior Term]	                    Crimson Reavers
    //     [Abstract Noun][Warrior Term]	                        Carnage Knights
    //     [Adjective][Warrior Term]of[Dark Entity]	                Shattered Sons of Pox
    //     [Abstract Noun]of[Dark Entity or Chaotic Descriptor]	    Hunger of the Abyss
    //     The[Adjective][Warrior Term]	                            The Twisted Hunters
    //     Children of[Chaotic Descriptor]	                        Children of Shadows
    //     [Adjective][Warrior Term]of[Abstract Noun]	            Forsaken Blades of Pain
    //     The[Chaotic Descriptor][Warrior Term]                    The Blighted Legion
    //     The [Warrior Term] of [Chaotic Descriptor]               The Claws of Shadow
    //     [Dark Entity] [Warrior Term]                             Abyss Hunters

    return randomElement(formulas)();
}

function generateRandomColors() {
    return Array(3).fill().map(() => {
        const randomColor = Math.floor(Math.random() * 16777215).toString(16);
        return `#${randomColor.padStart(6, '0')}`;
    });
}

export async function GET() {
    try {
        const warbandName = generateWarbandName();
        const colors = generateRandomColors();

        return new Response(
            JSON.stringify({ warbandName, colors }),
            {
                status: 200,
                headers: { 'Content-Type': 'application/json' },
            }
        );
    } catch (error) {
        console.error("Error generating Warband data:", error);
        return new Response(
            JSON.stringify({ error: "Internal Server Error" }),
            { status: 500, headers: { 'Content-Type': 'application/json' } }
        );
    }
}
