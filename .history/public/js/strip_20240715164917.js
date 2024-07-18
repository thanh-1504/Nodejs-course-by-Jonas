import axios from "axios";

export const bookingTour = async (tourId) => {
  const session = await axios.get(
    `http://127.0.0.1:8000/api/checkout-session/${tourId}`
  );
  console.log(session);
};
