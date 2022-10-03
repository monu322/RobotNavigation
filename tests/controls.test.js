import Controls from "../components/controls/controls.component";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

describe("Controls", () => {
    it("renders connection and movement status", () => {
      render(<Controls />);
      // check if all components are rendered
      expect(screen.getByTestId("connection_status")).toBeInTheDocument();
      expect(screen.getByTestId("movement_status")).toBeInTheDocument();
    });

    it("renders new pose form with input fields", () => {
        render(<Controls />);
        // check if all components are rendered
        expect(screen.getByTestId("newpose_form")).toBeInTheDocument();
        expect(screen.getByTestId("x_field")).toBeInTheDocument();
        expect(screen.getByTestId("y_field")).toBeInTheDocument();
        expect(screen.getByTestId("a_field")).toBeInTheDocument();
        
      });

    
  });