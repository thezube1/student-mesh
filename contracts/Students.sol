pragma solidity ^0.8.10;

contract Students {

    event Student(address indexed _from, string _first, string _last);

    string[] public students;
    function add(string memory first, string memory last) public {
        //students.push(x);
        emit Student(msg.sender, first, last);
    }

    function get() public view returns (string[] memory) {
        return students;
    }
}