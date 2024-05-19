"use client";
import Card from "@/Components/Card/card";
import Header from "@/Components/Header/header";
import Footer from "@/Components/footer/footer";
import Image from "next/image";
import { useEffect, useState } from "react";


export default function Home() {
  const [lead, SetLead] = useState("");
  const [totalGustavo, setTotalGustavo] = useState(0);
  const [totalBruna, setTotalBruna] = useState(0);
  const [games, setGames] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3333/games');
        const data = await response.json();

        setGames(data.games);

        // Inicialize as pontuações totais de Gustavo e Bruna
        let totalGustavoScore = 0;
        let totalBrunaScore = 0;

        // Calcule as pontuações totais de Gustavo e Bruna
        data.games.forEach((item) => {
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
    <>
      <Header />
      <main className="flex flex-col items-center pt-4">

        {/* {
          lead.length > 1 ?
            <>
              <h2 className="text-lg font-bold p-5">Lider de Pontuação</h2>
              <p className="text-base">{lead}</p>
            </> :
            <h2 className="text-lg font-bold p-5">Jogadores empatados</h2>
        } */}

        <Card data={games} />

      </main>
      <Footer
        lead={lead}
        totalGustavo={totalGustavo}
        totalBruna={totalBruna}
      />
    </>
  );
}