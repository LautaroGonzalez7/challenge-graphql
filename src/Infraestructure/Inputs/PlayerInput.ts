import {Field, InputType} from "type-graphql";

@InputType()
export class PlayerInput {
    @Field()
    competitionCode: string;

    @Field({ nullable: true })
    teamName?: string;
}