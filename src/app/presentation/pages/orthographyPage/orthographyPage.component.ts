import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';

import { ChatMessageComponent } from '@components/chat-bubbles/chatMessage/chatMessage.component';
import { MyMessageComponent } from '@components/chat-bubbles/myMessage/myMessage.component';
import { TextMessageBoxComponent } from '@components/text-boxes/textMessageBox/textMessageBox.component';
import { TextMessageBoxFileComponent } from '@components/text-boxes/textMessageBoxFile/textMessageBoxFile.component';
import { TextMessageBoxSelectComponent } from '@components/text-boxes/textMessageBoxSelect/textMessageBoxSelect.component';
import { TypingLoaderComponent } from '@components/typingLoader/typingLoader.component';

import { FileMessageInterface } from '@interfaces/file-message-event.interface';
import { MessageInterface } from '@interfaces/message.interface';
import { SelectedMessageInterface } from '@interfaces/select-message-box.interface';

import { OpenAiService } from 'app/presentation/services/openai.service';

@Component({
  selector: 'app-orthography-page',
  standalone: true,
  imports: [
    ChatMessageComponent,
    MyMessageComponent,
    TypingLoaderComponent,

    TextMessageBoxComponent,
    TextMessageBoxFileComponent,
    TextMessageBoxSelectComponent,
  ],
  templateUrl: './orthographyPage.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class OrthographyPageComponent {

  public messages = signal<MessageInterface[]>([ {text: 'Hola Mundo', isGpt: false} ]);
  public isLoading = signal<boolean>(false);

  public openAiService = inject(OpenAiService)

  handleMessage(message: string) {
    console.log('Message:', message);
  }

  handleMessageWithFile({ prompt, file }: FileMessageInterface) {
    console.log('file:', file);
  }

  handleMessageWithSelect(event: SelectedMessageInterface) {}
}
