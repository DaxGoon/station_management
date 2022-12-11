import { Router } from "express";
import { StationTypes } from "../entity/StationTypes";
import {createRepository} from "../queryUtils/createRepository";
import { queryAll } from "../queryUtils/queryAll";
import { queryOne } from "../queryUtils/queryOne";

const stationTypeRouter = Router();

stationTypeRouter.get("/", async (req, res) => {
    try {
        console.info("GET /stationTypes " + " @: ", new Date().toISOString());
        const stationTypeRepository = await createRepository(StationTypes);
        const resStationTypes = await queryAll(stationTypeRepository, "stationTypes");
        res.json(resStationTypes).end();
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
}
});

stationTypeRouter.get("/:id", async (req, res) => {
    try {
        console.info("GET /stationTypes/" + req.params.id + " @: ", new Date().toISOString());
        const stationTypeRepository = await createRepository(StationTypes);
        const resStationType = await queryOne(stationTypeRepository, "stationTypes", req.params.id);
        if (!resStationType) return res.status(404).send();
        res.json(resStationType).end();
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
}
});

stationTypeRouter.post("/", async (req, res) => {
    try {
        console.info("POST /stationTypes @: ", new Date().toISOString());
        const stationTypeRepository = await createRepository(StationTypes);
        const newStationType = stationTypeRepository.create(req.body);
        await stationTypeRepository.save(newStationType);
        res.json(newStationType).end();
    } catch (err) {
        res.status(500).send(err);
    }
}
);

stationTypeRouter.patch("/:id", async (req, res) => {
    try {
        console.info("PATCH /stationTypes/" + req.params.id + " @: ", new Date().toISOString());
        const stationTypeRepository = await createRepository(StationTypes);
        const stationType = await queryOne(stationTypeRepository, "stationTypes", req.params.id);
        if (!stationType) return res.status(404).send();
        stationTypeRepository.merge(stationType, req.body);
        await stationTypeRepository.save(stationType);
        res.json(stationType).end();
    } catch (err) {
        res.status(500).send(err);
}
});

stationTypeRouter.delete("/:id", async (req, res) => {
    try {
        console.info("DELETE /stationTypes/" + req.params.id + " @: ", new Date().toISOString());
        const stationTypeRepository = await createRepository(StationTypes);
        const stationType = await queryOne(stationTypeRepository, "stationTypes", req.params.id);
        if (!stationType) return res.status(404).send();
        await stationTypeRepository.remove(stationType);
        res.status(200).send();
    } catch (err) {
        res.status(500).send(err);
}
});

export default stationTypeRouter;
