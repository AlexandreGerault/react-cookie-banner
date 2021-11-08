import { CookieOption } from './CookieOption';

export class CookieBanner {
  private _accepted: boolean = false;
  private _options: Set<CookieOption> = new Set();

  accepts() {
    this._accepted = true;
  }

  submitted() {
    return this._accepted;
  }

  addOption(option: CookieOption) {
    if (this.options().find((o) => option.name() === o.name())) {
      return;
    }

    this._options.add(option);
  }

  options(): CookieOption[] {
    return [...this._options.values()];
  }

  acceptedOptions(): CookieOption[] {
    return this.options().filter((option) => option.isValidated());
  }

  acceptOption(name: string) {
    this.options()
      .filter((option) => option.name() === name)
      .map((option) => {
        option.validate();
        return option;
      });
  }
}
