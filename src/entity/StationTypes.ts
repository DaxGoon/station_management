import {Column, Entity, OneToMany, PrimaryColumn} from "typeorm";
import {Stations} from "./Stations";

@Entity()
export class StationTypes {
    @PrimaryColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    maxPower: number;

    @Column('simple-array')
    @OneToMany(() => Stations, station => station.stationType)
    stations: Stations[];
}
