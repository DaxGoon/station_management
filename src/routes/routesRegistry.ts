import companyRouter from "./companyRoutes";
import stationRouter from "./stationRoutes";
import stationTypeRouter from "./stationTypeRoutes";
import instructionParserRouter from "./InstructionParserRoutes";

export const routesRegistry = {
    "/companies": companyRouter,
    "/stations": stationRouter,
    "/stationTypes": stationTypeRouter,
    "/parseInstructions": instructionParserRouter
};
