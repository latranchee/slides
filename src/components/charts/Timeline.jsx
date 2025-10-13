import React from 'react';
import { Circle } from 'lucide-react';

const Timeline = ({ events }) => {
  // events format: [{ year: '2007', title: 'WETS', description: 'First business at age 16', highlight: true }]

  return (
    <div className="relative">
      {/* Vertical line */}
      <div className="absolute left-24 top-0 bottom-0 w-1 bg-accent"></div>

      {/* Events */}
      <div className="space-y-8">
        {events.map((event, index) => (
          <div key={index} className="relative flex items-start gap-8">
            {/* Year */}
            <div className="w-20 text-right">
              <div className={`text-2xl font-bold font-mono ${event.highlight ? 'text-accent' : 'text-primary'}`}>
                {event.year}
              </div>
            </div>

            {/* Dot */}
            <div className="relative z-10 flex-shrink-0">
              <Circle
                className={`w-6 h-6 ${event.highlight ? 'fill-accent text-accent' : 'fill-primary text-primary'}`}
              />
            </div>

            {/* Content */}
            <div className="flex-1 pb-8">
              <h4 className="text-xl font-bold text-primary mb-2">{event.title}</h4>
              <p className="text-neutral-dark leading-relaxed">{event.description}</p>
              {event.stats && (
                <div className="mt-2 text-accent font-mono font-bold">
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
