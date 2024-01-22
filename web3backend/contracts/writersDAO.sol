// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface ISoulNft {
    function balanceOf(address owner) external view returns (uint256);

    function burn(uint256 tokenId) external;

    function showIds(address _member) external view returns (uint256);

    function showMembers() external view returns (address[] memory);
}

contract WritersDAO {

    struct Writer{
        uint256 id_;
        address owner;
        string title;
        string content;
        uint yayvotes;
        uint nayvotes;
        Status status;
    }


enum Status {
    Pending,
    Approved
}
 uint256 public id;
    uint256 votingTime;
    uint256 _time;
    address admin;
    ISoulNft soulnft;
   
    struct DAOTime {
        uint256 daovotetime;
    }

    enum Votes {
        YAY,
        NAY
    }

    constructor(address _address, address _writersDAOToken) {
        admin = _address;
        soulnft = ISoulNft(_writersDAOToken);
        votingTime = 1 days;
    }

    mapping(uint256 => Writer) _writer;
    mapping(address => uint256[]) usersPost;
    mapping(uint256 => DAOTime) public daotime;
    mapping(address => uint256) memberVotes;
    mapping(address => mapping(uint256 => bool)) public hasVoted;

    error AlreadyVoted();
    error VotingTimeElapsed();
    error NotDAOMember();
    error OnlyAdmin();
    error NotYetTime();
    error VotingInProgress();

    event CreatePost(uint256 _id, string _title, string _content);
    event Vote(address member, uint256 _id);
    event ApproveImpact(uint256 _id);

    function createPost(string memory _title, string memory _content) public returns (uint256 _id) {
        id++;
        _id = id;
        if (_id == 1) {
            _time = block.timestamp + 30 days;
        }
        Writer storage writer = _writer[_id];
        DAOTime storage time = daotime[_id];
        write.id_ = _id;
        write.owner = msg.sender;
        write.title = _title;
        write.content = _content;
        write.status = Status.Pending;

        usersPost[msg.sender].push(_id);
        emit CreatePost(_id, _title, _content);
    }

    function vote(uint256 _id, Votes votes) external {
        if (soulnft.balanceOf(msg.sender) != 1) revert NotDAOMember();
        Writer storage writer = _writer[_id];
        if (hasVoted[msg.sender][_id] != false) revert AlreadyVoted();
        if (block.timestamp > daotime[_id].daovotetime) {
            revert VotingTimeElapsed();
        }
        hasVoted[msg.sender][_id] = true;

        uint8 numVotes = 1;
        if (votes == Votes.YAY) {
            writer.yayvotes += numVotes;
        } else {
            writer.nayvotes += numVotes;
        }
        memberVotes[msg.sender]++;

        emit Vote(msg.sender, _id);
    }

    function approveImpact(uint256 _id) external {
        if (soulnft.balanceOf(msg.sender) != 1) revert NotDAOMember();
        if (daotime[_id].daovotetime > block.timestamp) {
            revert VotingInProgress();
        }
        Writer storage writer = _writer[_id];
        if (writer.yayvotes > writer.nayvotes) {
            writer.status = Status.Approved;
        }

        emit ApproveImpact(_id);
    }


}