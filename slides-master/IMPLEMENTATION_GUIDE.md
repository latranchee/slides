# Implementation Guide: Adding New Slides

## Overview
This guide will help you add 12 new slides to the presentation based on the updated script content.

**Total new slides:** 12
**Current slide count:** 50
**New slide count:** 62

---

## Step 1: Add Custom Renderer for Tech Table

First, add the `tech-table` case to `/src/components/SlideRenderer.jsx`

### Location: In the `renderContent()` switch statement

```javascript
case 'tech-table':
  return (
    <div className="space-y-6">
      {content.heading && <H2>{content.heading}</H2>}

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-300">
              <th className="text-left p-3 font-semibold text-sm bg-gray-50">Technologie</th>
              <th className="text-left p-3 font-semibold text-sm bg-gray-50">Usage habituel</th>
              <th className="text-left p-3 font-semibold text-sm bg-gray-50">Rôle dans le studio</th>
            </tr>
          </thead>
          <tbody>
            {content.rows?.map((row, idx) => (
              <tr key={idx} className="border-b border-gray-200 hover:bg-gray-50 transition-colors">
                <td className="p-3 font-semibold text-sm text-accent">{row.tech}</td>
                <td className="p-3 text-xs text-gray-600">{row.normal_use}</td>
                <td className="p-3 text-xs text-gray-700">{row.studio_role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {content.footer && (
        <p className="text-center text-sm text-gray-600 italic mt-4">{content.footer}</p>
      )}
    </div>
  );
```

---

## Step 2: Insert New Slides into slidesConfig.json

### Insertion Order (by slide number)

**After Slide 10** (newsletter-impact) → Insert 3 slides:
1. Communication Externe table
2. Communication Interne table
3. "Video not just social" quote

**After NEW Slide 13** (which is now after the 3 above) → Industry Adoption stays as is

**After Slide 38** (accessibility) → Insert 4 slides:
1. "Vous n'avez aucune idée..." quote (tech intro)
2. Technology Stack table (15 rows)
3. Passion Quadrants (4-grid)
4. Client Goals (4-grid)

**After Slide 41** (token-system) → Insert 3 slides:
1. Pricing Packages grid
2. Aligned Incentives (3 features)
3. Booking Interface (optional image slide)

**After Slide 43** (who-am-i) → Insert 1 slide:
1. Early Career (4-item numbered grid)

**Existing Slide 44** (timeline) → Prepend 3 events to beginning

---

## Step 3: Detailed JSON Insertion

### 3.1 After Slide 10 (newsletter-impact)

Find this slide in `slidesConfig.json`:
```json
{
  "id": "newsletter-impact",
  "type": "stats-grid",
  ...
},
```

**Insert AFTER the closing bracket and comma:**

```json
{
  "id": "communication-externe",
  "type": "multi-section",
  "background": {
    "type": "color",
    "value": "#FFFFFF"
  },
  "content": {
    "heading": "Communication Externe",
    "sections": [
      {
        "title": "Acquisition",
        "items": [
          "• Reels et contenu social",
          "• Publicités vidéo",
          "• Formation en ligne pour lead gen",
          "• Contenu organique pour cultiver une audience"
        ],
        "description": "Se faire connaître, générer des leads, construire une présence sur les médias sociaux"
      },
      {
        "title": "Vente",
        "items": [
          "• Vidéos de présentation produit",
          "• Unboxing et démonstrations",
          "• Témoignages clients",
          "• Pages de vente vidéo"
        ],
        "description": "Augmenter la conversion, répondre aux objections, démontrer la valeur"
      },
      {
        "title": "Rétention",
        "items": [
          "• Webinaires exclusifs",
          "• Contenu éducatif continu (podcast)",
          "• Tutoriels support après-vente",
          "• Mise à jour produit/service"
        ],
        "description": "Garder les clients informés, faciliter l'utilisation, fidéliser"
      }
    ]
  }
},
{
  "id": "communication-interne",
  "type": "multi-section",
  "background": {
    "type": "color",
    "value": "#FFFFFF"
  },
  "content": {
    "heading": "Communication Interne",
    "sections": [
      {
        "title": "HR",
        "items": [
          "• Vidéos d'onboarding",
          "• Processus de recrutement",
          "• Culture d'entreprise",
          "• Formation continue"
        ],
        "description": "Accélérer l'intégration des nouveaux employés, attirer les talents, standardiser la formation"
      },
      {
        "title": "Investisseurs",
        "items": [
          "• Pitch deck vidéo",
          "• Mise à jour trimestrielle",
          "• Vision et roadmap",
          "• Résultats et métriques"
        ],
        "description": "Communiquer la vision, transparence financière, lever des fonds"
      },
      {
        "title": "Opérations",
        "items": [
          "• SOPs enregistrés",
          "• Procédures techniques",
          "• Best practices",
          "• Documentation processus"
        ],
        "description": "Former les employés, standardiser les processus, réduire les erreurs, faciliter le scaling"
      }
    ]
  }
},
{
  "id": "video-not-just-social",
  "type": "quote",
  "background": {
    "type": "color",
    "value": "#FFFFFF"
  },
  "content": {
    "quote": "La vidéo n'est pas juste un \"nice to have\" pour les médias sociaux. C'est un outil qui permet d'améliorer <span class=\"text-accent\">chaque aspect</span> d'une entreprise."
  }
},
```

---

### 3.2 After Slide 38 (accessibility)

Find this slide:
```json
{
  "id": "accessibility",
  "type": "quote",
  ...
},
```

**Insert AFTER:**

```json
{
  "id": "tech-stack-intro",
  "type": "quote",
  "background": {
    "type": "color",
    "value": "#FFFFFF"
  },
  "content": {
    "quote": "Vous n'avez aucune idée à quel point c'est compliqué de rendre les choses <span class=\"text-accent\">simples</span>."
  }
},
{
  "id": "technology-stack",
  "type": "tech-table",
  "background": {
    "type": "color",
    "value": "#FFFFFF"
  },
  "content": {
    "heading": "Technologies orchestrées en un seul système",
    "rows": [
      {
        "tech": "Dante",
        "normal_use": "Routage audio pro (églises, théâtres, broadcast)",
        "studio_role": "Matrice audio IP entre micros, interfaces et ordis"
      },
      {
        "tech": "Art-Net/DMX",
        "normal_use": "Contrôle d'éclairage de spectacles",
        "studio_role": "Pilotage des lumières depuis l'automatisation"
      },
      {
        "tech": "NDI",
        "normal_use": "Transport vidéo IP (broadcast/studio)",
        "studio_role": "Flux caméras / capture d'écran sans fil"
      },
      {
        "tech": "vMix",
        "normal_use": "Diffusion/production broadcast",
        "studio_role": "Commutation, enregistrement, titres; contrôle via API"
      },
      {
        "tech": "Home Assistant",
        "normal_use": "Automatisation résidentielle",
        "studio_role": "Orchestrateur: scènes, états, horaires, webhooks"
      },
      {
        "tech": "MQTT",
        "normal_use": "Bus M2M/IIoT",
        "studio_role": "Événements/commandes temps réel entre tous les modules"
      },
      {
        "tech": "Zigbee & Z-Wave",
        "normal_use": "Protocoles IoT bas débit",
        "studio_role": "Capteurs, relais et prises intégrés à HA"
      },
      {
        "tech": "ESP32/Arduino",
        "normal_use": "Électronique sur mesure",
        "studio_role": "Nœuds I/O: moteurs/steppers, relais, capteurs"
      },
      {
        "tech": "NSSM (Services Windows)",
        "normal_use": "Wrapper de services",
        "studio_role": "Démarre/monitore des daemons qui parlent MQTT"
      },
      {
        "tech": "Onshape",
        "normal_use": "Plateforme CAD 3D",
        "studio_role": "Conception des pièces/mécanismes"
      },
      {
        "tech": "Impression 3D",
        "normal_use": "Prototypage",
        "studio_role": "Pièces pour caméras robotisées (pan/tilt/axe Z)"
      },
      {
        "tech": "Profilés d'alu extrudé (T-slot)",
        "normal_use": "Châssis/DIY industriel",
        "studio_role": "Structure modulaire des rigs et supports"
      },
      {
        "tech": "Strapi",
        "normal_use": "Headless CMS",
        "studio_role": "Backend/API pour presets, scènes, assets"
      },
      {
        "tech": "Vue.js / Nuxt",
        "normal_use": "Framework web",
        "studio_role": "UI opérateur et panneaux de contrôle"
      },
      {
        "tech": "Discourse",
        "normal_use": "Forum/communauté",
        "studio_role": "Support, feedback, doc vivante"
      }
    ],
    "footer": "Tout ça, orchestré en un seul système cohérent et automatisé."
  }
},
{
  "id": "passion-quadrants",
  "type": "icon-grid",
  "background": {
    "type": "color",
    "value": "#FFFFFF"
  },
  "content": {
    "heading": "Ce projet me permet de mélanger",
    "items": [
      {
        "iconName": "Camera",
        "title": "Côté artiste",
        "description": "de vidéaste"
      },
      {
        "iconName": "Code",
        "title": "Côté geek",
        "description": "programmeur/ingénieur"
      },
      {
        "iconName": "Wrench",
        "title": "Côté manuel",
        "description": "pour faire les studios"
      },
      {
        "iconName": "Heart",
        "title": "Côté humain",
        "description": "design d'expérience"
      }
    ],
    "columns": 2
  }
},
{
  "id": "client-goals",
  "type": "icon-grid",
  "background": {
    "type": "color",
    "value": "#FFFFFF"
  },
  "content": {
    "heading": "Pour créer un système qui permet aux entreprises de créer",
    "items": [
      {
        "iconName": "Sparkles",
        "title": "La plus belle vidéo possible"
      },
      {
        "iconName": "Zap",
        "title": "Le plus vite possible"
      },
      {
        "iconName": "Smile",
        "title": "Avec le moins de casse-tête possible"
      },
      {
        "iconName": "DollarSign",
        "title": "Le moins cher possible"
      }
    ],
    "columns": 2
  }
},
```

---

### 3.3 After Slide 41 (token-system)

Find this slide:
```json
{
  "id": "token-system",
  "type": "multi-section",
  ...
},
```

**Insert AFTER:**

```json
{
  "id": "pricing-packages",
  "type": "cost-list",
  "background": {
    "type": "color",
    "value": "#FFFFFF"
  },
  "content": {
    "heading": "Forfaits d'abonnement",
    "subheading": "1 jeton = 1 bloc de 5 heures",
    "items": [
      {
        "description": "Forfait Découverte (X jetons/mois)",
        "amount": "XX$/mois (24.91$/h)",
        "highlight": false
      },
      {
        "description": "Forfait Standard (X jetons/mois)",
        "amount": "XX$/mois (XX.XX$/h)",
        "highlight": false
      },
      {
        "description": "Forfait Pro (X jetons/mois)",
        "amount": "XX$/mois (12.48$/h)",
        "highlight": true
      }
    ],
    "footer": "TODO: Fill in actual pricing from image at line 374 of script"
  }
},
{
  "id": "aligned-incentives",
  "type": "feature-list",
  "background": {
    "type": "color",
    "value": "#FFFFFF"
  },
  "content": {
    "heading": "Incitatifs alignés",
    "features": [
      {
        "iconName": "TrendingDown",
        "title": "Utilisation fréquente = prix plus bas",
        "description": "Si tu vas au studio une fois par semaine, tu n'auras presque jamais besoin de support"
      },
      {
        "iconName": "Clock",
        "title": "Pas de stress de temps",
        "description": "5 heures par bloc. Invité en retard? Pas de problème. Prends ton temps pour tester."
      },
      {
        "iconName": "Calendar",
        "title": "Réserver est simple",
        "description": "Tu choisis ton bloc, tu réserves. Accès autonome, pas de réceptionniste."
      }
    ]
  }
},
{
  "id": "booking-interface",
  "type": "image-text",
  "background": {
    "type": "color",
    "value": "#FFFFFF"
  },
  "content": {
    "heading": "Système de réservation",
    "body": "Interface simple. Choisis ton bloc (matin, après-midi, soir). Réserve. C'est fait.",
    "imagePlaceholder": "Screenshot du système de réservation"
  }
},
```

---

### 3.4 After Slide 43 (who-am-i)

Find this slide:
```json
{
  "id": "who-am-i",
  "type": "image-text",
  ...
},
```

**Insert AFTER:**

```json
{
  "id": "early-career",
  "type": "numbered-grid",
  "background": {
    "type": "color",
    "value": "#FFFFFF"
  },
  "content": {
    "heading": "Les débuts (2003-2012)",
    "items": [
      {
        "number": "1",
        "text": "McDonald's - Premier emploi, apprendre à servir des clients"
      },
      {
        "number": "2",
        "text": "WETS (2007) - Première entreprise à 16 ans. E-commerce porte-à-porte"
      },
      {
        "number": "3",
        "text": "Consultant freelance - Sites web et graphisme pendant les études"
      },
      {
        "number": "4",
        "text": "Blogue (2012) - Partage hebdomadaire de résultats clients"
      }
    ]
  }
},
```

---

### 3.5 Update Slide 44 (timeline)

Find the timeline slide and **prepend** these events to the beginning of the `events` array:

```json
{
  "year": "2003",
  "title": "McDonald's",
  "description": "Premier emploi",
  "highlight": false
},
{
  "year": "2007",
  "title": "WETS - Web en Toute Sécurité",
  "description": "E-commerce porte-à-porte à 16 ans",
  "highlight": true
},
{
  "year": "2007-2012",
  "title": "Consultant freelance",
  "description": "Sites web, graphisme",
  "highlight": false
},
```

---

## Step 4: Test the Implementation

1. Save all changes to `slidesConfig.json` and `SlideRenderer.jsx`
2. Refresh the dev server (may need restart for JSON changes)
3. Navigate through the presentation
4. Check these specific slides:
   - New slides 11-13 (Communication tables)
   - New slides 39-42 (Tech stack area)
   - New slides 42-44 (Pricing area)
   - New slide 44 (Early career)
   - Updated slide 45+ (Timeline with early events)

---

## Step 5: Fill in Missing Data

### TODO Items:

1. **Pricing Packages (Slide ~42):**
   - Extract actual pricing tiers from image: `https://imagedelivery.net/ol_zAKtUVN9EF_zwuf9Wxw/3db0ea3c-abac-4ccd-bb29-0569b92d9b00/sm`
   - Fill in:
     - Package names
     - Number of tokens per month
     - Monthly prices
     - Hourly rates

2. **Booking Interface (Slide ~44):**
   - Optional: Replace image placeholder with actual screenshot
   - Or keep as text-only slide

---

## Step 6: Update HANDOFF.md

After implementation, update the handoff document:
- New slide count: 62 (was 50)
- Document new slide types: `tech-table`
- Update testing checklist with new slides

---

## Troubleshooting

### If multi-section doesn't render tables properly:

The Communication Externe/Interne slides use `multi-section` type. If they don't look good, you have two options:

**Option A:** Create a custom `table-sections` type in SlideRenderer.jsx

**Option B:** Use the simpler approach and convert to `list-grid` with title/subtitle structure

### If tech-table is too cramped:

- Reduce font sizes further (text-xs → text-[10px])
- Split into 2 slides (rows 1-8, rows 9-15)
- Make the container scrollable: `overflow-y-auto max-h-[600px]`

---

## Quick Reference: Slide Number Changes

After adding 12 new slides, the numbering shifts:

| Old Slide # | Old ID | New Slide # | Notes |
|-------------|--------|-------------|-------|
| 11 | industry-adoption | 14 | +3 slides added before |
| 38 | accessibility | 41 | +3 slides added before |
| 39 | business-model-title | 46 | +3 before, +4 after accessibility |
| 41 | token-system | 48 | +7 slides added before |
| 42 | onboarding-mandatory | 52 | +10 slides added before |
| 43 | who-am-i | 53 | +10 slides added before |
| 44 | timeline | 55 | +11 slides added before, +3 events prepended |
| 50 | thank-you | 62 | Final slide |

---

## Summary

**New Slides Added:** 12
- 3 after slide 10 (Communication tables)
- 4 after slide 38 (Tech stack area)
- 3 after slide 41 (Pricing)
- 1 after slide 43 (Early career)
- 0 new but updated slide 44 (Timeline events)

**New Slide Types:**
- `tech-table` (custom renderer required)

**Total Presentation Length:** 62 slides

**Estimated Implementation Time:** 1-2 hours
