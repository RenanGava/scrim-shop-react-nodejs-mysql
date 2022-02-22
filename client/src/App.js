import { useEffect, useState } from 'react'
import Axios from 'axios'
import './App.css';
import { Cards } from './components/Cards/Cards';

function App() {
  const [values, setValues] = useState()
  const [listGames, setListGames] =  useState([])

  const handleChangeValues = (value) => {
    // prevValue é um parametro do useState onde pegamos os valores antigos
    // e concatenamos com os novos.
    setValues(prevValue => ({
      ...prevValue,
      // aqui conseguimos pegar todos os atributos "name" do html
      [value.target.name] : value.target.value,
      
    }))
  }

  const handleClickButton = () => {
    Axios.post("http://localhost:3001/register", {
      name: values.name,
      cost: values.cost,
      category: values.category,
    }).then(() => {

      Axios.post("http://localhost:3001/search",{
        name: values.name,
        cost: values.cost,
        category: values.category
      }).then((res) =>{
        
        setListGames([
          ...listGames,
          {
            id: res.data[0].id,
            name: values.name,
            cost: values.cost,
            category: values.category
          }
        ])
      })
    })
  }

  useEffect(()=>{
    Axios.get("http://localhost:3001/getCards")
      .then(res => {
        setListGames(res.data)
      })
  }, [])

  return (
    <div className="app--container">
      <div className='register--container'>
        <h1>Scrim Shop</h1>
        <input 
        type='text'
        name='name'
        placeholder='Nome'
        className='register--input'
        onChange={handleChangeValues}/>
        
        <input 
        type='text'
        name='cost'
        placeholder='Preço'
        className='register--input'
        onChange={handleChangeValues}/>

        <input 
        type='text'
        name='category'
        placeholder='Categoria'
        className='register--input'
        onChange={handleChangeValues}/>

        <button onClick={() => handleClickButton() }>Cadastrar</button>
      </div>
      <div className='cards--container'>
        {listGames.map((game)=>(
          <Cards key={game.idgames}
            id={game.idgames}
            name={game.name}
            cost={game.cost}
            category={game.category}
            listCard={listGames}
            setListCard={setListGames}
          />
      ))}
      </div>

    </div>

  );
}

export default App;
