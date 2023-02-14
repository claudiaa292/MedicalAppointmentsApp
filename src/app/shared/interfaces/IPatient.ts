export interface IPatient {
    id: number;
    firstName: string;
    lastName: string;
    dateOfBirth: DateOfBirth | null;
    gender: TypeOfGender;
    CNP: string;
    phoneNumber: string;
    orderTiketNumber: number;
}

export type DateOfBirth = { year: number; month: number; day: number };

export type TypeOfGender = "male" | "female";
