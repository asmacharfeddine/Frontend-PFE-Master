import { formatDate } from '@angular/common';
import { PhysicalTreatmentCategory } from 'app/admin/categories/categories-list/category.model';
export interface PhysicalTreatment {
  physicalTreatment_Key: number;
  treatmentName: string;
  treatmentDescription: string;
  duration: string;
  notes: string;
  physicalTreatmentCategory: PhysicalTreatmentCategory;

}
