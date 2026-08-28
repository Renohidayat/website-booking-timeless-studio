const axios = require('axios');

async function testProduction() {
  try {
    const payload = {
      api_key: "RP-27563c86-e029-47bf-b52e-e8ae4cf321bf",
      code: "qris",
      amount: 1,
      description: "Test",
    };
    const res = await axios.post('https://pg.ronzzyt.id/api/transaction/create', payload);
    console.log("Success:", res.data);
  } catch (error) {
    console.error("Status:", error.response?.status);
    console.error("Data:", error.response?.data);
  }
}

testProduction();
