import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  Input,
  Output,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FileMessageInterface } from '@interfaces/file-message-event.interface';

@Component({
  selector: 'app-text-message-box-file',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './textMessageBoxFile.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextMessageBoxFileComponent {
  @Input() public placeholder: string = '';

  @Output() onMessage = new EventEmitter<FileMessageInterface>();

  private fb = inject(FormBuilder);
  public form = this.fb.group({
    prompt: [''],
    file: [null, Validators.required],
  });

  public file: File | undefined;

  handleSelectedFile(event: any): void {
    //Asigna el archivo seleccionado al control file del formulario
    const file = event.target.files.item(0);
    this.form.controls.file.setValue(file);
  }

  handleSubmit(): void {
    if (this.form.invalid) return;

    const { prompt = '', file } = this.form.value;

    this.onMessage.emit({ prompt, file: file! });
    this.form.reset();
  }
}
