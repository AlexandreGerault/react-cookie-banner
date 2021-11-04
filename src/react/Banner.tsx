import { useEffect, useState } from 'react';

function Banner() {
  const [showBanner, setShowBanner] = useState(false);
  useEffect(() => {
    const allcookies = document.cookie.split('; ');

    console.log('Cookies', allcookies);
  }, []);

  if (showBanner) {
    return <p>SHOW</p>;
  }

  return <p>Not show</p>;
}

export { Banner };
