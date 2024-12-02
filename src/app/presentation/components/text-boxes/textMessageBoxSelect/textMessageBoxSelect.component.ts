import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { SelectedMessageInterface } from '@interfaces/select-message-box.interface';

interface Option {
  id: string,
  text: string
}

@Component({
  selector: 'app-text-message-box-select',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './textMessageBoxSelect.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextMessageBoxSelectComponent {
  @Input() public placeholder: string = '';
  @Input({ required: true }) public options: Option[] = [];

  @Output() onMessage = new EventEmitter<SelectedMessageInterface>();

  private fb = inject(FormBuilder);
  public form = this.fb.group({
    prompt : [''],
    selectedOption: ['', Validators.required]
  });

  handleSubmit(): void {
    if (this.form.invalid) return;

    const { prompt = '', selectedOption } = this.form.value;

    this.onMessage.emit({prompt: prompt!, selectedOption: selectedOption!});
    this.form.reset();
  }
}
