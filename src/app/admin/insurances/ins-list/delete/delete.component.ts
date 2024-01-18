import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogData } from 'app/contacts/delete/delete.component';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})

  export class DeleteComponent {
    constructor(
      public dialogRef: MatDialogRef<DeleteComponent>,
      @Inject(MAT_DIALOG_DATA) public data: DialogData,

    ) {}

    // ... Autres méthodes ...

    confirm(): void {
      this.dialogRef.close(true);
      // Confirmer la suppression
    }

    cancel(): void {
      this.dialogRef.close(false); // Annuler la suppression
    }
  }
