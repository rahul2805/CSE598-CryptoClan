import React from "react";

const ContractNotDeployed = () => {
  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-body">
          <h3 className="card-title text-danger">Crypto Clan Contract Not Deployed</h3>
          <hr />
          <p className="card-text">
            The Crypto Clan contract is not deployed to this network.
          </p>
          <p className="card-text">
            Please connect Metamask to Kovan Testnet or use Localhost 7545 running
            a custom RPC like Ganache.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContractNotDeployed;
