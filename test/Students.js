const Students = artifacts.require("./Students");

contract("Students test", (accounts) => {
  it("should add a student's name", async () => {
    const insert = await Students.deployed();
    await insert.add("Zubin");
    assert.equal(await insert.get(0), "Zubin");
  });
});
