// Tarification des transports assis conventionnés (taxi CPAM) — convention-cadre
// nationale du 13 mai 2025 (annexe tarifaire). Source : convention CNAM 2025.
// Moteur partagé site + bot. Aucune donnée patient ici : calcul paramétrique pur.

export interface Departement { code: string; name: string; km: number }

/** Tarif kilométrique départemental (€/km), facturé à partir du 5e km. Plancher 1,07 €. */
export const DEPARTEMENTS: Departement[] = [
  { code: "01", name: "Ain", km: 1.13 },
  { code: "02", name: "Aisne", km: 1.2 },
  { code: "03", name: "Allier", km: 1.19 },
  { code: "04", name: "Alpes-de-Haute-Provence", km: 1.14 },
  { code: "05", name: "Hautes-Alpes", km: 1.18 },
  { code: "06", name: "Alpes-Maritimes", km: 1.27 },
  { code: "07", name: "Ardèche", km: 1.17 },
  { code: "08", name: "Ardennes", km: 1.17 },
  { code: "09", name: "Ariège", km: 1.15 },
  { code: "10", name: "Aube", km: 1.13 },
  { code: "11", name: "Aude", km: 1.08 },
  { code: "12", name: "Aveyron", km: 1.16 },
  { code: "13", name: "Bouches-du-Rhône", km: 1.1 },
  { code: "14", name: "Calvados", km: 1.07 },
  { code: "15", name: "Cantal", km: 1.13 },
  { code: "16", name: "Charente", km: 1.12 },
  { code: "17", name: "Charente-Maritime", km: 1.1 },
  { code: "18", name: "Cher", km: 1.26 },
  { code: "19", name: "Corrèze", km: 1.16 },
  { code: "21", name: "Côte-d'Or", km: 1.12 },
  { code: "22", name: "Côtes-d'Armor", km: 1.13 },
  { code: "23", name: "Creuse", km: 1.18 },
  { code: "24", name: "Dordogne", km: 1.11 },
  { code: "25", name: "Doubs", km: 1.08 },
  { code: "26", name: "Drôme", km: 1.16 },
  { code: "27", name: "Eure", km: 1.21 },
  { code: "28", name: "Eure-et-Loir", km: 1.19 },
  { code: "29", name: "Finistère", km: 1.07 },
  { code: "2A", name: "Corse-du-Sud", km: 1.27 },
  { code: "2B", name: "Haute-Corse", km: 1.27 },
  { code: "30", name: "Gard", km: 1.08 },
  { code: "31", name: "Haute-Garonne", km: 1.1 },
  { code: "32", name: "Gers", km: 1.19 },
  { code: "33", name: "Gironde", km: 1.07 },
  { code: "34", name: "Hérault", km: 1.07 },
  { code: "35", name: "Ille-et-Vilaine", km: 1.07 },
  { code: "36", name: "Indre", km: 1.25 },
  { code: "37", name: "Indre-et-Loire", km: 1.18 },
  { code: "38", name: "Isère", km: 1.22 },
  { code: "39", name: "Jura", km: 1.11 },
  { code: "40", name: "Landes", km: 1.13 },
  { code: "41", name: "Loir-et-Cher", km: 1.13 },
  { code: "42", name: "Loire", km: 1.08 },
  { code: "43", name: "Haute-Loire", km: 1.24 },
  { code: "44", name: "Loire-Atlantique", km: 1.08 },
  { code: "45", name: "Loiret", km: 1.07 },
  { code: "46", name: "Lot", km: 1.13 },
  { code: "47", name: "Lot-et-Garonne", km: 1.11 },
  { code: "48", name: "Lozère", km: 1.25 },
  { code: "49", name: "Maine-et-Loire", km: 1.08 },
  { code: "50", name: "Manche", km: 1.16 },
  { code: "51", name: "Marne", km: 1.12 },
  { code: "52", name: "Haute-Marne", km: 1.26 },
  { code: "53", name: "Mayenne", km: 1.09 },
  { code: "54", name: "Meurthe-et-Moselle", km: 1.09 },
  { code: "55", name: "Meuse", km: 1.12 },
  { code: "56", name: "Morbihan", km: 1.07 },
  { code: "57", name: "Moselle", km: 1.14 },
  { code: "58", name: "Nièvre", km: 1.27 },
  { code: "59", name: "Nord", km: 1.2 },
  { code: "60", name: "Oise", km: 1.2 },
  { code: "61", name: "Orne", km: 1.17 },
  { code: "62", name: "Pas-de-Calais", km: 1.2 },
  { code: "63", name: "Puy-de-Dôme", km: 1.08 },
  { code: "64", name: "Pyrénées-Atlantiques", km: 1.14 },
  { code: "65", name: "Hautes-Pyrénées", km: 1.07 },
  { code: "66", name: "Pyrénées-Orientales", km: 1.18 },
  { code: "67", name: "Bas-Rhin", km: 1.07 },
  { code: "68", name: "Haut-Rhin", km: 1.07 },
  { code: "69", name: "Rhône", km: 1.07 },
  { code: "70", name: "Haute-Saône", km: 1.08 },
  { code: "71", name: "Saône-et-Loire", km: 1.1 },
  { code: "72", name: "Sarthe", km: 1.07 },
  { code: "73", name: "Savoie", km: 1.15 },
  { code: "74", name: "Haute-Savoie", km: 1.22 },
  { code: "75", name: "Paris", km: 1.22 },
  { code: "76", name: "Seine-Maritime", km: 1.18 },
  { code: "77", name: "Seine-et-Marne", km: 1.07 },
  { code: "78", name: "Yvelines", km: 1.07 },
  { code: "79", name: "Deux-Sèvres", km: 1.08 },
  { code: "80", name: "Somme", km: 1.15 },
  { code: "81", name: "Tarn", km: 1.07 },
  { code: "82", name: "Tarn-et-Garonne", km: 1.07 },
  { code: "83", name: "Var", km: 1.16 },
  { code: "84", name: "Vaucluse", km: 1.2 },
  { code: "85", name: "Vendée", km: 1.07 },
  { code: "86", name: "Vienne", km: 1.11 },
  { code: "87", name: "Haute-Vienne", km: 1.1 },
  { code: "88", name: "Vosges", km: 1.1 },
  { code: "89", name: "Yonne", km: 1.11 },
  { code: "90", name: "Territoire-de-Belfort", km: 1.08 },
  { code: "91", name: "Essonne", km: 1.07 },
  { code: "92", name: "Hauts-de-Seine", km: 1.07 },
  { code: "93", name: "Seine-Saint-Denis", km: 1.07 },
  { code: "94", name: "Val-de-Marne", km: 1.07 },
  { code: "95", name: "Val-d'Oise", km: 1.07 },
  { code: "971", name: "Guadeloupe", km: 1.07 },
  { code: "972", name: "Martinique", km: 1.2 },
  { code: "973", name: "Guyane", km: 1.1 },
  { code: "974", name: "Réunion", km: 1.22 },
  { code: "976", name: "Mayotte", km: 1.1 },
]

// Constantes socle
export const FORFAIT_PRISE_EN_CHARGE = 13   // € — inclut les 4 premiers km
export const FORFAIT_GRANDE_VILLE = 15      // € — départ ou dépose en grande ville
export const SUPP_TPMR = 30                 // € — véhicule TPMR équipé
export const SUPP_DROM = 3                  // € — ADS en outre-mer
export const KM_INCLUS = 4                  // premiers km inclus dans le forfait

// Villes éligibles au forfait « Grande ville » (+ départements 92/93/94)
export const GRANDES_VILLES = [
  "Marseille", "Paris", "Nice", "Toulouse", "Lyon", "Strasbourg",
  "Montpellier", "Rennes", "Bordeaux", "Lille", "Grenoble", "Nantes",
]

export interface SimInput {
  deptCode: string
  km: number                 // distance parcourue en charge (km)
  grandeVille: boolean       // prise en charge / dépose en grande ville
  hospVide: boolean          // hospitalisation avec aller ou retour à vide
  nuitWeekendFerie: boolean  // 20h-8h, samedi dès 12h, dimanche ou férié
  patients: number           // nb de patients dans le véhicule (1 = non partagé)
  tpmr: boolean              // supplément TPMR
  peagesEur: number          // frais de péage (€)
}

export interface SimLine { label: string; amount: number }
export interface SimResult { lines: SimLine[]; total: number; details: Record<string, number> }

function abattementPartage(patients: number): number {
  if (patients >= 4) return 0.37
  if (patients === 3) return 0.35
  if (patients === 2) return 0.23
  return 0
}

const r2 = (n: number) => Math.round(n * 100) / 100

/** Calcule le tarif conventionné pour LE patient simulé (facture par patient). */
export function computeTarif(input: SimInput): SimResult {
  const dep = DEPARTEMENTS.find(d => d.code === input.deptCode) ?? DEPARTEMENTS[0]
  const isDrom = input.deptCode.length === 3
  const km = Math.max(0, input.km)
  const kmFactures = Math.max(0, km - KM_INCLUS)

  // Tarif km (avec majoration hospitalisation aller/retour à vide)
  let tarifKm = dep.km
  if (input.hospVide) tarifKm *= km < 50 ? 1.25 : 1.5

  const forfait = FORFAIT_PRISE_EN_CHARGE
  const grandeVille = input.grandeVille ? FORFAIT_GRANDE_VILLE : 0
  const kmCost = tarifKm * kmFactures

  // Socle, puis majoration nuit/WE/férié (×1,5 sur tout le socle)
  let socle = forfait + grandeVille + kmCost
  const majNuit = input.nuitWeekendFerie ? socle * 0.5 : 0
  socle += majNuit

  // Abattement transport partagé (sur le socle, hors suppléments)
  const tauxAbat = abattementPartage(input.patients)
  const abattement = socle * tauxAbat
  const socleApresAbat = socle - abattement

  // Suppléments (hors abattement) — péages divisés par nb de patients si partagé
  const tpmr = input.tpmr ? SUPP_TPMR : 0
  const drom = isDrom ? SUPP_DROM : 0
  const peages = input.patients > 1 ? input.peagesEur / input.patients : input.peagesEur

  const total = r2(socleApresAbat + tpmr + drom + peages)

  const lines: SimLine[] = [
    { label: "Forfait prise en charge (4 km inclus)", amount: r2(forfait) },
  ]
  if (grandeVille) lines.push({ label: "Forfait Grande ville", amount: r2(grandeVille) })
  if (kmFactures > 0) lines.push({
    label: `Tarif km — ${kmFactures} km × ${r2(tarifKm)} €${input.hospVide ? " (majoré hosp.)" : ""}`,
    amount: r2(kmCost),
  })
  if (majNuit) lines.push({ label: "Majoration nuit / week-end / férié (+50 %)", amount: r2(majNuit) })
  if (abattement) lines.push({ label: `Abattement transport partagé (−${Math.round(tauxAbat * 100)} %)`, amount: -r2(abattement) })
  if (tpmr) lines.push({ label: "Supplément TPMR", amount: r2(tpmr) })
  if (drom) lines.push({ label: "Supplément DROM", amount: r2(drom) })
  if (peages) lines.push({ label: input.patients > 1 ? "Péages (÷ patients)" : "Péages", amount: r2(peages) })

  return {
    lines,
    total,
    details: { socle: r2(socle), abattement: r2(abattement), tpmr, drom, peages: r2(peages) },
  }
}
