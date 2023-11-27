import React from 'react'
import metamaskIcon from './metamask.svg'

const ConnectToMetamask = ({ connectToMetamask }) => {
  return (
    <div className="container mt-5">
      <div className="card p-4 shadow text-center">
        <h1 className="display-4 mb-4">
          Welcome to CryptoClan NFT Marketplace
        </h1>
        <p className="lead">
          Explore, mint, and manage your unique Crypto Clan NFTs in our
          marketplace.
        </p>
        <hr className="my-4" />
        <div className='d-flex justify-content-center'>
          <button
            onClick={connectToMetamask}
            className="btn btn-primary d-flex align-items-center"
            style={{ fontSize: '1rem', letterSpacing: '0.1rem' }}
          >
            Connect with Metamask{' '}
            <img
              src={metamaskIcon}
              alt="metamask-icon"
              className="ml-2"
              style={{ width: '2rem' }}
            />
          </button>
        </div>
      </div>
    </div>
  )
}

export default ConnectToMetamask
