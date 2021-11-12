import Button from './Button';
import { MyCookieBanner } from './MyCookieBanner';
import OptionSwitch from './OptionSwitch';
import useBanner from './useBanner';

function Banner() {
  const { showBanner, options, toggleOption, validate } = useBanner({
    defaultCookie: MyCookieBanner,
  });

  if (showBanner) {
    return (
      <div className="absolute flex items-center justify-center w-full h-full bg-gray-900 bg-opacity-75">
        <div className="w-full max-w-lg px-8 py-6 mx-auto space-y-6 bg-white rounded shadow">
          <p className="text-xl">Acceptez nos cookies 🍪</p>
          <p className="text-left">
            En poursuivant votre navigation sur ce site, vous acceptez l'utilisation de
            cookies pour vous offrir une meilleure expérience utilisateur.
          </p>
          <ul className="flex flex-col gap-4">
            {options.map((option) => (
              <li key={option.name()} className="flex justify-between">
                {option.name()}
                <OptionSwitch
                  enabled={option.isValidated()}
                  onClick={() => {
                    toggleOption(option);
                  }}
                />
              </li>
            ))}
          </ul>
          <Button
            onClick={() => {
              validate();
            }}>
            Valider
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div>
      {options.map((option) => (
        <div key={option.name()}>{option.handle()}</div>
      ))}
    </div>
  );
}

export { Banner };
