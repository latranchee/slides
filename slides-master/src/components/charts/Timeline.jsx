import React from 'react';
import { Circle } from 'lucide-react';

const Timeline = ({ events }) => {
  // events format: [{ year: '2007', title: 'WETS', description: 'First business at age 16', highlight: true }]

  return (
    <div className="relative overflow-x-auto pb-8 px-8 pt-4">
      {/* Events - positioned first so line can measure its width */}
      <div className="relative flex gap-8 min-w-max pb-6">
        {/* Horizontal line - extends from first to last dot */}
        <div 
          className="absolute bg-accent pointer-events-none" 
          style={{ 
            top: '48px',
            left: '10px',
            right: '10px',
            height: '4px' 
          }}
        />
        
        {events.map((event, index) => (
          <div key={index} className="relative flex flex-col w-64 flex-shrink-0 z-10">
            {/* Year - above dot */}
            <div className="mb-3">
              <div className="text-xl font-bold font-mono text-accent">
                {event.year}
              </div>
            </div>

            {/* Dot - centered on line with transform - always colored */}
            <div className="relative h-5 mb-6 flex items-center">
              <Circle
                className="w-5 h-5 fill-accent text-accent"
              />
            </div>

            {/* Content - below dot */}
            <div className="text-left">
              <h4 className="text-lg font-bold text-primary mb-2">{event.title}</h4>
              <p className="text-sm text-neutral-dark leading-relaxed">{event.description}</p>
              {event.stats && (
                <div className="mt-2 text-sm text-accent font-mono font-bold">
                  {event.stats}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;
