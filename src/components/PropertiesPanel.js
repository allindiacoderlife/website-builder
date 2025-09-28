"use client";
import { useBuilderStore } from "@/store/useBuilderStore";
import { useState } from "react";

function ArrayEditor({ label, value, onChange }) {
  const [editingValue, setEditingValue] = useState(value.join(", "));
  
  const handleSave = () => {
    const newArray = editingValue.split(",").map(item => item.trim()).filter(item => item);
    onChange(newArray);
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
      <textarea
        value={editingValue}
        onChange={(e) => setEditingValue(e.target.value)}
        onBlur={handleSave}
        className="w-full p-2 border border-gray-300 rounded text-sm text-black"
        rows={3}
        placeholder="Comma separated values..."
      />
      <p className="text-xs text-gray-500 mt-1">Separate items with commas</p>
    </div>
  );
}

function ColorPicker({ label, value, onChange, options }) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded text-sm text-black"
      >
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default function PropertiesPanel() {
  const { selectedComponent, updateComponentProps } = useBuilderStore();

  if (!selectedComponent) {
    return (
      <div className="w-80 p-4 border-l border-gray-200 bg-gray-50 overflow-y-auto" style={{ height: "calc(100vh - 73px)" }}>
        <h2 className="font-bold text-lg mb-4 text-gray-800">Properties</h2>
        <div className="text-center text-gray-500 mt-8">
          <div className="text-4xl mb-3">⚙️</div>
          <p>Select a component to edit its properties</p>
        </div>
      </div>
    );
  }

  const handlePropChange = (key, value) => {
    updateComponentProps(selectedComponent.uniqueId, { [key]: value });
  };

  const backgroundOptions = [
    { value: "bg-blue-600", label: "Blue" },
    { value: "bg-red-600", label: "Red" },
    { value: "bg-green-600", label: "Green" },
    { value: "bg-purple-600", label: "Purple" },
    { value: "bg-orange-500", label: "Orange" },
    { value: "bg-gray-800", label: "Dark Gray" },
    { value: "bg-indigo-600", label: "Indigo" },
    { value: "bg-gradient-to-r from-indigo-500 to-purple-600", label: "Indigo to Purple Gradient" },
    { value: "bg-gradient-to-r from-blue-500 to-teal-500", label: "Blue to Teal Gradient" },
    { value: "bg-gradient-to-r from-pink-500 to-rose-500", label: "Pink to Rose Gradient" },
  ];

  const textColorOptions = [
    { value: "text-white", label: "White" },
    { value: "text-black", label: "Black" },
    { value: "text-gray-800", label: "Dark Gray" },
    { value: "text-blue-600", label: "Blue" },
    { value: "text-red-600", label: "Red" },
  ];

  const renderPropertyEditor = () => {
    switch (selectedComponent.type) {
      case 'navbar':
        return (
          <>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Site Name</label>
              <input
                type="text"
                value={selectedComponent.props.siteName}
                onChange={(e) => handlePropChange('siteName', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded text-sm text-black"
              />
            </div>
            
            <ArrayEditor
              label="Menu Items"
              value={selectedComponent.props.menuItems}
              onChange={(value) => handlePropChange('menuItems', value)}
            />
            
            <ColorPicker
              label="Background Color"
              value={selectedComponent.props.backgroundColor}
              onChange={(value) => handlePropChange('backgroundColor', value)}
              options={backgroundOptions}
            />
            
            <ColorPicker
              label="Text Color"
              value={selectedComponent.props.textColor}
              onChange={(value) => handlePropChange('textColor', value)}
              options={textColorOptions}
            />
          </>
        );

      case 'hero':
        return (
          <>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
              <input
                type="text"
                value={selectedComponent.props.title}
                onChange={(e) => handlePropChange('title', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded text-sm text-black"
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Subtitle</label>
              <textarea
                value={selectedComponent.props.subtitle}
                onChange={(e) => handlePropChange('subtitle', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded text-sm text-black"
                rows={3}
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Button Text</label>
              <input
                type="text"
                value={selectedComponent.props.buttonText}
                onChange={(e) => handlePropChange('buttonText', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded text-sm text-black"
              />
            </div>
            
            <ColorPicker
              label="Background"
              value={selectedComponent.props.backgroundColor}
              onChange={(value) => handlePropChange('backgroundColor', value)}
              options={backgroundOptions}
            />
          </>
        );

      case 'footer':
        return (
          <>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Site Name</label>
              <input
                type="text"
                value={selectedComponent.props.siteName}
                onChange={(e) => handlePropChange('siteName', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded text-sm text-black"
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                value={selectedComponent.props.description}
                onChange={(e) => handlePropChange('description', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded text-sm text-black"
                rows={2}
              />
            </div>
            
            <ArrayEditor
              label="Footer Links"
              value={selectedComponent.props.links}
              onChange={(value) => handlePropChange('links', value)}
            />
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Copyright Text</label>
              <input
                type="text"
                value={selectedComponent.props.copyright}
                onChange={(e) => handlePropChange('copyright', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded text-sm text-black"
              />
            </div>
          </>
        );

      case 'content':
        return (
          <>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Main Title</label>
              <input
                type="text"
                value={selectedComponent.props.title}
                onChange={(e) => handlePropChange('title', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded text-sm text-black"
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Left Column Title</label>
              <input
                type="text"
                value={selectedComponent.props.leftTitle}
                onChange={(e) => handlePropChange('leftTitle', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded text-sm text-black"
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Left Column Content</label>
              <textarea
                value={selectedComponent.props.leftContent}
                onChange={(e) => handlePropChange('leftContent', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded text-sm text-black"
                rows={4}
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Right Column Title</label>
              <input
                type="text"
                value={selectedComponent.props.rightTitle}
                onChange={(e) => handlePropChange('rightTitle', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded text-sm text-black"
              />
            </div>
            
            <ArrayEditor
              label="Right Column List Items"
              value={selectedComponent.props.rightList}
              onChange={(value) => handlePropChange('rightList', value)}
            />
          </>
        );

      case 'cta':
        return (
          <>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
              <input
                type="text"
                value={selectedComponent.props.title}
                onChange={(e) => handlePropChange('title', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded text-sm text-black"
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Subtitle</label>
              <textarea
                value={selectedComponent.props.subtitle}
                onChange={(e) => handlePropChange('subtitle', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded text-sm text-black"
                rows={3}
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Primary Button Text</label>
              <input
                type="text"
                value={selectedComponent.props.primaryButton}
                onChange={(e) => handlePropChange('primaryButton', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded text-sm text-black"
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Secondary Button Text</label>
              <input
                type="text"
                value={selectedComponent.props.secondaryButton}
                onChange={(e) => handlePropChange('secondaryButton', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded text-sm text-black"
              />
            </div>
            
            <ColorPicker
              label="Background Color"
              value={selectedComponent.props.backgroundColor}
              onChange={(value) => handlePropChange('backgroundColor', value)}
              options={backgroundOptions}
            />
          </>
        );

      case 'testimonials':
        return (
          <>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Section Title</label>
              <input
                type="text"
                value={selectedComponent.props.title}
                onChange={(e) => handlePropChange('title', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded text-sm text-black"
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Testimonials</label>
              <div className="space-y-3 max-h-64 overflow-y-auto border border-gray-200 rounded p-3">
                {selectedComponent.props.testimonials.map((testimonial, index) => (
                  <div key={index} className="border border-gray-100 rounded p-3 bg-white">
                    <div className="mb-2">
                      <input
                        type="text"
                        value={testimonial.name}
                        onChange={(e) => {
                          const newTestimonials = [...selectedComponent.props.testimonials];
                          newTestimonials[index].name = e.target.value;
                          handlePropChange('testimonials', newTestimonials);
                        }}
                        placeholder="Name"
                        className="w-full p-1 text-xs border border-gray-300 rounded text-black mb-1"
                      />
                      <input
                        type="text"
                        value={testimonial.role}
                        onChange={(e) => {
                          const newTestimonials = [...selectedComponent.props.testimonials];
                          newTestimonials[index].role = e.target.value;
                          handlePropChange('testimonials', newTestimonials);
                        }}
                        placeholder="Role"
                        className="w-full p-1 text-xs border border-gray-300 rounded text-black"
                      />
                    </div>
                    <textarea
                      value={testimonial.text}
                      onChange={(e) => {
                        const newTestimonials = [...selectedComponent.props.testimonials];
                        newTestimonials[index].text = e.target.value;
                        handlePropChange('testimonials', newTestimonials);
                      }}
                      placeholder="Testimonial text"
                      className="w-full p-1 text-xs border border-gray-300 rounded text-black"
                      rows={2}
                    />
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-2">Edit testimonials above. Each testimonial has name, role, and text fields.</p>
            </div>
            
            <ColorPicker
              label="Background Color"
              value={selectedComponent.props.backgroundColor}
              onChange={(value) => handlePropChange('backgroundColor', value)}
              options={backgroundOptions}
            />
          </>
        );

      default:
        return <p className="text-gray-500">No properties available for this component.</p>;
    }
  };

  return (
    <div className="w-80 p-4 border-l border-gray-200 bg-gray-50 overflow-y-auto" style={{ height: "calc(100vh - 73px)" }}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-bold text-lg text-gray-800">Properties</h2>
        <div className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded">
          {selectedComponent.type}
        </div>
      </div>
      
      <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg">
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm font-semibold text-blue-800">🎯 Selected Component</p>
          <div className="text-xs px-2 py-1 bg-blue-500 text-white rounded font-medium">
            {selectedComponent.type.toUpperCase()}
          </div>
        </div>
        <p className="text-sm text-blue-700 font-medium">{selectedComponent.label}</p>
        <p className="text-xs text-gray-600 mt-1">ID: {selectedComponent.uniqueId.slice(0, 25)}...</p>
        <div className="mt-2 text-xs text-blue-600">
          ✏️ Edit the properties below and see changes instantly!
        </div>
      </div>
      
      {renderPropertyEditor()}
    </div>
  );
}