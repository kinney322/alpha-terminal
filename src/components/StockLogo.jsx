import React from 'react';

const LOGO_PALETTES = [
  ['#276749', '#c6f6d5'],
  ['#2c5282', '#bee3f8'],
  ['#744210', '#fefcbf'],
  ['#702459', '#fed7e2'],
  ['#44337a', '#e9d8fd'],
  ['#7b341e', '#feebc8'],
  ['#234e52', '#b2f5ea'],
  ['#742a2a', '#fed7d7']
];

const REVERSED_LOGO_RULES = {
  DDOG: {
    background: '#632CA6'
  }
};

const hashTicker = (ticker) => {
  const text = String(ticker || 'NA').trim().toUpperCase();
  let hash = 0;
  for (let i = 0; i < text.length; i += 1) {
    hash = (hash * 31 + text.charCodeAt(i)) % 9973;
  }
  return hash;
};

export default function StockLogo({ ticker, companyName, logoUrl, size = 'side', className = '' }) {
  const normalizedTicker = String(ticker || '').trim().toUpperCase() || 'NA';
  const [imageFailed, setImageFailed] = React.useState(false);
  const resolvedLogoUrl = logoUrl || '';
  const canUseImage = Boolean(resolvedLogoUrl && !imageFailed);
  const reversedLogoRule = REVERSED_LOGO_RULES[normalizedTicker];
  const usesBrandContainer = Boolean(canUseImage && reversedLogoRule);
  const palette = LOGO_PALETTES[hashTicker(normalizedTicker) % LOGO_PALETTES.length];
  const label = normalizedTicker.slice(0, 4);

  return (
    <div
      className={[
        'stock-logo',
        `stock-logo--${size}`,
        canUseImage ? 'has-logo' : 'has-generated-logo',
        usesBrandContainer ? 'has-brand-container' : '',
        className
      ].filter(Boolean).join(' ')}
      style={{
        '--stock-logo-bg': palette[0],
        '--stock-logo-fg': palette[1],
        '--stock-logo-brand-bg': reversedLogoRule?.background || 'transparent'
      }}
      aria-label={`${companyName || normalizedTicker} logo`}
    >
      {canUseImage && (
        <img
          src={resolvedLogoUrl}
          alt=""
          aria-hidden="true"
          onError={() => setImageFailed(true)}
        />
      )}
      <span>{label}</span>
    </div>
  );
}
