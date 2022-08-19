import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { getFirestore, doc, getDoc, updateDoc } from "firebase/firestore";
import { app } from './Fire';
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';

import "./App.css";

const data = [
  {
    id: "1",
    name: "Screen 1"
  },
  {
    id: "2",
    name: "Screen 2"
  },
  {
    id: "3",
    name: "Screen 3"
  },
  {
    id: "4",
    name: "Screen 4"
  }
];


let l1 = []
const db = getFirestore(app)
// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
  userSelect: "none",
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,
  background: isDragging ? "lightgreen" : "lightblue",
  ...draggableStyle,
});

const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver ? "lightblue" : "lightgrey",
  padding: grid,
  width: 250,
});

const App = () => {
 
  const [items, setItems] = useState([]);
  

  useEffect(() => {
    setItems(data);
  }, []);

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const reorderedItems = reorder(
      items,
      result.source.index,
      result.destination.index
    );

    console.log({ reorderedItems });

    setItems(reorderedItems);
  };


  async function addOrder(){

    const washingtonRef = doc(db, "ScreenOrder", "Order");

    items.forEach(element => {
     l1.push(element.id)
    });

    try{
      await updateDoc(washingtonRef, {
        list: l1
      });

      l1 = []
      alert("done")
    }catch(e){
      alert("error "+e)
    }

  }


  function getlist(){
    items.forEach(element => {
      console.log(element.id)
    });
  
  }

  return (
    <div>
    <div className="main_content">
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
            >


            {items.map((item, index) => (
                  
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided, snapshot) => (
  
                
                     <div
                       ref={provided.innerRef}
                       {...provided.draggableProps}
                       {...provided.dragHandleProps}
                       style={getItemStyle(
                         snapshot.isDragging,
                         provided.draggableProps.style
                       )}
                     >
                       {item.name}
                     </div>
                     
                    )}
                  </Draggable>
                 
                ))}
          
              
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

     
    </div >
    <div    style={{ display: 'flex',
      justifyContent: 'center',
    
      }}>

      <button 
      
      onClick={()=>{ addOrder()}}>Submit</button>

    </div>
   
    </div>
  );
};

export default App;
