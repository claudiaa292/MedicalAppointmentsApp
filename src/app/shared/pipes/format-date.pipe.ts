import { Pipe, PipeTransform } from "@angular/core";
import { DateOfBirth } from "../interfaces/IPatient";

@Pipe({
    name: "formatDate",
})
export class FormatDatePipe implements PipeTransform {
    transform(date: DateOfBirth | null, args?: any): string {
        if (date) {
            return new Date(date.year + "-" + date.month + "-" + date.day).toLocaleDateString();
        }
        return "-";
    }
}
