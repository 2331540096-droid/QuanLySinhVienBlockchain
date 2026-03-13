const StudentCredential = artifacts.require("StudentCredential");

module.exports = function (deployer) {
  deployer.deploy(StudentCredential).then(async (instance) => {
    // Set admin to the desired address
    const newAdminAddress = "0x617ab556EDA00942826C0BF08B7Ac99e45CCAF84";
    await instance.setAdmin(newAdminAddress);
    console.log("Admin set to:", newAdminAddress);
  });
};