import {BaseEntity, Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn} from "typeorm";
import {Field, ID, ObjectType} from "type-graphql";
import {Competition} from "./Competition";
import {Player} from "./Player";

@ObjectType()
@Entity({name: "teams"})
export class Team extends BaseEntity {

    @Field(type => ID)
    @PrimaryGeneratedColumn({type: "bigint"})
    public id: string;

    @Field(type => String)
    @Column({type: "varchar", length: 255})
    public name: string;

    @Field({nullable: true})
    @Column({type: "varchar", length: 255})
    public tla: string | null;

    @Field({nullable: true})
    @Column({type: "varchar", length: 255})
    public shortName: string | null;

    @Field(type => String)
    @Column({type: "varchar", length: 255})
    public areaName: string;

    @Field({nullable: true})
    @Column({type: "varchar", length: 255})
    public email: string | null;

    @Column({type: "int"})
    public externalId: number;

    @Column({type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
    public createdAt: Date;

    public create(
        name: string,
        tla: string,
        shortName: string,
        areaName: string,
        email: string,
        externalId: number
    ) {
        this.name = name;
        this.tla = tla;
        this.shortName = shortName;
        this.areaName = areaName;
        this.email = email;
        this.externalId = externalId;
    }

    @ManyToMany(() => Competition, competition => competition.teams)
    @JoinTable({
        name: "competitions_teams",
        joinColumn: { name: "teamId", referencedColumnName: "id" },
        inverseJoinColumn: { name: "competitionId" }
    })
    competitions: Competition[];

    @Field(type => [Player], {nullable: true})
    @ManyToMany((type) => Player, player => player.teams)
    players: Player[];
}