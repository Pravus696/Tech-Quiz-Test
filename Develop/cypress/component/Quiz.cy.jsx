import React from "react";
import Quiz from "../../client/src/components/Quiz";
import "@testing-library/cypress/add-commands";

// test the Quiz Component
describe("Quiz Component", () => {
  it("should render the quiz component correctly", () => {
    // Mount the Quiz component
    cy.mount(<Quiz />);
  });

  it("should have a start button", () => {
    cy.mount(<Quiz />);
    // verify that the start button is rendered
    cy.get("button").should("have.text", "Start Quiz");
  });

  it("should render quiz questions when button is clicked", () => {
    cy.mount(<Quiz />);
    cy.get("button").contains("StartQuiz").click();
    // Select an answer for each question
    cy.wait(500) // wait for the questions to load
      .get("div")
      .eq(0)
      .get(".card h2")
      .should("exist");
  });

  it("should render answers for the quiz questions", () => {
    cy.mount(<Quiz />);
    cy.get("button").contains("Start Quiz").click();
    cy.wait(500) // wait for the questions to load
      .get(".card")
      .children()
      .eq(1)
      .children()
      .should("have.length", 4)
      .should("be.visible");
  });

  it("should have a total of 10 questions", () => {
    cy.mount(<Quiz />);
    cy.log("intercepting the request");
    cy.intercept(
      {
        method: "GET",
        url: "/api/questions/random",
      },
      { fixture: "questions.json" }
    ).as("mockGetRandomQuestions");

    // trigger quiz start
    cy.contains("Start Quiz").click();

    // waiting for API intercept
    cy.wait("@mockGetRandomQuestions").then((interception) => {
      // check the number of questions
      expect(interception.response.body.length).to.equal(10);
    });

    // check the first question is displayed
    cy.get("div")
      .eq(0)
      .get(".card h2")
      .should("have.text", "What does the // operator do in Python?");
  });

  it("should display the final score after answering all questions", () => {
    cy.mount(<Quiz />);
    cy.intercept(
      {
        method: "GET",
        url: "/api/questions/random",
      },
      { fixture: "questions.json" }
    ).as("mockGetRandomQuestions");

    // trigger quiz start
    cy.contains("Start Quiz").click();

    // waiting for API intercept
    cy.wait("@mockGetRandomQuestions").then((interception) => {
      // check the number of questions
      expect(interception.response.body.length).to.equal(10);
    });

    // answer all questions
    for (let i = 0; i < 10; i++) {
      cy.get("button").eq(0).first().click();
    }

    // check the final score
    cy.get(".alert-success").contains("Your score:");
  });

  it("should start a new quiz after clicking Take New Quiz", () => {
    cy.mount(<Quiz />);
    cy.intercept(
      {
        method: "GET",
        url: "/api/questions/random",
      },
      { fixture: "questions.json" }
    ).as("mockGetRandomQuestions");

    // trigger quiz start
    cy.contains("Take New Quiz").click();

    // waiting for API intercept
    cy.wait("@mockGetRandomQuestions").then((interception) => {
      // check the number of questions
      expect(interception.response.body.length).to.equal(10);
    });

    // answer all questions
    for (let i = 0; i < 10; i++) {
      cy.get("button").eq(0).first().click();
    }

    // check the final score
    cy.get("button").contains("Take New Quiz").click();
    cy.get(".card h2").should("exist");
  });
});
