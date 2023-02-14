import { Component, OnInit } from "@angular/core";
import { NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { Observable } from "rxjs";
import { IPatient } from "../../interfaces/IPatient";
import { PatientService } from "../../services/patient.service";
import { AddPatientComponent } from "../add-patient/add-patient.component";
import { ConsultPatientComponent } from "../consult-pacient/consult-patient.component";

@Component({
    selector: "app-waiting-list",
    templateUrl: "./waiting-list.component.html",
    styleUrls: ["./waiting-list.component.scss"],
})
export class WaitingListComponent implements OnInit {
    public patients$: Observable<IPatient[]> = this.patientService.getPatients();

    constructor(private patientService: PatientService,
                private modalService: NgbModal) {}

    public ngOnInit(): void {
    }

    public refreshGrid(): void {
        this.patients$ = this.patientService.getPatients();
    }

    public deletePatient(patientId: number): void {
        if (confirm("Are you sure you want to remove a patient?")) {
            this.patientService.deletePatients(patientId).subscribe(() => {
                this.refreshGrid();
            });
        }
    }

    public editPatient(patientId: number) {
        const instance: NgbModalRef = this.modalService.open(AddPatientComponent);
        instance.componentInstance.editMode = true;
        instance.componentInstance.patientId = patientId;
        instance.result.then((modalStatus: string) => {
            if (modalStatus === "OK") {
                this.refreshGrid();
            }
        });
    }

    public openModalAddPacient(): void {
        const instance: NgbModalRef = this.modalService.open(AddPatientComponent);
        instance.result.then((modalStatus: string) => {
            if (modalStatus === "OK") {
                this.refreshGrid();
            }
        });
    }

    public openConsultPacient(patientId: number):void{
        const instance: NgbModalRef = this.modalService.open(ConsultPatientComponent);
        instance.componentInstance.patientId = patientId;
        instance.result.then((modalStatus: string) => {
            if (modalStatus === "OK") {
                this.refreshGrid();
            }
        });
    }
}
