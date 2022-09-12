import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'cc-toggle',
  template: `
    <button
      [disabled]="disabled"
      [ngClass]="{
        'cc-toggle-background-false': !value,
        'cc-toggle-background-true': value,
        'opacity-50': disabled,
        'cursor-not-allowed': disabled
      }"
      (click)="value = !value; $event.stopPropagation()"
      type="button"
      class="cc-cookie-item-toggle relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 transition-colors duration-100 ease-in-out focus:outline-none"
      aria-pressed="false"
    >
      <span
        [ngClass]="{ 'translate-x-5': value, 'translate-x-0': !value }"
        class="cc-toggle-nipple pointer-events-none relative inline-block h-5 w-5 transform rounded-full shadow ring-0 transition duration-200 ease-in-out"
      >
        <span
          [ngClass]="{
            'opacity-0': value,
            'ease-out': value,
            'duration-100': value,
            'opacity-100': !value,
            'ease-in': !value,
            'duration-200': !value
          }"
          class="absolute inset-0 flex h-full w-full items-center justify-center transition-opacity"
          aria-hidden="true"
        >
          <svg
            class="cc-nipple-icon-false h-3 w-3"
            fill="none"
            viewBox="0 0 12 12"
          >
            <path
              d="M4 8l2-2m0 0l2-2M6 6L4 4m2 2l2 2"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </span>
        <span
          [ngClass]="{
            'opacity-0': !value,
            'ease-out': !value,
            'duration-100': !value,
            'opacity-100': value,
            'ease-in': value,
            'duration-200': value
          }"
          class="absolute inset-0 flex h-full w-full items-center justify-center transition-opacity"
          aria-hidden="true"
        >
          <svg
            class="cc-nipple-icon-true h-3 w-3"
            fill="currentColor"
            viewBox="0 0 12 12"
          >
            <path
              d="M3.707 5.293a1 1 0 00-1.414 1.414l1.414-1.414zM5 8l-.707.707a1 1 0 001.414 0L5 8zm4.707-3.293a1 1 0 00-1.414-1.414l1.414 1.414zm-7.414 2l2 2 1.414-1.414-2-2-1.414 1.414zm3.414 2l4-4-1.414-1.414-4 4 1.414 1.414z"
            />
          </svg>
        </span>
      </span>
    </button>
  `,
  styleUrls: ['./toggle.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ToggleComponent),
      multi: true,
    },
  ],
})
export class ToggleComponent implements OnInit, ControlValueAccessor {
  _value = false;
  @Input() set value(value: boolean) {
    this._value = value;
    this.propagateChange(this.value);
  }
  get value() {
    return this._value;
  }
  disabled = false;
  constructor() {}
  propagateChange = (_: any) => {};
  writeValue(value: boolean): void {
    this.value = value;
  }
  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {}
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  ngOnInit(): void {}
}
