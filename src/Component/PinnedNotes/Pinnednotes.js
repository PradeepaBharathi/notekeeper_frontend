import React, { useEffect, useState } from 'react'
import { useGlobalContext } from '../Context/context';
import Individualnote from '../IndividualNote/Individualnote';
import './pin.css'
function Pinnednotes() {
    const {pinnedNotes,getPinnedNotes,viewType} = useGlobalContext()
   
    useEffect(()=>{
        getPinnedNotes();
       
    },[])
  return (
    <div className='pinned' >
      {pinnedNotes.length > 0 && ( 
          <div className={`pinned-notes ${viewType}`}>
            
            {pinnedNotes.map((note) => (
              <div key={note._id} className="individual">
              <Individualnote
                id={note._id}
                title={note.title}
                tag={note.tag}
                description={note.description}
                pinned={true}
              />
            </div>
            ))}
           
          </div>
          
        )}
 {pinnedNotes.length >0 && (<hr className="breaker"/>)}
      </div>
  )
}

export default Pinnednotes