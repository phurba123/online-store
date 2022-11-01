console.log('app running')
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const stripe = require('stripe')("sk_test_51LtcPBSDmzeBNkT9CiSJJ8FZ4KnF9fAeN8BEKKUddI7XJfYitpuyWhFfS8g0SykGalavVJp5pGHbkeVGI3UT8fOB00qeDFkWgo");

app.use(express.static('public'));
// app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors({
    origin: true,
    credentials: true
}));


app.post("/checkout", async(req, res) => {
 try {
     const session = await stripe.checkout.sessions.create({
         line_items: [
                {
                  price_data: {
                    currency: 'usd',
                    product_data: {
                      name: 'T-shirt',
                    },
                    unit_amount: 2000,
                  },
                  quantity: 1,
                },
              ],
         mode: "payment",
         success_url: "httt://localhost:4100/success.html",
         cancel_url: "http://localhost:4100/cancel.html"
      })
      res.status(200).json(session);
 }
 catch (error) {
    console.log({error})
 }
})


// app.post('/checkout', async (req, res) => {
//     const session = await stripe.checkout.sessions.create({
//       line_items: [
//         {
//           // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
//           price: 'usd',
//           quantity: 1,
//         },
//       ],
//       mode: 'payment',
//       success_url: `https://localhost:4100/public/success.html`,
//       cancel_url: `https://localhost:4100/public/cancel.html`,
//     });
  
//     res.send('fdkfjk')
//   });

app.listen(4100, () => {
    console.log('server listening at port 4100')
})

// line_items: [
//     {
//       price_data: {
//         currency: 'usd',
//         product_data: {
//           name: 'T-shirt',
//         },
//         unit_amount: 2000,
//       },
//       quantity: 1,
//     },
//   ],
//   mode: 'payment',
//   success_url: 'https://example.com/success',
//   cancel_url: 'https://example.com/cancel',
// });

// {
//     line_items: [
//       {
//         // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
//         price: '{{PRICE_ID}}',
//         quantity: 1,
//       },
//     ],
//     mode: 'payment',
//     success_url: `${YOUR_DOMAIN}/success.html`,
//     cancel_url: `${YOUR_DOMAIN}/cancel.html`,
//   });

//   res.redirect(303, session.url);
// }