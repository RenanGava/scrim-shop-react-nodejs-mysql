import './style.css'
import FormDialog from '../Dialog/dialog'
import {useState } from 'react'
export function Cards({id, name, cost, category, listCard, setListCard}){
    const [open, setOpen] = useState(false)

    const handleClickCard = ()=>{
        setOpen(true)
    }

    return(
        <>
            <FormDialog 
                open={open} 
                setOpen={setOpen}
                name={name}
                cost={cost}
                category={category}
                listCard={listCard}
                setListCard={setListCard}
                id={id}
            />
            <div 
            className="card"
            onClick={()=> handleClickCard()}>
                <h1>{name}</h1>
                <p>{category}</p>
                <p>{cost}</p>
            </div>
        </>
    )
}