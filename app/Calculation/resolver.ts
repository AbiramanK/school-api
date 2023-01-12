import {
  Arg,
  Authorized,
  Ctx,
  Field,
  InputType,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from "type-graphql";
import { AuthContext } from "../../middlewares/AuthMiddleware";
import { createCalculations } from "./doa";
import { CalculationModel } from "./model";

@InputType()
class PaginationInput {
  @Field()
  limit: number = 10;

  @Field()
  cursor: number = 0;
}

@InputType()
class CalculationInput {
  @Field()
  expression: string;

  @Field()
  result: string;

  @Field()
  operationName: string;
}

@ObjectType()
class PageInfo {
  @Field()
  declare hasMore: boolean;

  @Field()
  declare cursor: number;
}

@ObjectType()
class PaginationOutput {
  @Field(() => [CalculationModel])
  declare edgeds: CalculationModel[];

  @Field()
  declare pageInfo: PageInfo;
}

@Resolver()
export class CalculationResolver {
  @Authorized()
  @Query(() => PaginationOutput)
  async get_calculations(
    @Arg("input") input: PaginationInput
  ): Promise<PaginationOutput> {
    const calculations = await CalculationModel.findAndCountAll({
      order: [["updated_at", "desc"]],
      include: { all: true },
      limit: input.limit,
      offset: input.cursor,
    });

    const cursor = calculations?.rows?.length! + input?.cursor;
    const hasMore = cursor < calculations?.count;
    return {
      edgeds: calculations?.rows!,
      pageInfo: {
        cursor,
        hasMore,
      },
    };
  }

  @Authorized()
  @Mutation(() => CalculationModel)
  async post_calculation(
    @Arg("input") input: CalculationInput,
    @Ctx() ctx: AuthContext
  ): Promise<CalculationModel> {
    if (ctx?.user?.type !== "master") {
      throw new Error("User doesn't have the privilege to post calculation");
    }

    const { expression, result, operationName } = input;

    const rslt = createCalculations(
      expression,
      result,
      operationName,
      ctx?.user?.id!
    );

    return rslt;
  }
}
