const Students = artifacts.require("./Students");
const assert = require("chai").assert;
const truffleAssert = require("truffle-assertions");

contract("Students test", (accounts) => {
  it("should add a student's name", async () => {
    const insert = await Students.deployed();
    const func = await insert.add("Zubin");
    truffleAssert.eventEmitted(func, "Student", (ev) => {
      console.log(ev._value);
      return ev;
    });

    assert.equal(await insert.get(0), "Zubin");
  });
});
