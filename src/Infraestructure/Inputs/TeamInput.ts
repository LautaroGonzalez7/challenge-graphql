import {Field, InputType} from "type-graphql";

@InputType()
export class TeamInput {
    @Field()
    name: string;
}