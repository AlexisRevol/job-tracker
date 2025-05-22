import { Component } from "@angular/core";

@Component({
	selector: "app-planner-header",
	imports: [],
	templateUrl: "./planner-header.component.html",
	styleUrl: "./planner-header.component.css",
})
export class PlannerHeaderComponent {
	today = new Date();
	day = this.today.toLocaleDateString("en-US", { weekday: "short" }); // "Mon"
	date = this.today.getDate(); // 19
	month = this.today.toLocaleDateString("en-US", { month: "short" }); // "May"
}
