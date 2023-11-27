import React, { Component } from "react";
import './CryptoClanNFTDetails.css'; // Make sure this CSS file exists and has the styles as described earlier

class CryptoClanNFTDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newCryptoClanPrice: "",
    };
  }

  callChangeTokenPriceFromApp = (tokenId, newPrice) => {
    this.props.changeTokenPrice(tokenId, newPrice);
  };

  render() {
    const { cryptoclan, accountAddress, changeTokenPrice, toggleForSale, buyCryptoClan } = this.props;
    const { newCryptoClanPrice } = this.state;

    return (
      <div className="crypto-clan-card">
        <div className="card-info">
          <p><span className="info-title">Token Id:</span> {cryptoclan.tokenId.toNumber()}</p>
          <p><span className="info-title">Name:</span> {cryptoclan.tokenName}</p>
          <p><span className="info-title">Minted By:</span> {`${cryptoclan.mintedBy.substr(0, 5)}...${cryptoclan.mintedBy.slice(-5)}`}</p>
          <p><span className="info-title">Owned By:</span> {`${cryptoclan.currentOwner.substr(0, 5)}...${cryptoclan.currentOwner.slice(-5)}`}</p>
          <p><span className="info-title">Previous Owner:</span> {`${cryptoclan.previousOwner.substr(0, 5)}...${cryptoclan.previousOwner.slice(-5)}`}</p>
          <p><span className="info-title">Price:</span> {window.web3.utils.fromWei(cryptoclan.price.toString(), "Ether")} Ξ</p>
          <p><span className="info-title">No. of Transfers:</span> {cryptoclan.numberOfTransfers.toNumber()}</p>
        </div>
        {accountAddress === cryptoclan.currentOwner && (
          <div className="card-actions">
            <form onSubmit={(event) => {
              event.preventDefault();
              this.callChangeTokenPriceFromApp(cryptoclan.tokenId.toNumber(), newCryptoClanPrice);
            }}>
              <div className="form-group">
                <input
                  required
                  type="text"
                  placeholder="New price in Ξ"
                  value={newCryptoClanPrice}
                  onChange={(e) => this.setState({ newCryptoClanPrice: e.target.value })}
                  className="price-input"
                />
                <button type="submit" className="action-btn change-price">Change Price</button>
              </div>
            </form>
            <button
              className={`action-btn ${cryptoclan.forSale ? 'remove-sale' : 'put-sale'}`}
              onClick={() => toggleForSale(cryptoclan.tokenId.toNumber())}
            >
              {cryptoclan.forSale ? 'Remove from Sale' : 'Put for Sale'}
            </button>
          </div>
        )}
        {accountAddress !== cryptoclan.currentOwner && cryptoclan.forSale && (
          <button
            className="action-btn buy"
            onClick={() => buyCryptoClan(cryptoclan.tokenId.toNumber(), cryptoclan.price)}
          >
            Buy for {window.web3.utils.fromWei(cryptoclan.price.toString(), "Ether")} Ξ
          </button>
        )}
      </div>
    );
  }
}

export default CryptoClanNFTDetails;
