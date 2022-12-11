import {Entity, Column, JoinColumn, PrimaryColumn, ManyToOne} from "typeorm";
import {StationTypes} from "./StationTypes";
import {Companies} from "./Companies";

@Entity()
export class Stations {
    @PrimaryColumn()
    id: number;

    @Column()
    name: string;

    // @Column('int')
    @ManyToOne(() => Companies, company => company.stations)
    @JoinColumn()
    company: Companies;

    // @Column('int')
    @ManyToOne(() => StationTypes, stationType => stationType.stations)
    @JoinColumn()
    stationType: StationTypes;
}
