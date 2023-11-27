import React, { useState, useEffect } from "react";
import CryptoClanNFTImage from "../../components/CryptoClanNFTImage/CryptoClanNFTImage";
import CryptoClanNFTDetails from "../../components/CryptoClanNFTDetails/CryptoClanNFTDetails";
import Loading from "../../components/Loading/Loading";
import './Marketplace.css'; // Make sure to create this CSS file

const Marketplace = ({
  cryptoClans,
  accountAddress,
  totalTokensMinted,
  changeTokenPrice,
  toggleForSale,
  buyCryptoClan,
}) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(cryptoClans.length !== 0 && cryptoClans[0].metaData === undefined);
  }, [cryptoClans]);

  return (
    <div className="all-crypto-clans">
      <div className="total-minted-card">
        <h5>
          Total No. of CryptoClan NFTs Minted: {totalTokensMinted}
        </h5>
      </div>
      <div className="crypto-clans-grid">
        {cryptoClans.map((cryptoclan) => (
          <div key={cryptoclan.tokenId.toNumber()} className="crypto-clan-card">
            {loading ? (
              <Loading />
            ) : (
              <>
                <CryptoClanNFTImage
                  colors={cryptoclan.metaData && cryptoclan.metaData.metaData.colors ? cryptoclan.metaData.metaData.colors : ""}
                />
                <CryptoClanNFTDetails
                  cryptoclan={cryptoclan}
                  accountAddress={accountAddress}
                  changeTokenPrice={changeTokenPrice}
                  toggleForSale={toggleForSale}
                  buyCryptoClan={buyCryptoClan}
                />
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Marketplace;
