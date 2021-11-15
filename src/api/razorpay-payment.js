import axios from "axios";
import paymentLogo from "../assets/payment-logo.jpg";

const loadScript = (src) => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
};

export const loadPayment = async ({ totalAmount, setResetCart }) => {
  try {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("SDK failed to load");
      return;
    }

    const {
      data: { order },
    } = await axios.post(
      "https://api-circlekart.herokuapp.com/carts/checkout",
      {
        totalAmount,
      }
    );

    const options = {
      key: "rzp_test_Tosf7K9EOd3v7X",
      order: order.amount.toString(),
      currency: order.currency,
      name: "Circle Inc",
      description: "Test Transaction",
      image: paymentLogo,
      order_id: order.id,
      handler: function (response) {
        setResetCart(true);
        alert("order successful");
      },
      prefill: {
        name: "Ganesh Gajula",
        email: "ganesh@gmail.com",
        contact: "9999999999",
      },
      notes: {
        address: "Circle Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  } catch (error) {
    console.log(error.response);
  }
};
