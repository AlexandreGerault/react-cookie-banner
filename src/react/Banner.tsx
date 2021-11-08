import { useEffect, useState } from 'react';
import { MyCookieBanner } from './MyCookieBanner';

function Banner() {
  const [showBanner, setShowBanner] = useState(false);
  const [options, setOptions] = useState(MyCookieBanner.options());

  useEffect(() => {
    const { accepted } = window.localStorage;

    if (!accepted) {
      setShowBanner(true);
    }
  }, []);

  if (showBanner) {
    return (
      <ul>
        {options.map((option) => (
          <li
            key={option.name()}
            onClick={() => {
              setOptions((options) => {
                let newOption = option.clone();

                if (!option.isValidated()) newOption.validate();
                else newOption.unvalidate();

                return options.map((o) => (o.name() === option.name() ? newOption : o));
              });
            }}>
            {option.name()} - {option.isValidated() ? 'Validated' : 'Not validated'}
          </li>
        ))}
      </ul>
    );
  }

  return <p>Not show</p>;
}

export { Banner };
