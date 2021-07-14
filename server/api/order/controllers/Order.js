'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/3.0.0-beta.x/guides/controllers.html#core-controllers)
 * to customize this controller
 */

const stripe = require('stripe')('sk_test_CbI52CqMj8Cv4bXf822VOGhu');

module.exports = {
  //...
  create: async (ctx) => {
    const {
      address,
      amount,
      dishes,
      postalCode,
      token,
      city
    } = ctx.request.body;

    const charge = await stripe.charges.create({
      // Transform cents to dollars.
      amount: amount * 100,
      currency: 'usd',
      description: `Order ${new Date()} by ${ctx.state.user.id}`,
      source: token,
    });

    // Register the order in the database
    const order = await strapi.services.order.add({
      user: ctx.state.user.id,
      address,
      amount,
      dishes,
      postalCode,
      city
    });

    return order;
  },
};
