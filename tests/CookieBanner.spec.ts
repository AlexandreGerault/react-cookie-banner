import {CookieBanner} from '../src/domain/CookieBanner'
import { CookieOption } from '../src/domain/CookieOption';

describe('CookieBanner', () => {
  it('should be not accepted by default', () => {
    const cookieBanner = new CookieBanner();

    const isAccepted = cookieBanner.accepted()

    expect(isAccepted).toEqual(false)
  })

  it('should be accepted after validation', () => {
    const cookieBanner = new CookieBanner()

    cookieBanner.accepts()

    expect(cookieBanner.accepted()).toBe(true);
  })

  it('should be able to register one option', () => {
    const cookieBanner = new CookieBanner()

    cookieBanner.addOption(CookieOption.create({name: 'Google Tag Manager'}));

    expect(cookieBanner.options()).toHaveLength(1)
  })

  it('should be able to register two options', () => {
    const cookieBanner = new CookieBanner()

    cookieBanner.addOption(CookieOption.create({name: 'Google Tag Manager'}));
    cookieBanner.addOption(CookieOption.create({name: 'Google Analytics'}));

    expect(cookieBanner.options()).toHaveLength(2)
  })

  it('should be able to validate an option', () => {
    const cookieBanner = new CookieBanner()

    cookieBanner.addOption(CookieOption.create({name: 'Google Tag Manager'}));

    cookieBanner.validateOption("Google Tag Manager")

    expect(cookieBanner.validatedOptions()).toHaveLength(1)
  })

  it('should be able to register two options and validate them', () => {
    const cookieBanner = new CookieBanner()

    cookieBanner.addOption(CookieOption.create({name: 'Google Tag Manager'}));
    cookieBanner.addOption(CookieOption.create({name: 'Google Analytics'}));

    cookieBanner.validateOption("Google Tag Manager")
    cookieBanner.validateOption("Google Analytics")

    expect(cookieBanner.options()).toHaveLength(2)
    expect(cookieBanner.validatedOptions()).toHaveLength(2)
  })

  it('should be able to register two options and validate one', () => {
    const cookieBanner = new CookieBanner()

    cookieBanner.addOption(CookieOption.create({name: 'Google Tag Manager'}));
    cookieBanner.addOption(CookieOption.create({name: 'Google Analytics'}));

    cookieBanner.validateOption("Google Tag Manager")

    expect(cookieBanner.options()).toHaveLength(2)
    expect(cookieBanner.validatedOptions()).toHaveLength(1)
  })
})