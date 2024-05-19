import Fastify from "fastify";
import cors from "@fastify/cors";
import { gamesRoutes } from "./routes/gamesRoute";

async function bootstrap() {
    const fastify = Fastify({
        logger: true,
    })

    await fastify.register(cors, {
        origin: true,
    })
    await fastify.register(gamesRoutes);

    await fastify.listen({ port: 3333, host: '0.0.0.0' });
}

bootstrap();