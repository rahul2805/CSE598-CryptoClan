// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <0.8.0;
pragma abicoder v2;

import "./ERC721.sol";

contract CryptoClans is ERC721 {

  string public collectionName;
  string public collectionNameSymbol;
  uint256 public cryptoClanCounter;

  struct CryptoClan {
    uint256 tokenId;
    string tokenName;
    string tokenURI;
    address payable mintedBy;
    address payable currentOwner;
    address payable previousOwner;
    uint256 price;
    uint256 numberOfTransfers;
    bool forSale;
  }

  mapping(uint256 => CryptoClan) public allCryptoClans;
  mapping(string => bool) public tokenNameExists;
  mapping(string => bool) public colorExists;
  mapping(string => bool) public tokenURIExists;

  constructor() ERC721("Crypto Clans Collection", "CC") {
    collectionName = name();
    collectionNameSymbol = symbol();
  }

  function mintCryptoClan(string memory _name, string memory _tokenURI, uint256 _price, string[] calldata _colors) external {
    require(msg.sender != address(0));
    cryptoClanCounter ++;
    require(!_exists(cryptoClanCounter));

    for(uint i=0; i<_colors.length; i++) {
      require(!colorExists[_colors[i]]);
    }
    require(!tokenURIExists[_tokenURI]);
    require(!tokenNameExists[_name]);

    _mint(msg.sender, cryptoClanCounter);
    _setTokenURI(cryptoClanCounter, _tokenURI);

    for (uint i=0; i<_colors.length; i++) {
      colorExists[_colors[i]] = true;
    }
    tokenURIExists[_tokenURI] = true;
    tokenNameExists[_name] = true;

    CryptoClan memory newCryptoClan = CryptoClan(
      cryptoClanCounter,
      _name,
      _tokenURI,
      msg.sender,
      msg.sender,
      address(0),
      _price,
      0,
      true
    );
    allCryptoClans[cryptoClanCounter] = newCryptoClan;
  }

  function getTokenOwner(uint256 _tokenId) public view returns(address) {
    return ownerOf(_tokenId);
  }

  function getTokenMetaData(uint _tokenId) public view returns(string memory) {
    return tokenURI(_tokenId);
  }

  function getNumberOfTokensMinted() public view returns(uint256) {
    return totalSupply();
  }

  function getTotalNumberOfTokensOwnedByAnAddress(address _owner) public view returns(uint256) {
    return balanceOf(_owner);
  }

  function getTokenExists(uint256 _tokenId) public view returns(bool) {
    return _exists(_tokenId);
  }

  function buyToken(uint256 _tokenId) public payable {
    require(msg.sender != address(0));
    require(_exists(_tokenId));
    address tokenOwner = ownerOf(_tokenId);
    require(tokenOwner != address(0));
    require(tokenOwner != msg.sender);
    CryptoClan memory cryptoClan = allCryptoClans[_tokenId];
    require(msg.value >= cryptoClan.price);
    require(cryptoClan.forSale);
    _transfer(tokenOwner, msg.sender, _tokenId);
    address payable sendTo = cryptoClan.currentOwner;
    sendTo.transfer(msg.value);
    cryptoClan.previousOwner = cryptoClan.currentOwner;
    cryptoClan.currentOwner = msg.sender;
    cryptoClan.numberOfTransfers += 1;
    allCryptoClans[_tokenId] = cryptoClan;
  }

  function changeTokenPrice(uint256 _tokenId, uint256 _newPrice) public {
    require(msg.sender != address(0));
    require(_exists(_tokenId));
    address tokenOwner = ownerOf(_tokenId);
    require(tokenOwner == msg.sender);
    CryptoClan memory cryptoClan = allCryptoClans[_tokenId];
    cryptoClan.price = _newPrice;
    allCryptoClans[_tokenId] = cryptoClan;
  }

  function toggleForSale(uint256 _tokenId) public {
    require(msg.sender != address(0));
    require(_exists(_tokenId));
    address tokenOwner = ownerOf(_tokenId);
    require(tokenOwner == msg.sender);
    CryptoClan memory cryptoClan = allCryptoClans[_tokenId];
    cryptoClan.forSale = !cryptoClan.forSale;
    allCryptoClans[_tokenId] = cryptoClan;
  }
}
