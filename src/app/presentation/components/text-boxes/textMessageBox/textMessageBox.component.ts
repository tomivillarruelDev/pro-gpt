import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-text-message-box',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './textMessageBox.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextMessageBoxComponent {
  @Input() public placeholder: string = '';
  @Input() public disabledCorrections: boolean = false;

  @Output() onMessage = new EventEmitter<string>();

  private fb = inject(FormBuilder);
  public form = this.fb.group({
    prompt : ['', Validators.required]
  });

  handleSubmit() {
    if (this.form.invalid) return;

    const { prompt } = this.form.value;

    this.onMessage.emit(prompt ?? '');
    this.form.reset();
  }
}
