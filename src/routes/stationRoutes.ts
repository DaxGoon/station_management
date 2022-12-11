import {Router} from "express";
import {Stations} from "../entity/Stations";
import {createRepository} from "../queryUtils/createRepository";
import {queryAll} from "../queryUtils/queryAll";
import {queryOne} from "../queryUtils/queryOne";

const stationRouter = Router();

stationRouter.get('/', async (req, res) => {
    try {
        console.info("GET /stations " + " @: ", new Date().toISOString());
        const stationRepository = await createRepository(Stations);
        const resStations = await queryAll(stationRepository, 'stations');
        res.json(resStations).end();
    }
    catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
})

stationRouter.get('/:id', async (req, res) => {
    console.log(req.params.id);
    try {
        console.info("GET /stations/" + req.params.id + " @: ", new Date().toISOString());
        const stationRepository = await createRepository(Stations);
        const resStation = await queryOne(stationRepository, 'stations', req.params.id);
        if (!resStation) return res.status(404).send();
        res.json(resStation).end();
    }
    catch (error) {
        console.error(error);
        res.status(500).send(error);
}
})

stationRouter.post('/', async (req, res) => {
    try {
        console.info("POST /stations @: ", new Date().toISOString());
        const stationRepository = await createRepository(Stations);
        const newStation = stationRepository.create(req.body);
        await stationRepository.save(newStation);
        res.json(newStation).end();
    } catch (err) {
        res.status(500).send(err);
    }
}
);

stationRouter.patch('/:id', async (req, res) => {
    try {
        console.info("PATCH /stations/" + req.params.id + " @: ", new Date().toISOString());
        const stationRepository = await createRepository(Stations);
        const resStation = await queryOne(stationRepository, 'stations', req.params.id);
        if (!resStation) return res.status(404).send();
        stationRepository.merge(resStation, req.body);
        await stationRepository.save(resStation);
        res.json(resStation).end();
    } catch (err) {
        res.status(500).send(err);
}
});

stationRouter.delete('/:id', async (req, res) => {
    try {
        console.info("DELETE /stations/" + req.params.id + " @: ", new Date().toISOString());
        const stationRepository = await createRepository(Stations);
        const resStation = await queryOne(stationRepository, 'stations', req.params.id);
        if (!resStation) return res.status(404).send();
        await stationRepository.remove(resStation);
        res.status(204).send();
    } catch (err) {
        res.status(500).send(err);
}
});

export default stationRouter;
