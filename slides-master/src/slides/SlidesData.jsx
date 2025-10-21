import React from 'react';
import { H1, H2, H3, Body, Quote, Number } from '../components/base/Typography';
import StatCard from '../components/base/StatCard';
import IconGrid from '../components/base/IconGrid';
import ComparisonBar from '../components/charts/ComparisonBar';
import SimplePieChart from '../components/charts/SimplePieChart';
import Timeline from '../components/charts/Timeline';
import {
  Video,
  Eye,
  Ear,
  Users,
  ShoppingCart,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Camera,
  Mic,
  Monitor,
  Lightbulb,
  Clock,
  Target,
  Award,
  BookOpen,
  Podcast,
  Calendar,
  Building,
} from 'lucide-react';

export const slidesData = [
  // ========== SECTION 1: OPENING ==========
  {
    id: 'title',
    background: 'bg-white',
    content: (
      <div className="flex flex-col items-center justify-center h-full p-16 text-center">
        <H1 className="mb-8">Les Bunkers</H1>
        <H2 className="text-neutral-dark font-normal">
          Une entreprise de studio vidéo qui ne fait, sur papier, absolument aucun sens.
        </H2>
      </div>
    ),
  },

  // ========== SECTION 2: WHY VIDEO ==========
  {
    id: 'why-video-question',
    background: 'bg-white',
    content: (
      <div className="flex flex-col items-center justify-center h-full p-16">
        <H2 className="mb-8 text-center">Pourquoi produire des vidéos?</H2>
        <Body size="lg" className="text-center max-w-3xl">
          Mais avant, il faut qu'on commence par s'entendre sur l'état des choses.
        </Body>
      </div>
    ),
  },

  {
    id: 'interview-analogy',
    background: 'bg-white',
    content: (
      <div className="flex flex-col items-center justify-center h-full p-16">
        <H2 className="mb-12 text-center">
          Pourquoi passer une entrevue en personne avant d'engager un candidat?
        </H2>
        <Body size="lg" className="text-center max-w-4xl leading-relaxed">
          Un CV avec une lettre de recommandation, ça ne fait pas? Pourquoi est-ce que, si tu veux combler un poste important, tu prends le temps d'aller souper avec la personne?
        </Body>
      </div>
    ),
  },

  {
    id: 'rich-medium',
    background: 'bg-white',
    content: (
      <div className="flex flex-col items-center justify-center h-full p-16">
        <Quote>
          La vidéo est le moyen de communication le plus <span className="text-accent">riche</span>.
        </Quote>
      </div>
    ),
  },

  {
    id: 'what-video-captures',
    background: 'bg-white',
    content: (
      <div className="flex flex-col justify-center h-full p-16">
        <H2 className="mb-12">Ce que la vidéo capture</H2>
        <IconGrid
          items={[
            { icon: <Eye size={48} />, title: 'Comportement', description: 'Comment la personne se comporte' },
            { icon: <Ear size={48} />, title: 'Ton de voix', description: 'Entendre le ton et les nuances' },
            { icon: <Users size={48} />, title: 'Interactions', description: 'Observer les interactions avec les autres' },
          ]}
          columns={3}
        />
      </div>
    ),
  },

  // ========== SECTION 3: E-COMMERCE STATS ==========
  {
    id: 'ecommerce-impact',
    background: 'bg-white',
    content: (
      <div className="flex flex-col items-center justify-center h-full p-16">
        <H2 className="mb-12 text-center">Impact E-Commerce</H2>
        <div className="grid grid-cols-3 gap-8 w-full max-w-5xl">
          <StatCard value="+37%" label="Ajouts au panier" size="medium" color="success" />
          <StatCard value="+9.7%" label="Ventes" size="medium" color="success" />
          <StatCard value="-5%" label="Taux de retour" description="Réduction absolue" size="medium" color="accent" />
        </div>
      </div>
    ),
  },

  {
    id: 'return-rate-detail',
    background: 'bg-white',
    content: (
      <div className="flex flex-col items-center justify-center h-full p-16">
        <H2 className="mb-12 text-center">Réduction du taux de retour</H2>
        <div className="max-w-2xl w-full">
          <ComparisonBar before={20} after={15} label="Taux de retour (%)" unit="%" color="success" />
        </div>
        <Body className="mt-8 text-center">
          C'est <Number>immense</Number>! De 20% à 15%, c'est une réduction absolue de 5%.
        </Body>
      </div>
    ),
  },

  // ========== SECTION 4: ONLINE COURSE MATH ==========
  {
    id: 'course-scenario',
    background: 'bg-white',
    content: (
      <div className="flex flex-col justify-center h-full p-16">
        <H2 className="mb-8">Scénario: Cours en ligne à 300$</H2>
        <div className="grid grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-5xl font-mono font-bold text-primary mb-4">300$</div>
            <Body>Prix du cours</Body>
          </div>
          <div>
            <div className="text-5xl font-mono font-bold text-primary mb-4">5$</div>
            <Body>Coût par lead</Body>
          </div>
          <div>
            <div className="text-5xl font-mono font-bold text-primary mb-4">1/50</div>
            <Body>Taux de conversion</Body>
          </div>
        </div>
      </div>
    ),
  },

  {
    id: 'course-math-comparison',
    background: 'bg-white',
    content: (
      <div className="flex flex-col justify-center h-full p-16">
        <H2 className="mb-12 text-center">Sans vidéo vs. Avec vidéo</H2>
        <div className="grid grid-cols-2 gap-12">
          <div className="bg-gray-100 p-8 rounded-xl">
            <H3 className="mb-6 text-center">Sans vidéo</H3>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>CAC:</span>
                <Number>250$</Number>
              </div>
              <div className="flex justify-between">
                <span>Profit:</span>
                <Number>50$</Number>
              </div>
              <div className="flex justify-between font-bold text-xl">
                <span>Marge:</span>
                <Number>16%</Number>
              </div>
            </div>
          </div>
          <div className="bg-success/10 p-8 rounded-xl border-2 border-success">
            <H3 className="mb-6 text-center text-success">Avec vidéo</H3>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>CAC:</span>
                <Number className="text-success">125$</Number>
              </div>
              <div className="flex justify-between">
                <span>Profit:</span>
                <Number className="text-success">175$</Number>
              </div>
              <div className="flex justify-between font-bold text-xl">
                <span>Marge:</span>
                <Number className="text-success">58%</Number>
              </div>
            </div>
          </div>
        </div>
        <Body className="mt-8 text-center text-xl font-bold">
          3.6× amélioration de la marge de profit!
        </Body>
      </div>
    ),
  },

  // ========== SECTION 5: NEWSLETTER & INDUSTRY STATS ==========
  {
    id: 'newsletter-impact',
    background: 'bg-white',
    content: (
      <div className="flex flex-col items-center justify-center h-full p-16">
        <H2 className="mb-12 text-center">Impact sur les infolettres</H2>
        <div className="grid grid-cols-2 gap-12 w-full max-w-4xl">
          <StatCard value="+65%" label="Taux de clic" size="medium" color="success" />
          <StatCard value="-26%" label="Désabonnements" size="medium" color="success" />
        </div>
      </div>
    ),
  },

  {
    id: 'industry-adoption',
    background: 'bg-white',
    content: (
      <div className="flex flex-col justify-center h-full p-16">
        <H2 className="mb-12 text-center">Adoption de l'industrie</H2>
        <div className="grid grid-cols-3 gap-8">
          <StatCard value="89%" label="Font de la vidéo" size="medium" color="primary" />
          <StatCard value="93%" label="Bon ROI" size="medium" color="success" />
          <StatCard value="68%" label="Veulent commencer" size="medium" color="warning" />
        </div>
      </div>
    ),
  },

  {
    id: 'the-barrier',
    background: 'bg-white',
    content: (
      <div className="flex flex-col items-center justify-center h-full p-16">
        <H2 className="mb-12 text-center">Mais alors, quel est le problème?</H2>
        <div className="text-center">
          <div className="text-8xl font-bold text-accent mb-8">63%</div>
          <Body size="lg" className="max-w-2xl">
            des chefs d'entreprises citent le <Number className="text-4xl">coût</Number> et la{' '}
            <Number className="text-4xl">difficulté technique</Number> comme raisons.
          </Body>
        </div>
      </div>
    ),
  },

  // ========== SECTION 6: TRADITIONAL COSTS ==========
  {
    id: 'traditional-costs-title',
    background: 'bg-accent',
    content: (
      <div className="flex flex-col items-center justify-center h-full p-16 text-center">
        <H1 className="text-white mb-4">Faire de la vidéo,</H1>
        <H1 className="text-white">ça coûte cher!!!!</H1>
      </div>
    ),
  },

  {
    id: 'on-location-shoots',
    background: 'bg-white',
    content: (
      <div className="flex flex-col justify-center h-full p-16">
        <H2 className="mb-12 text-center">Équipe sur place</H2>
        <div className="text-center">
          <div className="text-7xl font-mono font-bold text-accent mb-4">2,500$ - 5,000$</div>
          <Body size="lg">par journée de tournage</Body>
        </div>
      </div>
    ),
  },

  {
    id: 'studio-rental',
    background: 'bg-white',
    content: (
      <div className="flex flex-col justify-center h-full p-16">
        <H2 className="mb-12">Location de studio professionnel</H2>
        <div className="space-y-8">
          <div className="bg-gray-100 p-8 rounded-xl">
            <div className="text-5xl font-mono font-bold text-accent mb-2">150$/heure</div>
            <Body>Juste le local (sans équipement)</Body>
          </div>
          <div className="bg-gray-100 p-8 rounded-xl">
            <div className="text-5xl font-mono font-bold text-accent mb-2">+1,500$/jour</div>
            <Body>Location d'équipement (caméras, lumières, micros)</Body>
          </div>
          <div className="bg-accent/10 p-8 rounded-xl border-2 border-accent">
            <div className="text-6xl font-mono font-bold text-accent mb-2">300$ - 600$/h</div>
            <Body className="font-bold">Total (sans technicien)</Body>
          </div>
        </div>
      </div>
    ),
  },

  {
    id: 'podcast-studio',
    background: 'bg-white',
    content: (
      <div className="flex flex-col justify-center h-full p-16">
        <H2 className="mb-12 text-center">Studio de podcast</H2>
        <div className="text-center space-y-8">
          <div>
            <div className="text-6xl font-mono font-bold text-accent mb-4">150$ - 250$/h</div>
            <Body size="lg">Avec technicien</Body>
          </div>
          <div className="bg-warning/10 p-6 rounded-xl border-2 border-warning">
            <Body size="lg" className="font-bold">
              Packages souvent dans les <Number className="text-4xl">5 chiffres</Number>
            </Body>
          </div>
        </div>
      </div>
    ),
  },

  // ========== SECTION 7: DIY TRAP ==========
  {
    id: 'diy-temptation',
    background: 'bg-white',
    content: (
      <div className="flex flex-col items-center justify-center h-full p-16">
        <H2 className="mb-8 text-center">"Je vais m'acheter une caméra et ça va finir là!"</H2>
        <Body size="lg" className="text-center text-accent font-bold text-3xl">
          Hehehe, good luck with that!
        </Body>
      </div>
    ),
  },

  {
    id: 'diy-equipment-costs',
    background: 'bg-white',
    content: (
      <div className="flex flex-col justify-center h-full p-16">
        <H2 className="mb-8">Équipement de base (DIY)</H2>
        <div className="grid grid-cols-2 gap-4 mb-8">
          {[
            { item: 'Caméra + lentille', price: '2,500$' },
            { item: 'Lumière (×3)', price: '1,200$' },
            { item: 'Microphone (×2)', price: '800$' },
            { item: 'Interface audio', price: '750$' },
            { item: 'Panneaux sonores (×10)', price: '1,500$' },
            { item: 'Table, chaises, déco', price: 'Variable' },
          ].map((item, i) => (
            <div key={i} className="flex justify-between p-4 bg-gray-100 rounded-lg">
              <span className="font-semibold">{item.item}</span>
              <span className="font-mono font-bold text-accent">{item.price}</span>
            </div>
          ))}
        </div>
        <div className="bg-accent/10 p-6 rounded-xl border-2 border-accent text-center">
          <div className="text-5xl font-mono font-bold text-accent mb-2">Minimum 10,000$</div>
          <Body className="font-bold">(Configuration 1 caméra)</Body>
        </div>
      </div>
    ),
  },

  {
    id: 'cheap-trap',
    background: 'bg-white',
    content: (
      <div className="flex flex-col items-center justify-center h-full p-16">
        <Quote>
          Tu vas vouloir économiser au début, donc tu vas acheter du cheap. Résultat?
        </Quote>
        <div className="mt-12 grid grid-cols-2 gap-8 w-full max-w-4xl">
          <div className="bg-gray-100 p-8 rounded-xl text-center">
            <div className="text-6xl mb-4">😳</div>
            <Body className="font-bold">Trop honte pour publier</Body>
          </div>
          <div className="bg-gray-100 p-8 rounded-xl text-center">
            <div className="text-6xl mb-4">💸</div>
            <Body className="font-bold">Acheter tout 2× fois</Body>
          </div>
        </div>
      </div>
    ),
  },

  {
    id: 'complexity-questions',
    background: 'bg-white',
    content: (
      <div className="flex flex-col justify-center h-full p-16">
        <H2 className="mb-8">La complexité technique</H2>
        <div className="grid grid-cols-2 gap-4">
          {[
            'Vitesse d\'obturation?',
            'Ouverture?',
            'Sensibilité capteur?',
            'Images/seconde?',
            'Codec?',
            'Format?',
            'Balance des blancs?',
            'Calibration couleurs?',
            'Type de micros?',
            'Interface audio?',
            'Éclairage 3 ou 4 points?',
            'Rembrandt? Paramount? High/Low key?',
          ].map((q, i) => (
            <div key={i} className="p-4 bg-accent/5 rounded-lg border border-accent/20">
              <Body>{q}</Body>
            </div>
          ))}
        </div>
      </div>
    ),
  },

  {
    id: 'time-cost',
    background: 'bg-white',
    content: (
      <div className="flex flex-col items-center justify-center h-full p-16 text-center">
        <H2 className="mb-12">Le coût du temps</H2>
        <div className="space-y-8">
          <div>
            <div className="text-6xl font-mono font-bold text-primary mb-4">1,000+ heures</div>
            <Body size="lg">D'apprentissage (plusieurs années)</Body>
          </div>
          <div className="text-4xl font-bold text-accent">×</div>
          <div>
            <div className="text-6xl font-mono font-bold text-primary mb-4">50$/h</div>
            <Body size="lg">Valeur de ton temps</Body>
          </div>
          <div className="text-4xl font-bold text-accent">=</div>
          <div className="bg-accent/10 p-8 rounded-xl border-2 border-accent">
            <div className="text-7xl font-mono font-bold text-accent mb-2">50,000$</div>
            <Body size="lg" className="font-bold">Coût d'opportunité</Body>
          </div>
        </div>
      </div>
    ),
  },

  // ========== SECTION 8: THE MATH ==========
  {
    id: 'the-math-title',
    background: 'bg-primary',
    content: (
      <div className="flex flex-col items-center justify-center h-full p-16 text-center">
        <H1 className="text-white mb-8">Les mathématiques</H1>
        <Body size="lg" className="text-white text-2xl">
          Comment est-ce possible à 12.48$/h?
        </Body>
      </div>
    ),
  },

  {
    id: 'first-principles',
    background: 'bg-white',
    content: (
      <div className="flex flex-col items-center justify-center h-full p-16">
        <Quote>
          Quand je me lance dans un projet, la première chose que je fais, c'est de jeter au poubelle ce que je pense savoir et je reviens au premier principe.
        </Quote>
      </div>
    ),
  },

  {
    id: 'studio-cost',
    background: 'bg-white',
    content: (
      <div className="flex flex-col justify-center h-full p-16">
        <H2 className="mb-12 text-center">Coût de construction d'un studio</H2>
        <div className="text-center">
          <div className="text-8xl font-mono font-bold text-primary mb-4">60K - 80K$</div>
        </div>
      </div>
    ),
  },

  {
    id: 'capacity-math',
    background: 'bg-white',
    content: (
      <div className="flex flex-col justify-center h-full p-16">
        <H2 className="mb-12">Calcul de capacité</H2>
        <div className="space-y-8">
          <div className="p-6 bg-gray-100 rounded-xl">
            <Body className="text-xl mb-2">30 jours × 3 blocs × 5 heures =</Body>
            <div className="text-5xl font-mono font-bold text-accent">450 heures/mois</div>
          </div>
          <div className="p-6 bg-gray-100 rounded-xl">
            <Body className="text-xl mb-2">450h ÷ 10h par entreprise =</Body>
            <div className="text-5xl font-mono font-bold text-accent">45 entreprises</div>
          </div>
        </div>
      </div>
    ),
  },

  {
    id: 'cost-per-company',
    background: 'bg-white',
    content: (
      <div className="flex flex-col justify-center h-full p-16">
        <H2 className="mb-12 text-center">Coût par entreprise</H2>
        <div className="space-y-8 max-w-3xl mx-auto">
          <div className="p-6 bg-gray-100 rounded-xl">
            <Body className="mb-2">80,000$ sur 5 ans à 8% =</Body>
            <div className="text-4xl font-mono font-bold text-primary">1,611$/mois</div>
          </div>
          <div className="p-6 bg-gray-100 rounded-xl">
            <Body className="mb-2">1,611$ ÷ 45 entreprises =</Body>
            <div className="text-4xl font-mono font-bold text-primary">35$/mois</div>
          </div>
          <div className="p-6 bg-success/10 rounded-xl border-2 border-success">
            <Body className="mb-2">+ loyer, électricité, maintenance ≈</Body>
            <div className="text-5xl font-mono font-bold text-success mb-2">50$/mois</div>
            <div className="text-4xl font-mono font-bold text-success">= 5$/heure</div>
          </div>
        </div>
      </div>
    ),
  },

  {
    id: 'the-real-cost',
    background: 'bg-accent',
    content: (
      <div className="flex flex-col items-center justify-center h-full p-16 text-center">
        <H1 className="text-white mb-8">Le salaire!</H1>
        <H2 className="text-white">C'est ça la réponse. C'est pour ça que ça coûte cher!</H2>
      </div>
    ),
  },

  {
    id: 'salary-breakdown',
    background: 'bg-white',
    content: (
      <div className="flex flex-col justify-center h-full p-16">
        <H2 className="mb-12 text-center">Décomposition des coûts sur 5 ans</H2>
        <div className="max-w-2xl mx-auto">
          <SimplePieChart
            data={[
              { name: 'Salaires', value: 1350000, color: 'accent' },
              { name: 'Équipement', value: 100000, color: 'gray' },
              { name: 'Autres', value: 150000, color: 'warning' },
            ]}
            height={400}
          />
          <div className="mt-8 text-center">
            <Body size="lg" className="font-bold">
              L'équipement représente seulement <Number className="text-4xl">6%</Number> des coûts!
            </Body>
          </div>
        </div>
      </div>
    ),
  },

  // Continued in next message due to character limit...
];

export default slidesData;
