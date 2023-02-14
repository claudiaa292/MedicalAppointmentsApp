import { Component, Input } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { IPatient } from "../../interfaces/IPatient";
import { PatientService } from "../../services/patient.service";

@Component({
    selector: "app-consult-pacient",
    templateUrl: "./consult-patient.component.html",
    styleUrls: ["./consult-patient.component.scss"],
})
export class ConsultPatientComponent {
    public patient!: IPatient;
    @Input() public patientId: number | null = null;

    constructor(public activeModal: NgbActiveModal, private patientService: PatientService) {}

    public closeModal(): void {
        this.activeModal.close();
    }

    public submitRemovePatient(): void {
        if (this.patientId) {
            this.patientService.deletePatients(this.patientId).subscribe(() => {
                this.activeModal.close("OK");
            });
        }
    }
}
