import PlayerScore from '@/Interfaces/score';
import './style.css';
import Image from 'next/image';

interface ScoreTableProps {
    data: PlayerScore[];
}

const Card: React.FC<ScoreTableProps> = ({ data }) => {
    return (
        <>
            {
                data.map((item, key) => (
                    <div className="flex card m-6 flex-col" >
                        <div className='flex'>
                            <img src={item.img} alt={item.name} title={item.name} className="card-img" />
                            <h2 className='font-bold card-title ml-6 mt-1.5'>{item.name}</h2>
                        </div>

                        <div className="flex justify-around">
                            <div className="mt-6 flex-col flex justify-center items-center">
                                <h2 className="font-bold text-xl">Gustavo</h2>
                                <h2 className="font-bold text-xl">{item.gustavo_score}</h2>
                            </div>
                            <div className="mt-6 flex-col flex justify-center items-center">
                                <h2 className="font-bold text-xl">Bruna</h2>
                                <h2 className="font-bold text-xl">{item.bruna_score}</h2>
                            </div>

                        </div>
                        <img src="/edit.png" className='edit' alt="Edit" />

                    </div>
                ))

            }
        </>
    );

}

export default Card;