import React, { useState, useEffect } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import SlideContainer from './components/base/SlideContainer';
import SlideRenderer from './components/SlideRenderer';
import SlideEditor from './components/SlideEditor';
import { ChevronLeft, ChevronRight, Maximize, Minimize, Edit, Save, Download, Upload, Plus, GripVertical, Menu, Palette } from 'lucide-react';
import { StyleProvider } from './contexts/StyleContext';
import defaultData from './data/slidesConfig.json';

const STORAGE_KEY = 'bunkers-presentation-data';

// Sortable slide thumbnail component
function SortableSlide({ slide, index, onClick, isActive }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: slide.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`flex items-center gap-2 p-3 bg-white border-2 rounded-lg cursor-pointer hover:border-accent transition-colors ${
        isActive ? 'border-accent bg-accent/5' : 'border-gray-200'
      }`}
      onClick={onClick}
    >
      <div {...attributes} {...listeners} className="cursor-grab active:cursor-grabbing">
        <GripVertical size={20} className="text-gray-400" />
      </div>
      <div className="flex-1">
        <div className="font-semibold text-sm">{index + 1}. {slide.id}</div>
        <div className="text-xs text-gray-500">{slide.type}</div>
      </div>
    </div>
  );
}

function AppEditable() {
  const [slides, setSlides] = useState([]);
  const [styles, setStyles] = useState(defaultData.styles);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editingSlide, setEditingSlide] = useState(null);
  const [editingStyles, setEditingStyles] = useState(false);
  const [slideInputValue, setSlideInputValue] = useState('');
  const [slideInputFocused, setSlideInputFocused] = useState(false);

  // Load data from localStorage or use defaults
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const data = JSON.parse(saved);
        setSlides(data.slides || defaultData.slides);
        setStyles(data.styles || defaultData.styles);
      } catch (e) {
        console.error('Failed to load saved data', e);
        setSlides(defaultData.slides);
        setStyles(defaultData.styles);
      }
    } else {
      setSlides(defaultData.slides);
      setStyles(defaultData.styles);
    }
  }, []);

  // Hot reload: Watch for changes to slidesConfig.json and reload
  useEffect(() => {
    if (import.meta.hot) {
      import.meta.hot.accept('./data/slidesConfig.json', (newModule) => {
        if (newModule) {
          console.log('🔄 Slides config updated, reloading...');
          setSlides(newModule.default.slides);
          setStyles(newModule.default.styles);
          // Also update localStorage so changes persist
          localStorage.setItem(STORAGE_KEY, JSON.stringify({
            slides: newModule.default.slides,
            styles: newModule.default.styles
          }));
        }
      });
    }
  }, []);

  // Google Fonts configuration
  const GOOGLE_FONTS = [
    { name: 'Inter', category: 'sans-serif', weights: [400, 500, 600, 700] },
    { name: 'Roboto', category: 'sans-serif', weights: [400, 500, 700, 900] },
    { name: 'Open Sans', category: 'sans-serif', weights: [400, 600, 700] },
    { name: 'Montserrat', category: 'sans-serif', weights: [400, 500, 600, 700, 800] },
    { name: 'Poppins', category: 'sans-serif', weights: [400, 500, 600, 700] },
    { name: 'Playfair Display', category: 'serif', weights: [400, 600, 700, 800] },
    { name: 'Merriweather', category: 'serif', weights: [400, 700, 900] },
    { name: 'Lora', category: 'serif', weights: [400, 600, 700] },
    { name: 'Raleway', category: 'sans-serif', weights: [400, 500, 600, 700] },
    { name: 'Oswald', category: 'sans-serif', weights: [400, 500, 600, 700] }
  ];

  // Load Google Fonts dynamically
  useEffect(() => {
    const fontsToLoad = new Set();

    // Collect fonts from styles
    if (styles.h1?.fontFamily) fontsToLoad.add(styles.h1.fontFamily);
    if (styles.h2?.fontFamily) fontsToLoad.add(styles.h2.fontFamily);
    if (styles.h3?.fontFamily) fontsToLoad.add(styles.h3.fontFamily);

    // Create or update Google Fonts link
    const existingLink = document.getElementById('google-fonts-link');
    if (existingLink) {
      existingLink.remove();
    }

    if (fontsToLoad.size > 0) {
      const fontFamilies = Array.from(fontsToLoad).map(font => {
        const fontConfig = GOOGLE_FONTS.find(f => f.name === font);
        if (fontConfig) {
          const weights = fontConfig.weights.join(';');
          return `family=${font.replace(/ /g, '+')}:wght@${weights}`;
        }
        return null;
      }).filter(Boolean);

      if (fontFamilies.length > 0) {
        const link = document.createElement('link');
        link.id = 'google-fonts-link';
        link.rel = 'stylesheet';
        link.href = `https://fonts.googleapis.com/css2?${fontFamilies.join('&')}&display=swap`;
        document.head.appendChild(link);
      }
    }
  }, [styles.h1?.fontFamily, styles.h2?.fontFamily, styles.h3?.fontFamily]);

  // Apply accent color to CSS variables
  useEffect(() => {
    const colorMap = {
      pink: { hex: '#E94560', rgb: '233, 69, 96' },
      green: { hex: '#00D9A3', rgb: '0, 217, 163' },
      orange: { hex: '#FFB800', rgb: '255, 184, 0' }
    };

    const selectedColor = styles.accentColor || 'pink';
    const color = colorMap[selectedColor];

    if (color) {
      document.documentElement.style.setProperty('--color-accent', color.hex);
      document.documentElement.style.setProperty('--color-accent-rgb', color.rgb);
    }
  }, [styles.accentColor]);

  // Read slide from URL on mount (after slides are loaded)
  useEffect(() => {
    if (slides.length === 0) return;

    const params = new URLSearchParams(window.location.search);
    const slideParam = params.get('slide');

    if (slideParam) {
      const slideNum = parseInt(slideParam, 10) - 1; // Convert to 0-indexed
      if (slideNum >= 0 && slideNum < slides.length) {
        setCurrentSlide(slideNum);
      }
    }
  }, [slides.length]);

  // Update URL when slide changes
  useEffect(() => {
    if (slides.length === 0) return;

    const params = new URLSearchParams(window.location.search);
    params.set('slide', (currentSlide + 1).toString());

    const newUrl = `${window.location.pathname}?${params.toString()}`;
    window.history.replaceState({}, '', newUrl);
  }, [currentSlide, slides.length]);

  // Save data to file system via API
  const saveData = async () => {
    const data = { styles, slides };
    try {
      const response = await fetch('http://localhost:3001/api/save-slides', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        // Also save to localStorage as backup
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        alert(`Successfully saved ${slides.length} slides and styles to file system!`);
      } else {
        throw new Error(result.error || 'Failed to save data');
      }
    } catch (error) {
      console.error('Save error:', error);
      alert(`Failed to save to file system: ${error.message}\n\nSaving to browser storage only...`);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    }
  };

  // Export data as JSON
  const exportData = () => {
    const data = { styles, slides };
    const dataStr = JSON.stringify(data, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = 'bunkers-presentation.json';
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  // Import data from JSON file
  const importData = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const imported = JSON.parse(e.target.result);
          setSlides(imported.slides || imported);
          setStyles(imported.styles || defaultData.styles);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(imported));
          alert('Data imported successfully!');
        } catch (err) {
          alert('Failed to import data: ' + err.message);
        }
      };
      reader.readAsText(file);
    }
  };

  // Add new slide
  const addSlide = () => {
    const newSlide = {
      id: `new-slide-${Date.now()}`,
      type: 'text-centered',
      background: { type: 'color', value: '#FFFFFF' },
      content: {
        heading: 'New Slide',
        body: 'Click to edit this slide'
      }
    };
    setSlides([...slides, newSlide]);
    setCurrentSlide(slides.length);
  };

  // Fullscreen handlers
  const toggleFullscreen = () => {
    setIsFullscreen(prev => !prev);
  };

  // Keyboard navigation
  useEffect(() => {
    if (editMode || editingSlide) return; // Disable keyboard nav in edit mode

    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        nextSlide();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prevSlide();
      } else if (e.key === 'Home') {
        e.preventDefault();
        setCurrentSlide(0);
      } else if (e.key === 'End') {
        e.preventDefault();
        setCurrentSlide(slides.length - 1);
      } else if (e.key === 'f' || e.key === 'F') {
        e.preventDefault();
        toggleFullscreen();
      } else if (e.key === 'e' || e.key === 'E') {
        e.preventDefault();
        setEditMode(!editMode);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlide, editMode, editingSlide, slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev < slides.length - 1 ? prev + 1 : prev));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev > 0 ? prev - 1 : prev));
  };

  // Drag and drop handlers
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      setSlides((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        const newOrder = arrayMove(items, oldIndex, newIndex);

        // Update current slide index if needed
        if (currentSlide === oldIndex) {
          setCurrentSlide(newIndex);
        } else if (currentSlide === newIndex) {
          setCurrentSlide(oldIndex < newIndex ? newIndex - 1 : newIndex + 1);
        }

        return newOrder;
      });
    }
  };

  // Slide editor handlers
  const handleSaveSlide = (editedSlide) => {
    setSlides(slides.map(s => s.id === editedSlide.id ? editedSlide : s));
    setEditingSlide(null);
  };

  const handleDeleteSlide = () => {
    if (confirm(`Delete slide "${editingSlide.id}"?`)) {
      setSlides(slides.filter(s => s.id !== editingSlide.id));
      setEditingSlide(null);
      if (currentSlide >= slides.length - 1) {
        setCurrentSlide(Math.max(0, slides.length - 2));
      }
    }
  };

  // Handle slide number input
  const handleSlideInputSubmit = (e) => {
    e.preventDefault();
    const slideNum = parseInt(slideInputValue, 10);
    if (!isNaN(slideNum) && slideNum >= 1 && slideNum <= slides.length) {
      setCurrentSlide(slideNum - 1);
    }
    setSlideInputValue('');
    setSlideInputFocused(false);
  };

  const handleSlideInputFocus = () => {
    setSlideInputFocused(true);
    setSlideInputValue((currentSlide + 1).toString());
  };

  const handleSlideInputBlur = () => {
    setSlideInputFocused(false);
    setSlideInputValue('');
  };

  if (slides.length === 0) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  const slide = slides[currentSlide];

  return (
    <StyleProvider styles={styles}>
      <div className="relative">
        {/* Main Slide */}
        <div
          className={isFullscreen ? 'fixed top-0 left-0 right-0 bottom-0 w-full h-full z-[1000]' : ''}
        >
          <SlideContainer isFullscreen={isFullscreen}>
            <SlideRenderer key={slide.id} slide={slide} />
          </SlideContainer>
        </div>

        {/* Edit Mode Sidebar */}
        {editMode && !isFullscreen && (
          <div className="fixed left-0 top-0 bottom-0 w-80 bg-white border-r shadow-lg z-40 overflow-y-auto">
            <div className="p-4 border-b sticky top-0 bg-white">
              <h2 className="font-bold text-lg mb-2">Edit Mode</h2>
              <div className="space-y-2">
                <button
                  onClick={() => setEditingStyles(true)}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-purple-600 text-white rounded"
                >
                  <Palette size={18} />
                  Edit Styles
                </button>
                <button
                  onClick={saveData}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-success text-white rounded"
                >
                  <Save size={18} />
                  Save to File
                </button>
                <button
                  onClick={exportData}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-primary text-white rounded"
                >
                  <Download size={18} />
                  Export JSON
                </button>
                <label className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-accent text-white rounded cursor-pointer">
                  <Upload size={18} />
                  Import JSON
                  <input
                    type="file"
                    accept=".json"
                    onChange={importData}
                    className="hidden"
                  />
                </label>
                <button
                  onClick={addSlide}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-warning text-white rounded"
                >
                  <Plus size={18} />
                  Add New Slide
                </button>
              </div>
            </div>

          {/* Slide List with Drag & Drop */}
          <div className="p-4 space-y-2">
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={slides.map(s => s.id)}
                strategy={verticalListSortingStrategy}
              >
                {slides.map((s, idx) => (
                  <SortableSlide
                    key={s.id}
                    slide={s}
                    index={idx}
                    isActive={idx === currentSlide}
                    onClick={() => setCurrentSlide(idx)}
                  />
                ))}
              </SortableContext>
            </DndContext>
          </div>
        </div>
      )}

      {/* Navigation Controls */}
      <div className={`fixed bottom-8 left-1/2 transform -translate-x-1/2 ${isFullscreen ? '-z-10' : 'z-50'} ${editMode && !isFullscreen ? 'ml-40' : ''}`}>
        <div className="bg-white/90 backdrop-blur-sm rounded-full shadow-lg px-6 py-3 flex items-center gap-6">
          {/* Edit Mode Toggle */}
          <button
            onClick={() => setEditMode(!editMode)}
            className={`p-2 rounded-full transition-colors ${editMode ? 'bg-accent text-white' : 'hover:bg-accent hover:text-white'}`}
            aria-label="Toggle edit mode"
          >
            <Menu size={24} />
          </button>

          {/* Previous Button */}
          <button
            onClick={prevSlide}
            disabled={currentSlide === 0}
            className="p-2 rounded-full hover:bg-accent hover:text-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="Previous slide"
          >
            <ChevronLeft size={24} />
          </button>

          {/* Slide Counter / Input */}
          <form onSubmit={handleSlideInputSubmit} className="font-mono text-sm font-semibold min-w-[100px] text-center">
            {slideInputFocused ? (
              <input
                type="number"
                min="1"
                max={slides.length}
                value={slideInputValue}
                onChange={(e) => setSlideInputValue(e.target.value)}
                onBlur={handleSlideInputBlur}
                autoFocus
                className="w-16 px-2 py-1 text-center border-2 border-accent rounded text-accent focus:outline-none"
              />
            ) : (
              <button
                type="button"
                onClick={handleSlideInputFocus}
                className="px-3 py-1 hover:bg-gray-100 rounded transition-colors"
              >
                <span className="text-accent">{currentSlide + 1}</span>
                <span className="text-gray-400"> / </span>
                <span className="text-gray-600">{slides.length}</span>
              </button>
            )}
          </form>

          {/* Next Button */}
          <button
            onClick={nextSlide}
            disabled={currentSlide === slides.length - 1}
            className="p-2 rounded-full hover:bg-accent hover:text-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            aria-label="Next slide"
          >
            <ChevronRight size={24} />
          </button>

          {/* Edit Current Slide Button */}
          <button
            onClick={() => setEditingSlide(slide)}
            className="p-2 rounded-full hover:bg-success hover:text-white transition-colors"
            aria-label="Edit current slide"
          >
            <Edit size={24} />
          </button>

          {/* Fullscreen Button */}
          <button
            onClick={toggleFullscreen}
            className="p-2 rounded-full hover:bg-accent hover:text-white transition-colors ml-4"
            aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
          >
            {isFullscreen ? <Minimize size={24} /> : <Maximize size={24} />}
          </button>
        </div>
      </div>

      {/* Keyboard Hints */}
      {!editMode && !editingSlide && !isFullscreen && (
        <div className="fixed top-8 right-8 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg px-4 py-3 text-xs text-gray-600">
          <div className="font-semibold mb-2">Navigation</div>
          <div className="space-y-1">
            <div>← → : Précédent / Suivant</div>
            <div>Espace : Suivant</div>
            <div>Home / End : Début / Fin</div>
            <div>F : Plein écran</div>
            <div>E : Mode édition</div>
          </div>
        </div>
      )}

      {/* Progress Bar */}
      <div className={`fixed top-0 left-0 right-0 h-1 bg-gray-200 ${isFullscreen ? 'z-[1010]' : 'z-50'}`}>
        <div
          className="h-full bg-accent transition-all duration-300"
          style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
        />
      </div>

      {/* Slide Editor Modal */}
      {editingSlide && (
        <SlideEditor
          slide={editingSlide}
          onSave={handleSaveSlide}
          onClose={() => setEditingSlide(null)}
          onDelete={handleDeleteSlide}
        />
      )}

      {/* Style Editor Modal */}
      {editingStyles && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <h2 className="text-2xl font-bold mb-4">Edit Typography Styles</h2>

              {/* Accent Color Selection */}
              <div className="mb-6 p-4 border rounded bg-gray-50">
                <h3 className="font-semibold text-lg mb-3">Accent Color Theme</h3>
                <p className="text-sm text-gray-600 mb-3">Choose an accent color for buttons, highlights, and progress bars</p>
                <div className="grid grid-cols-3 gap-4">
                  <button
                    onClick={() => setStyles({ ...styles, accentColor: 'pink' })}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      (styles.accentColor || 'pink') === 'pink'
                        ? 'border-[#E94560] bg-[#E94560]/10'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="w-full h-12 rounded bg-[#E94560] mb-2"></div>
                    <div className="text-sm font-medium text-center">Pink</div>
                    <div className="text-xs text-gray-500 text-center">#E94560</div>
                  </button>
                  <button
                    onClick={() => setStyles({ ...styles, accentColor: 'green' })}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      styles.accentColor === 'green'
                        ? 'border-[#00D9A3] bg-[#00D9A3]/10'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="w-full h-12 rounded bg-[#00D9A3] mb-2"></div>
                    <div className="text-sm font-medium text-center">Green</div>
                    <div className="text-xs text-gray-500 text-center">#00D9A3</div>
                  </button>
                  <button
                    onClick={() => setStyles({ ...styles, accentColor: 'orange' })}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      styles.accentColor === 'orange'
                        ? 'border-[#FFB800] bg-[#FFB800]/10'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="w-full h-12 rounded bg-[#FFB800] mb-2"></div>
                    <div className="text-sm font-medium text-center">Orange</div>
                    <div className="text-xs text-gray-500 text-center">#FFB800</div>
                  </button>
                </div>
              </div>

              {/* Default Background Options */}
              <div className="mb-6 p-4 border rounded bg-gray-50">
                <h3 className="font-semibold text-lg mb-3">Default Slide Background</h3>
                <p className="text-sm text-gray-600 mb-3">Set default background for slides that don't specify one</p>

                {/* Background Type Selection */}
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">Background Type</label>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setStyles({ ...styles, defaultBackground: { ...styles.defaultBackground, type: 'color' } })}
                      className={`px-4 py-2 rounded border-2 transition-all ${
                        (styles.defaultBackground?.type || 'color') === 'color'
                          ? 'border-accent bg-accent/10 text-accent'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      Solid Color
                    </button>
                    <button
                      onClick={() => setStyles({ ...styles, defaultBackground: { ...styles.defaultBackground, type: 'image' } })}
                      className={`px-4 py-2 rounded border-2 transition-all ${
                        styles.defaultBackground?.type === 'image'
                          ? 'border-accent bg-accent/10 text-accent'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      Image URL
                    </button>
                  </div>
                </div>

                {/* Color or Image Input based on type */}
                {(styles.defaultBackground?.type || 'color') === 'color' ? (
                  <div>
                    <label className="block text-sm font-medium mb-2">Preset Colors</label>
                    <div className="grid grid-cols-4 gap-2 mb-3">
                      {[
                        { name: 'White', value: '#FFFFFF' },
                        { name: 'Light Gray', value: '#F7F7F7' },
                        { name: 'Dark Gray', value: '#2D2D2D' },
                        { name: 'Black', value: '#1A1A2E' }
                      ].map((preset) => (
                        <button
                          key={preset.value}
                          onClick={() => setStyles({ ...styles, defaultBackground: { type: 'color', value: preset.value } })}
                          className={`p-3 rounded-lg border-2 transition-all ${
                            styles.defaultBackground?.value === preset.value
                              ? 'border-accent'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <div className="w-full h-8 rounded mb-1" style={{ backgroundColor: preset.value, border: '1px solid #ddd' }}></div>
                          <div className="text-xs text-center">{preset.name}</div>
                        </button>
                      ))}
                    </div>
                    <label className="block text-sm font-medium mb-1">Custom Color</label>
                    <input
                      type="color"
                      value={styles.defaultBackground?.value || '#FFFFFF'}
                      onChange={(e) => setStyles({ ...styles, defaultBackground: { type: 'color', value: e.target.value } })}
                      className="w-full border rounded px-3 py-2 h-10"
                    />
                  </div>
                ) : (
                  <div>
                    <label className="block text-sm font-medium mb-1">Image URL</label>
                    <input
                      type="text"
                      value={styles.defaultBackground?.value || ''}
                      onChange={(e) => setStyles({ ...styles, defaultBackground: { ...styles.defaultBackground, type: 'image', value: e.target.value } })}
                      placeholder="https://example.com/image.jpg"
                      className="w-full border rounded px-3 py-2 mb-4"
                    />
                    
                    {/* Image Filters */}
                    <div className="space-y-3 border-t pt-3">
                      <h4 className="text-sm font-medium mb-2">Image Filters</h4>
                      
                      {/* Overlay (Darken/Lighten) */}
                      <div>
                        <label className="block text-xs font-medium mb-1">
                          Overlay: {styles.defaultBackground?.filters?.overlay || 'none'}
                        </label>
                        <select
                          value={styles.defaultBackground?.filters?.overlay || 'none'}
                          onChange={(e) => setStyles({ 
                            ...styles, 
                            defaultBackground: { 
                              ...styles.defaultBackground,
                              filters: {
                                ...(styles.defaultBackground?.filters || {}),
                                overlay: e.target.value
                              }
                            }
                          })}
                          className="w-full p-2 border rounded text-sm"
                        >
                          <option value="none">None</option>
                          <option value="darken-light">Darken (Light)</option>
                          <option value="darken-medium">Darken (Medium)</option>
                          <option value="darken-heavy">Darken (Heavy)</option>
                          <option value="lighten-light">Lighten (Light)</option>
                          <option value="lighten-medium">Lighten (Medium)</option>
                          <option value="lighten-heavy">Lighten (Heavy)</option>
                        </select>
                      </div>

                      {/* Blur */}
                      <div>
                        <label className="block text-xs font-medium mb-1">
                          Blur: {styles.defaultBackground?.filters?.blur || '0'}px
                        </label>
                        <div className="flex gap-2 items-center">
                          <input
                            type="range"
                            min="0"
                            max="20"
                            step="1"
                            value={styles.defaultBackground?.filters?.blur || 0}
                            onChange={(e) => setStyles({ 
                              ...styles, 
                              defaultBackground: { 
                                ...styles.defaultBackground,
                                filters: {
                                  ...(styles.defaultBackground?.filters || {}),
                                  blur: parseInt(e.target.value)
                                }
                              }
                            })}
                            className="flex-1"
                          />
                          <span className="text-sm w-12 text-right">{styles.defaultBackground?.filters?.blur || 0}px</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Google Fonts Section */}
              <div className="mb-6 p-4 border rounded bg-blue-50">
                <h3 className="font-semibold text-lg mb-3">Google Fonts Integration</h3>
                <p className="text-sm text-gray-600 mb-3">Select fonts from Google Fonts library. Fonts will be loaded automatically.</p>
                <div className="text-xs text-gray-500">
                  <strong>Available fonts:</strong> Inter, Roboto, Open Sans, Montserrat, Poppins, Playfair Display, Merriweather, Lora, Raleway, Oswald
                </div>
              </div>

              {/* H1 Styles */}
              <div className="mb-6 p-4 border rounded">
                <h3 className="font-semibold text-lg mb-3">H1 (Heading 1)</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <label className="block text-sm font-medium mb-1">Font Family</label>
                    <select
                      value={styles.h1.fontFamily}
                      onChange={(e) => setStyles({ ...styles, h1: { ...styles.h1, fontFamily: e.target.value } })}
                      className="w-full border rounded px-3 py-2"
                    >
                      {GOOGLE_FONTS.map(font => (
                        <option key={font.name} value={font.name} style={{ fontFamily: font.name }}>
                          {font.name} ({font.category})
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Font Size</label>
                    <input
                      type="text"
                      value={styles.h1.fontSize}
                      onChange={(e) => setStyles({ ...styles, h1: { ...styles.h1, fontSize: e.target.value } })}
                      className="w-full border rounded px-3 py-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Font Weight</label>
                    <input
                      type="text"
                      value={styles.h1.fontWeight}
                      onChange={(e) => setStyles({ ...styles, h1: { ...styles.h1, fontWeight: e.target.value } })}
                      className="w-full border rounded px-3 py-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Color</label>
                    <input
                      type="color"
                      value={styles.h1.color}
                      onChange={(e) => setStyles({ ...styles, h1: { ...styles.h1, color: e.target.value } })}
                      className="w-full border rounded px-3 py-2 h-10"
                    />
                  </div>
                </div>
              </div>

              {/* H2 Styles */}
              <div className="mb-6 p-4 border rounded">
                <h3 className="font-semibold text-lg mb-3">H2 (Heading 2)</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <label className="block text-sm font-medium mb-1">Font Family</label>
                    <select
                      value={styles.h2.fontFamily}
                      onChange={(e) => setStyles({ ...styles, h2: { ...styles.h2, fontFamily: e.target.value } })}
                      className="w-full border rounded px-3 py-2"
                    >
                      {GOOGLE_FONTS.map(font => (
                        <option key={font.name} value={font.name} style={{ fontFamily: font.name }}>
                          {font.name} ({font.category})
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Font Size</label>
                    <input
                      type="text"
                      value={styles.h2.fontSize}
                      onChange={(e) => setStyles({ ...styles, h2: { ...styles.h2, fontSize: e.target.value } })}
                      className="w-full border rounded px-3 py-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Font Weight</label>
                    <input
                      type="text"
                      value={styles.h2.fontWeight}
                      onChange={(e) => setStyles({ ...styles, h2: { ...styles.h2, fontWeight: e.target.value } })}
                      className="w-full border rounded px-3 py-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Color</label>
                    <input
                      type="color"
                      value={styles.h2.color}
                      onChange={(e) => setStyles({ ...styles, h2: { ...styles.h2, color: e.target.value } })}
                      className="w-full border rounded px-3 py-2 h-10"
                    />
                  </div>
                </div>
              </div>

              {/* H3 Styles */}
              <div className="mb-6 p-4 border rounded">
                <h3 className="font-semibold text-lg mb-3">H3 (Heading 3)</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <label className="block text-sm font-medium mb-1">Font Family</label>
                    <select
                      value={styles.h3.fontFamily}
                      onChange={(e) => setStyles({ ...styles, h3: { ...styles.h3, fontFamily: e.target.value } })}
                      className="w-full border rounded px-3 py-2"
                    >
                      {GOOGLE_FONTS.map(font => (
                        <option key={font.name} value={font.name} style={{ fontFamily: font.name }}>
                          {font.name} ({font.category})
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Font Size</label>
                    <input
                      type="text"
                      value={styles.h3.fontSize}
                      onChange={(e) => setStyles({ ...styles, h3: { ...styles.h3, fontSize: e.target.value } })}
                      className="w-full border rounded px-3 py-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Font Weight</label>
                    <input
                      type="text"
                      value={styles.h3.fontWeight}
                      onChange={(e) => setStyles({ ...styles, h3: { ...styles.h3, fontWeight: e.target.value } })}
                      className="w-full border rounded px-3 py-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Color</label>
                    <input
                      type="color"
                      value={styles.h3.color}
                      onChange={(e) => setStyles({ ...styles, h3: { ...styles.h3, color: e.target.value } })}
                      className="w-full border rounded px-3 py-2 h-10"
                    />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => setEditingStyles(false)}
                  className="px-4 py-2 border rounded hover:bg-gray-100"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </StyleProvider>
  );
}

export default AppEditable;
