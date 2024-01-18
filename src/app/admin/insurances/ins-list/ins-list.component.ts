
import { UnsubscribeOnDestroyAdapter } from '@shared';
import { FormDialogComponent } from './form-dialog/form-dialog.component';

import { MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { id } from '@swimlane/ngx-datatable';

import { HttpEvent, HttpResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
;
import { insurance } from './insurances.model';
import { insurancesService } from './insurances.service';
import { MatDialog } from '@angular/material/dialog';
import { DeleteComponent } from './delete/delete.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Direction } from '@angular/cdk/bidi';
import { FormGroup, Validators } from '@angular/forms';





@Component({
  selector: 'app-ins-list',
  templateUrl: './ins-list.component.html',
  styleUrls: ['./ins-list.component.scss']
})






export class InsuListComponent  extends UnsubscribeOnDestroyAdapter implements OnInit {

  @Input('data') Insurances: insurance[] = [];
  page = 1;
  items = 5;
  filteredInsurances: insurance[] = [];
  searchQuery = '';
  isLoading: boolean = false;
  //insurances: Insurance[] = []; // Votre tableau d'assurances

  insurancesForm!: FormGroup;
  formBuilder: any;


  constructor(
    public dialog: MatDialog,
    private InsurancesService: insurancesService,
    private router: Router,

    private snackBar: MatSnackBar)

  {

    super();
    this.fetchData();
  }


  ngOnInit(): void {
    this.fetchData();

  }

  private initForm() {
    this.insurancesForm = this.formBuilder.group({
      insNm: ['', Validators.required],
      insNumber: ['', Validators.required],
      policyNm: ['', Validators.required],
      policyNum: ['', Validators.required],
      policyType: ['', Validators.required],
      website: [''],
      contactPersonName: ['', Validators.required],
      phone: ['', Validators.required],
      contactPersonEmail: ['', [Validators.required, Validators.email]],
    });
  }
  fetchData(): void {
    this.isLoading = true;
    this.InsurancesService.getAllInsurances().subscribe(
      (data: insurance[]) => {
        this.Insurances = data;
        this.filteredInsurances = data;
        this.isLoading = false;
      },
      (error: any) => {
        console.error('Error fetching data:', error);
        this.isLoading = false;
      }
    );

  }

  refresh() {
    this.fetchData();
  }

  searchInsurances(): void {
    this.filteredInsurances = this.Insurances.filter(insurance =>
      insurance.insNm.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }
  searchByCompanyName(): void {
    if (this.searchQuery.trim() === '') {
      this.filteredInsurances = [];
      return;
    }

    this.InsurancesService.getInsuranceByCompanyName(this.searchQuery)
      .subscribe(
        (data: insurance[]) => {
          this.filteredInsurances = data;
        },
        (error: any) => {
          console.error('Error fetching data:', error);
          this.filteredInsurances = [];
        }
      );
  }


  searchByPolicyName(): void {
    this.InsurancesService.getInsuranceBypolicyName(this.searchQuery).subscribe(
      (data: insurance) => {
        this.filteredInsurances = [data]; // Ajoutez le résultat unique à filteredInsurances
      },
      (error: any) => {
        console.error('Error fetching data:', error);
        this.filteredInsurances = []; // Réinitialisez filteredInsurances en cas d'erreur
      }
    );
  }
  hasInsurances(): boolean {
    return this.filteredInsurances.length > 0;
  }




  // ... Autres propriétés ...

  addNew() {
    let tempDirection: Direction;
    if (localStorage.getItem('isRtl') === 'true') {
      tempDirection = 'rtl';
    } else {
      tempDirection = 'ltr';
    }

    const dialogRef = this.dialog.open(FormDialogComponent, {
      data: {
        contacts: this.Insurances,
        action: 'add',
      },// Configurations de la fenêtre de dialogue
      direction: tempDirection,
    });

    dialogRef.afterClosed().subscribe((result: number) => {
      if (result === 1) {
        // Logique à exécuter après la fermeture de la fenêtre de dialogue
        // Par exemple, vous pouvez appeler la méthode loadData() pour rafraîchir les données
        this.loadData();
      }
    });
  }
  loadData(): void {
    this.isLoading = true;
    this.InsurancesService.getAllInsurances().subscribe(
      (data: insurance[]) => {
        this.Insurances = data;
        this.filteredInsurances = data;
        this.isLoading = false;
      },
      (error: any) => {
        console.error('Error fetching data:', error);
        this.isLoading = false;
      }
    );
  }
  showNotification(
    colorName: string,
    text: string,
    placementFrom: MatSnackBarVerticalPosition,
    placementAlign: MatSnackBarHorizontalPosition
  ) {
    this.snackBar.open(text, '', {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }
  deleteInsuranceItem(insurance: insurance): void {
   /* const dialogRef = this.dialog.open(DeleteComponent, {
      width: '350px',
      data: 'Êtes-vous sûr de vouloir supprimer cette assurance ?'
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result === true) {
        */ this.InsurancesService.deleteInsurance(insurance.insKy).subscribe(
          response => {
            if (response.status === 204) {
              this.loadData();
              this.showNotification(
                'snackbar-success',
                'Insurance successfully deleted',
                'bottom',
                'center'
              );
              this.loadData();
            } else {
              // Gérer l'erreur ici si la suppression n'a pas réussi
            }
          },
          error => {
            console.error('Erreur lors de la suppression de l\'assurance :', error);
            // Gérer l'erreur ici, par exemple affichez un message d'erreur à l'utilisateur.
          }
        );/*

      }
    });


  }*/ }
  edit(insurance: insurance) {
    let tempDirection: Direction;
    if (localStorage.getItem('isRtl') === 'true') {
      tempDirection = 'rtl';
    } else {
      tempDirection = 'ltr';
    }

    const dialogRef = this.dialog.open(FormDialogComponent, {
      data: {
        insurance: insurance,
        action: 'edit',
      },
      direction: tempDirection,
    });

    dialogRef.afterClosed().subscribe((result: number) => {
      if (result === 1) {
        // Mettez à jour l'assurance
        const updatedInsuranceData: insurance = dialogRef.componentInstance.insuranceForm.value;

        // Assurez-vous que insuranceUnxTmCrt a une valeur par défaut
        if (!updatedInsuranceData.insuranceUnxTmCrt) {
          updatedInsuranceData.insuranceUnxTmCrt = new Date();
        }
        if (!updatedInsuranceData.insuranceUnxTmUpdt) {
          updatedInsuranceData.insuranceUnxTmUpdt = new Date();
        }
        // Mettez à jour l'assurance en appelant le service
        this.InsurancesService.updateInsurance(insurance.insKy, updatedInsuranceData).subscribe(
          (updatedInsurance: insurance) => {
            console.log('Assurance mise à jour :', updatedInsurance);
            this.loadData();
          },
          error => {
            console.error('Erreur lors de la mise à jour de l\'assurance :', error);
            // Gérez l'erreur ici
          }
        );
      }
    });
  }


}









  // ... Autres méthodes
