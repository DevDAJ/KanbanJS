import React from 'react';
import Card from './Card';
import { Droppable } from '@hello-pangea/dnd';

export default function Column({ title, tasks, id }: { title: string; tasks: any[]; id: string }) {
  return (
    <div className="bg-gray-200 rounded-md w-400 h-900 overflow-y-scroll border-1 border-gray-500">
      <h3 className="p-2 bg-pink-500 text-center">{title}</h3>
      <Droppable droppableId={id}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="p-1 transition-colors duration-200 bg-gray-200 flex-grow min-h-100"
          >
            {tasks.map((task, index) => (
              <Card key={index} index={index} task={task} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}
