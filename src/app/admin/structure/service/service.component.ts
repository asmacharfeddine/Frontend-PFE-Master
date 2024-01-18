import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Service } from './service.model';
import { SiteGroup } from '../site-group/site-group.model';
import { Site } from '../site/site.model';
import { SiteService } from '../site/site.service';
import { MatDialog } from '@angular/material/dialog';
import { DeleteComponent } from './delete/delete/delete.component';
import { ServiceService } from './service.service';
import { HttpResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Direction } from '@angular/cdk/bidi';
import { FormComponent as ServiceFormComponent } from './form/form/form.component';
import { FormComponent as ServiceAreaFormComponent } from '../service-area/form/form/form.component';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.scss']
})
export class ServiceComponent implements OnInit {

  services: Service[] = [];
  siteKey: number | undefined;

  site: Site | undefined;

  filteredServices: Service[] = [];

  page = 1;
  items = 5;
  searchQuery = '';
  isLoading: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private siteService: SiteService,
    private dialog: MatDialog,
    private serviceService: ServiceService,
    private snackBar: MatSnackBar,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.displayServices();
    this.getParent();
  }

  displayServices(): void {
    this.isLoading = true;
    const siteKyParam = this.route.snapshot.paramMap.get('siteKy');
    if (siteKyParam) {
      const siteKy = +siteKyParam;
      this.siteService.getChildElements(siteKy).subscribe(
        (data: Service[]) => {
          this.services = [...data];;
          this.filteredServices = [...data];;
          this.isLoading = false;
        },
        (error: any) => {
          console.error('Error fetching services:', error);
          this.isLoading = false;
        }
      );
    }
  }

  refresh() {
    this.displayServices();
  }

  searchServices(): void {
    this.filteredServices = this.services.filter(service =>
      service.serviceNm.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  hasServAreaElements(service: Service): boolean {
    return service.serviceAreas?.length > 0;
  }

  getParent(): void {
    this.siteKey = this.getCurrentSiteKey();
    this.siteService.getSiteByKy(this.siteKey).subscribe(
      (site: Site) => {
        this.site = site;
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  getCurrentSiteKey(): number {
    const urlSegments = this.route.snapshot.url;
    const siteKeyIndex = urlSegments.findIndex(segment => segment.path === 'site');
    if (siteKeyIndex !== -1 && siteKeyIndex + 1 < urlSegments.length) {
      return +urlSegments[siteKeyIndex + 1].path;
    }
    return 0;
  }

  onDelete(service: Service): void {
    const dialogRef = this.dialog.open(DeleteComponent, {
      data: service // Pass the name as data to the dialog
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.serviceService.deleteService(service.serviceKy)
        .subscribe(
          (response: HttpResponse<any>) => {

            // this.services = this.services.filter(serv => serv.serviceKy !== service.serviceKy);
            // this.filteredServices = this.filteredServices.filter(serv => serv.serviceKy !== service.serviceKy);
            this.refresh();
            this.openSuccessSnackBar(service.serviceNm + ' : deleted successfully');
          },
          (error: any) => {
            console.error('Error deleting site group:', error);
            this.openErrorSnackBar('Error deleting site group: '+service.serviceNm);
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

  fetchServiceAreas(serviceKy: number): void {
    this.router.navigate(['admin','structure', 'service', serviceKy, 'child-elements']);
  }

  edit(service : Service) {
    let tempDirection: Direction;
    if (localStorage.getItem('isRtl') === 'true') {
      tempDirection = 'rtl';
    } else {
      tempDirection = 'ltr';
    }
    const dialogRef = this.dialog.open(ServiceFormComponent, {
      data: {
        services: this.filteredServices,
        service: service,
        action: 'edit',
      },
      direction: tempDirection,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        this.openSuccessSnackBar("Service Updated Successfully !")
      }
    });
  }

  addChild(service : Service){
    let tempDirection: Direction;
    if (localStorage.getItem('isRtl') === 'true') {
      tempDirection = 'rtl';
    } else {
      tempDirection = 'ltr';
    }

    const dialogRef = this.dialog.open(ServiceAreaFormComponent, {
      data: {
        service: service,
        action: 'add-service-area',
      },
      direction: tempDirection,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        this.openSuccessSnackBar("Service Area Added Successfully !")
        this.refresh();
      }
    });
  }
}
