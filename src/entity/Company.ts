import {Entity, Column, PrimaryColumn, OneToMany, JoinColumn} from "typeorm";
import {Station} from "./Station";
import {StationType} from "./StationType";


@Entity()
export class Company {
  @PrimaryColumn()
  id: number;

  @Column()
  name: string;

  @Column("simple-array")
  @OneToMany(() => Station, (station) => station.id)
  stations: Station["id"][];

  @Column("simple-array")
    companies: [number]; // ids of child companies
}
