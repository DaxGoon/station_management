import * as express from "express";
import {parse} from "../instructionParserUtils/parser";

const instructionParserRouter = express.Router();

instructionParserRouter.use(express.text());
instructionParserRouter.post('/', (req, res) => {
    const instructions = req.body;
    const result = parse(instructions);
    res.json({ data: result });
    // res.json(req.body);
});

export default instructionParserRouter;
