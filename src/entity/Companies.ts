import {Entity, Column, PrimaryColumn, OneToMany, ManyToOne} from "typeorm";
import {Stations} from "./Stations";

@Entity()
export class Companies {
  @PrimaryColumn()
  id: number;

  @Column()
  name: string;

  @Column('simple-array', { nullable: true })
  @OneToMany(() => Companies, company => company.parentCompany)
  childCompanies: Companies[];

  // @Column('int', { nullable: true })
  @ManyToOne(() => Companies, company => company.childCompanies)
  parentCompany: Companies;

  @Column('simple-array')
  @OneToMany(() => Stations, station => station.company)
  stations: Stations[];
}
