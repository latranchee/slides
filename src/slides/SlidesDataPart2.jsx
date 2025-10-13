import React from 'react';
import { H1, H2, H3, Body, Quote, Number } from '../components/base/Typography';
import StatCard from '../components/base/StatCard';
import IconGrid from '../components/base/IconGrid';
import ComparisonBar from '../components/charts/ComparisonBar';
import Timeline from '../components/charts/Timeline';
import {
  Video,
  Camera,
  Mic,
  Monitor,
  Sun,
  Zap,
  Users,
  DollarSign,
  Clock,
  Award,
  BookOpen,
  Podcast,
  Building,
  TrendingUp,
  CheckCircle,
} from 'lucide-react';

export const slidesDataPart2 = [
  // ========== SECTION 9: LES BUNKERS SOLUTION ==========
  {
    id: 'enter-bunkers',
    background: 'bg-primary',
    content: (
      <div className="flex flex-col items-center justify-center h-full p-16 text-center">
        <H1 className="text-white mb-8">Les Bunkers</H1>
        <H2 className="text-white">Une entreprise qui ne fait aucun sens... entre en jeu</H2>
      </div>
    ),
  },

  {
    id: 'elevator-pitch',
    background: 'bg-white',
    content: (
      <div className="flex flex-col justify-center h-full p-16">
        <H2 className="mb-8 text-center">L'Elevator Pitch</H2>
        <Body size="lg" className="max-w-4xl mx-auto leading-relaxed text-center">
          Les Bunkers, c'est un réseau de studios d'enregistrement vidéo intelligents, conçus spécialement pour permettre aux PME québécoises de créer du contenu de très haute qualité en un temps record — aucune compétence technique requise.
        </Body>
      </div>
    ),
  },

  {
    id: 'bunkers-features',
    background: 'bg-white',
    content: (
      <div className="flex flex-col justify-center h-full p-16">
        <H2 className="mb-12 text-center">Caractéristiques</H2>
        <IconGrid
          items={[
            { icon: <Camera size={48} />, title: '4 caméras 4K', description: 'Enregistrement simultané' },
            { icon: <Mic size={48} />, title: 'Micros pro', description: 'Audio de qualité studio' },
            { icon: <Monitor size={48} />, title: 'Téléprompteur', description: 'Pour lecture de scripts' },
            { icon: <Sun size={48} />, title: 'Éclairage pro', description: 'Toujours parfait' },
            { icon: <Video size={48} />, title: 'Écran vert', description: 'Arrière-plans personnalisés' },
            { icon: <Zap size={48} />, title: 'Un bouton', description: 'Prêt à enregistrer' },
          ]}
          columns={3}
        />
      </div>
    ),
  },

  {
    id: 'use-cases',
    background: 'bg-white',
    content: (
      <div className="flex flex-col justify-center h-full p-16">
        <H2 className="mb-12 text-center">Cas d'usage</H2>
        <div className="grid grid-cols-2 gap-6 max-w-4xl mx-auto">
          {[
            'Webinaires',
            'Cours en ligne',
            'Podcasts',
            'Démonstrations produits',
            'Publicités',
            'Vidéos de vente',
          ].map((useCase, i) => (
            <div key={i} className="bg-accent/5 p-6 rounded-xl border-2 border-accent/20 text-center">
              <Body size="lg" className="font-semibold">{useCase}</Body>
            </div>
          ))}
        </div>
      </div>
    ),
  },

  {
    id: 'the-price',
    background: 'bg-primary',
    content: (
      <div className="flex flex-col items-center justify-center h-full p-16 text-center">
        <H2 className="mb-4 text-white">Tout cela, à partir de seulement</H2>
        <div className="text-9xl font-mono font-bold text-accent mb-4">12.48$/h</div>
        <Body className="text-white text-2xl">
          15× moins cher qu'un studio de podcast<br />
          50× moins cher qu'une équipe de tournage
        </Body>
      </div>
    ),
  },

  {
    id: 'no-catch',
    background: 'bg-accent',
    content: (
      <div className="flex flex-col items-center justify-center h-full p-16 text-center">
        <H1 className="text-white mb-8">Il n'y a PAS de pogne!</H1>
        <Body size="lg" className="text-white text-2xl">
          C'est probablement la seule fois de votre vie que vous allez voir une offre trop belle pour être vraie qui est actuellement vraie!
        </Body>
      </div>
    ),
  },

  {
    id: 'smart-features',
    background: 'bg-white',
    content: (
      <div className="flex flex-col justify-center h-full p-16">
        <H2 className="mb-12 text-center">Studio intelligent</H2>
        <div className="space-y-6 max-w-4xl mx-auto">
          {[
            { icon: <Users size={32} />, title: 'Reconnaissance utilisateur', desc: 'Le studio te reconnaît et charge tes préférences' },
            { icon: <Zap size={32} />, title: 'Configuration automatique', desc: 'Caméras et éclairage s\'ajustent automatiquement' },
            { icon: <Monitor size={32} />, title: 'Interface tactile', desc: 'Contrôle complet de tous les éléments' },
            { icon: <CheckCircle size={32} />, title: 'Récupération automatique', desc: 'Redémarre et tout fonctionne' },
          ].map((feature, i) => (
            <div key={i} className="flex items-start gap-6 p-6 bg-gray-50 rounded-xl">
              <div className="text-accent flex-shrink-0">{feature.icon}</div>
              <div>
                <H3 className="mb-2">{feature.title}</H3>
                <Body>{feature.desc}</Body>
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
  },

  {
    id: 'accessibility',
    background: 'bg-white',
    content: (
      <div className="flex flex-col items-center justify-center h-full p-16">
        <Quote>
          C'est tellement simple que j'ai même plusieurs retraités qui s'en servent! Et je me fais souvent dire "Wow, jamais de ma vie je pensais que j'allais être capable de faire des vidéos comme ça!"
        </Quote>
      </div>
    ),
  },

  // ========== SECTION 10: BUSINESS MODEL ==========
  {
    id: 'business-model-title',
    background: 'bg-white',
    content: (
      <div className="flex flex-col items-center justify-center h-full p-16 text-center">
        <H1 className="mb-8">Le modèle d'affaires</H1>
      </div>
    ),
  },

  {
    id: 'recurring-clients',
    background: 'bg-white',
    content: (
      <div className="flex flex-col justify-center h-full p-16">
        <Quote>
          Je travaille uniquement avec des clients qui ont des besoins récurrents. La production vidéo, c'est un outil essentiel. Point final.
        </Quote>
      </div>
    ),
  },

  {
    id: 'token-system',
    background: 'bg-white',
    content: (
      <div className="flex flex-col justify-center h-full p-16">
        <H2 className="mb-12 text-center">Système de jetons</H2>
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="bg-accent/5 p-8 rounded-xl border-2 border-accent">
            <div className="text-center mb-4">
              <div className="text-6xl font-mono font-bold text-accent">1 jeton = 1 bloc</div>
            </div>
            <Body size="lg" className="text-center">1 bloc = 5 heures (matin, après-midi ou soir)</Body>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {['Matin', 'Après-midi', 'Soir'].map((bloc, i) => (
              <div key={i} className="bg-gray-100 p-6 rounded-xl text-center">
                <Body className="font-bold">{bloc}</Body>
                <Body className="text-sm text-gray-600">5 heures</Body>
              </div>
            ))}
          </div>
          <Body size="lg" className="text-center font-bold">
            5 minutes ou 5 heures = même prix!
          </Body>
        </div>
      </div>
    ),
  },

  {
    id: 'onboarding-mandatory',
    background: 'bg-white',
    content: (
      <div className="flex flex-col justify-center h-full p-16">
        <H2 className="mb-12 text-center">Formation obligatoire</H2>
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="bg-primary/5 p-8 rounded-xl">
            <H3 className="mb-4">Étape 1: Vidéoconférence (45 min)</H3>
            <ul className="space-y-2">
              {[
                'Tes besoins spécifiques',
                'Le portail de réservation',
                'La communauté privée',
                'La documentation',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-1" />
                  <Body>{item}</Body>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-success/5 p-8 rounded-xl border-2 border-success">
            <H3 className="mb-4">Étape 2: Formation en studio (1 bloc GRATUIT)</H3>
            <Body className="mb-4">Formation semi-supervisée avec 2 appels de support à distance</Body>
            <div className="grid grid-cols-4 gap-2 text-sm">
              <div className="bg-white p-3 rounded">12:30 - Arrivée</div>
              <div className="bg-white p-3 rounded">14:00 - Appel 1</div>
              <div className="bg-white p-3 rounded">14:45 - Pratique</div>
              <div className="bg-white p-3 rounded">16:30 - Appel 2</div>
            </div>
          </div>
        </div>
      </div>
    ),
  },

  // ========== SECTION 11: OLIVIER'S JOURNEY ==========
  {
    id: 'who-am-i',
    background: 'bg-white',
    content: (
      <div className="flex flex-col items-center justify-center h-full p-16 text-center">
        <H1 className="mb-8">Qui suis-je?</H1>
        <Body size="lg">Mon nom est Olivier Lambert.</Body>
      </div>
    ),
  },

  {
    id: 'timeline',
    background: 'bg-white',
    content: (
      <div className="flex flex-col justify-center h-full p-16">
        <H2 className="mb-12 text-center">Mon parcours</H2>
        <div className="max-w-5xl mx-auto">
          <Timeline
            events={[
              {
                year: '2007',
                title: 'WETS - Première entreprise',
                description: 'E-commerce porte-à-porte à 16 ans',
                highlight: true,
              },
              {
                year: '2012',
                title: 'Blogue marketing',
                description: 'Partage hebdomadaire de résultats clients',
                highlight: false,
              },
              {
                year: '2013',
                title: '1,000 abonnés',
                description: 'Première milestone',
                highlight: false,
              },
              {
                year: '2014',
                title: 'Meilleur blogue marketing',
                description: 'Prix au Canada + Formation Facebook Ads',
                stats: '$1M+ en revenus',
                highlight: true,
              },
              {
                year: '2015',
                title: 'La Tranchée',
                description: 'Seule communauté entrepreneur en ligne au Québec',
                stats: '7,991 entreprises aidées | $3M revenus',
                highlight: true,
              },
              {
                year: '2016',
                title: 'Scotch & Domination Mondiale',
                description: 'Podcast avec des leaders québécois',
                stats: '7,000 téléchargements/épisode',
                highlight: true,
              },
              {
                year: '2017',
                title: 'Double Ta Valeur',
                description: 'Livre sur la productivité',
                stats: '50,000+ copies vendues',
                highlight: true,
              },
              {
                year: '2024',
                title: 'Les Bunkers',
                description: 'Studios vidéo intelligents',
                highlight: true,
              },
            ]}
          />
        </div>
      </div>
    ),
  },

  {
    id: 'the-pattern',
    background: 'bg-white',
    content: (
      <div className="flex flex-col justify-center h-full p-16">
        <H2 className="mb-12 text-center">Le pattern qui émerge</H2>
        <div className="grid grid-cols-2 gap-8 max-w-4xl mx-auto">
          {[
            { num: '1', text: 'J\'ai envie d\'apprendre quelque chose' },
            { num: '2', text: 'Je détecte une tendance et j\'anticipe le marché' },
            { num: '3', text: 'Je profite de l\'opportunité pour lancer une entreprise' },
            { num: '4', text: 'J\'utilise cette entreprise comme excuse pour apprendre' },
          ].map((step) => (
            <div key={step.num} className="bg-accent/5 p-8 rounded-xl border-2 border-accent">
              <div className="text-5xl font-bold text-accent mb-4">{step.num}</div>
              <Body size="lg">{step.text}</Body>
            </div>
          ))}
        </div>
      </div>
    ),
  },

  {
    id: 'always-early',
    background: 'bg-white',
    content: (
      <div className="flex flex-col items-center justify-center h-full p-16">
        <Quote>
          À chaque fois, on me disait que j'étais en avance. À chaque fois, l'industrie a explosé dans les 24 mois.
        </Quote>
      </div>
    ),
  },

  // ========== SECTION 12: CLOSING ==========
  {
    id: 'mcdonalds-callback',
    background: 'bg-warning',
    content: (
      <div className="flex flex-col items-center justify-center h-full p-16 text-center">
        <H1 className="mb-8">Le McDonald's de la vidéo</H1>
        <Body size="lg" className="text-2xl">Je vous avais dit que ça allait revenir!</Body>
      </div>
    ),
  },

  {
    id: 'cta-questions',
    background: 'bg-white',
    content: (
      <div className="flex flex-col items-center justify-center h-full p-16 text-center">
        <H1 className="mb-12">Questions?</H1>
        <Body size="lg" className="text-2xl">Je suis ouvert à tout.</Body>
      </div>
    ),
  },

  {
    id: 'cta-visit',
    background: 'bg-accent',
    content: (
      <div className="flex flex-col items-center justify-center h-full p-16 text-center">
        <H1 className="text-white mb-12">Prochaines étapes</H1>
        <div className="space-y-8 max-w-3xl">
          <Body size="lg" className="text-white text-2xl">
            Si vous voulez voir le studio en personne, contactez-moi.
          </Body>
          <Body size="lg" className="text-white text-2xl">
            Si vous avez des clients en tête, parlons-en après.
          </Body>
        </div>
      </div>
    ),
  },

  {
    id: 'thank-you',
    background: 'bg-primary',
    content: (
      <div className="flex flex-col items-center justify-center h-full p-16 text-center">
        <H1 className="text-white mb-8">Merci!</H1>
        <div className="text-4xl font-mono font-bold text-accent">lesbunkers.ca</div>
      </div>
    ),
  },
];

export default slidesDataPart2;
