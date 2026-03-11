module.exports = (zbc) => {
  async function main() {
    try {
      // Deploy the BPMN process
      // const res = await zbc.deployProcess("./diagram_demo_process_full.bpmn");

      // Create a new process instance
      const instance = await zbc.createProcessInstance({
          bpmnProcessId: "process-order",
          variables: {
              productName: "laptop",
              quantity: 50,
              customer: "Duong",
              price: 20000000,
              orderId: 10,
          }
      });
      console.log("Process instance created:", instance);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      // await zbc.close();
    }
  }

  main();
};


