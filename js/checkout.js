let total = 0;
let cart =
JSON.parse(localStorage.getItem("earthcraft-cart")) || [];

const orderItems =
document.getElementById("orderItems");

function renderOrder(){

    let subtotal = 0;

    orderItems.innerHTML = "";

    cart.forEach(item=>{

        subtotal += item.price * item.quantity;

        orderItems.innerHTML += `
        

<div class="order-item">

<span>${item.name} × ${item.quantity}</span>

<span>₹${item.price * item.quantity}</span>

</div>

`;

});

let delivery = 50;

let gst = subtotal * 0.18;

total = subtotal + gst + delivery;

document.getElementById("subTotal").innerHTML = "₹"+subtotal;
document.getElementById("delivery").innerHTML = "₹"+delivery;
document.getElementById("gst").innerHTML = "₹"+gst.toFixed(2);
document.getElementById("grandTotal").innerHTML = "₹"+total.toFixed(2);

}
renderOrder();

let discount = 0;

document.getElementById("applyCoupon")
.addEventListener("click",()=>{

const code =
document.getElementById("coupon").value;

if(code==="EARTH10"){

    discount = 10;

    alert("Coupon Applied");

}else{

    alert("Invalid Coupon");

}

});



document.getElementById("placeOrder").addEventListener("click", () => {

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const mobile = document.getElementById("mobile").value.trim();
    const address = document.getElementById("address").value.trim();
    const city = document.getElementById("city").value.trim();
    const state = document.getElementById("state").value.trim();
    const pincode = document.getElementById("pincode").value.trim();

    if (
        name === "" ||
        email === "" ||
        mobile === "" ||
        address === "" ||
        city === "" ||
        state === "" ||
        pincode === ""
    ) {
        alert("Please fill all details.");
        return;
    }

    if (cart.length === 0) {
        alert("Your cart is empty.");
        return;
    }


    const paymentMethod =
document.querySelector('input[name="payment"]:checked').value;

if(paymentMethod==="cod"){

      alert("🎉 Order Placed Successfully!");

        const order = {
            
        orderId: "EC" + Date.now(),
        customer: name,
        email: email,
        mobile: mobile,
        address: address,
        items: cart,
        total: total,
        date: new Date().toLocaleString()
    };
localStorage.setItem("earthcraft-order", JSON.stringify(order));
    localStorage.removeItem("earthcraft-cart");

    window.location.href = "success.html";

}
else{

    let options = {
        key: "YOUR_RAZORPAY_KEY_ID",
        amount: total * 100,
        currency: "INR",
        name: "EarthCraft Pottery Studio",
        description: "Order Payment",

        handler: function (response) {

            alert("Payment Successful");

              const order = {
        orderId: "EC" + Date.now(),
        customer: name,
        email: email,
        mobile: mobile,
        address: address,
        items: cart,
        total: total,
        date: new Date().toLocaleString()
    };


            localStorage.setItem("earthcraft-order", JSON.stringify(order));

    localStorage.removeItem("earthcraft-cart");

    window.location.href = "success.html";

        },

        theme: {
            color: "#8B4513"
        }

    };

    let rzp = new Razorpay(options);

    rzp.open();

}

});