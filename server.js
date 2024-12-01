const express = require("express");
const app = express();
const { resolve } = require("path");
const port = process.env.PORT || 3000;

// Importing the dotenv module to use environment variables:
require("dotenv").config();

const api_key = process.env.SECRET_KEY;
const stripe = require("stripe")(api_key);

// ------------ Middleware & Configurations ------------
app.use(express.static(resolve(__dirname, process.env.STATIC_DIR)));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Helper function to dynamically get the domain URL
const getDomainURL = (req) => `${req.protocol}://${req.get("host")}`;

// ------------ Routes ------------

app.get("/", (req, res) => {
  const path = resolve(process.env.STATIC_DIR + "/index.html");
  res.sendFile(path);
});

app.get("/success", (req, res) => {
  const path = resolve(process.env.STATIC_DIR + "/success.html");
  res.sendFile(path);
});

app.get("/cancel", (req, res) => {
  const path = resolve(process.env.STATIC_DIR + "/cancel.html");
  res.sendFile(path);
});

app.get("/workshop1", (req, res) => {
  const path = resolve(process.env.STATIC_DIR + "/workshops/workshop1.html");
  res.sendFile(path);
});

app.get("/workshop2", (req, res) => {
  const path = resolve(process.env.STATIC_DIR + "/workshops/workshop2.html");
  res.sendFile(path);
});

app.get("/workshop3", (req, res) => {
  const path = resolve(process.env.STATIC_DIR + "/workshops/workshop3.html");
  res.sendFile(path);
});

// Checkout session route
app.post("/create-checkout-session/:pid", async (req, res) => {
  const priceId = req.params.pid;

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    success_url: `${getDomainURL(req)}/success?id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${getDomainURL(req)}/cancel`,
    payment_method_types: ["card"],
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    allow_promotion_codes: true,
  });

  res.json({ id: session.id });
});

// Server listening
app.listen(port, () => {
  console.log(`Server listening on port: ${port}`);
  console.log("App is accessible dynamically on the mapped port.");
});

