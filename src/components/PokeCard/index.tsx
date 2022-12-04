import LoadingImg from '../LoadingImage'
import './index.css'
export function PokeCard({ pokedata, onClick}: any) {

    const height = parseInt(pokedata.height) / 10
    return (
        <div onClick={onClick} className="poke-card m-2" >
            <LoadingImg styleLoading={{
                position: 'absolute',
                top: '40px'
            }}  className="poke-card-image" src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokedata.id}.png`} />
            <div className='info-poke d-flex flex-column'>
                <div className='d-flex flex-row'>
                    <h2 className='poke-card-name'>{pokedata.name}</h2>
                    <div>
                        {pokedata.types.map((x: any) => {
                            return <img key={x.type.name} className='poke-type-1' src={`src\\assets\\${x.type.name}.png`} alt="pokeball" />
                        })}
                    </div>
                </div>

                <div className='d-flex justify-content-around w-100'>
                    <div className='base-info d-flex flex-column align-items-center'>
                        <span className='title'>Altura</span>
                        
                        <span className='value'>{height<1 ? `${height*100} CM` : `${height.toFixed(2)} M` }</span>
                    </div>
                    <div className='base-info d-flex flex-column align-items-center'>
                        <span className='title'>Peso</span>
                        <span className='value'>{pokedata.weight/10} kg</span>
                    </div>
                </div>
            </div>

        </div>
    )
}
