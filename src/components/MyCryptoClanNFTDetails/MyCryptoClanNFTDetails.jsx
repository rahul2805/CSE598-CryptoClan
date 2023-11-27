import React from "react";
import './MyCryptoClanNFTDetails.css'; // Make sure to include the CSS file

const CryptoClanNFTDetails = (props) => {
  const {
    tokenId: id,
    tokenName: name,
    price: nftPrice,
    mintedBy: minter,
    previousOwner: prevOwner,
    numberOfTransfers: transferCount,
  } = props.cryptoclan;

  return (
    <div className="nft-detail-card">
      <p className="detail"><span className="detail-title">Token Id:</span> {id.toNumber()}</p>
      <p className="detail"><span className="detail-title">Name:</span> {name}</p>
      <p className="detail"><span className="detail-title">Price:</span> {window.web3.utils.fromWei(nftPrice.toString(), "Ether")} Ξ</p>
      <p className="detail"><span className="detail-title">No. of Transfers:</span> {transferCount.toNumber()}</p>
      <div className={`status-alert ${props.accountAddress === minter && props.accountAddress !== prevOwner ? 'minted' : 'bought'}`}>
        {props.accountAddress === minter && props.accountAddress !== prevOwner ? 'Minted' : 'Bought'}
      </div>
    </div>
  );
};

export default CryptoClanNFTDetails;
