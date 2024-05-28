"use client";
import Card from "@/Components/Card/card";
import Header from "@/Components/Header/header";
import Modal from "@/Components/Modal/modal";
import Footer from "@/Components/footer/footer";
import { useEffect, useState } from "react";


export default function Home() {
  const [lead, SetLead] = useState("");
  const [totalGustavo, setTotalGustavo] = useState(0);
  const [totalBruna, setTotalBruna] = useState(0);
  const [games, setGames] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [gameName, setGameName] = useState("");
  const [gameImg, setGameImg] = useState("");

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => setModalOpen(false);


  const createGame = async (e: React.FormEvent) => {
    e.preventDefault();
    const dados = { name: gameName, img: gameImg, gustavo_score: 0, bruna_score: 0 };

    try {
      const response = await fetch("https://lovesscore.onrender.com/games", {
        method: "POST",
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
      // window.location.reload;
    } catch (err) {
      console.log(err);
      alert("Erro ao cadastrar o jogo!");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://lovesscore.onrender.com/games');
        const data = await response.json();

        setGames(data.games);

        // Inicialize as pontuações totais de Gustavo e Bruna
        let totalGustavoScore = 0;
        let totalBrunaScore = 0;

        // Calcule as pontuações totais de Gustavo e Bruna
        data.games.forEach((item: { gustavo_score: number; bruna_score: number }) => {
          totalGustavoScore += item.gustavo_score;
          totalBrunaScore += item.bruna_score;
        });

        setTotalGustavo(totalGustavoScore);
        setTotalBruna(totalBrunaScore);

        // Determine o líder com base nas pontuações totais
        if (totalGustavoScore > totalBrunaScore) {
          SetLead("Gustavo");
        } else if (totalBrunaScore > totalGustavoScore) {
          SetLead("Bruna");
        } else {
          SetLead("");
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="app">
      <Header />
      <main className="flex flex-col items-center pt-4">

        <Card data={games} />

        <button type="button" onClick={openModal} className="btn-add">+</button>

        <Modal isOpen={isModalOpen} onClose={closeModal} title="Adicionar Jogo">
          <form onSubmit={createGame} className='flex flex-col items-center pr-modal gap-4 mt-5'>
            <input type="text" className="w-full input-modal" placeholder="Nome" onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setGameName(e.target.value);
            }} />
            <input type="text" className="w-full input-modal" placeholder="Link da imagem" onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setGameImg(e.target.value);
            }} />

            <button type="submit" className="font-bold w-full btn-modal">Cadastrar</button>
          </form>
        </Modal>
      </main>
      <div className="clear"></div>
      <Footer
        lead={lead}
        totalGustavo={totalGustavo}
        totalBruna={totalBruna}
      />
    </div>
  );
}