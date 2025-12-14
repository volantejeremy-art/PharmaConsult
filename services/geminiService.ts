
import { GoogleGenAI } from "@google/genai";
import { ProductData } from "../types";

// Mock Data updated to match new structure
export const MOCK_PRODUCT_DATA: ProductData = {
  produit: {
    nom_complet: "Bioderma Créaline H2O Solution Micellaire",
    marque: "Bioderma",
    categorie: "Nettoyant Visage",
    format: "500ml",
    prix_conseille: "11,90€ (Site Officiel)", // Specific Price
    image_url: "https://picsum.photos/300/300",
    resume: "L'eau micellaire dermatologique de référence pour les peaux sensibles. Nettoie, démaquille et apaise en un seul geste.",
    caracteristiques_cles: [
        "Nettoyant sans rinçage",
        "Formule haute tolérance",
        "Sans parfum & Sans alcool",
        "pH physiologique",
        "Apaise immédiatement"
    ],
    composition_cles: ["Micelles", "Extrait de Concombre", "Eau purifiée"],
    labels: ["Dermatologique", "Sans parfum"]
  },
  cibles: {
    public_ideal: [
      { profil: "Peaux sensibles", raison: "Apaise les rougeurs" },
      { profil: "Porteurs de lentilles", raison: "Ne pique pas les yeux" },
      { profil: "Peaux réactives", raison: "Respecte le film hydrolipidique" }
    ],
    public_deconseille: [
      { profil: "Maquillage Waterproof extrême", raison: "Peut nécessiter une huile en complément", severite: "attention" }
    ]
  },
  conseils_utilisation: {
    mode_emploi: "Imbiber un coton. Nettoyer/démaquiller visage et yeux.",
    frequence: "Matin et soir",
    moment_ideal: "1er geste de la routine",
    quantite: "Généreusement",
    duree_resultats: "Immédiat",
    astuce_pro: "Laisser poser sur les yeux pour dissoudre le mascara."
  },
  precautions: [
      "Usage externe uniquement.",
      "Cesser l'utilisation en cas d'irritation persistante.",
      "Conserver à l'abri de la chaleur."
  ],
  synergie_routine: {
    description_generale: "Une routine minimaliste et apaisante est la clé pour les peaux intolérantes.",
    etapes: [
      {
        etape: 1,
        nom: "Créaline H2O",
        marque: "Bioderma",
        prix_approx: "11,90€",
        role_dans_routine: "Tout d'abord, utilisez cette eau micellaire pour éliminer en douceur les impuretés accumulées et apaiser la peau.",
        benefice_produit: "Nettoie et apaise instantanément.",
        is_current_product: true
      },
      {
        etape: 2,
        nom: "Créaline Yeux",
        marque: "Bioderma",
        prix_approx: "12€ - 14€",
        role_dans_routine: "Ensuite, appliquez délicatement ce soin spécifique sur le contour des yeux pour décongestionner et hydrater cette zone fragile.",
        benefice_produit: "Décongestionne et apaise.",
        is_current_product: false
      },
      {
        etape: 3,
        nom: "Créaline Défensive Riche",
        marque: "Bioderma",
        prix_approx: "15€ - 17€",
        role_dans_routine: "Enfin, terminez votre rituel avec cette crème protectrice qui va renforcer durablement la barrière cutanée.",
        benefice_produit: "Nourrit et protège durablement.",
        is_current_product: false
      }
    ]
  },
  comparatif: {
    concurrent_1: {
      nom: "Eau Micellaire Thermale", marque: "Uriage", prix: "9€ - 11€", contenance: "500ml", prix_au_litre: "19€/L",
      actifs_principaux: ["Eau Thermale"], texture: "Eau fraîche", parfum: "Léger", labels: ["Hypo"],
      usage_recommande: "Peaux normales à mixtes",
      description_detaillee: "Une excellente alternative riche en oligo-éléments grâce à l'eau thermale d'Uriage. Idéale si vous cherchez un soin plus minéralisant, mais légèrement parfumée.",
      points_forts: ["Prix"], points_faibles: ["Parfum"]
    },
    produit_scanne: {
      nom: "Créaline H2O", marque: "Bioderma", prix: "11,90€", contenance: "500ml", prix_au_litre: "23.8€/L",
      actifs_principaux: ["Esters de glycérol"], texture: "Eau douce", parfum: "Sans parfum", labels: ["Culte"],
      usage_recommande: "Peaux sensibles & réactives",
      description_detaillee: "La référence historique. Sa formule biomimétique est celle qui respecte le mieux l'équilibre cutané. Incontournable pour les peaux intolérantes ou allergiques.",
      points_forts: ["Tolérance"], points_faibles: ["Prix"]
    },
    concurrent_2: {
      nom: "Eau Micellaire Ultra", marque: "La Roche-Posay", prix: "11€ - 13€", contenance: "400ml", prix_au_litre: "31€/L",
      actifs_principaux: ["Eau LRP", "Glycérine"], texture: "Eau", parfum: "Discret", labels: ["Dermato"],
      usage_recommande: "Peaux sensibles",
      description_detaillee: "Très proche de la Créaline, elle se distingue par l'ajout de glycérine pour plus de confort. Son format est souvent un peu plus petit pour un prix équivalent.",
      points_forts: ["Apaisant"], points_faibles: ["Contenance"]
    },
    synthese_globale: "La référence absolue pour les peaux sensibles.",
    guide_achat_profils: "Si vous privilégiez le prix, optez pour **Uriage**. Si vous avez la peau ultra-réactive ou intolérante, restez sur **Bioderma** qui est la plus neutre. Si vous cherchez un peu plus de confort hydratant immédiat, **La Roche-Posay** grâce à sa glycérine sera idéale."
  },
  avis_consommateurs: {
    note_moyenne: 4.8, nombre_avis: 12000, sources: ["Easypara", "BeauteTest"],
    repartition: { positifs_pct: 95, neutres_pct: 3, negatifs_pct: 2 },
    points_positifs_recurrents: [{ topic: "Douceur extrême", percentage: 95 }, { topic: "Efficacité démaquillage", percentage: 92 }],
    points_negatifs_recurrents: [{ topic: "Prix élevé", percentage: 15 }, { topic: "Bouchon fragile", percentage: 5 }],
    citation_positive: { text: "C'est la seule eau micellaire que ma peau tolère. Elle ne pique pas les yeux et démaquille parfaitement.", author: "Sophie_L" }, 
    citation_negative: { text: "Le produit est génial mais le prix a beaucoup augmenté ces derniers temps.", author: "Marc75" }
  },
  faq: [
      { question: "Le pH est-il compatible avec les yeux très sensibles ?", reponse: "Oui, la Créaline H2O a un pH physiologique d'environ 5.5, ce qui est très proche du pH naturel de la peau et des larmes, évitant ainsi les picotements." },
      { question: "La bouteille est-elle recyclable ?", reponse: "Oui, les flacons Bioderma sont fabriqués en plastique recyclable (généralement PET). Pensez à laisser le bouchon vissé pour faciliter le tri." },
      { question: "Y a-t-il un risque d'interaction avec des crèmes à l'acide rétinoïque ?", reponse: "Non, la formule micellaire est inerte et nettoie sans interagir chimiquement avec les traitements dermatologiques appliqués ensuite." },
      { question: "Peut-on l'utiliser après une intervention laser ?", reponse: "Absolument. Sa formule apaisante est souvent recommandée par les dermatologues en post-acte pour nettoyer sans frotter ni irriter la peau lésée." },
      { question: "Quelle est la différence chimique entre l'eau micellaire et un tonique ?", reponse: "L'eau micellaire contient des agents tensioactifs (micelles) qui capturent le gras et la saleté, alors qu'un tonique est une simple lotion aqueuse ou alcoolisée qui ne nettoie pas." },
      { question: "Contient-elle des parabènes ou du phénoxyéthanol ?", reponse: "La formule classique Créaline H2O est formulée sans parabènes. Vérifiez toujours la liste INCI au dos car les conservateurs peuvent évoluer." },
      { question: "Est-ce comedogène ?", reponse: "Non, la solution est strictement non-comédogène, ce qui signifie qu'elle ne bouche pas les pores et ne favorise pas l'acné." },
      { question: "Peut-elle démaquiller les filtres solaires tenaces ?", reponse: "Pour les écrans solaires minéraux très résistants, un double nettoyage (huile puis eau micellaire) est parfois préférable, bien que la Créaline soit très performante." }
  ]
};

// Simplified Schema for faster token generation
const SCHEMA_JSON = `
{
  "produit": {
    "nom_complet": "string", "marque": "string", "categorie": "string", "format": "string",
    "prix_conseille": "string", "image_url": "string | null", "resume": "string",
    "caracteristiques_cles": ["string"], "composition_cles": ["string"], "labels": ["string"]
  },
  "cibles": {
    "public_ideal": [{ "profil": "string", "raison": "string" }],
    "public_deconseille": [{ "profil": "string", "raison": "string", "severite": "attention|deconseille|contre-indique" }]
  },
  "conseils_utilisation": {
    "mode_emploi": "string", "frequence": "string", "moment_ideal": "string",
    "quantite": "string", "duree_resultats": "string", "astuce_pro": "string"
  },
  "precautions": ["string"],
  "synergie_routine": {
    "description_generale": "string",
    "etapes": [
       { "etape": 1, "nom": "string", "marque": "string", "prix_approx": "string", "role_dans_routine": "string", "benefice_produit": "string", "is_current_product": boolean },
       { "etape": 2, "nom": "string", "marque": "string", "prix_approx": "string", "role_dans_routine": "string", "benefice_produit": "string", "is_current_product": boolean },
       { "etape": 3, "nom": "string", "marque": "string", "prix_approx": "string", "role_dans_routine": "string", "benefice_produit": "string", "is_current_product": boolean }
    ]
  },
  "comparatif": {
    "concurrent_1": { "nom": "string", "marque": "string", "prix": "string", "contenance": "string", "prix_au_litre": "string", "actifs_principaux": ["string"], "texture": "string", "parfum": "string", "usage_recommande": "string", "description_detaillee": "string", "labels": ["string"], "points_forts": ["string"], "points_faibles": ["string"] },
    "produit_scanne": { "nom": "string", "marque": "string", "prix": "string", "contenance": "string", "prix_au_litre": "string", "actifs_principaux": ["string"], "texture": "string", "parfum": "string", "usage_recommande": "string", "description_detaillee": "string", "labels": ["string"], "points_forts": ["string"], "points_faibles": ["string"] },
    "concurrent_2": { "nom": "string", "marque": "string", "prix": "string", "contenance": "string", "prix_au_litre": "string", "actifs_principaux": ["string"], "texture": "string", "parfum": "string", "usage_recommande": "string", "description_detaillee": "string", "labels": ["string"], "points_forts": ["string"], "points_faibles": ["string"] },
    "synthese_globale": "string",
    "guide_achat_profils": "string"
  },
  "avis_consommateurs": {
    "note_moyenne": number, "nombre_avis": number, "sources": ["string"],
    "repartition": { "positifs_pct": number, "neutres_pct": number, "negatifs_pct": number },
    "points_positifs_recurrents": [{ "topic": "string", "percentage": number }], 
    "points_negatifs_recurrents": [{ "topic": "string", "percentage": number }],
    "citation_positive": { "text": "string", "author": "string" }, "citation_negative": { "text": "string", "author": "string" }
  },
  "faq": [{ "question": "string", "reponse": "string", "source": "string" }]
}
`;

export async function generateProductImage(prompt: string): Promise<string | null> {
    return null;
}

// Function to lookup barcode in Open Databases (OFF/OBF)
async function lookupBarcode(barcode: string): Promise<string | null> {
    try {
        // Try OpenBeautyFacts first (Cosmetics priority)
        const obfResponse = await fetch(`https://world.openbeautyfacts.org/api/v0/product/${barcode}.json`);
        if (obfResponse.ok) {
            const data = await obfResponse.json();
            if (data.status === 1 && data.product) {
                const brand = data.product.brands || "";
                const name = data.product.product_name || "";
                if (name) return `${brand} ${name}`.trim();
            }
        }

        // Try OpenFoodFacts (Supplements/Nutrition)
        const offResponse = await fetch(`https://world.openfoodfacts.org/api/v0/product/${barcode}.json`);
        if (offResponse.ok) {
            const data = await offResponse.json();
            if (data.status === 1 && data.product) {
                const brand = data.product.brands || "";
                const name = data.product.product_name || "";
                if (name) return `${brand} ${name}`.trim();
            }
        }
    } catch (e) {
        console.warn("Database lookup failed, falling back to AI", e);
    }
    return null;
}

export async function fetchProductData(query: string): Promise<ProductData> {
  if (!process.env.API_KEY) {
    console.warn("No API Key provided. Using Mock Data.");
    return new Promise(resolve => setTimeout(() => resolve(MOCK_PRODUCT_DATA), 1500));
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  // STEP 1: DETECT IF BARCODE OR TEXT
  const isBarcode = /^\d+$/.test(query.trim());
  let productName = query;

  if (isBarcode) {
      // PHASE 1: TRY REAL DATABASE FIRST
      const dbName = await lookupBarcode(query);
      if (dbName) {
          console.log("Barcode identified via Database:", dbName);
          productName = dbName;
      } else {
          // PHASE 1-B: IF DB FAILS, TRY GOOGLE SEARCH VIA AI
          try {
              const identificationPrompt = `
                You are a helpful assistant.
                I have a barcode number: "${query}".
                Please search on Google to find the EXACT commercial product name associated with this barcode.
                Return ONLY the product name (Brand + Name + Capacity if available).
                If you absolutely cannot find it, return "Unknown Product".
              `;
              
              const idResponse = await ai.models.generateContent({
                  model: 'gemini-2.5-flash',
                  contents: identificationPrompt,
                  config: {
                      tools: [{ googleSearch: {} }],
                      temperature: 0
                  }
              });
              
              const foundName = idResponse.text?.trim();
              if (foundName && !foundName.toLowerCase().includes("unknown")) {
                  productName = foundName;
                  console.log("Barcode identified via AI:", productName);
              } else {
                  throw new Error("Produit non identifié par le code-barres.");
              }
          } catch (e) {
              console.error("Barcode lookup failed:", e);
              throw new Error("Impossible d'identifier le produit scanné. Essayez la recherche manuelle.");
          }
      }
  }

  // STEP 2: ANALYZE THE IDENTIFIED PRODUCT NAME
  const systemInstruction = `
    You are an expert pharmacist AI advisor. 
    Target Product: "${productName}".
    
    TASK: Analyze this specific product using Google Search to get real-time info.
    
    RULES:
    1. **REALITY CHECK**: PRODUCT NAMES MUST BE EXACT COMMERCIAL NAMES found on Google Search. 
       - NO HALLUCINATIONS.
       - **DO NOT INCLUDE CITATION MARKERS like [cite: 1], [source], etc. in the output text.**
    2. **PRICE**: 
       - For the SCANNED PRODUCT ("produit" and "produit_scanne"): FIND THE EXACT REAL-TIME PRICE on the official brand website. Format: "XX.XX€ (Site Officiel)". If not available, use major retailer.
       - For COMPETITORS: Keep approximate ranges (e.g., "15€ - 20€").
    3. **ROUTINE LOGIC (CRITICAL - STRICT NARRATIVE FLOW & REAL PRODUCTS)**: 
       - **CONTEXT AWARENESS**: Detect if the product is COSMETIC or MEDICAL/SUPPLEMENT.
       - **IF COSMETIC/SKINCARE**: Suggest a standard 3-step routine (Cleanse -> Treat/Product -> Protect). 
          - **MANDATORY**: For every product recommended in the routine, YOU MUST PERFORM A GOOGLE SEARCH to verify it exists. 
          - Use its **EXACT COMMERCIAL NAME** (e.g., "Effaclar Gel Moussant" not just "Gel nettoyant"). 
          - Favor **SAME BRAND** products if they exist.
       - **IF MEDICATION/SUPPLEMENT (e.g., Speciafoldine, Vitamins, Painkillers)**:
          - **NEVER** suggest skincare products (like cleansers) unless it is an acne medication.
          - **Step 1**: The Product itself (Compliance/Intake).
          - **Step 2**: Dietary advice (e.g., "Mangez des épinards/foie" for folic acid, "Hydratez-vous" for others).
          - **Step 3**: Lifestyle or Complementary habit (e.g., "Évitez l'alcool", "Protection solaire" if photosensitizing).
          - "nom" for Step 2/3 can be an action (e.g., "Alimentation Riche en Fer") instead of a commercial product.
          - "marque" can be "Conseil Hygiéno-Diététique".
       - **"role_dans_routine" MUST BE CONVERSATIONAL**: 
          - **STEP 1 MUST START WITH**: "Pour commencer..." or "Tout d'abord..." or "Dans un premier temps...".
          - **STEP 2 MUST START WITH**: "Ensuite..." or "Puis..." or "Dans un second temps...".
          - **STEP 3 MUST START WITH**: "Enfin..." or "Pour finir..." or "Pour terminer...".
          - Example: "Tout d'abord, prenez ce comprimé le matin pour..." -> "Ensuite, veillez à boire beaucoup d'eau..." -> "Enfin, évitez l'exposition..."
          - The text must be a full sentence explaining WHAT to do and WHY, like a human pharmacist speaking.
    4. **REVIEWS & CITATIONS**:
       - **TRANSLATION**: If a review is not in French, TRANSLATE IT and append "(Traduit de [Langue])".
       - **STRICT RELEVANCE**: Citations MUST come from the SCANNED PRODUCT'S reviews.
       - **PROHIBITED**: Do NOT use reviews from "similar products", competitors, or "brand in general". If the scanned product is Bioderma, do not quote a La Roche-Posay review.
       - **FALLBACK**: If no specific text quote is found for a sentiment (positive or negative), SYNTHESIZE a representative quote based on the recurring pros/cons identified, and set the author to "Synthèse Avis".
    5. **FAQ (PROACTIVE & VALUE ADDED)**:
       - **GENERATE EXACTLY 8 QUESTIONS**. 
       - **STRICTLY FORBIDDEN**: Generic questions like "Is the bottle recyclable?", "How often to use?", "Is it good?".
       - **GOAL**: Provide "Insider" info NOT visible in previous tabs.
       - **FOCUS ON**:
         - Specific chemical interactions (e.g., "Compatible avec le rétinol/Vitamine C ?").
         - Specific medical contexts often forgotten (e.g., "Compatible allaitement ?", "Post-acte chirurgical ?", "Rosacée vs Acné ?").
         - Ingredient technicalities (e.g., "Pourquoi l'alcool est-il présent ?", "Différence avec la version 'Riche' ?").
         - Stability/Storage (e.g., "Oxydation possible ?").
       - Questions must be unique to THIS product's specificities.
    6. **COMPARATIVE PROFILES**:
       - In "guide_achat_profils", ensure product names are wrapped in double asterisks like **ProductName** to be bolded.
    7. **OUTPUT**: VALID MINIFIED JSON only.
    
    SCHEMA:
    ${SCHEMA_JSON}
    `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Analyze this product: ${productName}`,
      config: {
        tools: [{ googleSearch: {} }],
        systemInstruction: systemInstruction,
        temperature: 0.1, 
      },
    });

    const text = response.text;
    if (!text) throw new Error("Empty response from Gemini");

    // Improved JSON extraction: Find the first '{' and the last '}'
    const startIndex = text.indexOf('{');
    const endIndex = text.lastIndexOf('}');

    if (startIndex === -1 || endIndex === -1) {
         console.error("Raw response:", text);
         throw new Error("No JSON object found in response");
    }

    let cleanedText = text.substring(startIndex, endIndex + 1);
    
    // Aggressive cleanup for any control characters inside the JSON block
    cleanedText = cleanedText.replace(/[\r\n\t]+/g, ' ');

    let data;
    try {
        data = JSON.parse(cleanedText);
    } catch (parseError) {
        console.error("JSON Parse Error:", parseError, "Cleaned Text:", cleanedText);
        throw new Error("Failed to parse JSON response.");
    }
    
    if (data.error) {
      throw new Error(data.error);
    }
    
    return data as ProductData;

  } catch (error) {
    console.error("Gemini API Error:", error);
    if (query.toLowerCase().includes('bioderma') || query.toLowerCase().includes('demo')) {
        return MOCK_PRODUCT_DATA;
    }
    throw error;
  }
}

// New Assistant function for the FAQ Chat
export async function askProductAssistant(question: string, productContext: ProductData): Promise<string> {
  if (!process.env.API_KEY) {
      return new Promise(resolve => setTimeout(() => resolve("Mode démo : Je ne peux répondre qu'aux questions sur ce produit (ex: conservation, allergènes...)."), 1000));
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const productName = productContext.produit.nom_complet;
  const category = productContext.produit.categorie;

  const systemInstruction = `
      You are ScanConsult Assistant, an expert pharmacist and beauty advisor.
      Current Product Context: "${productName}" (${category}).
      
      SCOPE & RULES:
      1. **CORE MISSION**: Help the user understand this product, but also help them CHOOSE and COMPARE.
      2. **EXPANDED SCOPE**:
         - You **ARE ALLOWED** to answer questions about **COMPETITORS**, **PRICE COMPARISONS**, **BRAND STRATEGIES**, or **ALTERNATIVE RECOMMENDATIONS**.
         - If a user asks "Why is Product X cheaper than this?", you MUST use your general knowledge to explain (e.g., ingredients quality, brand positioning, packaging).
         - If a user asks "What is a waterproof alternative?", you MUST suggest one based on your general knowledge of the market (e.g. "For a waterproof option, I recommend...").
         - **LIMIT**: Only refuse questions completely unrelated to Health, Beauty, Wellness, or the Pharmacy/Retail context (e.g. Politics, Sports, Coding).
      3. **TONE**: Professional, helpful, concise, warm.
      4. **FORMATTING**: 
         - **Layout**: USE MANY LINE BREAKS. Short paragraphs.
         - **Bolding**: You MUST bold (**text**) the product name "${productName}", any other commercial product names, and key active ingredients.
         - **Lists**: Use bullet points (- item) for lists of effects or advice.
      5. **LANGUAGE**: French only.
      
      PRODUCT DATA (Use this for specific questions about the scanned item):
      ${JSON.stringify(productContext.produit)}
      ${JSON.stringify(productContext.cibles)}
      ${JSON.stringify(productContext.faq)}
  `;

  try {
      const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash', // Fast model for chat
          contents: question,
          config: {
              systemInstruction: systemInstruction,
              temperature: 0.3
          }
      });
      return response.text || "Je n'ai pas pu générer de réponse.";
  } catch (e) {
      console.error(e);
      return "Désolé, le service d'assistance est momentanément indisponible.";
  }
}

export async function askExpertComplex(question: string, context: ProductData): Promise<string> {
    if (!process.env.API_KEY) return "Mode démo : Réponse simulée de l'expert.";
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-3-pro-preview',
            contents: `Context Product: ${JSON.stringify(context.produit)}. User Question: ${question}`,
            config: { thinkingConfig: { thinkingBudget: 2048 } }
        });
        return response.text || "Je n'ai pas pu générer de réponse.";
    } catch (e) {
        return "Désolé, le service expert est indisponible.";
    }
}
