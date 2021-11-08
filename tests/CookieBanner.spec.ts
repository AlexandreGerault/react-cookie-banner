import { CookieBanner } from '../src/domain/CookieBanner';
import { CookieOption } from '../src/domain/CookieOption';

describe('CookieBanner', () => {
  it('should be not submitted by default', () => {
    const cookieBanner = new CookieBanner();

    const isSubmitted = cookieBanner.submitted();

    expect(isSubmitted).toEqual(false);
  });

  it('should be accepted after validation', () => {
    const cookieBanner = new CookieBanner();

    cookieBanner.accepts();

    expect(cookieBanner.submitted()).toBe(true);
  });

  it('should be able to register one option', () => {
    const cookieBanner = new CookieBanner();

    cookieBanner.addOption(CookieOption.create({ name: 'Google Tag Manager' }));

    expect(cookieBanner.options()).toHaveLength(1);
  });

  it('should be able to register two options', () => {
    const cookieBanner = new CookieBanner();

    cookieBanner.addOption(CookieOption.create({ name: 'Google Tag Manager' }));
    cookieBanner.addOption(CookieOption.create({ name: 'Google Analytics' }));

    expect(cookieBanner.options()).toHaveLength(2);
  });

  it('should be able to accept an option', () => {
    const cookieBanner = new CookieBanner();

    cookieBanner.addOption(CookieOption.create({ name: 'Google Tag Manager' }));

    cookieBanner.acceptOption('Google Tag Manager');

    expect(cookieBanner.acceptedOptions()).toHaveLength(1);
  });

  it('should be able to register two options and validate them', () => {
    const cookieBanner = new CookieBanner();

    cookieBanner.addOption(CookieOption.create({ name: 'Google Tag Manager' }));
    cookieBanner.addOption(CookieOption.create({ name: 'Google Analytics' }));

    cookieBanner.acceptOption('Google Tag Manager');
    cookieBanner.acceptOption('Google Analytics');

    expect(cookieBanner.options()).toHaveLength(2);
    expect(cookieBanner.acceptedOptions()).toHaveLength(2);
  });

  it('should be able to register two options and validate one', () => {
    const cookieBanner = new CookieBanner();

    cookieBanner.addOption(CookieOption.create({ name: 'Google Tag Manager' }));
    cookieBanner.addOption(CookieOption.create({ name: 'Google Analytics' }));

    cookieBanner.acceptOption('Google Tag Manager');

    expect(cookieBanner.options()).toHaveLength(2);
    expect(cookieBanner.acceptedOptions()).toHaveLength(1);
  });

  it('should not be able to register an option twice', () => {
    const cookieBanner = new CookieBanner();

    cookieBanner.addOption(CookieOption.create({ name: 'Google Tag Manager' }));
    cookieBanner.addOption(CookieOption.create({ name: 'Google Tag Manager' }));

    expect(cookieBanner.options()).toHaveLength(1);
  });
});
