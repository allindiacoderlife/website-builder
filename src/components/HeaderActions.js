"use client";
import { useBuilderStore } from "@/store/useBuilderStore";
import { useState } from "react";

export default function HeaderActions() {
  const { dropped, reorderComponents } = useBuilderStore();
  const [showExport, setShowExport] = useState(false);

  const exportStructure = () => {
    const structure = {
      components: dropped,
      timestamp: new Date().toISOString(),
      version: "1.0",
    };
    return JSON.stringify(structure, null, 2);
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
    </>
  );
}