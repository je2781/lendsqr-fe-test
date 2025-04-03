import { render} from "@testing-library/react";
import { screen, fireEvent } from "@testing-library/dom";
import { useRouter } from "next/navigation";
import userEvent from "@testing-library/user-event";
import toast from "react-hot-toast";
import Sidebar from "@/components/layout/Sidebar";

// Mocking useRouter
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));


describe("Sidebar", () => {
  let mockRouterPush: jest.Mock;

  beforeEach(() => {
    mockRouterPush = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push: mockRouterPush });
  });

  it("renders the Sidebar list", () => {
    render(<Sidebar activeSection="customers"/>);

    expect(screen.getByText("Switch Organization")).toBeInTheDocument();
    expect(screen.getByText("Dashboard")).toBeInTheDocument();
    expect(screen.getByText("CUSTOMERS")).toBeInTheDocument();
    expect(screen.getByText("BUSINESSES")).toBeInTheDocument();
    expect(screen.getByText("SETTINGS")).toBeInTheDocument();;
  });


  it("navigates to route of clicked item", async () => {
    render(<Sidebar activeSection="customers"/>);
        const usersItem = screen.getByText(/users/i).closest('li');

        fireEvent.click(usersItem!);
    
        expect(mockRouterPush).toHaveBeenCalledWith("/users");
    
        expect(usersItem).toBeInTheDocument(); 

  });
});
