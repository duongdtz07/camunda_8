
// =========== START VALIDATE ORDER WORKER ============
module.exports = (zbc) => {
  zbc.createWorker({
    taskType: "validate-order",
    taskHandler: async (job) => {
      const { productName, quantity, customer, price, orderId } = job.variables;
      console.log(
        `Validating order ${orderId} for ${customer}: ${quantity} x ${productName} at ${price} each`,
      );
      try {
          const response = await callValidateOrderWorker(orderId);
          const isValid = orderId && productName && quantity > 0 && price > 0 && response; // Simulate validation logic
          if (isValid) {
            console.log(`Order ${orderId} is valid.`);
              await job.complete({
                  isValid: true,
                  validationResult: "Order is valid",
              });
          } else {
            console.log(`Order ${orderId} is invalid.`);
              await job.complete({
                  isValid: false,
                  validationResult: "Order is invalid",
              });
          }
      } catch (error) {
        console.log('RETRY: ', job.retries);
          await job.fail(
          {
            validationResult: "Order is invalid",
            isValid: false,
          },
          job.retries - 1,
        );
      }
    },
  });

  const callValidateOrderWorker = async (orderId) => {
    try {
      return await fetch(
        `http://localhost:3000/api/users?orderId=${orderId}`,
      )
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data && data.id == orderId) {
            return true; // Simulate valid order if API returns matching orderId
          }
          throw new Error("Invalid order response from API");
        })
        .catch((error) => {
          throw new Error(`Error calling validate order API: ${error.message}`);
        });
    } catch (error) {
      console.error("Error calling validate order worker:", error);
      throw new Error(`Error calling validate order worker: ${error.message}`);
    }
  };
}

// ============ END VALIDATE ORDER WORKER ============