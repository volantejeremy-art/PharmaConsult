
export interface CompetitorData {
  nom: string;
  marque: string;
  prix: string; // Changed to string for price ranges
  contenance: string;
  prix_au_litre: string;
  actifs_principaux: string[];
  texture: string;
  parfum: string;
  usage_recommande: string; // New field for comparison table
  description_detaillee: string; // New field for detailed guide
  labels: string[];
  points_forts: string[];
  points_faibles: string[];
  // note_rapport_qualite_prix removed
}

export interface RoutineItem {
  etape: number;
  nom: string;
  marque: string;
  prix_approx: string;
  role_dans_routine: string; // Tagline: Why this step relative to the scanned product?
  benefice_produit: string; // Specific product benefit
  is_current_product: boolean; // Flag to identify if this is the scanned product
}

export interface ReviewHighlight {
  topic: string;
  percentage: number;
}

export interface ReviewCitation {
  text: string;
  author: string;
}

export interface ProductData {
  produit: {
    nom_complet: string;
    marque: string;
    categorie: string;
    format: string;
    prix_conseille: string; // Changed to string for price ranges
    image_url: string | null;
    resume: string;
    caracteristiques_cles: string[]; // New: List of key features (e.g. "Sans silicone", "Bio")
    composition_cles: string[]; // Ingredients
    labels: string[];
  };
  cibles: {
    public_ideal: Array<{ profil: string; raison: string }>;
    public_deconseille: Array<{ profil: string; raison: string; severite: "attention" | "deconseille" | "contre-indique" }>;
  };
  conseils_utilisation: {
    mode_emploi: string;
    frequence: string;
    moment_ideal: string;
    quantite: string;
    duree_resultats: string;
    astuce_pro: string;
  };
  precautions: string[]; // New: General usage warnings separate from profiles
  synergie_routine: {
    description_generale: string;
    etapes: RoutineItem[]; // Always 3 items
  };
  comparatif: {
    concurrent_1: CompetitorData;
    produit_scanne: CompetitorData;
    concurrent_2: CompetitorData;
    synthese_globale: string;
    guide_achat_profils: string; // New: Persona-based recommendation summary
  };
  avis_consommateurs: {
    note_moyenne: number;
    nombre_avis: number;
    sources: string[];
    repartition: {
      positifs_pct: number;
      neutres_pct: number;
      negatifs_pct: number;
    };
    points_positifs_recurrents: ReviewHighlight[];
    points_negatifs_recurrents: ReviewHighlight[];
    citation_positive: ReviewCitation;
    citation_negative: ReviewCitation;
  };
  faq: Array<{ question: string; reponse: string; source?: string }>;
}

export type AppView = 'HOME' | 'SCANNER' | 'RESULTS';
export type ResultTab = 'OVERVIEW' | 'COMPARE' | 'REVIEWS' | 'FAQ';

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}
