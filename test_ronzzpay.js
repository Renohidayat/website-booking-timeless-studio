const axios = require('axios');

async function testRonzzPay() {
  try {
    const payload = {
      api_key: "RP-27563c86-e029-47bf-b52e-e8ae4cf321bf",
      code: "qris",
      amount: 1,
      description: "Test 1 Rupiah",
      webhook_url: "http://localhost:3000/api/payment/webhook"
    };
    
    console.log("Sending payload:", payload);
    const res = await axios.post('https://pg.ronzzyt.id/sandbox/transaction/create', payload);
    console.log("Success:", res.data);
  } catch (error) {
    console.error("Failed with status:", error.response?.status);
    console.error("Error data:", error.response?.data);
  }
}

testRonzzPay();
