import React, { useState } from 'react';
import { X, Save, Trash2, Plus } from 'lucide-react';

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
      background: { type, value }
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
              <input
                type="text"
                value={editedSlide.background.value}
                onChange={(e) => updateBackground('image', e.target.value)}
                className="w-full p-2 border rounded"
                placeholder="https://example.com/image.jpg"
              />
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
