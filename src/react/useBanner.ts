import { useEffect, useState } from 'react';
import { CookieBanner } from '../domain/CookieBanner';
import { CookieOption } from '../domain/CookieOption';

interface Props {
  defaultCookie: CookieBanner;
}

interface PersistedOption {
  name: string;
  accepted: boolean;
}

const COOKIE_OPTION_COOKIE_NAME = 'cookie-choices';

function getCookieValue(name: string) {
  const cookies = document.cookie.split('; ');

  const cookie = cookies.find((str) => str.startsWith(`${name}=`));
  return cookie?.split('=')[1];
}

function writeCookie(name: string, value: string, expireAt: Date) {
  document.cookie = `${name}=${value}; expires=${expireAt.toUTCString()}`;
}

function syncOptionToPersistedOption(
  option: CookieOption,
  persistedOption: PersistedOption,
) {
  const newOption = option.clone();

  if (persistedOption?.accepted) {
    newOption.validate();
  }

  return newOption;
}

function syncAllOptionsToPersistedOptions(
  options: CookieOption[],
  persistedOptions: PersistedOption[],
) {
  return options.map((option) => {
    const persistedOption = persistedOptions.find((o) => o.name === option.name());
    return syncOptionToPersistedOption(option, persistedOption!);
  });
}

export default function useBanner({ defaultCookie }: Props) {
  const [showBanner, setShowBanner] = useState(false);
  const [options, setOptions] = useState(defaultCookie.options());

  useEffect(() => {
    const bannerCookieInformation = getCookieValue(COOKIE_OPTION_COOKIE_NAME);
    if (bannerCookieInformation === undefined) {
      setShowBanner(true);
      return;
    }

    const persistedOptions = JSON.parse(bannerCookieInformation) as PersistedOption[];
    setShowBanner(false);
    setOptions((options) => syncAllOptionsToPersistedOptions(options, persistedOptions));
  }, []);

  const toggleOption = (option: CookieOption) => {
    setOptions((options) => {
      let newOption = option.clone();

      if (!option.isValidated()) newOption.validate();
      else newOption.unvalidate();

      return options.map((o) => (o.name() === option.name() ? newOption : o));
    });
  };

  const validate = () => {
    const expireAtDate = new Date(Date.now() + 1000 * 60 * 60 * 24 * 365);

    writeCookie(
      COOKIE_OPTION_COOKIE_NAME,
      JSON.stringify(
        options.map((option) => ({
          name: option.name(),
          accepted: option.isValidated(),
        })),
      ),
      expireAtDate,
    );
  };

  return { showBanner, options, toggleOption, validate };
}
