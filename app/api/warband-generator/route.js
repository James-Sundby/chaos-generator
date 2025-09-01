// export const dynamic = 'force-dynamic';

// import { generateWarbandName } from "@/utils/generateNames";
// import { generateWarbandScheme } from "@/utils/generateColourScheme";
// import { generateChaosPattern } from "@/utils/generatePatterns";
// import { generateSlug, parseChaosSlug } from "@/utils/parseSlugs";

// import { colourList } from "@/lib/colours";
// import { chaosPatterns } from "@/lib/armourPatterns";

// const colourMap = Object.fromEntries(colourList.map((colour) => [colour.hex.toLowerCase(), colour]));
// const patternsSet = new Set(chaosPatterns.map((p) => p.toLowerCase()));

// export async function GET(req) {
//     const url = new URL(req.url);
//     const slug = url.searchParams.get("slug");

//     const slugRegex = /^[a-zA-Z0-9-]+$/;
//     if (slug && !slugRegex.test(slug)) {
//         return new Response(JSON.stringify({ error: "Invalid slug format" }), { status: 400 });
//     }

//     if (slug) {
//         try {
//             const { name, colours, pattern } = parseChaosSlug(slug, colourMap, patternsSet);
//             return new Response(JSON.stringify({
//                 message: "valid",
//                 warbandName: name,
//                 colors: colours,
//                 pattern: pattern,
//                 slug: slug
//             }), { status: 200 });
//         } catch (error) {
//             console.warn("Invalid slug, generating a new warband instead:", error.message);
//         }
//     }

//     // Generate a new warband if no slug is provided or slug is invalid
//     try {
//         const name = generateWarbandName();
//         const { colours, mode } = generateWarbandScheme();
//         const pattern = generateChaosPattern();
//         const newSlug = generateSlug(name, colours, pattern);

//         return new Response(JSON.stringify({
//             message: "new warband",
//             warbandName: name,
//             colors: colours,
//             pattern: pattern,
//             slug: newSlug,
//             mode: mode
//         }), {
//             status: 200,
//             headers: {
//                 "Content-Type": "application/json",
//             },
//         });
//     } catch (error) {
//         return new Response(JSON.stringify({
//             error: "Internal Server Error",
//             message: error.message
//         }), {
//             status: 500,
//             headers: {
//                 "Content-Type": "application/json"
//             }
//         });
//     }
// }