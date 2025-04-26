const express = require('express')
const cors = require('cors')
const uuid = require('uuid')
const stripe = require('stripe')("") //Enter Your Stip Secret key here

const app = new express();

app.use(cors());
app.use(express.json())


app.get('/', (req, res)=>{ res.send("Hello kitte")});

app.post('/payments',(req, res)=>{
    console.log(req.body)

   const {product, token} = req.body;

   const idempontecnyKey = uuid();

   return stripe.customers.create({
    email: token.email,
    source: token.id
   }).then(user=>{
    stripe.charges.create({
        amount : product.amount.price * 100,
        currency: 'usd',
        customer : user.id,
        receipt_email: token.email,
        description: `purchase by product.name`,
        shipping:{
            name: token.card.name,
            address: token.card.address_country
        }

    },{idempontecnyKey})
   })


})


app.listen(4545, ()=>{
    console.log("App running on Port 4545")
})