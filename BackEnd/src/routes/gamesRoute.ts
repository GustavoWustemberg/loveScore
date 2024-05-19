import { FastifyInstance } from "fastify"
import { prisma } from "../lib/prisma"
import { string, z } from "zod"

export async function gamesRoutes(fastify: FastifyInstance) {
    fastify.get('/games', async () => {
        const games = await prisma.games.findMany()

        return { games }
    })

    fastify.post('/games', async (request, reply) => {
        const createGameBody = z.object({
            name: z.string(),
            img: z.string(),
            gustavo_score: z.number(),
            bruna_score: z.number()
        })

        const { name, img, gustavo_score, bruna_score } = createGameBody.parse(request.body);

        let dataAtual = new Date();
        const dataFormatada = dataAtual.toISOString();

        await prisma.games.create({
            data: {
                name,
                img,
                gustavo_score,
                bruna_score,
                created_at: dataFormatada
            }
        })

        return reply.status(201).send("Jogo cadastrado com sucesso!")
    })

    fastify.put('/games', async (request, reply) => {
        const createGameBody = z.object({
            id: z.string(),
            name: z.string(),
            img: z.string(),
            gustavo_score: z.number(),
            bruna_score: z.number()
        })

        const { id, name, img, gustavo_score, bruna_score } = createGameBody.parse(request.body);

        let dataAtual = new Date();
        const dataFormatada = dataAtual.toISOString();

        await prisma.games.update({
            where: {
                id
            },
            data: {
                name,
                img,
                gustavo_score,
                bruna_score,
                updated_at: dataFormatada
            }
        })

        return reply.status(201).send("Jogo atualizado com sucesso!")
    })

    fastify.delete<{ Params: { id: string } }>('/games/:id', async (request, reply) => {
        const { id } = request.params;

        await prisma.games.delete({
            where: {
                id
            }
        });

        reply.status(204).send("Jogo deletado com sucesso!");
    })
}