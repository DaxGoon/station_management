import * as express from "express";
import {createRepository} from "../queryUtils/createRepository";
import {Companies} from "../entity/Companies";
import {queryAll} from "../queryUtils/queryAll";
import {queryOne} from "../queryUtils/queryOne";
import {AppDataSource} from "../index";
import {json} from "express";

const companyRouter = express.Router();

companyRouter.get('/', async (req, res) => {
    try {
        console.info("GET /companies @: ", new Date().toISOString());
        const companyRepository = await createRepository(Companies);
        const resCompanies = await queryAll(companyRepository, 'companies');
        res.json(resCompanies).end();
    }
    catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
})

companyRouter.get('/:id', async (req, res) => {
    try {
        console.info("GET /companies/", req.params.id, " @: ", new Date().toISOString());
        const companyRepository = await createRepository(Companies);
        const resCompany = await queryOne(companyRepository, 'companies', req.params.id);
        res.json(resCompany).end();
    }
    catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
})

companyRouter.post('/', async (req, res) => {
    try {
        console.info("POST /companies @: ", new Date().toISOString());
        const companyRepository = await createRepository(Companies);
        const newCompany = companyRepository.create(req.body);
        await companyRepository.save(newCompany);
        res.json(newCompany).end();
    } catch (err) {
        res.status(500).send(err);
    }
});


companyRouter.patch('/:id', async (req, res) => {
    try {
        console.info("PATCH /companies/", req.params.id, " @: ", new Date().toISOString());
        const companyRepository = await createRepository(Companies);
        const company = await queryOne(companyRepository, 'companies', req.params.id);
        if (!company) return res.status(404).send();
        companyRepository.merge(company, req.body);
        await companyRepository.save(company);
        res.json(company).end();
    } catch (err) {
        res.status(500).send(err);
    }
});

companyRouter.delete('/:id', async (req, res) => {
    try {
        console.info("DELETE /companies/", req.params.id, " @: ", new Date().toISOString());
        const companyRepository = await createRepository(Companies);
        const company = await queryOne(companyRepository, 'companies', req.params.id);
        if (!company) return res.status(404).send();
        await companyRepository.remove(company);
        res.json(company).end();
    } catch (err) {
        res.status(500).send(err);
    }
});
companyRouter.get('/expand/:id', async (req, res) => {
    try {
        console.info("GET /companies/", req.params.id, "/full_data @: ", new Date().toISOString());
        const companyRepository = await createRepository(Companies);

        const company = await queryOne(companyRepository, 'companies', req.params.id);
        if (!company) return res.status(404).send();
        if (company.companies_childCompanies == null) {res.json(company).end(); return;}

        const childRes: Record<string, any> | null = await companyRepository
            .createQueryBuilder('companies')
            .select('companies.childCompanies')
            .where('companies.id = :id', {id: req.params.id})
            .getOne();

        const allCompaniesIds = [];
        allCompaniesIds.push(req.params.id) &&
        childRes.childCompanies.forEach((childCompanyId) => {allCompaniesIds.push(parseInt(childCompanyId))});

        const allCompaniesStationsAndStationTypes = [];
        for (const companyId of allCompaniesIds) {
            const allCompaniesAndStations: Record<string, any> | unknown = await companyRepository
                .createQueryBuilder('companies')
                .leftJoinAndSelect('companies.childCompanies', 'childCompanies')
                .innerJoin('companies.stations', 's', 's.companyId = companies.id')
                .leftJoinAndSelect('s.stationType', 'stationType')
                .leftJoinAndSelect('childCompanies.stations', 'childStations')
                .leftJoinAndSelect('childStations.stationType', 'childStationType')
                .where('s.companyId = :id', { id: companyId })
                .distinct(true)
                .getMany();
            allCompaniesStationsAndStationTypes.push(allCompaniesAndStations);
        }
        res.json(allCompaniesStationsAndStationTypes).end();
    } catch (err) {
        res.status(500).send(err);
}
});

export default companyRouter;
