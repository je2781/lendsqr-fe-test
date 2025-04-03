import { render } from "@testing-library/react";
import { screen, fireEvent } from "@testing-library/dom";
import { useRouter } from "next/navigation";
import mockUserData from "./mockData.json";
import UsersContent from "@/components/dashboard/UsersContent";

const mockId = "LSQFf587g90";

// Mocking useRouter
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

const mockRouterPush = jest.fn();
(useRouter as jest.Mock).mockReturnValue({ push: mockRouterPush });

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
  FilterModal: () => <div data-testid="filter-modal">Modal</div>,
  OptionsModal: () => (
    <div data-testid="options-modal">
      <button
        data-testid="options-modal-view-details-item"
        onClick={() => mockRouterPush(`/users/${mockId}`)}
      ></button>
    </div>
  ),
}));

describe("Users Content", () => {
  const userData = Array.isArray(mockUserData) ? mockUserData : [];

  it("renders users content component", () => {
    render(<UsersContent data={{ userData, sectionName: "users" }} />);
    // Ensure it returns an array of elements
    expect(screen.getAllByText("ACTIVE USERS")).toBeInstanceOf(Array);
    expect(screen.getAllByText("USERS WITH LOANS")).toBeInstanceOf(Array);
    expect(screen.getAllByText("USERS WITH SAVINGS")).toBeInstanceOf(Array);
    expect(screen.getAllByTestId("filter-users")).toBeInstanceOf(Array);

    // Ensure at least one element is found
    expect(screen.getAllByText("ACTIVE USERS").length).toBeGreaterThan(0);
    expect(screen.getAllByText("USERS WITH LOANS").length).toBeGreaterThan(0);
    expect(screen.getAllByText("USERS WITH SAVINGS").length).toBeGreaterThan(0);
    expect(screen.getAllByTestId("filter-users").length).toBeGreaterThan(0);
  });

  it("navigates to user details page when view details on options modal is clicked", () => {
    render(<UsersContent data={{ userData, sectionName: "users" }} />);

    const openOptionsIcons = screen.getAllByTestId("open-options");

    //becuse mock user data only has one user and responsive design of users article
    //results in duplication of parts of the article
    expect(openOptionsIcons.length).toBeGreaterThanOrEqual(2);

    fireEvent.click(openOptionsIcons[0]);

    //expect options modal to appear
    const optionsModal = screen.getByTestId("options-modal");
    expect(optionsModal).toBeInTheDocument();

    const viewDetailsItem = screen.getByTestId("options-modal-view-details-item");
    //now click on the view details item
    fireEvent.click(viewDetailsItem);

    expect(mockRouterPush).toHaveBeenCalledWith(`/users/${mockId}`);
  });

  it("opens filter modal when filter icon is clicked", () => {
    render(<UsersContent data={{ userData, sectionName: "users" }} />);

    //find and fire click event on filter icons
    const filterUsersIcons = screen.getAllByTestId("filter-users");

    expect(filterUsersIcons.length).toBeGreaterThan(6);

    fireEvent.click(filterUsersIcons[0]);

    //expect filter modal to appear
    expect(screen.getByTestId("filter-modal")).toBeInTheDocument();
  });
});
