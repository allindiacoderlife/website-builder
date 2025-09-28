"use client";
import { useDraggable } from "@dnd-kit/core";
import { useBuilderStore } from "@/store/useBuilderStore";

function DraggableComponent({ component }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: component.id,
    data: {
      type: "component",
      componentType: component.type,
    },
  });

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`w-full p-3 mb-3 bg-white border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-400 hover:bg-blue-50 cursor-grab transition-colors ${
        isDragging ? "opacity-50" : ""
      }`}
    >
      <div className="text-center">
        <div className="text-2xl mb-2">
          {component.type === "navbar" && "📋"}
          {component.type === "hero" && "🎯"}
          {component.type === "footer" && "🔗"}
          {component.type === "content" && "📄"}
          {component.type === "cta" && "🚀"}
          {component.type === "testimonials" && "💬"}
        </div>
        <span className="text-sm font-medium text-gray-700">{component.label}</span>
      </div>
    </div>
  );
}

export default function ComponentPalette() {
  const { available, dropped } = useBuilderStore();
  
  const getComponentCount = (type) => {
    return dropped.filter(comp => comp.type === type).length;
  };
  
  return (
    <div className="w-64 p-4 border-r border-gray-200 bg-gray-50 overflow-y-auto" style={{ height: "calc(100vh - 73px)" }}>
      <h2 className="font-bold text-lg mb-4 text-gray-800">Components</h2>
      <p className="text-sm text-gray-600 mb-6">Drag components to the canvas</p>
      
      {Object.values(available).map((comp) => {
        const count = getComponentCount(comp.type);
        return (
          <div key={comp.id} className="relative">
            <DraggableComponent component={comp} />
            {count > 0 && (
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-blue-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
                {count}
              </div>
            )}
          </div>
        );
      })}
      
      <div className="mt-8 p-4 bg-blue-100 rounded-lg">
        <h3 className="font-semibold text-sm text-blue-800 mb-2">✨ New Features:</h3>
        <ul className="text-xs text-blue-700 space-y-1">
          <li>• Add multiple instances</li>
          <li>• Click to select & edit</li>
          <li>• Duplicate components</li>
          <li>• Customize properties</li>
          <li>• Reorder by dragging</li>
        </ul>
      </div>
      
      <div className="mt-4 p-3 bg-green-100 rounded-lg">
        <p className="text-xs text-green-700">
          <strong>Total:</strong> {dropped.length} component{dropped.length !== 1 ? 's' : ''} on canvas
        </p>
      </div>
    </div>
  );
}