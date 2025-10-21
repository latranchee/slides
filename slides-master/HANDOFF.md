# Bunkers Presentation - Development Handoff Document

## Project Overview
This is a 50-slide presentation system for "Les Bunkers" video studio business, built with React 19, Vite, Tailwind CSS, and Recharts.

**Location:** `/home/chonkychad/claude-copywriter/bunkers-presentation/`

## Recent Changes Completed

### 1. Slide 8 Merge
- **Issue:** Slide 8 was redundant with slide 9
- **Fix:** Removed slide 8 entirely and merged its title into slide 9's heading
- **Files Modified:** `/src/data/slidesConfig.json`
- **Note:** This shifted all subsequent slide numbers down by 1

### 2. Accent Color Selection
- **Feature:** Dynamic theme color picker in edit style menu
- **Colors:** Pink (#E94560), Green (#00D9A3), Orange (#FFB800)
- **Files Modified:**
  - `/src/AppEditable.jsx` - Added color selection UI and CSS variable management
  - `/src/index.css` - Added `--color-accent` and `--color-accent-rgb` CSS variables
  - `/src/tailwind.config.js` - Changed accent to use `var(--color-accent)`

### 3. Slide Navigation Enhancement
- **Feature:** Clickable slide counter that becomes number input
- **Usage:** Click "X / 50" counter, type slide number, press Enter
- **Files Modified:** `/src/AppEditable.jsx` - Added `slideInputValue` state and handlers

### 4. Slide 17 - Cost List Alignment Fix
- **Issue:** Third highlighted item was offset due to 2-column grid
- **Fix:** Separated regular and highlighted items, render highlighted full-width
- **Files Modified:** `/src/components/SlideRenderer.jsx` - Modified `cost-list` case

### 5. Slide 22 - Technical Complexity Restructure
- **Issue 1:** Boxes too large with 12 items
- **Issue 2:** Content structure inverted (questions vs technical values)
- **Fix:**
  - Reduced font sizes significantly (titles: text-sm, subtitles: text-xs)
  - Reduced padding (p-3) and gap (gap-3)
  - Restructured content to show technical features (e.g., "Ouverture (Aperture)") as titles
  - Added overwhelming technical values as subtitles (e.g., "f/1.4, f/1.8, f/2.8, f/4, f/5.6, f/8, f/11, f/16")
  - Includes specific codec formats (H.264, H.265/HEVC, ProRes, DNxHD, AV1, VP9)
  - Includes frame rates (23.976, 24, 25, 29.97, 30, 50, 59.94, 60, 120)
  - Includes ISO values, white balance kelvin, color profiles, lighting techniques
- **Purpose:** Make viewers feel overwhelmed by technical complexity
- **Files Modified:**
  - `/src/components/SlideRenderer.jsx` - Modified `list-grid` case rendering
  - `/src/data/slidesConfig.json` - Completely restructured slide 22 content

### 6. Slide 23, 27, 28 - Calculation Steps (REVERTED TO ORIGINAL)
- **Note:** Initially reduced, but reverted back to original larger sizing
- **Files Modified:** `/src/components/SlideRenderer.jsx` - `calculation-steps` case

### 7. Slide 34 - Icons Added
- **Feature:** Converted use-cases to icon-grid with Lucide React icons
- **Icons:** Users, GraduationCap, Mic, Package, Megaphone, TrendingUp
- **Files Modified:** `/src/data/slidesConfig.json`
- **Note:** May need page refresh to see icons (JSON hot-reload issue)

### 8. Slide 35 - Background Fix
- **Issue:** Had dark background (#1a1a1a) that shouldn't be there
- **Fix:** Changed to white background (#FFFFFF), removed theme: dark
- **Files Modified:** `/src/data/slidesConfig.json`

### 9. Slide 43 - Image Placeholder Layout
- **Feature:** New `image-text` slide type with image placeholder + text
- **Layout:** Left: image placeholder (3:4 aspect), Right: left-aligned text
- **Files Modified:**
  - `/src/components/SlideRenderer.jsx` - Added `image-text` case
  - `/src/data/slidesConfig.json` - Changed slide 43 to use new type
- **Note:** May need page refresh to see new layout

### 10. Slide 44 - Timeline Improvements (FINAL)
- **Issues Fixed:**
  - Removed outer padding constraints (p-16, max-w-5xl) from SlideRenderer
  - Line extends beyond viewport (w-[200%]) starting at left: 0
  - Line thickness increased to 4px (from 1px)
  - Line positioned at exactly top: 64px to align through center of dots
  - Dots vertically centered on line using flexbox
  - Added padding: pt-4, pb-8 on container, pb-6 on events for scrollbar spacing
  - Minimal horizontal padding (px-8) for comfortable edge distance
- **Technical Details:**
  - Line: `position: absolute; top: 64px; left: 0; height: 4px;`
  - Dots: 20px (w-5 h-5), centered with `flex items-center`
  - Container allows horizontal scroll with comfortable bottom spacing
- **Files Modified:**
  - `/src/components/SlideRenderer.jsx` - Removed timeline padding constraints
  - `/src/components/charts/Timeline.jsx` - Fixed alignment and spacing

## Key Architecture

### File Structure
```
bunkers-presentation/
├── src/
│   ├── App.jsx                          # Main app (read-only presentation)
│   ├── AppEditable.jsx                  # Editable version with style controls
│   ├── index.css                        # Global styles, CSS variables
│   ├── components/
│   │   ├── SlideRenderer.jsx            # Master slide type renderer
│   │   ├── base/
│   │   │   ├── Typography.jsx           # H1, H2, H3, Body, Quote, Number
│   │   │   ├── StatCard.jsx             # Stat display cards
│   │   │   └── IconGrid.jsx             # Icon grid layout
│   │   └── charts/
│   │       ├── ComparisonBar.jsx        # Before/after bars
│   │       ├── SimplePieChart.jsx       # Pie charts
│   │       ├── VerticalBarChart.jsx     # Bar charts
│   │       ├── BellCurve.jsx            # Distribution curves
│   │       └── Timeline.jsx             # Horizontal timeline
│   └── data/
│       └── slidesConfig.json            # All slide content & configuration
├── tailwind.config.js                   # Tailwind theme config
└── package.json                         # Dependencies
```

### Slide Types in SlideRenderer.jsx

#### Text/Content Types
- `title` - Large title + subtitle, centered
- `text-centered` - Heading + body, centered
- `quote` - Blockquote with accent border
- `big-stat` - Large number + description

#### List/Grid Types
- `list-grid` - Grid of items (strings or {title, subtitle})
- `icon-grid` - Grid with Lucide icons + titles
- `feature-list` - 2-column features with icons
- `numbered-grid` - Numbered items in grid

#### Comparison/Stats Types
- `stats-grid` - Grid of StatCard components
- `comparison` - Before/after comparison bar
- `two-column` - Left vs right comparison
- `cost-list` - List of costs with highlighted totals

#### Chart Types
- `chart-pie` - Single pie chart
- `comparison-pies` - Two pie charts side-by-side
- `bell-curve` - Distribution curve with highlight
- `bar-chart` - Vertical bar chart
- `timeline` - Horizontal timeline

#### Special Types
- `calculation-steps` - Math operations with boxes
- `multi-section` - Multiple content sections
- `cost-sections` - Cost breakdown sections
- `quote-with-grid` - Quote above grid
- `number-grid` - Grid of numbers
- `image-text` - Image placeholder + text (NEW)
- `custom-html` - Raw HTML content

### State Management (AppEditable.jsx)

#### Key State Variables
```javascript
const [currentSlide, setCurrentSlide] = useState(0);
const [slides, setSlides] = useState(initialSlides);
const [editMode, setEditMode] = useState(false);
const [isEditing, setIsEditing] = useState(false);
const [styles, setStyles] = useState({ /* typography, accentColor */ });
const [slideInputValue, setSlideInputValue] = useState('');
const [slideInputFocused, setSlideInputFocused] = useState(false);
```

#### Style System
- Typography styles stored in `styles` state (h1, h2, h3)
- Accent color managed via CSS custom properties
- Styles applied through StyleContext provider

## Known Issues / Limitations

### Hot Reload Issues
- JSON changes to `slidesConfig.json` don't always hot-reload
- **Workaround:** Navigate away and back, or refresh page
- Affects: Slide 34 icons, Slide 43 new layout

### Current Limitations
1. **No persistent storage** - Changes lost on refresh
2. **No image upload** - Only placeholders
3. **Fixed slide order** - Can't reorder slides via UI
4. **Limited undo** - No undo/redo functionality
5. **Export** - No PDF/PPTX export feature

## Pending Features (From Previous Plan)

### 1. Default Background Options
**Priority:** High
**Estimated Time:** 1-2 hours

**What to Add:**
- Background color/image selector in edit style menu
- Preset colors: white, light gray, dark themes
- Optional image URL input
- Apply defaults when slide background not specified

**Files to Modify:**
- `/src/AppEditable.jsx` - Add background state + UI
- `/src/data/slidesConfig.json` - Consider default background property

### 2. Expanded Style Options
**Priority:** Medium
**Estimated Time:** 2-3 hours

**What to Add:**
- Body text styling (font size, line height, color)
- Quote styling (font style, border color, padding)
- List styling (bullet style, spacing, indentation)

**Files to Modify:**
- `/src/AppEditable.jsx` - Add style controls
- `/src/components/base/Typography.jsx` - Apply body styles
- `/src/components/SlideRenderer.jsx` - Apply quote/list styles

### 3. Google Fonts Integration
**Priority:** Low
**Estimated Time:** 2-3 hours

**What to Add:**
- Font selector dropdown in style editor
- Popular fonts: Roboto, Open Sans, Montserrat, Playfair Display, etc.
- Dynamic font loading via Google Fonts API
- Font loading states/fallbacks

**Files to Modify:**
- `/src/AppEditable.jsx` - Font selection UI
- `/src/index.css` - Google Fonts import
- `/src/components/base/Typography.jsx` - Apply selected fonts

**Dependencies:**
- Consider `webfontloader` npm package

## Development Setup

### Prerequisites
- Node.js 18+
- npm or yarn

### Running Development Server
```bash
cd /home/chonkychad/claude-copywriter/bunkers-presentation
npm run dev
```

The dev server runs on `http://localhost:5173`

### Build for Production
```bash
npm run build
```

Output in `/dist` directory

### Current Dependencies
```json
{
  "react": "^19.0.0",
  "react-dom": "^19.0.0",
  "recharts": "^3.2.1",
  "lucide-react": "latest",
  "tailwindcss": "^3.x"
}
```

## Testing Checklist

When making changes, test these critical paths:

1. **Navigation**
   - ✅ Arrow keys work
   - ✅ Click slide counter input works
   - ✅ Space bar advances slides
   - ✅ Home/End keys work

2. **Edit Mode**
   - ✅ Toggle edit mode (E key or button)
   - ✅ Edit slide content in modal
   - ✅ Changes persist in session
   - ✅ Style editor opens and closes

3. **Responsive Behavior**
   - ✅ Slides fit in viewport
   - ✅ No horizontal overflow (except timeline)
   - ✅ Charts render properly

4. **Specific Slides to Verify**
   - Slide 9: Two-column comparison
   - Slide 17: Cost list with highlight
   - Slide 22: Technical complexity grid
   - Slide 23: Calculation steps
   - Slide 34: Icon grid (after refresh)
   - Slide 35: White background
   - Slide 43: Image-text layout (after refresh)
   - Slide 44: Timeline full width

## Tips for Next Developer

### Adding New Slide Types
1. Add case to SlideRenderer.jsx `renderContent()` switch
2. Define expected `content` structure in comments
3. Use existing Typography/Chart components
4. Test with real data in slidesConfig.json

### Modifying Existing Slide Types
1. Always check multiple slides using same type
2. Use responsive Tailwind classes
3. Test at different viewport sizes
4. Consider overflow scenarios

### Working with slidesConfig.json
1. Validate JSON syntax before saving
2. Test hot reload - may need manual refresh
3. Keep slide IDs unique
4. Document new content properties

### Styling Guidelines
- Use Tailwind utility classes primarily
- Custom styles via StyleContext when needed
- Accent color via `text-accent` or `bg-accent` classes
- Typography via H1, H2, H3, Body components

## Contact / Handoff Notes

**Date:** 2025-10-13
**Session Token Usage:** ~96k / 200k (Updated in continuation session)
**Dev Server:** Running on background Bash processes

## Session Notes

This document spans two continuation sessions:
1. **First session** (~137k tokens): Initial fixes and features
2. **Second session** (~96k tokens): Slide 22 content restructure and slide 44 timeline precision fixes

All critical bugs have been fixed. The presentation is fully functional. Remaining work is enhancement features only.

**Important:** JSON changes to slides 34 and 43 may require page refresh to display properly due to hot reload limitations.

**Key Achievement:** Slide 22 now effectively overwhelms viewers with technical complexity as intended.
