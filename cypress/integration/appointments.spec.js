describe("Appointments", () => {
  it("should visit root", () => {
    cy.visit("/");
  });


  it("should navigate to Tuesday", () => {

    cy.contains("[data-testid=day]", "Tuesday").click()
    .should('have.class', 'day-list__item--selected');
  });

  it("should book an interview", () => {
    cy.request("GET", "/api/debug/reset")
    // Visits the root of our web server
    cy.visit("/");
    cy.contains("Monday");

    // Clicks on the "Add" button in the second appointment
    cy.get("[alt=Add]")
    .first()
    .click();

    // Enters their name
    cy.get("[data-testid=student-name-input]").type("Lydia Miller-Jones");

    // Chooses an interviewer
    cy.get("[alt='Sylvia Palmer']").click();
    // Clicks the save button
    cy.contains("Save").click();
    // Sees the booked appointment
    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Sylvia Palmer");
  });
  it("should edit an interview", () => {
    cy.get("[alt=Edit]")
      .first()
      .click({ force: true });
  
    cy.get("[data-testid=student-name-input]").clear().type("Lydia Miller-Jones");
    cy.get("[alt='Tori Malcolm']").click();
  
    cy.contains("Save").click();
  
    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Tori Malcolm");
  });
  it("should cancel an interview", () => {
    cy.get("[alt=Delete]").first()
      .click({ force: true });
  
    cy.contains("Confirm").click();
  
    cy.contains("Deleting").should("exist");
    cy.contains("Deleting").should("not.exist");
  
    cy.contains(".appointment__card--show", "Archie Cohen")
      .should("not.exist");
  });
  
});