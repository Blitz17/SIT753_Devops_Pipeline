describe('User Management Test', () => {
    
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
        
        // Enter credentials 
        cy.get('[id="email"]').type(user_data.user.email)
        cy.get('[id="password"]').type(user_data.user.password)
        cy.get('[type="submit"]').should('contain.text', 'Login').click()
        cy.contains(/Login Successful!/i).should('be.visible')

        // Navigate to the homepage
        cy.url().should('include', 'home')
        cy.contains(/Want to Discover New Favorites Based on Your Taste?/i).should('be.visible')
    })

    // Explore songs collection 
    it('View song collection', () => {
        // Navigate to the login page
        cy.get('[class="welcome"]').should('contain.text', 'WELCOME TO JUKEBOX')
        cy.get('[class="btn-large start"]').should('contain.text', 'CLICK HERE')
        cy.get('[class="btn-large start"]').should('contain.text', 'CLICK HERE').click()
        cy.url().should('include', 'login')

        // Navigate to the homepage
        cy.get('[id="email"]').type(user_data.user.email)
        cy.get('[id="password"]').type(user_data.user.password)
        cy.get('[type="submit"]').should('contain.text', 'Login').click()
        cy.contains(/Login Successful!/i).should('be.visible')
        cy.url().should('include', 'home')
        cy.contains(/Want to Discover New Favorites Based on Your Taste?/i).should('be.visible')
        
        // Explore trending songs 
        cy.get('[class="carousel-trending"]').scrollTo('right')
    })

    // Explore artists collection 
    it('View artists collection', () => {
        // Navigate to the login page
        cy.get('[class="welcome"]').should('contain.text', 'WELCOME TO JUKEBOX')
        cy.get('[class="btn-large start"]').should('contain.text', 'CLICK HERE')
        cy.get('[class="btn-large start"]').should('contain.text', 'CLICK HERE').click()
        cy.url().should('include', 'login')

        // Navigate to the homepage
        cy.get('[id="email"]').type(user_data.user.email)
        cy.get('[id="password"]').type(user_data.user.password)
        cy.get('[type="submit"]').should('contain.text', 'Login').click()
        cy.contains(/Login Successful!/i).should('be.visible')
        cy.url().should('include', 'home')
        cy.contains(/Want to Discover New Favorites Based on Your Taste?/i).should('be.visible')

        // Explore trending artists 
        cy.get('[class="carousel-artists"]').scrollIntoView()
        cy.contains(/Popular Artists/i).should('be.visible')
        cy.get('[class="carousel-artists"]').scrollTo('right')
    })



})