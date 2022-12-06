import {Column, Entity, ManyToOne, PrimaryColumn} from "typeorm";
import {Station} from "./Station";

@Entity()
export class StationType {
    @PrimaryColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    maxPower: string;

    @Column("simple-array")
    @ManyToOne(() => Station, (station) => station.id)
    stations: Station[]
}
