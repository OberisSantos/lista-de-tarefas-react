import React, { useState, useEffect } from "react";
import './TodoList.css'


function TodoList(){

    const listaStorage = localStorage.getItem('Lista'); 

    const [lista, setLista] = useState(listaStorage ? JSON.parse(listaStorage) : []);
    const [novoItem, setNovoItem] = useState("");

    useEffect(()=>{
        localStorage.setItem('Lista', JSON.stringify(lista));
    }, [lista])

    function adicionaItem(form){
        form.preventDefault()
        if(!novoItem){
            document.getElementById("input-entrada").focus();
            return;
        }
        setLista([...lista, {text: novoItem, isCompleted: false}]);
        setNovoItem("");
        document.getElementById("input-entrada").focus();
    }

    function isCompleted(index){
        const listaAux = [...lista]
        listaAux[index].isCompleted = !listaAux[index].isCompleted;
        setLista(listaAux);
    }

    function deleta(index){
        const listaAux = [...lista];
        listaAux.splice(index, 1);
        setLista(listaAux);
    }

    function deletaAll(){
        setLista([]);
    }

    return(
        <div>
            <h1>Lista de Tarefas</h1>
            <form onSubmit={adicionaItem}>
                <input 
                id="input-entrada"
                type="text" 
                value={novoItem}
                onChange={(e)=>{setNovoItem(e.target.value)}}
                placeholder="Adicione uma tarefa"
                />
                <button className="add" type="submit">Add</button>
            </form>

            <div className="ListaTarefas">
                <div style={{textAlign:'center'}}>
                    {
                        lista.length < 1 ? 
                            <img className="icone-central" src="https://cdn-icons-png.flaticon.com/512/494/494718.png" alt="" />
                    
                        :
                        lista.map((item, index) =>(
                            <div 
                                key={index}
                                className={item.isCompleted ? "item completo": "item"}
                            >
                                <span onClick={() => {
                                    isCompleted(index)
                                }} >{item.text}</span>
                                <button onClick={() =>{
                                    deleta(index)
                                }} className="del">Deletar</button>
                            </div>
                        ))
                    }
                    {
                        lista.length > 0 &&
                        <button onClick={()=> {deletaAll()}} className="deleteAll">Deletar Todas</button>
                    }            
                    
                </div>
            </div>
        </div>
    )
}

export default TodoList;