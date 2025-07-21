// jest.d.ts or types/jest/index.d.ts
import "jest";

declare module "jest" {
  interface Matchers<R> {
    toBeSorted(): R;
    toBeSortedBy(key: string, options?: { descending?: boolean }): R;
  }
}
