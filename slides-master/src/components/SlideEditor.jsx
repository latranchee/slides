import React, { useState } from 'react';
import { X, Save, Trash2, Plus, Sun, Moon } from 'lucide-react';

const sanitizeSlideId = (id) => {
  return id
    .toLowerCase()                           // Convert to lowercase
    .replace(/\s+/g, '-')                    // Replace spaces with hyphens
    .replace(/[^a-z0-9-]/g, '')              // Remove invalid characters (keep only a-z, 0-9, -)
    .replace(/-+/g, '-')                     // Replace multiple hyphens with single hyphen
    .replace(/^-|-$/g, '');                  // Remove leading/trailing hyphens
};

const SlideEditor = ({ slide, onSave, onClose, onDelete }) => {
  const [editedSlide, setEditedSlide] = useState(JSON.parse(JSON.stringify(slide)));

  const updateContent = (key, value) => {
    setEditedSlide(prev => ({
      ...prev,
      content: {
        ...prev.content,
        [key]: value
      }
    }));
  };

  const updateBackground = (type, value) => {
    setEditedSlide(prev => ({
      ...prev,
      background: { 
        ...prev.background,
        type, 
        value 
      }
    }));
  };

  const updateBackgroundFilter = (filterKey, filterValue) => {
    setEditedSlide(prev => ({
      ...prev,
      background: {
        ...prev.background,
        filters: {
          ...(prev.background?.filters || {}),
          [filterKey]: filterValue
        }
      }
    }));
  };

  const updateTheme = (theme) => {
    setEditedSlide(prev => ({
      ...prev,
      theme: theme
    }));
  };

  const updateSlideId = (newId) => {
    const sanitizedId = sanitizeSlideId(newId);
    setEditedSlide(prev => ({
      ...prev,
      id: sanitizedId
    }));
  };

  const addStatToGrid = () => {
    if (editedSlide.type === 'stats-grid') {
      setEditedSlide(prev => ({
        ...prev,
        content: {
          ...prev.content,
          stats: [...prev.content.stats, { value: '', label: '', color: 'primary' }]
        }
      }));
    }
  };

  const removeStatFromGrid = (index) => {
    if (editedSlide.type === 'stats-grid') {
      setEditedSlide(prev => ({
        ...prev,
        content: {
          ...prev.content,
          stats: prev.content.stats.filter((_, i) => i !== index)
        }
      }));
    }
  };

  const updateStat = (index, key, value) => {
    if (editedSlide.type === 'stats-grid') {
      setEditedSlide(prev => ({
        ...prev,
        content: {
          ...prev.content,
          stats: prev.content.stats.map((stat, i) =>
            i === index ? { ...stat, [key]: value } : stat
          )
        }
      }));
    }
  };

  const renderEditor = () => {
    const { type, content } = editedSlide;

    switch (type) {
      case 'title':
        return (
          <>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Title</label>
              <input
                type="text"
                value={content.title}
                onChange={(e) => updateContent('title', e.target.value)}
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Subtitle</label>
              <textarea
                value={content.subtitle}
                onChange={(e) => updateContent('subtitle', e.target.value)}
                className="w-full p-2 border rounded h-20"
              />
            </div>
          </>
        );

      case 'text-centered':
        return (
          <>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Heading</label>
              <input
                type="text"
                value={content.heading}
                onChange={(e) => updateContent('heading', e.target.value)}
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Body</label>
              <textarea
                value={content.body}
                onChange={(e) => updateContent('body', e.target.value)}
                className="w-full p-2 border rounded h-32"
              />
            </div>
          </>
        );

      case 'quote':
        return (
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Quote (HTML allowed)</label>
            <textarea
              value={content.quote}
              onChange={(e) => updateContent('quote', e.target.value)}
              className="w-full p-2 border rounded h-32"
            />
          </div>
        );

      case 'stats-grid':
        return (
          <>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Heading</label>
              <input
                type="text"
                value={content.heading}
                onChange={(e) => updateContent('heading', e.target.value)}
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium">Stats</label>
                <button
                  onClick={addStatToGrid}
                  className="flex items-center gap-1 px-3 py-1 bg-success text-white rounded text-sm"
                >
                  <Plus size={16} />
                  Add Stat
                </button>
              </div>
              {content.stats.map((stat, idx) => (
                <div key={idx} className="border rounded p-3 mb-3">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-sm font-medium">Stat {idx + 1}</span>
                    <button
                      onClick={() => removeStatFromGrid(idx)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <input
                    type="text"
                    placeholder="Value (e.g., +37%)"
                    value={stat.value}
                    onChange={(e) => updateStat(idx, 'value', e.target.value)}
                    className="w-full p-2 border rounded mb-2"
                  />
                  <input
                    type="text"
                    placeholder="Label"
                    value={stat.label}
                    onChange={(e) => updateStat(idx, 'label', e.target.value)}
                    className="w-full p-2 border rounded mb-2"
                  />
                  <select
                    value={stat.color}
                    onChange={(e) => updateStat(idx, 'color', e.target.value)}
                    className="w-full p-2 border rounded"
                  >
                    <option value="primary">Primary</option>
                    <option value="accent">Accent</option>
                    <option value="success">Success</option>
                    <option value="warning">Warning</option>
                  </select>
                </div>
              ))}
            </div>
          </>
        );

      case 'big-stat':
        return (
          <>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Heading (optional)</label>
              <input
                type="text"
                value={content.heading || ''}
                onChange={(e) => updateContent('heading', e.target.value)}
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Big Value</label>
              <input
                type="text"
                value={content.value}
                onChange={(e) => updateContent('value', e.target.value)}
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Description (HTML allowed)</label>
              <textarea
                value={content.description}
                onChange={(e) => updateContent('description', e.target.value)}
                className="w-full p-2 border rounded h-20"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Color</label>
              <select
                value={content.color || 'accent'}
                onChange={(e) => updateContent('color', e.target.value)}
                className="w-full p-2 border rounded"
              >
                <option value="primary">Primary</option>
                <option value="accent">Accent</option>
                <option value="success">Success</option>
                <option value="warning">Warning</option>
              </select>
            </div>
          </>
        );

      case 'custom-html':
        return (
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">HTML Content</label>
            <textarea
              value={content.html}
              onChange={(e) => updateContent('html', e.target.value)}
              className="w-full p-2 border rounded h-64 font-mono text-sm"
            />
          </div>
        );

      case 'image-text':
        return (
          <>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Heading</label>
              <input
                type="text"
                value={content.heading || ''}
                onChange={(e) => updateContent('heading', e.target.value)}
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Body</label>
              <textarea
                value={content.body || ''}
                onChange={(e) => updateContent('body', e.target.value)}
                className="w-full p-2 border rounded h-24"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Image URL</label>
              <input
                type="text"
                value={content.imageUrl || ''}
                onChange={(e) => updateContent('imageUrl', e.target.value)}
                className="w-full p-2 border rounded"
                placeholder="https://example.com/image.jpg"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Image Placeholder Text</label>
              <input
                type="text"
                value={content.imagePlaceholder || ''}
                onChange={(e) => updateContent('imagePlaceholder', e.target.value)}
                className="w-full p-2 border rounded"
                placeholder="Description of image"
              />
            </div>
          </>
        );

      case 'multi-section':
      case 'two-column':
      case 'comparison':
      case 'timeline':
      case 'icon-grid':
      case 'feature-list':
      case 'calculation-steps':
        return (
          <>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Heading</label>
              <input
                type="text"
                value={content.heading || ''}
                onChange={(e) => updateContent('heading', e.target.value)}
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded">
              <p className="text-sm text-yellow-800">
                ℹ️ This slide type ("{type}") has complex content structure. 
                Edit the JSON directly for full control, or change background/theme here.
              </p>
            </div>
          </>
        );

      default:
        return (
          <div className="text-gray-500">
            Editing for slide type "{type}" not yet implemented. You can still change the background below.
          </div>
        );
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <div>
            <h2 className="text-xl font-bold">Edit Slide</h2>
            <p className="text-sm text-gray-500">ID: {editedSlide.id} | Type: {editedSlide.type}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Slide ID Section */}
          <div className="mb-6 p-4 bg-blue-50 rounded border border-blue-200">
            <h3 className="font-semibold mb-3">Slide ID</h3>
            <input
              type="text"
              value={editedSlide.id}
              onChange={(e) => updateSlideId(e.target.value)}
              className="w-full p-2 border rounded font-mono text-sm"
              placeholder="my-slide-id"
            />
            <p className="text-xs text-gray-600 mt-2">
              Use lowercase with hyphens (e.g., "my-custom-slide"). Must be unique.
            </p>
          </div>

          {/* Background Section */}
          <div className="mb-6 p-4 bg-gray-50 rounded">
            <h3 className="font-semibold mb-3">Background</h3>
            <div className="flex gap-4 mb-3">
              <button
                onClick={() => updateBackground('color', editedSlide.background.value)}
                className={`px-4 py-2 rounded ${editedSlide.background.type === 'color' ? 'bg-primary text-white' : 'bg-white'}`}
              >
                Color
              </button>
              <button
                onClick={() => updateBackground('image', editedSlide.background.value)}
                className={`px-4 py-2 rounded ${editedSlide.background.type === 'image' ? 'bg-primary text-white' : 'bg-white'}`}
              >
                Image URL
              </button>
            </div>
            {editedSlide.background.type === 'color' ? (
              <div className="flex gap-2">
                <input
                  type="color"
                  value={editedSlide.background.value}
                  onChange={(e) => updateBackground('color', e.target.value)}
                  className="h-10"
                />
                <input
                  type="text"
                  value={editedSlide.background.value}
                  onChange={(e) => updateBackground('color', e.target.value)}
                  className="flex-1 p-2 border rounded"
                  placeholder="#FFFFFF"
                />
              </div>
            ) : (
              <>
                <input
                  type="text"
                  value={editedSlide.background.value}
                  onChange={(e) => updateBackground('image', e.target.value)}
                  className="w-full p-2 border rounded mb-4"
                  placeholder="https://example.com/image.jpg"
                />
                
                {/* Image Filters */}
                <div className="space-y-3 border-t pt-3">
                  <h4 className="text-sm font-medium mb-2">Image Filters</h4>
                  
                  {/* Overlay (Darken/Lighten) */}
                  <div>
                    <label className="block text-xs font-medium mb-1">
                      Overlay: {editedSlide.background.filters?.overlay || 'none'}
                    </label>
                    <select
                      value={editedSlide.background.filters?.overlay || 'none'}
                      onChange={(e) => updateBackgroundFilter('overlay', e.target.value)}
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
                      Blur: {editedSlide.background.filters?.blur || '0'}px
                    </label>
                    <div className="flex gap-2 items-center">
                      <input
                        type="range"
                        min="0"
                        max="20"
                        step="1"
                        value={editedSlide.background.filters?.blur || 0}
                        onChange={(e) => updateBackgroundFilter('blur', parseInt(e.target.value))}
                        className="flex-1"
                      />
                      <span className="text-sm w-12 text-right">{editedSlide.background.filters?.blur || 0}px</span>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Theme Mode Section */}
          <div className="mb-6 p-4 bg-gray-50 rounded">
            <h3 className="font-semibold mb-3">Theme Mode</h3>
            <p className="text-sm text-gray-600 mb-3">
              Control text color for this slide. Auto mode detects based on background brightness.
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => updateTheme('auto')}
                className={`flex items-center gap-2 px-4 py-2 rounded flex-1 ${
                  (!editedSlide.theme || editedSlide.theme === 'auto') 
                    ? 'bg-primary text-white' 
                    : 'bg-white border border-gray-300'
                }`}
              >
                <Sun size={18} />
                <Moon size={18} />
                Auto
              </button>
              <button
                onClick={() => updateTheme('light')}
                className={`flex items-center gap-2 px-4 py-2 rounded flex-1 ${
                  editedSlide.theme === 'light' 
                    ? 'bg-primary text-white' 
                    : 'bg-white border border-gray-300'
                }`}
              >
                <Sun size={18} />
                Light
              </button>
              <button
                onClick={() => updateTheme('dark')}
                className={`flex items-center gap-2 px-4 py-2 rounded flex-1 ${
                  editedSlide.theme === 'dark' 
                    ? 'bg-primary text-white' 
                    : 'bg-white border border-gray-300'
                }`}
              >
                <Moon size={18} />
                Dark
              </button>
            </div>
            {editedSlide.theme === 'light' && (
              <p className="text-xs text-gray-500 mt-2">
                ☀️ Light mode: Dark text on any background
              </p>
            )}
            {editedSlide.theme === 'dark' && (
              <p className="text-xs text-gray-500 mt-2">
                🌙 Dark mode: White text on any background
              </p>
            )}
            {(!editedSlide.theme || editedSlide.theme === 'auto') && (
              <p className="text-xs text-gray-500 mt-2">
                🤖 Auto: Detects brightness automatically
              </p>
            )}
          </div>

          {/* Content Section */}
          <div className="mb-6">
            <h3 className="font-semibold mb-3">Content</h3>
            {renderEditor()}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-4 border-t">
          <button
            onClick={onDelete}
            className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded"
          >
            <Trash2 size={18} />
            Delete Slide
          </button>
          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 border rounded hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={() => onSave(editedSlide)}
              className="flex items-center gap-2 px-4 py-2 bg-success text-white rounded hover:bg-success/90"
            >
              <Save size={18} />
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SlideEditor;
