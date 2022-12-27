import { Component, OnInit, ViewChild } from '@angular/core';
import { EmailEditorComponent } from 'angular-email-editor';
import { MatDialog } from "@angular/material/dialog";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  @ViewChild('editor') private emailEditor: EmailEditorComponent | undefined;
  @ViewChild('imageGalleryModal') imageGalleryModal: any;

  selectedImage: string = '';
  options: any = {
    appearance: {
      panels: {
        tools: {
          dock: 'left'
        }
      }
    }
  }


  constructor(public dialog: MatDialog) { }

  ngOnInit() { }

  editorLoaded(event: any) {
    this.emailEditor?.editor.addEventListener('selectImage', (data: any, done: any) => {

      let dialogRef = this.dialog.open(this.imageGalleryModal, {
      });

      dialogRef.afterClosed().subscribe(result => {
        done({ url: this.selectedImage });
      });
    });
  }

  onSelectImage(url: string) {
    this.selectedImage = '';
    this.selectedImage = url;
    this.dialog.closeAll();
  }
}
