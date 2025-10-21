import React from 'react';

const IconGrid = ({ items, columns = 3 }) => {
  // items format: [{ icon: <Video />, title: 'Feature', description: 'Description' }]

  const gridCols = {
    2: 'grid-cols-2',
    3: 'grid-cols-3',
    4: 'grid-cols-4',
  };

  return (
    <div className={`grid ${gridCols[columns]} gap-6`}>
      {items.map((item, index) => (
        <div
          key={index}
          className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow"
        >
          <div className="w-16 h-16 flex items-center justify-center mb-4 text-accent">
            {item.icon}
          </div>
          <h4 className="text-lg font-bold text-primary mb-2">{item.title}</h4>
          {item.description && (
            <p className="text-sm text-neutral-dark">{item.description}</p>
          )}
          {item.value && (
            <div className="mt-2 text-2xl font-mono font-bold text-accent">
              {item.value}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default IconGrid;
