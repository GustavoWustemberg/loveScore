"use client";
import PlayerScore from '@/Interfaces/score';
import './style.css';
import { useEffect, useState } from 'react';
import Modal from '../Modal/modal';

interface ScoreTableProps {
    data: PlayerScore[];
}

const Card: React.FC<ScoreTableProps> = ({ data }) => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [currentCard, setCurrentCard] = useState<PlayerScore | null>(null);
    const [scoreG, setScoreG] = useState(0);
    const [scoreB, setScoreB] = useState(0);
    const [idCard, setIdCard] = useState("");
    const [nameCard, setNameCard] = useState("");
    const [imgCard, setImgCard] = useState("");

    const openModal = (card: PlayerScore) => {
        setCurrentCard(card);
        setScoreG(card.gustavo_score);
        setScoreB(card.bruna_score);
        setIdCard(card.id);
        setImgCard(card.img);
        setNameCard(card.name);
        setModalOpen(true);
    };

    const closeModal = () => setModalOpen(false);

    const addScore = (player: string) => {
        if (player === "Gustavo") {
            setScoreG(prevScore => prevScore + 1);
        } else {
            setScoreB(prevScore => prevScore + 1);
        }
    };

    const removeScore = (player: string) => {
        if (player === "Gustavo") {
            setScoreG(prevScore => (prevScore > 0 ? prevScore - 1 : 0));
        } else {
            setScoreB(prevScore => (prevScore > 0 ? prevScore - 1 : 0));
        }
    };

    const upload = async (e: React.FormEvent) => {
        e.preventDefault();

        const dados = { id: idCard, name: nameCard, img: imgCard, gustavo_score: scoreG, bruna_score: scoreB };
        try {
            const response = await fetch("https://lovesscore.onrender.com/games", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(dados),
            });
            const textResponse = await response.text();
            try {
                const jsonResponse = JSON.parse(textResponse);
                console.log(jsonResponse);
            } catch (err) {
                console.log(textResponse);
            }
            closeModal();
        } catch (err) {
            console.log(err);
            alert("Erro ao atualizar os dados!");
        }
    };

    const deleteCard = async (e: React.FormEvent) => {
        e.preventDefault();

        const dados = { id: idCard };
        try {
            const response = await fetch(`https://lovesscore.onrender.com/games/${idCard}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(dados),
            });
            const textResponse = await response.text();
            try {
                const jsonResponse = JSON.parse(textResponse);
                console.log(jsonResponse);
            } catch (err) {
                console.log(textResponse);
            }
            closeModal();
        } catch (err) {
            console.log(err);
            alert("Erro ao deletar o jogo!");
        }
    };

    return (
        <div className='card-group'>
            {data.map((item, key) => (
                <div key={key} className="flex card m-6 flex-col">
                    <div className='flex'>
                        <img src={item.img} alt={item.name} title={item.name} className="card-img" />
                        <h2 className='font-bold card-title ml-6 mt-1_5'>{item.name}</h2>
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
                    <img onClick={() => openModal(item)} src="/edit.png" className='edit' alt="Edit" />

                    {currentCard && (
                        <Modal isOpen={isModalOpen} onClose={closeModal} title={currentCard.name}>
                            <form className='flex flex-col items-end pr-modal'>
                                <div className="flex gap-2">
                                    <h2 className='font-bold modal-subtitle'>Gustavo</h2>
                                    <button type="button" className='font-bold modal-title btn-modal' onClick={() => removeScore("Gustavo")}>-</button>
                                    <input className='score' value={scoreG} onChange={(e) => setScoreG(Number(e.target.value))} type="text" />
                                    <button type="button" className='font-bold modal-title btn-modal' onClick={() => addScore("Gustavo")}>+</button>
                                </div>
                                <div className="flex gap-2 mt-5">
                                    <h2 className='font-bold modal-subtitle'>Bruna</h2>
                                    <button type="button" className='font-bold modal-title btn-modal' onClick={() => removeScore("Bruna")}>-</button>
                                    <input className='score' value={scoreB} onChange={(e) => setScoreB(Number(e.target.value))} type="text" />
                                    <button type="button" className='font-bold modal-title btn-modal' onClick={() => addScore("Bruna")}>+</button>
                                </div>
                                <div className="flex gap-3 mt-5">
                                    <button type="button" onClick={upload} className='font-bold w-28 btn-modal'>Atualizar</button>
                                    <button type="button" onClick={deleteCard} className='font-bold w-28 btn-modal'>Deletar</button>
                                </div>
                            </form>
                        </Modal>
                    )}
                </div>
            ))}
        </div>
    );
}

export default Card;
