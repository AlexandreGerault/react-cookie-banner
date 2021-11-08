import { CookieBanner } from '../domain/CookieBanner';
import { CookieOption } from '../domain/CookieOption';

const MyCookieBanner = new CookieBanner();

MyCookieBanner.addOption(CookieOption.create({ name: 'Google Tag Manager' }));
MyCookieBanner.addOption(CookieOption.create({ name: 'Google Analytics' }));

export { MyCookieBanner };
