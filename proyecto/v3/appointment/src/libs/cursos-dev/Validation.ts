import { validate } from "class-validator";

export class Validation {
  static async parameters(instance: object, params: Record<string, unknown>) {
    const errors = await validate(instance, params);
    return errors.length > 0 ? errors : null;
  }
}
