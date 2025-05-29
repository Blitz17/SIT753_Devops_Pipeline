describe('Music Management Test', () => {

  let admin_data;

  beforeEach(() => {
    cy.fixture('credentials').then((data) => {
      admin_data = data;
    });
    cy.visit('/')
  })

  // Login as a admin to the system
  it('Login as admin', () => {
    // Navigate to the login page 
    cy.get('[class="welcome"]').should('contain.text', 'WELCOME TO JUKEBOX')
    cy.get('[class="btn-large start"]').should('contain.text', 'CLICK HERE')
    cy.get('[class="btn-large start"]').should('contain.text', 'CLICK HERE').click()
    cy.url().should('include', 'login')

    // Navigate to the admin page 
    cy.get('[id="email"]').type(admin_data.admin.email)
    cy.get('[id="password"]').type(admin_data.admin.password)
    cy.get('[type="submit"]').should('contain.text', 'Login').click()
    cy.contains(/Login Successful!/i).should('be.visible')
    cy.url().should('include', 'admin')
  })

  // Adding new song to the system
  it('Add new song', () => {
    // Navigate to the login page 
    cy.get('[class="welcome"]').should('contain.text', 'WELCOME TO JUKEBOX')
    cy.get('[class="btn-large start"]').should('contain.text', 'CLICK HERE')
    cy.get('[class="btn-large start"]').should('contain.text', 'CLICK HERE').click()
    cy.url().should('include', 'login')

    // Navigate to the admin page 
    cy.get('[id="email"]').type(admin_data.admin.email)
    cy.get('[id="password"]').type(admin_data.admin.password)
    cy.get('[type="submit"]').should('contain.text', 'Login').click()
    cy.contains(/Login Successful!/i).should('be.visible')
    cy.url().should('include', 'admin')

    // Scrolling down to the song management section
    cy.get('[data-test=song-management]').scrollIntoView()
    cy.contains(/Song Management/i).should('be.visible')
    cy.get('[href="#add-song-modal"]').should('contain.text', 'Add New Song').click()

    // Adding a new song to the system
    cy.contains(/Add New Song/i).should('be.visible')
    cy.get('[id="add_name"]').type('hello')
    cy.get('[data-test=add-song]').should('contain.text', 'Save').click()
  })

})