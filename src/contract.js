// // SPDX-License-Identifier: UNLICENSED

// /*
// *This code is subject to the Copyright License
// * Copyright (c) 2023 Sevenlinelabs
// * All rights reserved.
// */
// pragma solidity ^0.8.17;
// import "@openzeppelin/contracts/token/ERC1155/IERC1155.sol";
// import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
// import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

// import "./module/NTS-Multi.sol";
// import "./module/NTS-UserManager.sol";
// import "./module/RewardVault.sol";

// contract TMHCRebornStake is ReentrancyGuard, NTStakeMulti{
//     // Staking pool onwer / admin
//     address private owner;
//     // Operation status of the Pool.
//     bool public PauseStake;
//     // Staking user array for cms.

//     constructor(IERC1155 _EditionToken, IERC721 _NFTtoken, NTSRewardVault _RewardVault, uint256 _rewardPerHour, address _owner) {
//         owner = _owner;
//         tmhcToken = _EditionToken;
//         momoToken = _NFTtoken;
//         rewardVault = _RewardVault;
//         rewardPerHour = _rewardPerHour;
//     }

//     /*///////////////////////////////////////////////////////////////
//                             Basic Staking Info
//     //////////////////////////////////////////////////////////////*/
//     function getStakedTMHC() public view returns(uint16[] memory stakedIds){
//         return users[msg.sender].stakedtmhc;
//     }

//     function getStakedMOMO() public view returns(uint16[] memory stakedIds){
//         return users[msg.sender].stakedmomo;
//     }

//     function getStakedTeam() public view returns(uint16[] memory stakedIds){
//         return users[msg.sender].stakedteam;
//     }

//     function getTeamBoosts(uint16 _staketeam) public view returns(uint16[] memory boostIds){
//         return inStakedteam[_staketeam].boostIds;
//     }

//     /*///////////////////////////////////////////////////////////////
//                         Single Stake Interface
//     //////////////////////////////////////////////////////////////*/
//     function stake(uint _tokenType, uint16[] calldata _tokenIds) external nonReentrant {
//         _stake(_tokenType, _tokenIds);
//     }

//     function claim(uint _tokenType, uint16 _tokenId) external nonReentrant {
//         _claim(_tokenType, _tokenId);
//     }

//     function claimAll() external nonReentrant {
//         _claimAll();
//     }

//     function unStake(uint _tokenType, uint16[] calldata _tokenIds) external nonReentrant {
//         _unStake(_tokenType, _tokenIds);
//     }

//     function calReward(uint _tokenType, uint16 _tokenId) external view returns(uint256 _Rawrd){
//         return _calReward(_tokenType, _tokenId);
//     }

//     function calRewardAll() external view returns(uint256 _Reward){
//         return _calRewardAll();
//     }

//     /*///////////////////////////////////////////////////////////////
//                          Multi Stake Interface
//     //////////////////////////////////////////////////////////////*/
//     function stakeTeam(uint16 _leaderId ,uint16[] calldata _boostIds) external nonReentrant{
//         _stakeTeam(_leaderId, _boostIds);
//     }

//     function claimTeam(uint16 _leaderId) external nonReentrant{
//         _claimTeam(_leaderId);
//     }

//     function calimTeamAll() external nonReentrant{
//         _claimTeamAll();
//     }

//     function unStakeTeam(uint16[] calldata _leaderIds) external nonReentrant{
//         _unStakeTeam(_leaderIds);
//     }

//     function calRewardTeam(uint16 _staketeam) external view returns(uint256 _TotalReward){
//         return _calRewardTeam(_staketeam);
//     }

//     function calRewardTeamAll() external view returns (uint256 _TotalReward){
//         return _calRewardTeamAll();
//     }

//     function calBoostRate(uint16 _staketeam) external view returns(uint256 _boostrate){
//         return _calBoostRate(_staketeam);
//     }

//     /*///////////////////////////////////////////////////////////////
//                             Admin Function
//     //////////////////////////////////////////////////////////////*/
//     function setAddMomoGrades(uint8[] calldata _momogrades) external {
//         require(msg.sender == owner, "Not owner");
//         for(uint256 i = 0; i < _momogrades.length; i++){
//             momoGrades.push(_momogrades[i]);
//         }
//     }

//     function setGradesBonus(uint8[10] calldata _gradesbonus) external {
//         require(msg.sender == owner, "Not owner");
//         gradesBonus = _gradesbonus;
//     }
//     function getUserArray() public view returns(address[] memory _userArray){
//         require(msg.sender == owner, "Not owner");
//         return usersArray;
//     }
//     function getUserCount() public view returns(uint256 _userCount){
//         require(msg.sender == owner, "Not owner");
//         return usersArray.length;
//     }

// }
