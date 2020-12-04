import React from 'react'

import StripeCheckout from 'react-stripe-checkout'

const StripeCheckoutButton = ({ price }) => {

    const priceForStripe = price * 100;
    const publishablekey = "pk_test_51HuLhKHj6OWWdwXgiv8oNoJ9N6ktsYQNVQs0OFGRkRj5O7KtbTIebEJExRPVnZ4QvFMY6sUFGh12uZVrZCuLeRtx00ukO62gq5";

    const onToken = token => {
        console.log(token)
        alert("Payment Successful"
        )
    }
    return (
        <StripeCheckout
            name="Crwn Clothing" // the pop-in header title
            description={`Your Total is $${price}`} // the pop-in header subtitle
            amount={priceForStripe}
            panelLabel="Pay Now"
            image="https://sendeyo.com/up/d/f3eb2117da"
            label='pay now'
            shippingAddress
            billingAddress
            token={onToken}
            stripeKey={publishablekey}
        />
    )
}


export default StripeCheckoutButton;