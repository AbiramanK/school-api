import { CalculationModel } from "./model";

export async function createCalculations(
  expression: string,
  result: string,
  operation_name: string,
  user_id: number
): Promise<CalculationModel> {
  const rslt = await CalculationModel.create({
    expression,
    result,
    operation_name,
    posted_by_id: user_id,
    updated_by_id: user_id,
  });

  if (!!!rslt) {
    throw new Error("Calculation post failed");
  }

  return rslt;
}
