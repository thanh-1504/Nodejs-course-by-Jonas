import axios from "axios";
// const stripe = Stripe(
//   "pk_test_51PcjWORsTmgy7LReGM5rkitnEUjPqBmnDzx0JMBf4J2MxFiCqopFh7VCkOwpKzlVYqmMaIWhZvHngiMwy88ftdMY00EBoE6BTj"
// );
const stripe = require("stripe")(
  "sk_test_51PcjWORsTmgy7LReLiDk1jsw2gnK7lGCda5ZJorFsSEPHjO1tovjXVcApZsCdB7iVe6AMtfN8xMzL1ibWdxuTgEA00SxDrYOkM"
);
export const bookingTour = async (tourId) => {
  try {
    const session = await axios.post(
      `http://127.0.0.1:8000/api/v1/bookings/checkout-session/${tourId}`
    );
    console.log(session);
    // await stripe.redirectToCheckout({ sessionId: session.data.session.id });
  } catch (err) {
    console.log(err);
  }
};
