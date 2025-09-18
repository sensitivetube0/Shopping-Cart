import { describe, it, expect, vi, beforeEach } from "vitest";
import ShopPage from "./shopPage";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useOutletContext } from "react-router-dom";

// Mock the outlet context
vi.mock("react-router-dom", () => ({
  useOutletContext: vi.fn(),
}));

// Mock the fetch function
vi.mock("./shopFetchData", () => ({
  default: vi.fn(() =>
    Promise.resolve({
      success: true,
      data: [
        {
          id: 1,
          title: "Test Product",
          price: 10,
          image: "test.jpg",
          rating: { rate: 4.5 },
        },
      ],
    })
  ),
}));

describe("testing shop page UI", () => {
  let setTotalProducts;
  beforeEach(() => {
    setTotalProducts = vi.fn();
    useOutletContext.mockReturnValue({
      totalProducts: [],
      setTotalProducts,
    });
  });

  it("renders a button that on click it increments product input", async () => {
    const user = userEvent.setup();
    render(<ShopPage />);

    // Wait for products to load
    await waitFor(() => {
      expect(screen.getByText("Test Product")).toBeInTheDocument();
    });

    // Find the input and increment button
    const input = screen.getByDisplayValue("");
    const incrementButton = screen.getByText("+");

    // Type in the input (more realistic than fireEvent)
    await user.type(input, "5");
    expect(input.value).toBe("5");

    // Click increment button
    await user.click(incrementButton);

    // Check if value increased
    expect(input.value).toBe("6");
  });
  it("renders a button that on click it decrements product input", async () => {
    const user = userEvent.setup();
    render(<ShopPage />);
    await waitFor(() => {
      expect(screen.getByText("Test Product")).toBeInTheDocument();
    });
    const input = screen.getByDisplayValue("");
    const decrementButton = screen.getByText("-");

    await user.type(input, "5");
    expect(input.value).toBe("5");
    await user.click(decrementButton);
    expect(input.value).toBe("4");
  });
  it("add items to the totalProducts when the addtocart button is clicked", async () => {
    const user = userEvent.setup();
    render(<ShopPage />);
    await waitFor(() => {
      expect(screen.getByText("Test Product")).toBeInTheDocument();
    });

    const addToCartButton = screen.getByText("Add To Cart");
    const input = screen.getByDisplayValue("");
    await user.type(input, "4");
    expect(input.value).toBe("4");
    await user.click(addToCartButton);
    expect(setTotalProducts).toBeCalled();

    const calledWith = setTotalProducts.mock.calls[0][0];
    let resultArr = calledWith([]);
    expect(resultArr).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          Id: 1,
          Title: "Test Product",
          Price: 10,
          TotalItems: 4,
        }),
      ])
    );
  });
  it("doesnt add the same product twice and instead just updates the quantity if needed", async () => {
    const user = userEvent.setup();
    render(<ShopPage />);
    await waitFor(() => {
      expect(screen.getByText("Test Product")).toBeInTheDocument();
    });
    const input = screen.getByDisplayValue("");
    const addToCartButton = screen.getByText("Add To Cart");

    await user.type(input, "4");
    await user.click(addToCartButton);
    const firstCall = setTotalProducts.mock.calls[0][0];
    const cartAfterFirstAdd = firstCall([]); // previous cart is empty
    useOutletContext.mockReturnValue({
      totalProducts: cartAfterFirstAdd,
      setTotalProducts,
    });
    // Second add (update quantity)
    await user.clear(input);
    await user.type(input, "3");
    await user.click(addToCartButton);
    const secondCall = setTotalProducts.mock.calls[1][0];
    const cartAfterSecondAdd = secondCall(cartAfterFirstAdd); // previous cart is the result of the first add
    console.log(cartAfterSecondAdd);
    expect(cartAfterSecondAdd).toEqual([
      expect.objectContaining({
        Id: 1,
        Title: "Test Product",
        Price: 10,
        TotalItems: 3,
      }),
    ]);
  });
});
