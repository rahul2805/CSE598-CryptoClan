import React, { useState, useEffect } from 'react';
import CryptoClanNFTImage from '../../components/CryptoClanNFTImage/CryptoClanNFTImage';

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

const Mint = ({
  setMintBtnTimer,
  mintMyNFT,
  nameIsUsed,
  colorIsUsed,
  colorsUsed,
}) => {
  const [userColors, setUserColors] = useState({
    cardBorderColor: getRandomColor(),
    cardBackgroundColor: getRandomColor(),
    headBorderColor: getRandomColor(),
    headBackgroundColor: getRandomColor(),
    leftEyeBorderColor: getRandomColor(),
    rightEyeBorderColor: getRandomColor(),
    leftEyeBackgroundColor: getRandomColor(),
    rightEyeBackgroundColor: getRandomColor(),
    leftPupilBackgroundColor: getRandomColor(),
    rightPupilBackgroundColor: getRandomColor(),
    mouthColor: getRandomColor(),
  });

  const [cryptoClanName, setCryptoClanName] = useState('');
  const [cryptoClanPrice, setCryptoClanPrice] = useState('');

  const handleColorChange = (colorType, colorValue) => {
    setUserColors({
      ...userColors,
      [colorType]: colorValue,
    });
  };

  const renderColorInput = (colorType, label) => {
    return (
      <div className="form-group">
        <label htmlFor={colorType}>{label}</label>
        <input
          required
          type="color"
          name={colorType}
          id={colorType}
          value={userColors[colorType]}
          className="form-control bg-dark"
          onChange={(e) => handleColorChange(colorType, e.target.value)}
        />
      </div>
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mintMyNFT(userColors, cryptoClanName, cryptoClanPrice);
  };

  useEffect(() => {
    setMintBtnTimer();
  }, [setMintBtnTimer]);

  return (
    <div className="p-5">
      <div className="mt-4">
        {nameIsUsed ? (
          <div className="alert alert-danger alert-dissmissible">
            <strong>This name is taken!</strong>
          </div>
        ) : colorIsUsed ? (
          <div className="alert alert-danger alert-dissmissible">
            {colorsUsed.length > 1 ? (
              <strong>These colors are taken!</strong>
            ) : (
              <strong>This color is taken!</strong>
            )}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                marginTop: '1rem',
                marginBottom: '1rem',
              }}
            >
              {colorsUsed.map((color, index) => (
                <div
                  key={index}
                  style={{
                    background: `${color}`,
                    width: '50%',
                    height: '50px',
                    margin: '0.25rem',
                  }}
                ></div>
              ))}
            </div>
          </div>
        ) : null}
      </div>

      <form onSubmit={handleSubmit} className="mt-1">
        <div className="d-flex justify-content-center align-items-center flex-column gap-2 p-4">
          <CryptoClanNFTImage colors={userColors} />
          <div className="mt-4" style={{ width: '300px' }}>
            <div className="form-group">
              <label htmlFor="cryptoClanName">Name</label>
              <input
                required
                type="text"
                value={cryptoClanName}
                className="form-control"
                placeholder="Enter Your Crypto Clan NFT's Name"
                onChange={(e) => setCryptoClanName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="cryptoClanPrice">Price</label>
              <input
                required
                type="number"
                name="cryptoClanPrice"
                id="cryptoClanPrice"
                value={cryptoClanPrice}
                className="form-control"
                placeholder="Enter Price In Ξ"
                onChange={(e) => setCryptoClanPrice(e.target.value)}
              />
            </div>
          </div>

          <button
            id="mintBtn"
            style={{ fontSize: '0.9rem', letterSpacing: '0.14rem' }}
            type="submit"
            className="btn mt-4 btn-block btn-outline-primary"
          >
            Mint My CC NFT
          </button>
        </div>

        <div className="row">
          <div className="col-md-4">
            {renderColorInput('cardBorderColor', 'Card Border Color')}
            {renderColorInput('cardBackgroundColor', 'Card Background Color')}
            {renderColorInput('headBorderColor', 'Head Border Color')}
            {renderColorInput('headBackgroundColor', 'Head Background Color')}
          </div>
          <div className="col-md-4">
            {renderColorInput('leftEyeBorderColor', 'Left Eye Border Color')}
            {renderColorInput('rightEyeBorderColor', 'Right Eye Border Color')}
            {renderColorInput(
              'leftEyeBackgroundColor',
              'Left Eye Background Color'
            )}
            {renderColorInput(
              'rightEyeBackgroundColor',
              'Right Eye Background Color'
            )}
          </div>
          <div className="col-md-4">
            {renderColorInput(
              'leftPupilBackgroundColor',
              'Left Pupil Background Color'
            )}
            {renderColorInput(
              'rightPupilBackgroundColor',
              'Right Pupil Background Color'
            )}
            {renderColorInput('mouthColor', 'Mouth Color')}
          </div>
        </div>
      </form>
    </div>
  );
};

export default Mint;
