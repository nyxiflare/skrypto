
import React from 'react';

const MarketplaceHeader = () => {
  return (
    <div className="mb-12 text-center md:text-left">
      <h1 className="text-3xl md:text-5xl font-bold mb-4">
        <span className="text-gradient-purple">Marketplace</span>
      </h1>
      <p className="text-lg text-white/70 max-w-2xl md:mx-0 mx-auto">
        Browse anonymous crypto gigs with no KYC requirements. Find skills or post your own and get paid in your preferred token.
      </p>
    </div>
  );
};

export default MarketplaceHeader;
