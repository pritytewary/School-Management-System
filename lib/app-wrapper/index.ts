import { connectDB } from "../db";
import { IAppError } from "../error";

function withAppWrapper<T extends (...args: any[]) => any>(
  fn: T
): (
  ...args: Parameters<T>
) => Promise<[Awaited<ReturnType<T>>, null] | [null, IAppError]> {
  return async (
    ...args: Parameters<T>
  ): Promise<[Awaited<ReturnType<T>>, null] | [null, IAppError]> => {
    try {
      await connectDB();

      const data: Awaited<ReturnType<T>> = await fn(...args);
      const fixedData = JSON.parse(JSON.stringify(data));

      return [fixedData, null];
    } catch (error: any) {
      return [
        null,
        {
          errorType: error.name,
          message: error.message,
        },
      ];
    }
  };
}

export default withAppWrapper;
