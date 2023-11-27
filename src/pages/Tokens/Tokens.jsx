import React, { useState, useEffect } from "react";
import CryptoClanNFTImage from "../../components/CryptoClanNFTImage/CryptoClanNFTImage";
import MyCryptoClanNFTDetails from "../../components/MyCryptoClanNFTDetails/MyCryptoClanNFTDetails";
import Loading from "../../components/Loading/Loading";
import './Tokens.css';

const Tokens = ({
  accountAddress: userAddress,
  cryptoClans: allCryptoClans,
  totalTokensOwnedByAccount: totalOwnedTokens,
}) => {
  const [loadingState, setLoadingState] = useState(false);
  const [userCryptoClans, setUserCryptoClans] = useState([]);

  useEffect(() => {
    setLoadingState(allCryptoClans.length !== 0 && allCryptoClans[0].metaData === undefined);
    const userCryptoCollection = allCryptoClans.filter(
      (cryptoclan) => cryptoclan.currentOwner === userAddress
    );
    setUserCryptoClans(userCryptoCollection);
  }, [allCryptoClans, userAddress]);

  return (
    <div className="user-crypto-collection">
      <div className="total-owned-card">
        <h5>Total No. of CryptoClan NFTs You Own: {totalOwnedTokens}</h5>
      </div>
      <div className="crypto-collection-grid">
        {userCryptoClans.map((cryptoclan) => (
          <div key={cryptoclan.tokenId.toNumber()} className="crypto-clan-card">
            <div className="crypto-clan-card-body">
              {!loadingState ? (
                <CryptoClanNFTImage
                  colors={cryptoclan.metaData && cryptoclan.metaData.metaData ? cryptoclan.metaData.metaData.colors : ""}
                />
              ) : (
                <Loading />
              )}
              <MyCryptoClanNFTDetails
                cryptoclan={cryptoclan}
                accountAddress={userAddress}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tokens;
