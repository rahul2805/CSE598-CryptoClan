import React from "react";
import styles from './CryptoClanNFTImage.module.css';

const CryptoClanNFTImage = ({ colors, shouldRotateHead, shouldRotateLeftEye, shouldRotateRightEye, shouldRotatePupils, shouldRotateMouth }) => {
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
  } = colors;

  return (
    <div className={styles.cryptoclanCard} style={{ backgroundColor: cardBackgroundColor, borderColor: cardBorderColor }}>
      <div className={`${styles.head} ${shouldRotateHead ? styles.headRotate : ''}`} style={{ backgroundColor: headBackgroundColor, borderColor: headBorderColor }}>
        <div className={`${styles.eyeLeft} ${shouldRotateLeftEye ? styles.eyeLeftRotate : ''}`} style={{ backgroundColor: leftEyeBackgroundColor, borderColor: leftEyeBorderColor }}>
          <div className={`${styles.pupil} ${shouldRotatePupils ? styles.pupilRotate : ''}`} style={{ backgroundColor: leftPupilBackgroundColor }}></div>
        </div>
        <div className={`${styles.eyeRight} ${shouldRotateRightEye ? styles.eyeRightRotate : ''}`} style={{ backgroundColor: rightEyeBackgroundColor, borderColor: rightEyeBorderColor }}>
          <div className={`${styles.pupil} ${shouldRotatePupils ? styles.pupilRotate : ''}`} style={{ backgroundColor: rightPupilBackgroundColor }}></div>
        </div>
        <div className={`${styles.mouth} ${shouldRotateMouth ? styles.mouthRotate : ''}`} style={{ borderBottomColor: mouthColor }}></div>
      </div>
    </div>
  );
};

export default CryptoClanNFTImage;
