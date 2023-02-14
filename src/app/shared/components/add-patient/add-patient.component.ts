import { Component, Input, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { PatientService } from "../../services/patient.service";
import { DateOfBirth, IPatient, TypeOfGender } from "../../interfaces/IPatient";

@Component({
    selector: "app-add-appointment",
    templateUrl: "./add-patient.component.html",
    styleUrls: ["./add-patient.component.scss"],
})
export class AddPatientComponent implements OnInit {
    @Input() public editMode: boolean = false;
    @Input() public patientId: number | null = null;

    public genders: TypeOfGender[] = ["male", "female"];
    public addPatientForm!: FormGroup;
    public date: Date = new Date();
    public todayDate: number = this.date.getDate();
    public month: number = this.date.getMonth() + 1;
    public year: number = this.date.getFullYear();

    constructor(public activeModal: NgbActiveModal,
                private patientService: PatientService) {
    }

    public ngOnInit(): void {
        this.generateReactiveForm();
        this.getCurrentPatient();
    }

    public getCurrentPatient(): void {
        if (this.patientId) {
            this.patientService.getPatientById(this.patientId)
                .subscribe((patient: IPatient) => {
                    this.addPatientForm.controls["firstName"].setValue(patient.firstName);
                    this.addPatientForm.controls["lastName"].setValue(patient.lastName);
                    this.addPatientForm.controls["dateOfBirth"].setValue(patient.dateOfBirth);
                    this.addPatientForm.controls["gender"].setValue(patient.gender);
                    this.addPatientForm.controls["CNP"].setValue(patient.CNP);
                    this.addPatientForm.controls["phoneNumber"].setValue(patient.phoneNumber);
                    this.addPatientForm.controls["orderTiketNumber"].setValue(patient.orderTiketNumber);
                });
        }
    }

    public generateReactiveForm(): void {
        this.addPatientForm = new FormGroup({
            firstName: new FormControl<string | null>(null, Validators.required),
            lastName: new FormControl<string | null>(null, Validators.required),
            dateOfBirth: new FormControl<null | DateOfBirth>(null, Validators.required),
            gender: new FormControl<"null" | TypeOfGender>("male", Validators.required),
            CNP: new FormControl<string | null>(null, [
                Validators.pattern("^(\\d{13})$"),
            ]),
            phoneNumber: new FormControl<number | null>(null, Validators.pattern("^[0-9]*$")),
            orderTiketNumber: new FormControl<number | null>(null, Validators.required),
        });

        if (!this.editMode) {
            this.patientService.getUniqueNumber().subscribe((orderNumber: number) => {
                this.addPatientForm.controls["orderTiketNumber"].setValue(orderNumber);
            });
        }
    }

    public closeModal(): void {
        this.activeModal.close("OK");
    }

    public onAddPatient(): void {
        if (this.editMode) {
            if (this.patientId) {
                this.patientService.updatePatient(this.patientId, this.addPatientForm.value)
                    .subscribe(() => {
                        this.activeModal.close("OK");
                    });
            }
        } else {
            this.patientService.addPatients(this.addPatientForm.value).subscribe(() => {
                this.activeModal.close("OK");
            });
        }
    }
}
