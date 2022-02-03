pragma solidity ^0.8.10;

contract Students {
    // provider is the wallet which provides the file/information 
    // reciever is the wallet which recieves the request
    // header contains information about the request
    // owner is the wallet which the file will be linked to
    // address is the physical address where the file lives on the IPFS

    event Transcript(address indexed owner, address indexed provider, string header, string location);

    function approveTranscript(address _provider, string memory _header, string memory _location) public {
        emit Transcript(msg.sender, _provider, _header, _location);
    }

    /*
    event RequestApproval(address indexed provider, address indexed reciever, string location, string header);
    event ApproveRequest(address indexed owner, address indexed provider, string header, string location, bytes32 request);
    
    function request(address _reciever, string memory _location, string memory _header) public {
        emit RequestApproval(msg.sender, _reciever, _location, _header);
    }

    function approve(address _provider, string memory _header, string memory _location, bytes32 _request) public {
        emit ApproveRequest(msg.sender, _provider, _header, _location, _request);
    }
    */
 

}
