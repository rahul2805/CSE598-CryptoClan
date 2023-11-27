import React from 'react';
import userImage from './user.png';

const Account = ({ accountAddress, accountBalance }) => {
  return (
    <div className="jumbotron p-5">
      <div className="row align-items-center">
        <div className="col-md-4 text-center">
          {/* Adjust the max-width and border-radius for the user image */}
          <img
            src={userImage}
            alt="user"
            className="img-fluid rounded-circle"
            style={{ maxWidth: '50%', height: 'auto' }}
          />
        </div>
        <div className="col-md-8">
          <h1 className="display-5">Your Account</h1>
          <hr className="my-4" />
          <p className="lead">Account address :</p>
          <h4>{accountAddress}</h4>
          <p className="lead">Account balance :</p>
          <h4>{accountBalance} Ξ</h4>
        </div>
      </div>
    </div>
  );
};

export default Account;
