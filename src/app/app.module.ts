import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AgGridModule } from "ag-grid-angular";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { WaitingListComponent } from "./shared/components/waiting-list/waiting-list.component";
import { HttpClientModule } from "@angular/common/http";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AddPatientComponent } from "./shared/components/add-patient/add-patient.component";
import { ReactiveFormsModule } from "@angular/forms";
import { ConsultPatientComponent } from "./shared/components/consult-pacient/consult-patient.component";
import { FormatDatePipe } from "./shared/pipes/format-date.pipe";


@NgModule({
    declarations: [AppComponent, WaitingListComponent, AddPatientComponent, ConsultPatientComponent, FormatDatePipe],
    imports: [BrowserModule, AppRoutingModule, AgGridModule, HttpClientModule, NgbModule,  ReactiveFormsModule],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
