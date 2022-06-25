import {Field, InputType} from "type-graphql";

@InputType()
export class CompetitionInput {
    @Field()
    code: string;
}