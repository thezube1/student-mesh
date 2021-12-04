pragma solidity ^0.8.10;

contract Students {
    string[] public students;
    function add(string memory x) public {
        students.push(x);
    }

    function get(uint pos) public view returns (string memory) {
        return students[pos];
    }
}