import { ScrollViewStyleReset } from 'expo-router/html';

const svgFavicon = `
<svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 128 128" fill="none">
  <defs>
    <linearGradient id="linkA" x1="14" y1="108" x2="96" y2="18" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#07142E"/>
      <stop offset="0.45" stop-color="#0D4E93"/>
      <stop offset="1" stop-color="#1BBEFF"/>
    </linearGradient>
    <linearGradient id="linkB" x1="44" y1="42" x2="116" y2="116" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#1BBEFF"/>
      <stop offset="1" stop-color="#7BD9FF"/>
    </linearGradient>
  </defs>
  <rect x="16" y="16" width="68" height="68" rx="18" stroke="url(#linkA)" stroke-width="14"/>
  <rect x="44" y="44" width="68" height="68" rx="18" stroke="url(#linkB)" stroke-width="14"/>
</svg>
`;

export default function Root({ children }: { children: React.ReactNode }) {
  const faviconHref = `data:image/svg+xml,${encodeURIComponent(svgFavicon)}`;

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <title>Cross Bits</title>
        <meta
          name="description"
          content="Cross Bits UI components for React Native with polished web support."
        />
        <meta name="theme-color" content="#020916" />
        <ScrollViewStyleReset />
        <link rel="icon" type="image/svg+xml" href={faviconHref} />
      </head>
      <body>{children}</body>
    </html>
  );
}
