/* eslint-disable no-undef */
import React from "react";
import { render, cleanup } from "@testing-library/react";
import CarAvailability from "./CarAvailability";

afterEach(cleanup);

describe("CarAvailability Component", () => {
  test("Renders Correctly", () => {
    const { asFragment } = render(<CarAvailability />);
    expect(asFragment()).toMatchSnapshot();
  });
});
