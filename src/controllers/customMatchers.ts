import { expect } from "chai";

export function toBeTruthy(value: unknown) {
    return expect(value).equal(true);
  }
  