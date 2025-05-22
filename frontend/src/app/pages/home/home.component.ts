import { Component } from "@angular/core";
import { CounterComponent } from "app/components/counter/counter.component";

@Component({
	selector: "app-home",
	standalone: true,
	imports: [CounterComponent],
	templateUrl: "./home.component.html",
	styleUrls: ["./home.component.css"],
})
export class HomeComponent {
	title = "Bienvenue HomeComponent sur le suivi de candidatures";
}
