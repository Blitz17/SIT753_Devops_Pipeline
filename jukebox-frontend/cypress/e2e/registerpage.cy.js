describe('User Registration Test', () => {

    let user_data;

    beforeEach(() => {
        cy.fixture('credentials').then((data) => {
            user_data = data;
        });
        cy.visit('/')
    })

    // User registration end to end test
    it('Registering a user to the system', () => {
        // Navigate to the login page
        cy.get('[class="welcome"]').should('contain.text', 'WELCOME TO JUKEBOX')
        cy.get('[class="btn-large start"]').should('contain.text', 'CLICK HERE')
        cy.get('[class="btn-large start"]').should('contain.text', 'CLICK HERE').click()
        cy.url().should('include', 'login')

        // Navigate to the resiter page
        cy.get('.register-link a').click();
        cy.url().should('include', 'register')

        // Populate the form with the data 
        cy.get('#regName').type(user_data.new_user.name);
        cy.get('#regEmail').type(user_data.new_user.email);
        cy.get('#regPassword').type(user_data.new_user.password);
        cy.get('#regDOB').type(user_data.new_user.dob);
        cy.get('#regAge').type(user_data.new_user.age);
        cy.get('#regGender').select(user_data.new_user.gender);
        cy.get('#regBio').type(user_data.new_user.bio);

        // Submitting the form
        cy.get('#registerForm').submit();
        cy.contains(/User registered successfully/i).should('be.visible')

    })

})