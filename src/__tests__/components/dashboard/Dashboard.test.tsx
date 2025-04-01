import { render } from "@testing-library/react";
import { screen, fireEvent } from "@testing-library/dom";
import { usePathname } from "next/navigation";
import Dashboard from "@/components/dashboard/Dashboard";

// Mock the pathName
jest.mock("next/navigation", () => ({
  usePathname: jest.fn(),
}));

// Mock the header
jest.mock("../../../components/layout/header/Header", () => {
  return function MockHeader() {
    return <div data-testid="header">Header Component</div>;
  };
});

// Mock the sidebar
jest.mock("../../../components/layout/Sidebar", () => {
  return function MockSidebar() {
    return <div data-testid="sidebar">Sidebar Component</div>;
  };
});
// Mock the users content
jest.mock("../../../components/dashboard/UsersContent", () => {
  return function MockUsersPage() {
    return <div data-testid="usersPage">UsersPage Component</div>;
  };
});

// Mock user details
jest.mock("../../../components/dashboard/UserDetails", () => {
  return function MockUserDetails() {
    return <div data-testid="userDetails">UserDetails Component</div>;
  };
});

describe("Dashbaord", () => {

  it("renders the users page when path is 'users'", () => {
    (usePathname as jest.Mock).mockReturnValue("/users");

    render(<Dashboard />);

    //checking if users page component is rendered on dashboard
    expect(screen.getByTestId("usersPage")).toBeInTheDocument();
    expect(screen.getByTestId("sidebar")).toBeInTheDocument();
    expect(screen.getByTestId("header")).toBeInTheDocument();
  });

  it("renders the user details page when path is not 'users'", () => {
    (usePathname as jest.Mock).mockReturnValue("/users/3");

    render(<Dashboard/>);
    //checking if user details page component is rendered on dashboard
    expect(screen.getByTestId("userDetails")).toBeInTheDocument();
    expect(screen.getByTestId("sidebar")).toBeInTheDocument();
    expect(screen.getByTestId("header")).toBeInTheDocument();
  });
});
