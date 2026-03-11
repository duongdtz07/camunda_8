exports.pay = async (price) => {
    // const success = Math.random() > 0.5;
    // if (!success) {
    //     throw new Error("Payment gateway error");
    // }

    // return "SUCCESS"

    const totalMoneyInCustomerAccount = 30000000; // Simulate customer's account balance
    return price <= totalMoneyInCustomerAccount;
}