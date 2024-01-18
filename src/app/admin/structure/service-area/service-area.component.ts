import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Service } from '../service/service.model';
import { SiteGroup } from '../site-group/site-group.model';
import { Site } from '../site/site.model';
import { SiteService } from '../site/site.service';
import { MatDialog } from '@angular/material/dialog';
import { DeleteComponent } from './delete/delete/delete.component';
import { ServiceService } from '../service/service.service';
import { HttpResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ServiceArea } from './service-area.model';
import { Direction } from '@angular/cdk/bidi';
import { FormComponent as ServiceAreaFormComponent } from './form/form/form.component';
import { ServiceAreaService } from './service-area.service';
import { FormComponent as ExploitationUnitFormComponent } from '../exploitation-unit/form/form/form.component';

@Component({
  selector: 'app-service',
  templateUrl: './service-area.component.html',
  styleUrls: ['./service-area.component.scss']
})
export class ServiceAreaComponent implements OnInit {

  serviceAreas: ServiceArea[] = [];
  serviceKey: number | undefined;

  service: Service | undefined;

  filteredServiceAreas: ServiceArea[] = [];

  page = 1;
  items = 5;
  searchQuery = '';
  isLoading: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private siteService: SiteService,
    private serviceAreaService : ServiceAreaService,
    private dialog: MatDialog,
    private serviceService: ServiceService,
    private snackBar: MatSnackBar,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.displayServiceAreas();
    this.getParent();
  }

  displayServiceAreas(): void {
    this.isLoading = true;
    const serviceKyParam = this.route.snapshot.paramMap.get('serviceKy');
    if (serviceKyParam) {
      const serviceKy = +serviceKyParam;
      this.serviceService.getChildElements(serviceKy).subscribe(
        (data: ServiceArea[]) => {
          this.serviceAreas = [...data];;
          this.filteredServiceAreas = [...data];;
          this.isLoading = false;
        },
        (error: any) => {
          console.error('Error fetching service areas:', error);
          this.isLoading = false;
        }
      );
    }
  }

  searchServiceAreas(): void {
    this.filteredServiceAreas = this.serviceAreas.filter(serviceArea =>
      serviceArea.servAreaNm.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  hasExploitationUnitsElements(serviceArea: ServiceArea): boolean {
    return serviceArea.exploitationUnits?.length > 0;
  }

  getParent(): void {
    this.serviceKey = this.getCurrentServiceKey();
    this.serviceService.getServiceByKy(this.serviceKey).subscribe(
      (service: Service) => {
        this.service = service;
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  refresh(){
    this.displayServiceAreas();
  }

  getCurrentServiceKey(): number {
    const urlSegments = this.route.snapshot.url;
    const serviceKeyIndex = urlSegments.findIndex(segment => segment.path === 'service');
    if (serviceKeyIndex !== -1 && serviceKeyIndex + 1 < urlSegments.length) {
      return +urlSegments[serviceKeyIndex + 1].path;
    }
    return 0;
  }

  onDelete(serviceArea: ServiceArea): void {
    const dialogRef = this.dialog.open(DeleteComponent, {
      data: serviceArea // Pass the name as data to the dialog
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.serviceAreaService.deleteServiceArea(serviceArea.servAreaKy)
        .subscribe(
          (response: HttpResponse<any>) => {
            this.refresh();
            this.openSuccessSnackBar(serviceArea.servAreaNm + ' : deleted successfully');

          },
          (error: any) => {
            console.error('Error deleting service area:', error);
            this.openErrorSnackBar('Error deleting service area: '+serviceArea.servAreaNm);
          }
        );
      }
    });
  }

  openSuccessSnackBar(message: string): void {
    this.snackBar.open(message,'',{
      duration: 3000,
      horizontalPosition: 'start',
      panelClass: ["snackbar-success"]
    });
}

  openErrorSnackBar(message: string): void {
    this.snackBar.open(message,'',{
      duration: 3000,
      horizontalPosition: 'start',
      panelClass: ["snackbar-error"]
    });
  }

  fetchExploitationUnits(servAreaKy: number): void {
    this.router.navigate(['admin','structure', 'service-area', servAreaKy, 'child-elements']);
  }

  edit(serviceArea : ServiceArea) {
    let tempDirection: Direction;
    if (localStorage.getItem('isRtl') === 'true') {
      tempDirection = 'rtl';
    } else {
      tempDirection = 'ltr';
    }
    const dialogRef = this.dialog.open(ServiceAreaFormComponent, {
      data: {
        serviceAreas: this.filteredServiceAreas,
        serviceArea: serviceArea,
        action: 'edit',
      },
      direction: tempDirection,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        this.openSuccessSnackBar("Service Area Updated Successfully !")
      }
    });
  }

  addChild(serviceArea : ServiceArea){
    let tempDirection: Direction;
    if (localStorage.getItem('isRtl') === 'true') {
      tempDirection = 'rtl';
    } else {
      tempDirection = 'ltr';
    }

    const dialogRef = this.dialog.open(ExploitationUnitFormComponent, {
      data: {
        serviceArea: serviceArea,
        action: 'add-exploitation-unit',
      },
      direction: tempDirection,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        this.openSuccessSnackBar("Exploitation Unit Added Successfully !")
        this.refresh();
      }
    });
  }

}
