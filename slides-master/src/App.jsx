import React, { useState, useEffect } from 'react';
import SlideContainer from './components/base/SlideContainer';
import { slidesData } from './slides/SlidesData';
import { slidesDataPart2 } from './slides/SlidesDataPart2';
import { ChevronLeft, ChevronRight, Maximize, Minimize } from 'lucide-react';

// Combine all slides
const allSlides = [...slidesData, ...slidesDataPart2];

function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Fullscreen handlers
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.error('Error attempting to enable fullscreen:', err);
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  // Track fullscreen state changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // Keyboard navigation
  useEffect(() => {
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
        setCurrentSlide(allSlides.length - 1);
      } else if (e.key === 'f' || e.key === 'F') {
        e.preventDefault();
        toggleFullscreen();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlide]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev < allSlides.length - 1 ? prev + 1 : prev));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const slide = allSlides[currentSlide];

  return (
    <div className="relative">
      {/* Main Slide */}
      <SlideContainer background={slide.background}>
        {slide.content}
      </SlideContainer>

      {/* Navigation Controls */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50">
        <div className="bg-white/90 backdrop-blur-sm rounded-full shadow-lg px-6 py-3 flex items-center gap-6">
          {/* Previous Button */}
          <button
            onClick={prevSlide}
            disabled={currentSlide === 0}
            className="p-2 rounded-full hover:bg-accent hover:text-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-current"
            aria-label="Previous slide"
          >
            <ChevronLeft size={24} />
          </button>

          {/* Slide Counter */}
          <div className="font-mono text-sm font-semibold min-w-[100px] text-center">
            <span className="text-accent">{currentSlide + 1}</span>
            <span className="text-gray-400"> / </span>
            <span className="text-gray-600">{allSlides.length}</span>
          </div>

          {/* Next Button */}
          <button
            onClick={nextSlide}
            disabled={currentSlide === allSlides.length - 1}
            className="p-2 rounded-full hover:bg-accent hover:text-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-current"
            aria-label="Next slide"
          >
            <ChevronRight size={24} />
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
      <div className="fixed top-8 right-8 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg px-4 py-3 text-xs text-gray-600">
        <div className="font-semibold mb-2">Navigation</div>
        <div className="space-y-1">
          <div>← → : Précédent / Suivant</div>
          <div>Espace : Suivant</div>
          <div>Home / End : Début / Fin</div>
          <div>F : Plein écran</div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-gray-200 z-50">
        <div
          className="h-full bg-accent transition-all duration-300"
          style={{ width: `${((currentSlide + 1) / allSlides.length) * 100}%` }}
        />
      </div>
    </div>
  );
}

export default App;
