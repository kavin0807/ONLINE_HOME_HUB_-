import React from 'react';

const brands = [
  { name: 'Apple', logo: 'https://example.com/apple-logo.png' },
  { name: 'Google', logo: 'https://example.com/google-logo.png' },
  { name: 'Microsoft', logo: 'https://example.com/microsoft-logo.png' },
];

const YourComponent = () => {
  const [selectedBrand, setSelectedBrand] = React.useState('');

  return (
    <div>
      <div className="brand-icons">
        {brands.map((brand, idx) => (
          <div
            key={brand.name}
            className={`brand-icon${selectedBrand === brand.name ? ' selected' : ''}`}
            onClick={() => setSelectedBrand(brand.name)}
          >
            <img src={brand.logo} alt={brand.name} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default YourComponent;