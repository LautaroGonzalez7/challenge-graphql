import {BaseEntity, Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn} from "typeorm";
import {Field, ID, ObjectType} from "type-graphql";
import {Team} from "./Team";

@ObjectType()
@Entity({name: "competitions"})
export class Competition extends BaseEntity {

    @Field(type => ID)
    @PrimaryGeneratedColumn({type: "bigint"})
    public id: string;

    @Field(type => String)
    @Column({type: "varchar", length: 255})
    public name: string;

    @Field(type => String)
    @Column({type: "varchar", length: 255})
    public code: string;

    @Field(type => String)
    @Column({type: "varchar", length: 255})
    public areaName: string;

    @Column({type: "int"})
    public externalId: number;

    @Column({type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
    public createdAt: Date;

    public create(
        name: string,
        code: string,
        areaName: string,
        externalId: number
    ) {
        this.name = name;
        this.code = code;
        this.areaName = areaName;
        this.externalId = externalId;
    }

    @Field(type => [Team])
    @ManyToMany((type) => Team, team => team.competitions)
    teams: Team[];
}