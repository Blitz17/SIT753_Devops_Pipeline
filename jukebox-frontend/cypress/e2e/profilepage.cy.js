describe('Music Management Test', () => {

    let user_data;

    beforeEach(() => {
        cy.fixture('credentials').then((data) => {
            user_data = data;
        });
        cy.visit('/')
    })

    // Login as a user to the jukebox
    it('Login as user', () => {
        // Navigate to the login page
        cy.get('[class="welcome"]').should('contain.text', 'WELCOME TO JUKEBOX')
        cy.get('[class="btn-large start"]').should('contain.text', 'CLICK HERE')
        cy.get('[class="btn-large start"]').should('contain.text', 'CLICK HERE').click()
        cy.url().should('include', 'login')

        // Enter user credentials
        cy.get('[id="email"]').type(user_data.user.email)
        cy.get('[id="password"]').type(user_data.user.password)
        cy.get('[type="submit"]').should('contain.text', 'Login').click()
        cy.contains(/Login Successful!/i).should('be.visible')

        // Navigate to the homepage
        cy.url().should('include', 'home')
        cy.contains(/Want to Discover New Favorites Based on Your Taste?/i).should('be.visible')
    })

    // User profile navigation end to end test
    it('Navigate to the profile page', () => {
        // Navigate to the login page
        cy.get('[class="welcome"]').should('contain.text', 'WELCOME TO JUKEBOX')
        cy.get('[class="btn-large start"]').should('contain.text', 'CLICK HERE')
        cy.get('[class="btn-large start"]').should('contain.text', 'CLICK HERE').click()
        cy.url().should('include', 'login')

        // Enter user credentials
        cy.get('[id="email"]').type(user_data.user.email)
        cy.get('[id="password"]').type(user_data.user.password)
        cy.get('[type="submit"]').should('contain.text', 'Login').click()
        cy.contains(/Login Successful!/i).should('be.visible')

        // Navigate to the homepage
        cy.url().should('include', 'home')
        cy.contains(/Want to Discover New Favorites Based on Your Taste?/i).should('be.visible')

        // Navigate to the user profile page
        cy.get('[class="chat-btn btn-floating btn-large pink darken-1"]').click()
        cy.url().should('include', 'profile')
    })

    // Sending a group chat end to end test
    it.only('Start a group chat', () => {
        // Navigate to the login page
        cy.get('[class="welcome"]').should('contain.text', 'WELCOME TO JUKEBOX')
        cy.get('[class="btn-large start"]').should('contain.text', 'CLICK HERE')
        cy.get('[class="btn-large start"]').should('contain.text', 'CLICK HERE').click()
        cy.url().should('include', 'login')

        // Enter user credentials and navigat to the homepage
        cy.get('[id="email"]').type(user_data.user.email)
        cy.get('[id="password"]').type(user_data.user.password)
        cy.get('[type="submit"]').should('contain.text', 'Login').click()
        cy.contains(/Login Successful!/i).should('be.visible')
        cy.url().should('include', 'home')
        cy.contains(/Want to Discover New Favorites Based on Your Taste?/i).should('be.visible')

        // Navigate to the user profile page
        cy.get('[class="chat-btn btn-floating btn-large pink darken-1"]').click()
        cy.url().should('include', 'profile')

        // Starting a group chat
        cy.get('[id="groupChat"]').click()
        cy.contains(/Join a Genre Room/i).should('be.visible')

        cy.get('.test-select-genre').select('rock', { force: true });

        cy.get('#message').type('Hello, world!');
        cy.get('[id="test-send-groupchat"]').click();
    })

})