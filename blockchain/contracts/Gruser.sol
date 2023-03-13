// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract Gruser{
    address private owner;

    mapping(address => bool) private users;

    constructor(){
        owner=msg.sender;
    }

    event updated(address indexed user, bytes32 cid);
    event added(address indexed user, bytes32 cid);

     modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }

     modifier validAddress(address _addr) {
        require(_addr != address(0), "Not valid address");
        _;
    }

    function addUser(bytes32 _cid) external {
        if(users[msg.sender]==true){
            emit updated(msg.sender, _cid);
        }else{
            emit added(msg.sender, _cid);
            users[msg.sender] = true;
        }
    }
}
