import { type ComponentFixture, TestBed } from "@angular/core/testing";

import { PlannerHeaderComponent } from "./planner-header.component";

describe("PlannerHeaderComponent", () => {
	let component: PlannerHeaderComponent;
	let fixture: ComponentFixture<PlannerHeaderComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [PlannerHeaderComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(PlannerHeaderComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
