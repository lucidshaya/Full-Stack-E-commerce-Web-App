import React from 'react';
import { assets } from '../assets/frontend_assets/assets';
import supportImg from '../assets/frontend_assets/support_img.png';
import qualityImg from '../assets/frontend_assets/quality_icon.png';

const OurPolicy = () => {
  const policies = [
    {
      icon: assets.exchange_icon,
      title: 'Easy Exchange Policy',
      description: 'We offer a hassle-free exchange policy for your convenience.',
    },
    {
      icon: qualityImg,
      title: 'Quality Assurance',
      description: 'We ensure top-notch quality for all our products.',
    },
    {
      icon: supportImg,
      title: 'Customer Support',
      description: 'Our support team is here to assist you 24/7.',
    },
  ];

  return (
    <div className="flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 text-xs sm:text-sm md:text-base text-gray-700">
      {policies.map((policy, index) => (
        <div key={index}>
          <img src={policy.icon} className="w-12 m-auto mb-5" alt={policy.title} />
          <p className="font-semibold">{policy.title}</p>
          <p className="text-gray-400">{policy.description}</p>
        </div>
      ))}
    </div>
  );
};

export default OurPolicy;