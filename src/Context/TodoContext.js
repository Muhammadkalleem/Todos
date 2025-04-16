import { createContext,useContext } from "react";

export const TodoContext = createContext({
    todos:[
         {
             id:1,
             todo:" Todo msg",
             completed:false,

         },
         
    ],
         AddTodo:(todo)=>{},
         Updatetodo:(id,todo)=>{},
         deleteTodo:(id,todo)=>{},
         toggleCompleted:(id)=>{},

})

export const UseTodo=()=>{
      return useContext(
           TodoContext
          )
}

export const TodoProvider=TodoContext.Provider;