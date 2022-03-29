/// <references types="cypress" />


class MainPage{
    get #login() {return cy.get('.icon-user-unfollow')}

    acessLoginPage(){
        this.#login.click()
    }

}
    

module.exports = new MainPage()