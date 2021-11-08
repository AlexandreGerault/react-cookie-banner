export class InvalidDurationError extends Error {}

interface CreatePermanentOption {
  name: string;
  necessaryType?: boolean;
  duration?: number;
  onAccepted?: Function;
  onRefused?: Function;
}

interface CreateTemporaryOption {
  name: string;
  necessaryType?: boolean;
  onAccepted?: Function;
  onRefused?: Function;
}

export class CookieOption {
  private constructor(
    private _name: string,
    private _accepted: boolean,
    private _isNecessary: boolean,
    private _duration: number,
    private _onAccepted: Function,
    private _onRefused: Function,
  ) {
    if (_duration < 0) throw new InvalidDurationError();
  }

  static create({
    name,
    necessaryType = true,
    duration = 1,
    onAccepted = () => {},
    onRefused = () => {},
  }: CreatePermanentOption) {
    return new this(name, false, necessaryType, duration, onAccepted, onRefused);
  }

  static createSessionCookie({
    name,
    necessaryType = true,
    onAccepted = () => {},
    onRefused = () => {},
  }: CreateTemporaryOption) {
    return new this(name, false, necessaryType, 0, onAccepted, onRefused);
  }

  public name() {
    return this._name;
  }

  public validate() {
    this._accepted = true;
  }

  public isValidated() {
    return this._accepted;
  }

  public necessary() {
    return this._isNecessary;
  }

  public duration() {
    return this._duration;
  }

  public whenAccepted(fn: Function) {
    this._onAccepted = fn;
  }

  public whenRefused(fn: Function) {
    this._onRefused = fn;
  }

  public handle() {
    if (this._accepted) {
      return this._onAccepted();
    }

    return this._onRefused();
  }

  public unvalidate() {
    this._accepted = false;
  }

  public clone() {
    return new CookieOption(
      this._name,
      this._accepted,
      this._isNecessary,
      this._duration,
      this._onAccepted,
      this._onRefused,
    );
  }
}
