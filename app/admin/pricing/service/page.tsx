'use client';

import { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { showNotification } from '@/app/components/ui/Notification';

interface PricingSection {
  id: string;
  title: string;
  items: Array<{
    name: string;
    price: string;
  }>;
}

export default function ServicePricingPage() {
  const [sections, setSections] = useState<PricingSection[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchPricingData();
  }, []);

  const fetchPricingData = async () => {
    try {
      const response = await fetch('/api/admin/pricing/service');
      if (response.ok) {
        const data = await response.json();
        setSections(data);
      }
    } catch (error) {
      console.error('Error fetching pricing data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDragEnd = async (result: any) => {
    if (!result.destination) return;

    const items = Array.from(sections);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setSections(items);

    try {
      const response = await fetch('/api/admin/pricing/service', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(items),
      });

      if (response.ok) {
        showNotification({
          title: 'Sukces',
          message: 'Kolejność sekcji została zaktualizowana',
          type: 'success'
        });
      } else {
        throw new Error('Failed to update sections order');
      }
    } catch (error) {
      console.error('Error updating sections order:', error);
      showNotification({
        title: 'Błąd',
        message: 'Nie udało się zaktualizować kolejności sekcji',
        type: 'error'
      });
      // Przywróć poprzednią kolejność
      await fetchPricingData();
    }
  };

  if (isLoading) {
    return <div>Ładowanie...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Zarządzanie cennikiem usług</h1>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="pricing-sections">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="space-y-6"
            >
              {sections.map((section, index) => (
                <Draggable
                  key={section.id}
                  draggableId={section.id}
                  index={index}
                >
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      className={`bg-white rounded-lg shadow-sm p-6 ${
                        snapshot.isDragging ? 'shadow-lg' : ''
                      }`}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold">{section.title}</h3>
                        <div
                          {...provided.dragHandleProps}
                          className="cursor-move p-2 hover:bg-gray-100 rounded"
                        >
                          <svg
                            className="w-6 h-6 text-gray-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M4 8h16M4 16h16"
                            />
                          </svg>
                        </div>
                      </div>
                      
                      {/* Lista pozycji w sekcji */}
                      <div className="space-y-2">
                        {section.items.map((item, itemIndex) => (
                          <div
                            key={itemIndex}
                            className="flex justify-between items-center py-2 px-4 bg-gray-50 rounded"
                          >
                            <span>{item.name}</span>
                            <span className="font-semibold">{item.price}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
} 