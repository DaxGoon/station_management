import {Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, PrimaryColumn, ManyToOne} from "typeorm";
import {StationType} from "./StationType";

@Entity()
export class Station {
    @PrimaryColumn()
    id: number;

    @Column()
    name: string;

    @ManyToOne(() => StationType, (stationType) => stationType.id)
    stationType: StationType
}
