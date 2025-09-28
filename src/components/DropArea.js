"use client";
import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useBuilderStore } from "@/store/useBuilderStore";
import Navbar from "./Navbar";
import Hero from "./Hero";
import Footer from "./Footer";
import Content from "./Content";
import CTA from "./CTA";

const componentMap = {
  navbar: Navbar,
  hero: Hero,
  footer: Footer,
  content: Content,
  cta: CTA,
};

function SortableComponent({ component, index }) {
  const { removeComponent, selectComponent, duplicateComponent, selectedComponent } = useBuilderStore();
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: component.uniqueId });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const ComponentToRender = componentMap[component.type];
  const isSelected = selectedComponent?.uniqueId === component.uniqueId;

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`relative group mb-4 ${isDragging ? "z-50" : ""}`}
    >
      {/* Selection Overlay */}
      {isSelected && (
        <div className="absolute inset-0 border-2 border-blue-500 rounded-lg pointer-events-none z-20"></div>
      )}
      
      {/* Action Buttons */}
      <div className="absolute -left-2 top-2 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity z-30">
        <button
          {...attributes}
          {...listeners}
          className="w-6 h-6 bg-blue-500 text-white rounded text-xs hover:bg-blue-600 cursor-grab flex items-center justify-center"
          title="Drag to reorder"
        >
          ⋮⋮
        </button>
        <button
          onClick={() => selectComponent(component)}
          className={`w-6 h-6 ${isSelected ? 'bg-blue-600' : 'bg-gray-500'} text-white rounded text-xs hover:bg-gray-600 flex items-center justify-center`}
          title="Select to edit"
        >
          ⚙
        </button>
        <button
          onClick={() => duplicateComponent(component.uniqueId)}
          className="w-6 h-6 bg-green-500 text-white rounded text-xs hover:bg-green-600 flex items-center justify-center"
          title="Duplicate component"
        >
          ⧉
        </button>
        <button
          onClick={() => removeComponent(component.uniqueId)}
          className="w-6 h-6 bg-red-500 text-white rounded text-xs hover:bg-red-600 flex items-center justify-center"
          title="Remove component"
        >
          ×
        </button>
      </div>
      
      {/* Component Content */}
      <div 
        className={`border rounded-lg bg-white shadow-sm hover:shadow-md transition-all duration-200 p-4 cursor-pointer ${
          isSelected ? 'shadow-lg' : ''
        }`}
        onClick={(e) => {
          e.stopPropagation();
          console.log('Component selected:', component.type, component.uniqueId);
          selectComponent(component);
        }}
      >
        {ComponentToRender ? (
          <ComponentToRender props={component.props} />
        ) : (
          <div className="p-4 text-center text-red-500">
            Component type "{component.type}" not found
          </div>
        )}
      </div>
      
      {/* Component Label */}
      <div className="absolute -top-2 left-4 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
        {component.label} #{index + 1}
      </div>
    </div>
  );
}

export default function DropArea() {
  const { dropped } = useBuilderStore();
  const { isOver, setNodeRef } = useDroppable({
    id: "droppable-canvas",
  });

  const style = {
    backgroundColor: isOver ? "#f0f9ff" : "#f9fafb",
  };

  const combinedStyle = {
    ...style,
    minHeight: "calc(100vh - 73px)"
  };

  return (
    <div
      ref={setNodeRef}
      style={combinedStyle}
      className="flex-1 p-6 transition-colors overflow-y-auto"
    >
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Website Builder Canvas</h1>
          <p className="text-gray-600">Drop components here and arrange them as needed</p>
        </div>

        {dropped.length === 0 ? (
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-16 text-center bg-white">
            <div className="text-8xl mb-6">🎨</div>
            <h3 className="text-2xl font-semibold text-gray-700 mb-3">Start Building Your Website</h3>
            <p className="text-gray-500 text-lg mb-6">Drag components from the left panel to start building your website</p>
            <div className="flex justify-center gap-4 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
                Drag to add
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                Click to edit
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 bg-orange-500 rounded-full"></span>
                Multiple instances
              </div>
            </div>
          </div>
        ) : (
          <SortableContext items={dropped.map(item => item.uniqueId)} strategy={verticalListSortingStrategy}>
            {dropped.map((component, index) => (
              <SortableComponent
                key={component.uniqueId}
                component={component}
                index={index}
              />
            ))}
          </SortableContext>
        )}
      </div>
    </div>
  );
}