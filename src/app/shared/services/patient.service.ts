import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { IPatient } from "../interfaces/IPatient";

@Injectable({
    providedIn: "root",
})
export class PatientService {
    constructor(private httpClient: HttpClient) {}

    public getPatients(): Observable<IPatient[]> {
        return this.httpClient.get<IPatient[]>(`http://localhost:3000/patients`);
    }

    public getUniqueNumber(): Observable<number> {
        return this.getPatients().pipe(
            map((patientList: IPatient[]) => {
                const sortedPatients: IPatient[] = patientList.sort(
                    (a: IPatient, b: IPatient) => b.orderTiketNumber - a.orderTiketNumber
                );

                if (sortedPatients.length === 0) {
                    return 10000;
                }
                return sortedPatients[0].orderTiketNumber + 1;
            })
        );
    }

    public getPatientById(patientId: number): Observable<IPatient> {
        return this.httpClient.get<IPatient>(`http://localhost:3000/patients/${patientId}`);
    }

    public deletePatients(id: number): Observable<IPatient[]> {
        return this.httpClient.delete<any>(`http://localhost:3000/patients/${id}`);
    }

    public updatePatient(id: number, updatedPatient: IPatient): Observable<IPatient> {
        return this.httpClient.put<IPatient>(
            `http://localhost:3000/patients/${id}`,
            updatedPatient
        );
    }

    public addPatients(newPatient: IPatient): Observable<IPatient> {
        return this.httpClient.post<IPatient>(`http://localhost:3000/patients`, newPatient);
    }
}
