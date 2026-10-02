
export function BrandMark({ size = 40 }) {
  return (
    <svg viewBox="0 0 60 72" width={size} height={(size * 72) / 60} aria-hidden="true">
      <path d="M30 2C30 2 4 30 4 48a26 26 0 0 0 52 0C56 30 30 2 30 2Z" fill="#14206B" />
      <path
        d="M30 2C30 2 4 30 4 48a26 26 0 0 0 52 0C56 30 30 2 30 2Z"
        fill="none"
        stroke="#F5B800"
        strokeWidth="3"
      />
      <text
        x="30"
        y="52"
        textAnchor="middle"
        fontFamily="Playfair Display,Georgia,serif"
        fontStyle="italic"
        fontWeight="700"
        fontSize="22"
        fill="#fff"
      >
        Rar
      </text>
    </svg>
  );
}

export function CartIcon({ size = 22 }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
      <path d="M3 6h18" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  );
}

export function WhatsAppIcon({ size = 28 }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M21 11.5a8.5 8.5 0 0 1-12.6 7.4L3 20.5l1.7-5A8.5 8.5 0 1 1 21 11.5z" />
      <path
        d="M9 9c.3 2.5 2.5 4.700 5.500 5.500l1.300-1.300-2-1-1 .8c-.9-.4-1.700-1.200-2.100-2.100l.8-1-1-2z"
        fill="currentColor"
        stroke="none"
      />
    </svg>
  );
}

const SOCIAL_PATHS = {
  facebook: <path d="M14 8h3V4h-3a4 4 0 0 0-4 4v2H7v4h3v8h4v-8h3l1-4h-4V8z" />,
  instagram: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.500" cy="6.500" r="1" fill="currentColor" />
    </>
  ),
  x: <path d="M4 4l16 16M20 4 4 20" />,
  tiktok: (
    <>
      <path d="M14 3v11.500a3.500 3.500 0 1 1-3.500-3.500" />
      <path d="M14 3c.5 3 2.500 4.500 5 4.500" />
    </>
  ),
  youtube: (
    <>
      <rect x="2" y="5" width="20" height="14" rx="4" />
      <path d="m10 9 5 3-5 3z" fill="currentColor" />
    </>
  ),
};

export function SocialLinks({ socials, className = '' }) {
  return (
    <div className={'socials ' + className}>
      {Object.entries(socials || {}).filter(([, url]) => url).map(([name, url]) => (
        <a key={name} href={url} target="_blank" rel="noopener" aria-label={name}>
          <svg
            viewBox="0 0 24 24"
            width="20"
            height="20"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            {SOCIAL_PATHS[name]}
          </svg>
        </a>
      ))}
    </div>
  );
}
