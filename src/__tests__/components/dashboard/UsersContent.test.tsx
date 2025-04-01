import { render } from "@testing-library/react";
import { screen, fireEvent } from "@testing-library/dom";
import { useRouter } from "next/navigation";
import mockUserData from "./mockData.json";
import UsersContent from "@/components/dashboard/UsersContent";

// Mocking useRouter
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

// Mocking useWindow
jest.mock("@/helpers/getWindowWidth", () => ({
  __esModule: true,
  default: () => ({
    windowWidth: 3,
    setWindowWidth: jest.fn(),
  }),
}));

// Mock the modal
jest.mock("../../../components/layout/Modal", () => ({
  FilterModal: () => <div data-testid="filterModal">Logo Component</div>,
  OptionsModal: () => <div data-testid="optionsModal">
    <button data-testid='openDetails'></button>
  </div>
}));

describe("Users Content", () => {
  let mockRouterPush: jest.Mock;
  let mockId = "LSQFf587g90";
  let userData = Array.isArray(mockUserData.data) ? mockUserData.data : [];

  beforeEach(() => {
    mockRouterPush = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push: mockRouterPush });
  });

  it("navigates to user details page when view details on modal is clicked", () => {
    render(
      <UsersContent data={{ userData, sectionName: "users" }} />
    );

    const openDetailsButton = screen.getByTestId("openDetails");

    fireEvent.click(openDetailsButton);

    expect(mockRouterPush).toHaveBeenCalledWith(`/users/${mockId}`);
  });

  it("opens modal when filter icon is clicked", () => {
    render(
      <UsersContent data={{ userData, sectionName: "users" }} />
    );

    //find and fire click event on filter icon
    const filterUsersButton = screen.getAllByTestId("filterUsers");

    fireEvent.click(filterUsersButton[0]);

    //expect filter modal to appear
    expect(screen.getByTestId("filterModal")).toBeInTheDocument();
  });
});
