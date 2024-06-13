import React from 'react';
import { Draggable, DraggableProvided } from '@hello-pangea/dnd';

function Container(props: any) {
  return (
    <div
      className="rounded-xl shadow-md text-white p-2 mb-2 my-3 min-h-32 cursor-pointer flex justify-between flex-col"
      {...props}
      style={{
        backgroundColor: bgcolorChange(props),
      }}
    >
      {props.children}
    </div>
  );
}

function bgcolorChange(props: any) {
  return props.isDragging
    ? 'lightgreen'
    : props.isDraggable
    ? props.isBacklog
      ? '#F2D7D5'
      : '#DCDCDC'
    : props.isBacklog
    ? '#F2D7D5'
    : '#EAF4FC';
}

export default function Card({ task, index }: { task: any; index: number }) {
  return (
    <Draggable draggableId={`${task.id}`} key={task.id} index={index}>
      {(provided, snapshot) => (
        <Container
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}
        >
          <div style={{ display: 'flex', justifyContent: 'start', padding: 2 }}>
            <span>
              <small>
                #{task.id}
                {'  '}
              </small>
            </span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', padding: 2 }}>
            <div>{task.title}</div>
          </div>
        </Container>
      )}
    </Draggable>
  );
}
