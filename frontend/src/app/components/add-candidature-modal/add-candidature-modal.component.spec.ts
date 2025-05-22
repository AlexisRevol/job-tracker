import { type ComponentFixture, TestBed } from "@angular/core/testing";

import { AddCandidatureModalComponent } from "./add-candidature-modal.component";

describe("AddCandidatureModalComponent", () => {
	let component: AddCandidatureModalComponent;
	let fixture: ComponentFixture<AddCandidatureModalComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [AddCandidatureModalComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(AddCandidatureModalComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
