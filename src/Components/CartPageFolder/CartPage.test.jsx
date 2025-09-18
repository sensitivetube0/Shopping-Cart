import { describe, vi, expect, it, beforeEach } from "vitest";
import CartPage from "./CartPage";
import { render, screen } from "@testing-library/react";
import { useOutletContext } from "react-router-dom";
import userEvent from "@testing-library/user-event";

vi.mock("react-router-dom", () => ({
  useOutletContext: vi.fn(),
}));

describe("testing cart page UI", () => {
  let setTotalProducts;
  beforeEach(() => {
    setTotalProducts = vi.fn();
    useOutletContext.mockReturnValue({
      totalProducts: [
        {
          Id: 1,
          Title: "Test Product",
          Price: 10,
          TotalItems: 4,
        },
      ],
      setTotalProducts,
    });
  });

  it("The total Price is correct", () => {
    render(<CartPage />);
    expect(screen.getByText("Total Order Price 40")).toBeInTheDocument();
  });
  it("removes item on remove item button click", async () => {
    const user = userEvent.setup();
    render(<CartPage />);
    let removeFromCartButton = screen.getByText("Remove Item from Cart");
    await user.click(removeFromCartButton);
    const calledWith = setTotalProducts.mock.calls[0][0];
    expect(calledWith).toBeInstanceOf(Function);
    let result = calledWith([
      {
        Id: 1,
        Title: "Test Product",
        Price: 10,
        TotalItems: 4,
      },
    ]);
    expect(result).toEqual([]);
  });

  it("increments item on increment button click", async () => {
    const user = userEvent.setup();
    render(<CartPage />);
    let incrementButton = screen.getByText("+");
    await user.click(incrementButton);
    const calledWith = setTotalProducts.mock.calls[0][0];
    let result = calledWith([
      {
        Id: 1,
        Title: "Test Product",
        Price: 10,
        TotalItems: 4,
      },
    ]);
    expect(result).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          Id: 1,
          Title: "Test Product",
          Price: 10,
          TotalItems: 5,
        }),
      ])
    );
  });
  it("decrements item on decrement button click", async () => {
    const user = userEvent.setup();
    render(<CartPage />);
    let decrementButton = screen.getByText("-");
    await user.click(decrementButton);
    const calledWith = setTotalProducts.mock.calls[0][0];
    let result = calledWith([
      {
        Id: 1,
        Title: "Test Product",
        Price: 10,
        TotalItems: 4,
      },
    ]);
    expect(result).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          Id: 1,
          Title: "Test Product",
          Price: 10,
          TotalItems: 3,
        }),
      ])
    );
  });
});
