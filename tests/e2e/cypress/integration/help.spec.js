const agencies = require("../fixtures/transit-agencies.json");

describe("Help page spec", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("Clicking on Help takes user to Help", () => {
    cy.contains("Help").click();

    cy.location("pathname").should("eq", "/help");
  });

  it("Contains a back link", () => {
    cy.contains("Help").click();

    cy.contains("Go back").then(($e) => {
      expect($e).attr("href").eql("/");
    });
  });

  it("Allows user to go back", () => {
    cy.contains("Help").click();

    cy.contains("Go back").click();

    cy.location("pathname").should("eq", "/");
  });

  it("Has help information for all transit agencies", () => {
    cy.contains("Help").click();

    agencies.forEach(function (agency) {
      cy.contains(agency.long_name);
      cy.contains(agency.phone);
    });
  });

  it("Has help information for correct transit agency if clicking Help from a transit page", () => {
    let chosenAgency = agencies[0];
    let otherAgency = agencies[1];
    cy.contains(chosenAgency.short_name).click();
    cy.contains("Help").click();

    cy.contains(chosenAgency.long_name);
    cy.contains(chosenAgency.phone);
    cy.should("not.contain", otherAgency.long_name);
    cy.should("not.contain", otherAgency.phone);
  });
});
