"use client";
import { DndContext, DragOverlay, closestCenter } from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { useState } from "react";
import ComponentPalette from "@/components/ComponentPalette";
import DropArea from "@/components/DropArea";
import PropertiesPanel from "@/components/PropertiesPanel";
import HeaderActions from "@/components/HeaderActions";
import { useBuilderStore } from "@/store/useBuilderStore";

export default function Home() {
  const { dropped, addComponent, reorderComponents } = useBuilderStore();
  const [activeId, setActiveId] = useState(null);

  function handleDragStart(event) {
    setActiveId(event.active.id);
  }

  function handleDragEnd(event) {
    const { active, over } = event;
    setActiveId(null);

    if (!over) return;

    // If dragging a new component from palette to canvas
    if (active.data.current?.type === "component" && over.id === "droppable-canvas") {
      addComponent(active.data.current.componentType);
      return;
    }

    // If reordering existing components
    if (active.id !== over.id && dropped.find(item => item.uniqueId === active.id)) {
      const oldIndex = dropped.findIndex(item => item.uniqueId === active.id);
      const newIndex = dropped.findIndex(item => item.uniqueId === over.id);
      
      if (oldIndex !== -1 && newIndex !== -1) {
        const newOrder = arrayMove(dropped, oldIndex, newIndex);
        reorderComponents(newOrder);
      }
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <HeaderActions />
      <DndContext
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="flex">
          <ComponentPalette />
          <DropArea />
          <PropertiesPanel />
          <DragOverlay>
            {activeId ? (
              <div className="bg-white p-4 rounded-lg shadow-lg opacity-75 border-2 border-blue-400">
                Dragging component...
              </div>
            ) : null}
          </DragOverlay>
        </div>
      </DndContext>
    </div>
  );
}
