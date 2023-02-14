import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { WaitingListComponent } from "./shared/components/waiting-list/waiting-list.component";

const routes: Routes = [
    {
        path: "",
        component: WaitingListComponent,
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
