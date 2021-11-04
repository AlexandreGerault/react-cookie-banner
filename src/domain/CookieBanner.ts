import { CookieOption } from './CookieOption';

export class CookieBanner {
  private _accepted: boolean = false;
  private _options: CookieOption[] = [];

  accepts() {
    this._accepted = true;
  }

  accepted() {
    return this._accepted;
  }

  addOption(option: CookieOption) {
    this._options = [...this._options, option];
  }

  options(): CookieOption[] {
    return this._options;
  }

  validatedOptions(): CookieOption[] {
    return this._options.filter((option) => option.isValidated());
  }

  validateOption(name: string) {
    this._options
      .filter((option) => option.name() === name)
      .map((option) => {
        option.validate();
        return option;
      });
  }
}
