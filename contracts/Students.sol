pragma solidity ^0.8.10;

contract Students {

    event Student(address indexed _from, string _value);

    string[] public students;
    function add(string memory x) public {
        students.push(x);
        emit Student(msg.sender, x);
    }

    function get(uint pos) public view returns (string memory) {
        return students[pos];
    }
}