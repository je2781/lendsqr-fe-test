// Pagination.test.tsx
import Pagination from "@/components/layout/Pagination";
import { render, screen, fireEvent, act } from "@testing-library/react";

describe("Pagination Component", () => {
  let setCount: jest.Mock;
  let setCurrentPage: jest.Mock;
  let setCurrentUsers: jest.Mock;

  const totalUsers = Array.from({ length: 100 }, (_, i) => ({
    id: i + 1,
    name: `User ${i + 1}`,
  }));

  beforeEach(() => {
    // Create mock functions
    setCount = jest.fn();
    setCurrentPage = jest.fn();
    setCurrentUsers = jest.fn();
  });

  it("renders the pagination component with correct initial state", () => {
    render(
      <Pagination
        count={1}
        setCount={setCount}
        itemsPerPage={10}
        currentPage={1}
        setCurrentPage={setCurrentPage}
        totalItems={totalUsers.length}
        setCurrentUsers={setCurrentUsers}
        totalUsers={totalUsers}
      />
    );

    // Check if the pagination shows the correct initial count
    expect(screen.getByText("Showing")).toBeInTheDocument();
    expect(screen.getByText("out of 100")).toBeInTheDocument();
    expect(screen.getByText("1")).toBeInTheDocument(); // Current page
  });

  it("updates users when the next page button is clicked", () => {
    render(
      <Pagination
        count={1}
        setCount={setCount}
        itemsPerPage={10}
        currentPage={1}
        setCurrentPage={setCurrentPage}
        totalItems={totalUsers.length}
        setCurrentUsers={setCurrentUsers}
        totalUsers={totalUsers}
      />
    );

    // Click the next page button
    act(() => {
        fireEvent.click(screen.getByRole("button", { name: /next/i }));
      });

    // Verify that setCurrentPage and setCurrentUsers were called
    expect(setCurrentPage).toHaveBeenCalledTimes(1);
    // expect(setCurrentPage).toHaveBeenCalledWith(2);
    expect(setCurrentUsers).toHaveBeenCalledWith(totalUsers.slice(10, 20)); // Users for the next page
  });

  it("updates users when the previous page button is clicked", () => {
    render(
      <Pagination
        count={1}
        setCount={setCount}
        itemsPerPage={10}
        currentPage={2}
        setCurrentPage={setCurrentPage}
        totalItems={totalUsers.length}
        setCurrentUsers={setCurrentUsers}
        totalUsers={totalUsers}
      />
    );

    // Click the previous page 
    act(() => {
        fireEvent.click(screen.getByRole("button", { name: /previous/i }));
      });

    // Verify that setCurrentPage and setCurrentUsers were called
    expect(setCurrentPage).toHaveBeenCalledTimes(1);
    // expect(setCurrentPage).toHaveBeenCalledWith(1);
    expect(setCurrentUsers).toHaveBeenCalledWith(totalUsers.slice(0, 10)); // Users for the previous page
  });

  it("updates count when the up arrow is clicked", () => {
    render(
      <Pagination
        count={1}
        setCount={setCount}
        itemsPerPage={10}
        currentPage={1}
        setCurrentPage={setCurrentPage}
        totalItems={totalUsers.length}
        setCurrentUsers={setCurrentUsers}
        totalUsers={totalUsers}
      />
    );

    // Click the up arrow
    act(() => {
        fireEvent.click(screen.getByRole("button", { name: /up/i }));
      });

    // Verify that setCount was called with the new count
    expect(setCount).toHaveBeenCalledTimes(1);
    // expect(setCount).toHaveBeenCalledWith(Math.min(2, max));
    expect(setCurrentUsers).toHaveBeenCalledWith(totalUsers.slice(0, 2)); // Update user count to 2
  });

  it("updates count when the down arrow is clicked", () => {
    render(
      <Pagination
        count={2}
        setCount={setCount}
        itemsPerPage={10}
        currentPage={1}
        setCurrentPage={setCurrentPage}
        totalItems={totalUsers.length}
        setCurrentUsers={setCurrentUsers}
        totalUsers={totalUsers}
      />
    );

    // Click the down arrow
    act(() => {
        fireEvent.click(screen.getByRole("button", { name: /down/i }));
      });
    // Verify that setCount was called with the new count
    expect(setCount).toHaveBeenCalledTimes(1);
    // expect(setCount).toHaveBeenCalledWith(Math.max(1, min));
    expect(setCurrentUsers).toHaveBeenCalledWith(totalUsers.slice(0, 1)); // Update user count to 1
  });
});
