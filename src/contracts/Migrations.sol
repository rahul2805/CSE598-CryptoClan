// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <0.8.0;

// Migrations contract to manage upgrade procedures
contract Migrations {
  // Address of the owner of the contract
  address public owner;
  // Last completed migration step
  uint public lastCompletedMigration;

  // Constructor sets the contract owner to the message sender
  constructor() {
    owner = msg.sender;
  }

  // Modifier to restrict access to the owner
  modifier restricted() {
    if (msg.sender == owner) _;
  }

  // Set the last completed migration step, restricted to the owner
  function setCompleted(uint completed) public restricted {
    lastCompletedMigration = completed;
  }

  // Upgrade the contract to a new address, restricted to the owner
  function upgrade(address newAddress) public restricted {
    // Create a new instance of the Migrations contract at the new address
    Migrations upgraded = Migrations(newAddress);
    // Set the last completed migration step in the upgraded contract
    upgraded.setCompleted(lastCompletedMigration);
  }
}
