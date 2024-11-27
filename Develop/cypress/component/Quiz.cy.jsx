import React from 'react';
import { mount } from '@cypress/react';
import Quiz from '../../client/src/components/Quiz';

const quiz = {
    
}

// test the Quiz Component
describe('Quiz Component', () => {
    it('should render the quiz component correctly', () => {
        // Mount the Quiz component
        cy.mount(<Quiz />);
        
        // Check if the quiz title is rendered
        cy.get('.quiz-title').should('exist');
        
        // Check if the quiz questions are rendered
        cy.get('.quiz-question').should('have.length.greaterThan', 0);
        
        // Check if the submit button is rendered
        cy.get('.quiz-submit').should('exist');
    });

    it('should allow selecting an answer', () => {
        cy.mount(<Quiz />);
        
        // Select the first answer of the first question
        cy.get('.quiz-question').first().find('.quiz-answer').first().click();
        
        // Verify that the answer is selected
        cy.get('.quiz-question').first().find('.quiz-answer').first().should('have.class', 'selected');
    });

    it('should submit the quiz', () => {
        cy.mount(<Quiz />);
        
        // Select an answer for each question
        cy.get('.quiz-question').each(($el) => {
            cy.wrap($el).find('.quiz-answer').first().click();
        });
        
        // Click the submit button
        cy.get('.quiz-submit').click();
        
        // Verify that the results are displayed
        cy.get('.quiz-results').should('exist');
    });
});


