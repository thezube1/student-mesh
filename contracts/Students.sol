pragma solidity ^0.8.10;

contract Students {
    // provider is the wallet which provides the file/information 
    // reciever is the wallet which recieves the request
    // header contains information about the request
    // owner is the wallet which the file will be linked to
    // address is the physical address where the file lives on the IPFS
    event RequestApproval(address indexed provider, address indexed reciever, string indexed location, string header, );
    event ApproveRequest(address indexed owner, address indexed provider, string header, string location);
    
    function request(address _reciever, string memory _location, string memory _header) public {
        emit RequestApproval(msg.sender, _reciever, _location, _header, );
    }

    function approve(address _provider, string memory _header, string memory _location) public {
        emit ApproveRequest(msg.sender, _provider, _header, _location);
    }
}

/*
    event Student(address indexed _from, string _first, string _last);

    function add(string memory first, string memory last) public {
        //students.push(x);
        emit Student(msg.sender, first, last);
    }

    function get() public view returns (string[] memory) {
        //return students;
    }
*/