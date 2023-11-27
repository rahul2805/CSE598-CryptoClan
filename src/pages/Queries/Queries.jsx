import React, { useState } from 'react';

const Queries = (props) => {
  const [tokenIdForOwner, setTokenIdForOwner] = useState('');
  const [tokenOwner, setTokenOwner] = useState('');
  const [tokenIdForOwnerNotFound, setTokenIdForOwnerNotFound] = useState(false);

  const [tokenIdForMetadata, setTokenIdForMetadata] = useState('');
  const [tokenMetadata, setTokenMetadata] = useState('');
  const [tokenMetadataLink, setTokenMetadataLink] = useState('');
  const [tokenIdForMetadataNotFound, setTokenIdForMetadataNotFound] = useState(
    false
  );

  const fetchTokenOwner = async (e) => {
    e.preventDefault();
    setTokenIdForOwnerNotFound(false);
    setTokenOwner('');
    setTokenIdForOwner('');

    try {
      const owner = await props.cryptoClansContract.methods
        .getTokenOwner(tokenIdForOwner)
        .call();
      setTokenOwner(owner);
      setTimeout(() => {
        setTokenOwner('');
        setTokenIdForOwner('');
      }, 5000);
    } catch (e) {
      setTokenIdForOwnerNotFound(true);
      setTimeout(() => {
        setTokenIdForOwnerNotFound(false);
      }, 3000);
      setTokenIdForOwner('');
    }
  };

  const fetchTokenMetadata = async (e) => {
    e.preventDefault();
    setTokenIdForMetadataNotFound(false);
    setTokenMetadata('');
    setTokenIdForMetadata('');

    try {
      const metadata = await props.cryptoClansContract.methods
        .getTokenMetaData(tokenIdForMetadata)
        .call();
      setTokenMetadata(
        metadata.substr(0, 60) + '...' + metadata.slice(metadata.length - 5)
      );
      setTokenMetadataLink(metadata);
      setTimeout(() => {
        setTokenMetadata('');
        setTokenIdForMetadata('');
      }, 5000);
    } catch (e) {
      setTokenIdForMetadataNotFound(true);
      setTimeout(() => {
        setTokenIdForMetadataNotFound(false);
      }, 3000);
      setTokenIdForMetadata('');
    }
  };

  return (
    <div className="container mt-5">
      <div className="card mb-3">
        <div className="card-body text-center">
          <h5 className="card-title">NFT Queries</h5>
        </div>
      </div>
      <div className="row">
        {/* Get Token Owner Section */}
        <div className="col-md-6">
          <div className="card mb-3">
            <div className="card-body">
              <h5 className="card-title text-center mb-4">Get Token Owner</h5>
              <form onSubmit={fetchTokenOwner}>
                <div className="mb-3">
                  <input
                    required
                    type="text"
                    className="form-control"
                    value={tokenIdForOwner}
                    placeholder="Enter Token Id"
                    onChange={(e) => setTokenIdForOwner(e.target.value)}
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100">
                  Get Owner
                </button>
              </form>
            </div>
          </div>
          {tokenOwner && (
            <div className="alert alert-success mt-3" role="alert">
              <strong>Token Owner: </strong>
              {tokenOwner}
            </div>
          )}

          {tokenIdForOwnerNotFound && (
            <div className="alert alert-danger mt-3" role="alert">
              <strong>Non-Existent Token Id</strong>
            </div>
          )}
        </div>

        {/* Get Token Metadata Section */}
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title text-center mb-4">Get Token Metadata</h5>
              <form onSubmit={fetchTokenMetadata}>
                <div className="mb-3">
                  <input
                    required
                    type="text"
                    className="form-control"
                    value={tokenIdForMetadata}
                    placeholder="Enter Token Id"
                    onChange={(e) => setTokenIdForMetadata(e.target.value)}
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100">
                  Get Metadata
                </button>
              </form>
            </div>
          </div>
          {tokenMetadata && (
            <div className="alert alert-success mt-3" role="alert">
              <strong>Token Metadata: </strong>
              <a
                href={tokenMetadataLink}
                target="_blank"
                rel="noopener noreferrer"
                className="d-block"
                style={{ wordBreak: 'break-all' }}
              >
                {tokenMetadata}
              </a>
            </div>
          )}

          {tokenIdForMetadataNotFound && (
            <div className="alert alert-danger mt-3" role="alert">
              <strong>Non-Existent Token Id</strong>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Queries;
