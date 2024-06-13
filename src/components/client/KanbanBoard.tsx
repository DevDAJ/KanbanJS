'use client';
import React, { useState, useEffect } from 'react';
import { DragDropContext, OnDragEndResponder } from '@hello-pangea/dnd';
import Column from './Column';

export default function KanbanBoard() {
  const [completed, setCompleted] = useState([]);
  const [incomplete, setIncomplete] = useState([]);
  const [backlog, setBacklog] = useState([]);
  const [inReview, setInReview] = useState([]);

  const handleDragEnd: OnDragEndResponder = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination || source.droppableId === destination.droppableId) return;

    deletePreviousState(source.droppableId, draggableId);

    const task = findItemById(draggableId, [...incomplete, ...completed, ...inReview, ...backlog]);

    setNewState(destination.droppableId, task);
  };

  function deletePreviousState(sourceDroppableId: string, taskId: string) {
    switch (sourceDroppableId) {
      case '1':
        setIncomplete(removeItemById(taskId, incomplete));
        break;
      case '2':
        setCompleted(removeItemById(taskId, completed));
        break;
      case '3':
        setInReview(removeItemById(taskId, inReview));
        break;
      case '4':
        setBacklog(removeItemById(taskId, backlog));
        break;
    }
  }
  function setNewState(destinationDroppableId: string, task: string[]) {
    let updatedTask: str;
    switch (destinationDroppableId) {
      case '1': // TO DO
        updatedTask = { ...task, completed: false };
        setIncomplete([updatedTask, ...incomplete]);
        break;
      case '2': // DONE
        updatedTask = { ...task, completed: true };
        setCompleted([updatedTask, ...completed]);
        break;
      case '3': // IN REVIEW
        updatedTask = { ...task, completed: false };
        setInReview([updatedTask, ...inReview]);
        break;
      case '4': // BACKLOG
        updatedTask = { ...task, completed: false };
        setBacklog([updatedTask, ...backlog]);
        break;
    }
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <h2 style={{ textAlign: 'center' }}>PROGRESS BOARD</h2>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexDirection: 'row',
          width: '1300px',
          margin: '0 auto',
        }}
      >
        <Column title={'TO DO'} tasks={incomplete} id={'1'} />
        <Column title={'DONE'} tasks={completed} id={'2'} />
        <Column title={'IN REVIEW'} tasks={inReview} id={'3'} />
        <Column title={'BACKLOG'} tasks={backlog} id={'4'} />
      </div>
    </DragDropContext>
  );
}
