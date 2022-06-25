import {BaseEntity, Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn} from "typeorm";
import {Field, ID, ObjectType} from "type-graphql";
import {Competition} from "./Competition";
import {Team} from "./Team";

@ObjectType()
@Entity({name: "players"})
export class Player extends BaseEntity {

    @Field(type => ID)
    @PrimaryGeneratedColumn({type: "bigint"})
    public id: string;

    @Field(type => String)
    @Column({type: "varchar", length: 255})
    public name: string;

    @Field({nullable: true})
    @Column({type: "varchar", length: 255})
    public position?: string | null;

    @Field({nullable: true})
    @Column({type: "date"})
    public dateOfBirth?: string | null;

    @Field({nullable: true})
    @Column({type: "varchar", length: 255})
    public countryOfBirth?: string | null;

    @Field({nullable: true})
    @Column({type: "varchar", length: 255})
    public nationality: string | null;

    @Column({type: "int"})
    public externalId: number;

    @Column({type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
    public createdAt: Date;

    public create(
        name: string,
        position: string | null,
        dateOfBirth: string | null,
        countryOfBirth: string | null,
        nationality: string | null,
        externalId: number
    ) {
        this.name = name;
        this.position = position;
        this.dateOfBirth = dateOfBirth;
        this.countryOfBirth = countryOfBirth;
        this.nationality = nationality;
        this.externalId = externalId;
    }

    @ManyToMany(() => Team, team => team.players)
    @JoinTable({
        name: "teams_players",
        joinColumn: {name: "playerId", referencedColumnName: "id"},
        inverseJoinColumn: {name: "teamId"}
    })
    teams: Team[];
}