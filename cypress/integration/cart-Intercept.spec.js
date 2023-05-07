/// <reference types="cypress" />

const faker = require("faker-br");

describe('Intercept cart', () => {
    it('Add item to cart fragment', () => {
        cy.intercept({
            method: 'POST',
            url: '/?wc-ajax=get_refreshed_fragments',
        }, req => {
            req.reply({
                statusCode: 200,
                body: {
                    "fragments": {
                        "div.widget_shopping_cart_content": "<div class=\"widget_shopping_cart_content\">\r\n<div class=\"mini_cart_content\">\r\n\t<div class=\"mini_cart_inner\">\r\n\t\t<div class=\"mcart-border\">\r\n\t\t\t\t\t\t\t<ul class=\"cart_list product_list_widget \">\r\n\t\t\t\t\t\t\t\t\t\t\t\t<li id=\"mcitem-3ced71723187d9a13d48c34ac4879b1d mini_cart_item\">\r\n\t\t\t\t\t\t\t\t<a class=\"product-image\" href=\"http://lojaebac.ebaconline.art.br/product/atlas-fitness-tank/?attribute_size=XS&#038;attribute_color=Blue\">\r\n\t\t\t\t\t\t\t\t\t<img width=\"427\" height=\"546\" src=\"//lojaebac.ebaconline.art.br/wp-content/uploads/2021/05/mt11-blue_main-427x546.jpg\" class=\"attachment-woocommerce_thumbnail size-woocommerce_thumbnail\" alt=\"\" decoding=\"async\" loading=\"lazy\" />\t\t\t\t\t\t\t\t</a>\r\n\t\t\t\t\t\t\t\t<div class=\"product-details\">\r\n\t\t\t\t\t\t\t\t\t<a href=\"http://lojaebac.ebaconline.art.br/carrinho/?remove_item=3ced71723187d9a13d48c34ac4879b1d&#038;_wpnonce=fb1f42a187\" class=\"remove\" aria-label=\"Remove this item\" data-product_id=\"3680\" data-product_sku=\"MT11-XS-Blue\" data-cart_item_key=\"3ced71723187d9a13d48c34ac4879b1d\">&times;</a>\t\t\t\t\t\t\t\t\t<a class=\"product-name\" href=\"http://lojaebac.ebaconline.art.br/product/atlas-fitness-tank/?attribute_size=XS&#038;attribute_color=Blue\">Atlas Fitness Tank - XS, Blue</a>\r\n\t\t\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t\t\t<span class=\"quantity\">\r\n\t\t\t\t\t\t\t\t\t\tQty: 1\t\t\t\t\t\t\t\t\t</span>\r\n\t\t\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<span class=\"woocommerce-Price-amount amount\"><bdi><span class=\"woocommerce-Price-currencySymbol\">&#82;&#36;</span>18,00</bdi></span>\t\t\t\t\t\t\t\t</div>\r\n\t\t\t\t\t\t\t</li>\r\n\t\t\t\t\t\t\t\t\t\t\t</ul><!-- end product list -->\r\n\t\t\t\r\n\t\t\t\r\n\t\t\t\t<p class=\"total\">\r\n\t\t\t\t\t<strong>Subtotal:</strong> <span class=\"woocommerce-Price-amount amount\"><bdi><span class=\"woocommerce-Price-currencySymbol\">&#82;&#36;</span>18,00</bdi></span>\t\t\t\t</p>\r\n\r\n\t\t\t\t\r\n\t\t\t\t<p class=\"buttons\">\r\n\t\t\t\t\t<a href=\"http://lojaebac.ebaconline.art.br/carrinho/\" class=\"button wc-forward view-cart\">View Cart</a>\r\n\t\t\t\t\t<a href=\"http://lojaebac.ebaconline.art.br/checkout/\" class=\"button checkout wc-forward\">Checkout</a>\t\r\n\t\t\t\t</p>\r\n\r\n\t\t\t\t\t\t<div class=\"clearfix\"></div>\r\n\t\t</div>\r\n\t</div>\r\n</div>\r\n</div>",
                        "#cart .mini-cart-items": " <span class=\"mini-cart-items\"> 1  </span> ",
                        "#cart .mini-cart-total": "<span class=\"woocommerce-Price-amount amount\"><bdi><span class=\"woocommerce-Price-currencySymbol\">&#82;&#36;</span>18,00</bdi></span>",
                        "#cart span.sub-title": "\r\n     <span class=\"sub-title\">Cart : <span class=\"woocommerce-Price-amount amount\"><bdi><span class=\"woocommerce-Price-currencySymbol\">&#82;&#36;</span>18,00</bdi></span></span>\r\n     \r\n    ",
                        "span.cart-mobile": "\r\n    <span class=\"mini-cart-items cart-mobile\">\r\n        1    </span>\r\n\r\n    "
                    },
                    "cart_hash": "43837b3037b9fa6912f07a37f14ced39"
                }
            }
            )
        }
        ).as('interceptAddCart')
        cy.visit('/product/abominable-hoodie/')
        cy.get('.button-variable-item-XS').click()
        cy.get('.button-variable-item-Blue').click()
        cy.get('.single_add_to_cart_button').click()

    });
    it('Mocking cart with products', () => {
        cy.intercept('GET','/carrinho/',{ fixture: 'cart.html' }).as ('mockingCart')
        cy.visit('/carrinho/')
    });
    it('Mocking refresh cart', () => {
        cy.intercept('GET','/carrinho/',{ fixture: 'cart refresh item.html' }).as ('mockingCartRefreshed')
        cy.visit('/product/abominable-hoodie/')
        cy.get('.button-variable-item-XS').click()
        cy.get('.button-variable-item-Blue').click()
        cy.get('.single_add_to_cart_button').click()
        cy.visit('/carrinho/')
        cy.get(':nth-child(1) > .product-quantity > .quantity > .plus')

    })
    it('Mocking Remove item', () => {
        cy.intercept('GET','/carrinho/?removed*',{ fixture: 'cart emphty.html' }).as ('mockingCartEmpthy')
        cy.visit('/product/abominable-hoodie/')
        cy.get('.button-variable-item-XS').click()
        cy.get('.button-variable-item-Blue').click()
        cy.get('.single_add_to_cart_button').click()
        cy.visit('/carrinho/')
        cy.get(':nth-child(1) > .product-remove > .remove > .fa').click()
        cy.visit('/carrinho/')
    })    
});