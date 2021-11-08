import { CookieOption, InvalidDurationError } from '../src/domain/CookieOption';

describe('CookieOption', () => {
  it('should have a necessary purpose type', () => {
    const cookieOption = CookieOption.create({ name: 'Necesseray cookie' });

    expect(cookieOption.necessary()).toBe(true);
  });

  it('should have a non-necessary purpose type', () => {
    const cookieOption = CookieOption.create({
      name: 'Necesseray cookie',
      necessaryType: false,
    });

    expect(cookieOption.necessary()).toBe(false);
  });

  it('should returns a 0 duration if the cookie is a session cookie', () => {
    const cookieOption = CookieOption.createSessionCookie({ name: 'Session cookie' });

    expect(cookieOption.duration()).toBe(0);
  });

  it('should returns a 13 duration if the cookie is provided a duration', () => {
    const cookieOption = CookieOption.create({
      name: 'Persistent cookie',
      necessaryType: true,
      duration: 13,
    });

    expect(cookieOption.duration()).toBe(13);
  });

  it('should not be instanciated if the duration is negative', () => {
    expect(() =>
      CookieOption.create({
        name: 'Persistent cookie',
        necessaryType: true,
        duration: -12,
      }),
    ).toThrowError(InvalidDurationError);
  });

  it('should execute a callback for an accepted option', () => {
    const cookieOption = CookieOption.create({ name: 'Accepted cookie' });

    cookieOption.whenAccepted(() => {
      return 'this cookie option has been accepted';
    });
    cookieOption.validate();

    expect(cookieOption.handle()).toBe('this cookie option has been accepted');
  });

  it('should execute a callback for a refused option', () => {
    const cookieOption = CookieOption.create({ name: 'Accepted cookie' });

    cookieOption.whenRefused(() => {
      return 'this cookie option has been refused';
    });

    expect(cookieOption.handle()).toBe('this cookie option has been refused');
  });

  it('should be able to unvalidate an option', () => {
    const cookieOption = CookieOption.create({ name: 'Accepted cookie' });

    cookieOption.validate();
    expect(cookieOption.isValidated()).toBe(true);

    cookieOption.unvalidate();
    expect(cookieOption.isValidated()).toBe(false);
  });

  it('should be able to clone itself', () => {
    const cookieOption = CookieOption.create({ name: 'Clone cookie' });
    const clonedOption = cookieOption.clone();

    expect(clonedOption.name()).toBe(cookieOption.name());
    expect(clonedOption).not.toBe(cookieOption);
  });
});
