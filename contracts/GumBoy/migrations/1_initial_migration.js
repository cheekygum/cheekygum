const GumBoy = artifacts.require("GumBoy");

module.exports = async function (deployer) {
    deployer.deploy(GumBoy);
};
