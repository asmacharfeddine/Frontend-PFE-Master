import { HttpClient } from "@angular/common/http";
import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Direction } from "@angular/cdk/bidi";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { FormComponent as SiteFormComponent } from "./form/form.component";
import { FormComponent as ServiceFormComponent } from "../service/form/form/form.component";
import { DeleteComponent } from "./delete/delete.component";
import { Site } from "./site.model";
import { SiteGroup } from "../site-group/site-group.model";
import { SiteGroupService } from "../site-group/site-group.service";
import { SiteService } from "./site.service";

@Component({
  selector: 'app-site',
  templateUrl: './site.component.html',
  styleUrls: ['./site.component.scss']
})
export class SiteComponent implements OnInit {
  //@Input('data') sites: Site[] = [];
  sites: Site[] = [];

  page = 1;
  items = 6;
  filteredSites: Site[] = [];
  searchQuery = '';

  siteGroupKey: number | undefined;
  siteGroup: SiteGroup | undefined;
  isLoading: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private siteGroupService: SiteGroupService,
    private siteService: SiteService,
    private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {

  }

  ngOnInit(): void {
    this.displaySites();
    this.getParent();
  }

  displaySites(): void {
    this.isLoading = true;
    const siteGrpKyParam = this.route.snapshot.paramMap.get('siteGrpKy');
    if (siteGrpKyParam) {
      const siteGrpKy = +siteGrpKyParam;
      this.siteGroupService.getChildElements(siteGrpKy).subscribe(
        (data: Site[]) => {
          this.sites = [...data];
          this.filteredSites = [...data];
          this.isLoading = false;
        },
        (error: any) => {
          console.error('Error fetching sites:', error);
          this.isLoading = false;
        }
      );
    }
  }

  hasServiceElements(site: Site): boolean {
    return site.services?.length > 0;
  }

  searchSites(): void {
    this.filteredSites = this.sites.filter(site =>
      site.siteNm.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  getParent(): void {
    this.siteGroupKey = this.getCurrentSiteGroupKey();
    this.siteGroupService.getSiteGrpByKy(this.siteGroupKey).subscribe(
      (siteGrp: SiteGroup) => {
        this.siteGroup = siteGrp;
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  getCurrentSiteGroupKey(): number {
    const urlSegments = this.route.snapshot.url;
    const siteGroupKeyIndex = urlSegments.findIndex(segment => segment.path === 'site-group');
    if (siteGroupKeyIndex !== -1 && siteGroupKeyIndex + 1 < urlSegments.length) {
      return +urlSegments[siteGroupKeyIndex + 1].path;
    }
    return 0;
  }

  fetchServices(siteKy: number): void {
    this.router.navigate(['admin', 'structure', 'site', siteKy, 'child-elements']);
  }

  onDelete(site: Site): void {
    const dialogRef = this.dialog.open(DeleteComponent, {
      data: site // Pass the site as data to the dialog
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.siteService.deleteSite(site.siteKy)
        .subscribe(
          () => {
            this.refresh();
            this.openSuccessSnackBar(site.siteNm + ' : deleted successfully');
          },
          (error: any) => {
            console.error('Error deleting site:', error);
            this.openErrorSnackBar('Error deleting site: ' + site.siteNm);
          }
        );
      }
    });
  }

  openSuccessSnackBar(message: string): void {
    this.snackBar.open(message, '', {
      duration: 3000,
      horizontalPosition: 'start',
      panelClass: ["snackbar-success"]
    });
  }

  openErrorSnackBar(message: string): void {
    this.snackBar.open(message, '', {
      duration: 3000,
      horizontalPosition: 'start',
      panelClass: ["snackbar-error"]
    });
  }

  refresh() {
    this.displaySites();
  }

  edit(site: Site) {
    const tempDirection: Direction = localStorage.getItem('isRtl') === 'true' ? 'rtl' : 'ltr';

    const dialogRef = this.dialog.open(SiteFormComponent, {
      data: {
        sites: this.filteredSites,
        site: site,
        action: 'edit',
      },
      direction: tempDirection,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        this.openSuccessSnackBar("Site Updated Successfully!");
      }
    });
  }

  addChild(site: Site) {
    const tempDirection: Direction = localStorage.getItem('isRtl') === 'true' ? 'rtl' : 'ltr';

    const dialogRef = this.dialog.open(ServiceFormComponent, {
      data: {
        site: site,
        action: 'add-service',
      },
      direction: tempDirection,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        this.openSuccessSnackBar("Service Added Successfully!");
        this.refresh();
      }
    });
  }
}
