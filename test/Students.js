const Students = artifacts.require("./Students");

contract("Students test", (accounts) => {
  it("should add a student's name", async () => {
    const added = await Students.add("Zubin");
    assert.equals(Students.get(0), "Zubin");
  });
});
