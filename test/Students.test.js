const Students = artifacts.require("./Students");
const assert = require("chai").assert;
const truffleAssert = require("truffle-assertions");

contract("Students test", (accounts) => {
  it("should add a student's name", async () => {
    const insert = await Students.deployed();
    await insert.add("Zubin");
    await insert.add("Kevin");
    const array = await insert.get();

    assert.equal(array[0], "Zubin");
    assert.equal(array[1], "Kevin");
  });
});
