pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract SampleNFT is ERC721URIStorage {
    constructor() ERC721("MyNFT", "MNFT") {}

    function mint(
        address _to,
        uint _tokenId,
        string calldata _uri
    ) external {
        _mint(_to, _tokenId);
        _setTokenURI(_tokenId, _uri);
    }
}
