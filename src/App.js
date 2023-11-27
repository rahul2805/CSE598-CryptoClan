import React, { Component } from 'react'
import { HashRouter, Route } from 'react-router-dom'
import './App.css'
import Web3 from 'web3'
import CryptoClans from './abis/CryptoClans.json'

import Mint from './pages/Mint/Mint'
import Marketplace from './pages/Marketplace/Marketplace'
import Account from './pages/Account/Account'
import ContractNotDeployed from './components/ContractNotDeployed/ContractNotDeployed'
import ConnectToMetamask from './components/ConnectMetamask/ConnectToMetamask'
import Loading from './components/Loading/Loading'
import Navbar from './components/Navbar/Navbar'
import Tokens from './pages/Tokens/Tokens'
import Queries from './pages/Queries/Queries'
import Home from './pages/Home/Home'

const pinataSDK = require('@pinata/sdk')
const pinata = new pinataSDK(
  'e61202c79996b0df9750',
  'a66e2a15fbccbbe631c38aa7547f18c3a72ca1c7c3033f889159dfa7d19f5568'
)

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      accountAddress: '',
      accountBalance: '',
      cryptoClansContract: null,
      cryptoClansCount: 0,
      cryptoClans: [],
      loading: true,
      metamaskConnected: false,
      contractDetected: false,
      totalTokensMinted: 0,
      totalTokensOwnedByAccount: 0,
      nameIsUsed: false,
      colorIsUsed: false,
      colorsUsed: [],
      lastMintTime: null,
    }
  }

  componentWillMount = async () => {
    await this.loadWeb3()
    await this.loadBlockchainData()
    await this.setMetaData()
    await this.setMintBtnTimer()
  }

  setMintBtnTimer = () => {
    const mintBtn = document.getElementById('mintBtn')
    if (mintBtn !== undefined && mintBtn !== null) {
      this.setState({
        lastMintTime: localStorage.getItem(this.state.accountAddress),
      })
      this.state.lastMintTime === undefined || this.state.lastMintTime === null
        ? (mintBtn.innerHTML = 'Mint My CC NFT')
        : this.checkIfCanMint(parseInt(this.state.lastMintTime))
    }
  }

  checkIfCanMint = (lastMintTime) => {
    const mintBtn = document.getElementById('mintBtn')
    const timeGap = 300000 //5min in milliseconds
    const countDownTime = lastMintTime + timeGap
    const interval = setInterval(() => {
      const now = new Date().getTime()
      const diff = countDownTime - now
      if (diff < 0) {
        mintBtn.removeAttribute('disabled')
        mintBtn.innerHTML = 'Mint My CC NFT'
        localStorage.removeItem(this.state.accountAddress)
        clearInterval(interval)
      } else {
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((diff % (1000 * 60)) / 1000)
        mintBtn.setAttribute('disabled', true)
        mintBtn.innerHTML = `Next mint in ${minutes}m ${seconds}s`
      }
    }, 1000)
  }

  loadWeb3 = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    } else {
      window.alert(
        'Non-Ethereum browser detected. You should consider trying MetaMask!'
      )
    }
  }

  loadBlockchainData = async () => {
    const web3 = window.web3
    const accounts = await web3.eth.getAccounts()
    if (accounts.length === 0) {
      this.setState({ metamaskConnected: false })
    } else {
      this.setState({ metamaskConnected: true })
      this.setState({ loading: true })
      this.setState({ accountAddress: accounts[0] })
      let accountBalance = await web3.eth.getBalance(accounts[0])
      accountBalance = web3.utils.fromWei(accountBalance, 'Ether')
      this.setState({ accountBalance })
      this.setState({ loading: false })
      const networkId = await web3.eth.net.getId()
      const networkData = CryptoClans.networks[networkId]
      if (networkData) {
        this.setState({ loading: true })
        const cryptoClansContract = web3.eth.Contract(
          CryptoClans.abi,
          networkData.address
        )
        this.setState({ cryptoClansContract })
        this.setState({ contractDetected: true })
        const cryptoClansCount = await cryptoClansContract.methods
          .cryptoClanCounter()
          .call()
        this.setState({ cryptoClansCount })
        for (var i = 1; i <= cryptoClansCount; i++) {
          const cryptoClan = await cryptoClansContract.methods
            .allCryptoClans(i)
            .call()
          this.setState({
            cryptoClans: [...this.state.cryptoClans, cryptoClan],
          })
        }
        let totalTokensMinted = await cryptoClansContract.methods
          .getNumberOfTokensMinted()
          .call()
        totalTokensMinted = totalTokensMinted.toNumber()
        this.setState({ totalTokensMinted })
        let totalTokensOwnedByAccount = await cryptoClansContract.methods
          .getTotalNumberOfTokensOwnedByAnAddress(this.state.accountAddress)
          .call()
        totalTokensOwnedByAccount = totalTokensOwnedByAccount.toNumber()
        this.setState({ totalTokensOwnedByAccount })
        this.setState({ loading: false })
      } else {
        this.setState({ contractDetected: false })
      }
    }
  }

  connectToMetamask = async () => {
    await window.ethereum.enable()
    this.setState({ metamaskConnected: true })
    window.location.reload()
  }

  setMetaData = async () => {
    if (this.state.cryptoClans.length !== 0) {
      this.state.cryptoClans.map(async (cryptoclan) => {
        const result = await fetch(cryptoclan.tokenURI)
        const metaData = await result.json()
        this.setState({
          cryptoClans: this.state.cryptoClans.map((cryptoclan) =>
            cryptoclan.tokenId.toNumber() === Number(metaData.tokenId)
              ? {
                  ...cryptoclan,
                  metaData,
                }
              : cryptoclan
          ),
        })
      })
    }
  }

  mintMyNFT = async (colors, name, tokenPrice) => {
    this.setState({ loading: true })
    const colorsArray = Object.values(colors)
    let colorsUsed = []
    for (let i = 0; i < colorsArray.length; i++) {
      if (colorsArray[i] !== '') {
        let colorIsUsed = await this.state.cryptoClansContract.methods
          .colorExists(colorsArray[i])
          .call()
        if (colorIsUsed) {
          colorsUsed = [...colorsUsed, colorsArray[i]]
        } else {
          continue
        }
      }
    }
    const nameIsUsed = await this.state.cryptoClansContract.methods
      .tokenNameExists(name)
      .call()
    if (colorsUsed.length === 0 && !nameIsUsed) {
      const {
        cardBorderColor,
        cardBackgroundColor,
        headBorderColor,
        headBackgroundColor,
        leftEyeBorderColor,
        rightEyeBorderColor,
        leftEyeBackgroundColor,
        rightEyeBackgroundColor,
        leftPupilBackgroundColor,
        rightPupilBackgroundColor,
        mouthColor,
        neckBackgroundColor,
        neckBorderColor,
        bodyBackgroundColor,
        bodyBorderColor,
      } = colors
      let previousTokenId
      previousTokenId = await this.state.cryptoClansContract.methods
        .cryptoClanCounter()
        .call()
      previousTokenId = previousTokenId.toNumber()
      const tokenId = previousTokenId + 1
      const tokenObject = {
        tokenName: 'Crypto Clan',
        tokenSymbol: 'CB',
        tokenId: `${tokenId}`,
        name: name,
        metaData: {
          type: 'color',
          colors: {
            cardBorderColor,
            cardBackgroundColor,
            headBorderColor,
            headBackgroundColor,
            leftEyeBorderColor,
            rightEyeBorderColor,
            leftEyeBackgroundColor,
            rightEyeBackgroundColor,
            leftPupilBackgroundColor,
            rightPupilBackgroundColor,
            mouthColor,
            neckBackgroundColor,
            neckBorderColor,
            bodyBackgroundColor,
            bodyBorderColor,
          },
        },
      }
      const cid = await pinata.pinJSONToIPFS(tokenObject)
      let tokenURI = `https://gateway.pinata.cloud/ipfs/${cid.IpfsHash}`
      const price = window.web3.utils.toWei(tokenPrice.toString(), 'Ether')
      this.state.cryptoClansContract.methods
        .mintCryptoClan(name, tokenURI, price, colorsArray)
        .send({ from: this.state.accountAddress })
        .on('confirmation', () => {
          localStorage.setItem(this.state.accountAddress, new Date().getTime())
          this.setState({ loading: false })
          window.location.reload()
        })
    } else {
      if (nameIsUsed) {
        this.setState({ nameIsUsed: true })
        this.setState({ loading: false })
      } else if (colorsUsed.length !== 0) {
        this.setState({ colorIsUsed: true })
        this.setState({ colorsUsed })
        this.setState({ loading: false })
      }
    }
  }

  toggleForSale = (tokenId) => {
    this.setState({ loading: true })
    this.state.cryptoClansContract.methods
      .toggleForSale(tokenId)
      .send({ from: this.state.accountAddress })
      .on('confirmation', () => {
        this.setState({ loading: false })
        window.location.reload()
      })
  }

  changeTokenPrice = (tokenId, newPrice) => {
    this.setState({ loading: true })
    const newTokenPrice = window.web3.utils.toWei(newPrice, 'Ether')
    this.state.cryptoClansContract.methods
      .changeTokenPrice(tokenId, newTokenPrice)
      .send({ from: this.state.accountAddress })
      .on('confirmation', () => {
        this.setState({ loading: false })
        window.location.reload()
      })
  }

  buyCryptoClan = (tokenId, price) => {
    this.setState({ loading: true })
    this.state.cryptoClansContract.methods
      .buyToken(tokenId)
      .send({ from: this.state.accountAddress, value: price })
      .on('confirmation', () => {
        this.setState({ loading: false })
        window.location.reload()
      })
  }

  render() {
    return (
      <div className="container-fluid p-0">
        {!this.state.metamaskConnected ? (
          <ConnectToMetamask connectToMetamask={this.connectToMetamask} />
        ) : !this.state.contractDetected ? (
          <ContractNotDeployed />
        ) : this.state.loading ? (
          <Loading />
        ) : (
          <>
            <HashRouter basename="/">
              <Navbar />
              <Route path="/" exact render={() => <Home />} />
              <Route
                path="/mint"
                render={() => (
                  <Mint
                    mintMyNFT={this.mintMyNFT}
                    nameIsUsed={this.state.nameIsUsed}
                    colorIsUsed={this.state.colorIsUsed}
                    colorsUsed={this.state.colorsUsed}
                    setMintBtnTimer={this.setMintBtnTimer}
                  />
                )}
              />
              <Route
                path="/marketplace"
                render={() => (
                  <Marketplace
                    accountAddress={this.state.accountAddress}
                    cryptoClans={this.state.cryptoClans}
                    totalTokensMinted={this.state.totalTokensMinted}
                    changeTokenPrice={this.changeTokenPrice}
                    toggleForSale={this.toggleForSale}
                    buyCryptoClan={this.buyCryptoClan}
                  />
                )}
              />
              <Route
                path="/my-tokens"
                render={() => (
                  <Tokens
                    accountAddress={this.state.accountAddress}
                    cryptoClans={this.state.cryptoClans}
                    totalTokensOwnedByAccount={
                      this.state.totalTokensOwnedByAccount
                    }
                  />
                )}
              />
              <Route
                path="/queries"
                render={() => (
                  <Queries cryptoClansContract={this.state.cryptoClansContract} />
                )}
              />
              <Route
                path="/account"
                render={() => (
                  <Account
                    accountAddress={this.state.accountAddress}
                    accountBalance={this.state.accountBalance}
                  />
                )}
              />
            </HashRouter>
          </>
        )}
      </div>
    )
  }
}

export default App
