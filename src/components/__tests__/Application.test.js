import React from "react";

/* somewhere near the top */
import axios from "axios";

import { render, cleanup, getByText, getByAltText,prettyDOM, waitForElement, getAllByTestId, getByPlaceholderText, fireEvent, queryByText, queryByAltText} from "@testing-library/react";

import Application from "components/Application";

afterEach(cleanup);

xit("renders without crashing", () => {
  render(<Application />);
});

describe("Application", () => {

  it("changes the schedule when a new day is selected", () => {
  
  })

  it("loads data, books an interview and reduces the spots remaining for the first day by 1", async () => {
    const { container, debug } = render(<Application />);
    
    await waitForElement(() => getByText(container, "Archie Cohen"));
    
    
    const appointment = getAllByTestId(container, "appointment")[0];
    

    fireEvent.click(getByAltText(appointment, "Add"));

    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    fireEvent.click(getByText(appointment, "Save"));

    expect(getByText(appointment, "Saving")).toBeInTheDocument();

    await waitForElement(() => queryByText(appointment, "Lydia Miller-Jones"));

    // console.log(prettyDOM(appointment));

    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );
    
    
    expect(getByText(day, "no spots remaining")).toBeInTheDocument();
    // console.log(prettyDOM(day));
  })

  it("loads data, removes an interveiew and increases the spots remaining for the first day by 1", async () => {

    // 1. Render the application
    const { container, debug } = render(<Application />);
    
    // 2. Wait until Archie Cohen is displayed
    await waitForElement(() => getByText(container, "Archie Cohen"));
    
    // 3. Click the Delete button for Archie Cohen
    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );
  
    fireEvent.click(queryByAltText(appointment, "Delete"));

    // 4. wait for "Delete the appointment?" screen to appear
    expect(getByText(appointment, "Delete the appointment?")).toBeInTheDocument();

    // 5. Click the "Confirm" delete button
    fireEvent.click(getByText(appointment, "Confirm"));

    // 6. Check that the element with the text "Deleting" is displayed.
    expect(getByText(appointment, "Deleting")).toBeInTheDocument();

    await waitForElement(() => queryByAltText(appointment, "Add"));

    // 7. Check if Archie Cohen is no longer displayed
    const isArchieThere = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );

    expect(isArchieThere).toBe(undefined);

    // 8. Check if the amount og remaining spots increased by 1 to 2
    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );
    
    
    expect(getByText(day, "2 spots remaining")).toBeInTheDocument();
    // console.log(prettyDOM(day));
  })

  it("loads data, edits an interview and keeps the spots remaining for Monday the same", async () => {
    // 1. Render the application
    const { container, debug } = render(<Application />);
    
    // 2. Wait until Archie Cohen is displayed
    await waitForElement(() => getByText(container, "Archie Cohen"));

    // 3. Click the Delete button for Archie Cohen
    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );
    
    // Click the edit
    fireEvent.click(queryByAltText(appointment, "Edit"));
    
    // Change the name input field from old student to new student
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Bobby Bob" }
    });

    // Select Interviewer
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    // Click Saving
    fireEvent.click(getByText(appointment, "Save"));

    // Check if "Saving" element appears
    expect(getByText(appointment, "Saving")).toBeInTheDocument();

    // Check and await that the new element succesfully saved
    await waitForElement(() => queryByText(appointment, "Bobby Bob"));

    // Get the HTML for day container
    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );
    
    // Check if the remaining spots stay at 1 after editing
    expect(getByText(day, "1 spot remaining")).toBeInTheDocument();
    // console.log(prettyDOM(day));
  });

    /* test number five */
  it("shows the save error when failing to save an appointment", async () => {
    axios.put.mockRejectedValueOnce();

    // 1. Render the application
    const { container, debug } = render(<Application />);
      
    // 2. Wait until Archie Cohen is displayed
    await waitForElement(() => getByText(container, "Archie Cohen"));

    // 3. Click the Delete button for Archie Cohen
    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );
    
    // Click the edit
    fireEvent.click(queryByAltText(appointment, "Edit"));
    
    // Change the name input field from old student to new student
    fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
      target: { value: "Bobby Bob" }
    });

    // Select Interviewer
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));

    // Click Saving
    fireEvent.click(getByText(appointment, "Save"));

    // Expect to switch to "Saving" element
    expect(getByText(appointment, "Saving")).toBeInTheDocument();
    
    // Check if "Error" element appears
    await waitForElement(() => queryByText(appointment, "Could not save Appointment"));

    // Close error message
    fireEvent.click(getByAltText(appointment, "Close"));

    // Check if back on edit page
    expect(getByText(appointment, "Tori Malcolm")).toBeInTheDocument();
    // console.log(prettyDOM(appointment));
  });

  // Test number
  it("shows the delete error when failing to delete an existing appointment", async () => {
    axios.delete.mockRejectedValueOnce();

    // 1. Render the application
    const { container, debug } = render(<Application />);
    
    // 2. Wait until Archie Cohen is displayed
    await waitForElement(() => getByText(container, "Archie Cohen"));
    
    // 3. Click the Delete button for Archie Cohen
    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );
  
    fireEvent.click(queryByAltText(appointment, "Delete"));
    
    expect(getByText(appointment, "Delete the appointment?")).toBeInTheDocument();

    fireEvent.click(getByText(appointment, "Confirm"));

    // Expect to switch to "Deleting" element
    expect(getByText(appointment, "Deleting")).toBeInTheDocument();
    
    // Check if "Error" element appears
    await waitForElement(() => queryByText(appointment, "Could not cancel Appointment"));

    // Close error message
    fireEvent.click(getByAltText(appointment, "Close"));

    // Check if back on edit page
    expect(getByText(appointment, "Tori Malcolm")).toBeInTheDocument();
    // console.log(prettyDOM(appointment));
  });

});
