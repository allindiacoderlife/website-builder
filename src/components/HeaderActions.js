"use client";
import { useBuilderStore } from "@/store/useBuilderStore";
import { useState } from "react";

export default function HeaderActions() {
  const { dropped, reorderComponents } = useBuilderStore();
  const [showExport, setShowExport] = useState(false);
  const [showSave, setShowSave] = useState(false);
  const [showLoad, setShowLoad] = useState(false);
  const [saveForm, setSaveForm] = useState({ title: '', description: '' });
  const [websites, setWebsites] = useState([]);
  const [loading, setLoading] = useState(false);

  const exportStructure = () => {
    const structure = {
      components: dropped,
      timestamp: new Date().toISOString(),
      version: "1.0",
    };
    return JSON.stringify(structure, null, 2);
  };

  const saveWebsite = async () => {
    if (!saveForm.title.trim()) {
      alert('Please enter a title for your website');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/websites', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: saveForm.title,
          description: saveForm.description,
          components: dropped,
        }),
      });

      if (response.ok) {
        const website = await response.json();
        alert(`Website "${website.title}" saved successfully!`);
        setShowSave(false);
        setSaveForm({ title: '', description: '' });
      } else {
        throw new Error('Failed to save website');
      }
    } catch (error) {
      console.error('Error saving website:', error);
      alert('Failed to save website. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const loadWebsites = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/websites');
      if (response.ok) {
        const data = await response.json();
        setWebsites(data);
        setShowLoad(true);
      } else {
        throw new Error('Failed to load websites');
      }
    } catch (error) {
      console.error('Error loading websites:', error);
      alert('Failed to load websites. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const loadWebsite = async (websiteId) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/websites/${websiteId}`);
      if (response.ok) {
        const website = await response.json();
        reorderComponents(website.components);
        alert(`Website "${website.title}" loaded successfully!`);
        setShowLoad(false);
      } else {
        throw new Error('Failed to load website');
      }
    } catch (error) {
      console.error('Error loading website:', error);
      alert('Failed to load website. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const clearCanvas = () => {
    if (confirm("Are you sure you want to clear all components?")) {
      reorderComponents([]);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(exportStructure());
      alert("Structure copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  return (
    <>
      <div className="bg-white border-b border-gray-200 px-6 py-3 flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold text-gray-800">🎨 Website Builder</h1>
          <p className="text-sm text-gray-600">
            {dropped.length} component{dropped.length !== 1 ? "s" : ""} on canvas
            {dropped.length > 0 && ` • Click any component to edit its properties`}
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setShowSave(true)}
            disabled={dropped.length === 0 || loading}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-sm font-medium"
          >
            {loading ? 'Saving...' : 'Save Website'}
          </button>
          <button
            onClick={loadWebsites}
            disabled={loading}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-sm font-medium"
          >
            {loading ? 'Loading...' : 'Load Website'}
          </button>
          <button
            onClick={() => setShowExport(true)}
            disabled={dropped.length === 0}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-sm font-medium"
          >
            Export Structure
          </button>
          <button
            onClick={clearCanvas}
            disabled={dropped.length === 0}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-sm font-medium"
          >
            Clear All
          </button>
        </div>
      </div>

      {/* Export Modal */}
      {showExport && (
        <div className="fixed inset-0 backdrop-blur-md bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[80vh] overflow-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-black">Export Website Structure</h2>
              <button
                onClick={() => setShowExport(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>
            
            <div className="mb-4">
              <p className="text-sm text-gray-800 mb-2">
                Copy this JSON structure to save or recreate your layout:
              </p>
              <textarea
                readOnly
                value={exportStructure()}
                className="w-full h-64 p-3 border border-gray-300 rounded-lg font-mono text-sm bg-gray-50 text-black"
              />
            </div>
            
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowExport(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Close
              </button>
              <button
                onClick={copyToClipboard}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Copy to Clipboard
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Save Modal */}
      {showSave && (
        <div className="fixed inset-0 backdrop-blur-md bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-black">Save Website</h2>
              <button
                onClick={() => setShowSave(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Website Title *
              </label>
              <input
                type="text"
                value={saveForm.title}
                onChange={(e) => setSaveForm({...saveForm, title: e.target.value})}
                placeholder="Enter website title..."
                className="w-full p-3 border border-gray-300 rounded-lg text-black"
                required
              />
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description (optional)
              </label>
              <textarea
                value={saveForm.description}
                onChange={(e) => setSaveForm({...saveForm, description: e.target.value})}
                placeholder="Enter description..."
                className="w-full p-3 border border-gray-300 rounded-lg text-black"
                rows={3}
              />
            </div>
            
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowSave(false)}
                disabled={loading}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={saveWebsite}
                disabled={loading || !saveForm.title.trim()}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                {loading ? 'Saving...' : 'Save Website'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Load Modal */}
      {showLoad && (
        <div className="fixed inset-0 backdrop-blur-md bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[80vh] overflow-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-black">Load Website</h2>
              <button
                onClick={() => setShowLoad(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>
            
            {websites.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500 mb-4">No saved websites found.</p>
                <p className="text-sm text-gray-400">Create and save your first website to see it here!</p>
              </div>
            ) : (
              <div className="space-y-3">
                {websites.map((website) => (
                  <div
                    key={website.id}
                    className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{website.title}</h3>
                        {website.description && (
                          <p className="text-sm text-gray-600 mt-1">{website.description}</p>
                        )}
                        <div className="flex gap-4 text-xs text-gray-500 mt-2">
                          <span>Created: {new Date(website.createdAt).toLocaleDateString()}</span>
                          <span>Updated: {new Date(website.updatedAt).toLocaleDateString()}</span>
                          <span className={`px-2 py-1 rounded ${website.published ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                            {website.published ? 'Published' : 'Draft'}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => loadWebsite(website.id)}
                        disabled={loading}
                        className="ml-4 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-300 text-sm"
                      >
                        {loading ? 'Loading...' : 'Load'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            <div className="flex justify-end mt-6">
              <button
                onClick={() => setShowLoad(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}