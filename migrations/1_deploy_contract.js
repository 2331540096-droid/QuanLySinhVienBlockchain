const StudentCredential = artifacts.require("StudentCredential");

module.exports = function (deployer) {
  deployer.deploy(StudentCredential).then(async (instance) => {
    // Set admin to the desired address
    const newAdminAddress = "0x191940eC935f2e97ABd72098A180C811bAe83cA2";
    await instance.setAdmin(newAdminAddress);
    console.log("Admin set to:", newAdminAddress);
  });
};