import axios from "axios";
const stripe = Stripe(
  "pk_test_51PcjWORsTmgy7LReGM5rkitnEUjPqBmnDzx0JMBf4J2MxFiCqopFh7VCkOwpKzlVYqmMaIWhZvHngiMwy88ftdMY00EBoE6BTj"
);
export const bookingTour = async (tourId) => {
  const session = await axios.get(
    `http://127.0.0.1:8000/api/checkout-session/${tourId}`
  );
  console.log(session);
};
