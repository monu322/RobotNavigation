import Map from "../components/map/map.component";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

describe("Map", () => {
    it("renders a map and robot icon", () => {
      render(<Map />);
      // check if all components are rendered
      expect(screen.getByTestId("map")).toBeInTheDocument();
      expect(screen.getByTestId("robot_icon")).toBeInTheDocument()
    });

    it("renders robot icon at correct position", () => {

      render(<Map pose={{x:200, y:200, a:1}} />);
      
      const icon = screen.getByTestId("robot_icon_div")

      expect(icon).toHaveStyle({
        bottom: '225px',
        left: '215px',
      })
    });


  });