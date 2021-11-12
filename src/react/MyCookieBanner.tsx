import { CookieBanner } from '../domain/CookieBanner';
import { CookieOption } from '../domain/CookieOption';

const MyCookieBanner = new CookieBanner();

const gtagOption = CookieOption.create({ name: 'Google Tag Manager' });
gtagOption.whenAccepted(() => <p>Google tag manager accepted</p>);
gtagOption.whenRefused(() => <p>Google tag manager refused</p>);

const gaOption = CookieOption.create({ name: 'Google Analytics' });
gaOption.whenAccepted(() => <p>Google analytics accepted</p>);
gaOption.whenRefused(() => <p>Google analytics refused</p>);

MyCookieBanner.addOption(gtagOption);
MyCookieBanner.addOption(gaOption);

export { MyCookieBanner };
