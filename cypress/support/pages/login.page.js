/// <references types="cypress" />


class loginPage{
    get #registerEmail() {return cy.get('#reg_email')}
    get #registerPass() {return cy.get('#reg_password')}
    get #registerSubmit() {return cy.get(':nth-child(4) > .button')}

    register(email,pass){
        this.#registerEmail.type(email)
        this.#registerPass.type(pass)
        this.#registerSubmit.click()
    }

}
    

module.exports = new loginPage()