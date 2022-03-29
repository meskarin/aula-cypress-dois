/// <reference types="cypress" />


Cypress.Commands.add('login', (email,password) => {
    const fd = new FormData
    fd.append('email', email)
    fd.append('password', password)
    fd.append('woocommerce-register-nonce', '370809548d')
    fd.append('_wp_http_referer', `/minha-conta/`)
    fd.append('register', 'Register')
    cy.request({
        url: '/minha-conta/',
        method: 'POST',
        body: fd
    }).then(resp => {
        resp.headers['set-cookie']?.forEach(cookie => {   
            cy.log(resp.headers)
            const firstPart = cookie.split(';')[0]
            const divisor = firstPart.indexOf('=')
            const key = firstPart.substring(0, divisor)
            const value = firstPart.substring(divisor+1) 
            cy.setCookie(key, value)
        });
        cy.visit('/minha-conta/')
    })
})

Cypress.Commands.add('choseProduct', (product,size,color,quantity) => {
    const fb = new FormData
    fb.append('attribute_size', size)
    fb.append('attribute_color', color)
    fb.append('quantity',quantity)
    fb.append('add-to-cart','3528')
    fb.append('product_id', '3528')
    fb.append('variation_id', '3529')
    cy.request({
        url:`/product/${product}/`,
        method: 'POST',
        body:fb
    })
    cy.visit('/checkout/')
})
Cypress.Commands.add('firstUpdateOrder', () => {
    const fb = new FormData
    fb.append('security', '7fe7714a4e')
    fb.append('payment_method', 'bacs')
    fb.append('country', 'BR')
    fb.append('state', 'RJ')
    fb.append('postcode', '')
    fb.append('city', '')
    fb.append('address', '')
    fb.append('address_2', '')
    fb.append('s_country', 'BR')
    fb.append('s_state', 'RJ')
    fb.append('s_postcode', '')
    fb.append('s_city', '')
    fb.append('s_address', '')
    fb.append('s_address_2', '')
    fb.append('has_full_address', 'false')
    fb.append('post_data', 'billing_first_name=&billing_last_name=&billing_company=&billing_country=BR&billing_address_1=&billing_address_2=&billing_city=&billing_state=SP&billing_postcode=&billing_phone=&billing_email=&account_password=&order_comments=&payment_method=bacs&terms-field=1&woocommerce-process-checkout-nonce=57ceda1967&_wp_http_referer=%2Fcheckout%2F')

    cy.request({
        url:`/?wc-ajax=update_order_review`,
        method: 'POST',
        body: fb
    })
})
Cypress.Commands.add('secondUpdateOrder', () => {
    const fb = new FormData
    fb.append('security', '7fe7714a4e')
    fb.append('payment_method', 'bacs')
    fb.append('country', 'BR')
    fb.append('state', 'RJ')
    fb.append('postcode', '87023150')
    fb.append('city', 'Maringá')
    fb.append('address', 'rua dos tapajos')
    fb.append('address_2', '36')
    fb.append('s_country', 'BR')
    fb.append('s_state', 'RJ')
    fb.append('s_postcode', '87023150')
    fb.append('s_city', 'Maringá')
    fb.append('s_address', 'rua dos tapajos')
    fb.append('s_address_2', '36')
    fb.append('has_full_address', 'true')
    fb.append('post_data', 'billing_first_name=&billing_last_name=&billing_company=&billing_country=BR&billing_address_1=&billing_address_2=&billing_city=&billing_state=SP&billing_postcode=&billing_phone=&billing_email=&account_password=&order_comments=&payment_method=bacs&terms-field=1&woocommerce-process-checkout-nonce=57ceda1967&_wp_http_referer=%2Fcheckout%2F')

    cy.request({
        url:`/?wc-ajax=update_order_review`,
        method: 'POST',
        body: fb
    })
})

Cypress.Commands.add('checkout', () => {
    const fb = new FormData
    fb.append('billing_first_name', 'Rafael')
    fb.append('billing_last_name', 'Ide')
    fb.append('billing_company', 'Cooper')
    fb.append('billing_country', 'BR')
    fb.append('billing_address_1', 'av Brasil')
    fb.append('billing_address_2', '36')
    fb.append('billing_city', 'Rio de janeiro')
    fb.append('billing_state', 'RJ')
    fb.append('billing_postcode', '87023150')
    fb.append('billing_phone', '44998660027')
    fb.append('billing_email', 'rafael.ide0602@outlook.com')
    fb.append('account_password', '')
    fb.append('order_comments', '')
    fb.append('payment_method', 'cheque')
    fb.append('terms','on')
    fb.append('terms-field', '1')
    fb.append('woocommerce-process-checkout-nonce', '27c72aece9')
    fb.append('_wp_http_referer', '/?wc-ajax=update_order_review')
    cy.request({
        url:`/?wc-ajax=checkout`,
        method: 'POST',
        body: fb
    })
})