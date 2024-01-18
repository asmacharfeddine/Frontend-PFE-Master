import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SiteGroup } from './site-group.model';
import { Site } from '../site/site.model';

@Injectable({
  providedIn: 'root'
})
export class SiteGroupService {

  private baseUrl = 'http://localhost:8090/parameterization/sitegrp';

  constructor(private http: HttpClient) { }

  getAllSiteGroups(): Observable<SiteGroup[]> {
    return this.http.get<SiteGroup[]>(this.baseUrl);
  }

  createSiteGrp(siteGroup: SiteGroup): Observable<SiteGroup> {
    return this.http.post<SiteGroup>(`${this.baseUrl}`, siteGroup);
  }
  
  updateSiteGrp(siteGrpKy: number, siteGroup: SiteGroup): Observable<SiteGroup> {
    return this.http.put<SiteGroup>(`${this.baseUrl}/${siteGrpKy}`, siteGroup);
  }

  deleteSiteGrp(siteGrpKy: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.baseUrl}/${siteGrpKy}`, { observe: 'response' });
  }

  getSiteGrpBySiteGrpNm(siteGrpNm: string): Observable<SiteGroup> {
    const url = `${this.baseUrl}/SiteGrpName/${siteGrpNm}`;
    return this.http.get<SiteGroup>(url);
  }

  getSiteGrpByKy(siteGrpKy: number): Observable<SiteGroup> {
    const url = `${this.baseUrl}/${siteGrpKy}`;
    return this.http.get<SiteGroup>(url);
  }

  getSiteGroupNameByKey(siteGroupKey: number): Observable<string> {
    const url = `${this.baseUrl}/${siteGroupKey}/name`;
    // return this.http.get<string>(url);
    return this.http.get(url, { responseType: 'text' });
  }

  getChildElements(siteGrpKy: number): Observable<Site[]> {
    return this.http.get<Site[]>(`${this.baseUrl}/${siteGrpKy}/child-elements`);
  }

  addChildElement(siteGrpKy: number, site: Partial<Site>): Observable<Site> {
    return this.http.post<Site>(`${this.baseUrl}/${siteGrpKy}/child-elements`, site);
  }
}
