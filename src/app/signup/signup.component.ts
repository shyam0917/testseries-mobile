import { Component, OnInit } from '@angular/core';
import { RouterExtensions } from "nativescript-angular/router";
import { Page } from "tns-core-modules/ui/page";

import { Color } from "tns-core-modules/color";
import { TextField } from "tns-core-modules/ui/text-field";
import { Label } from "tns-core-modules/ui/label";


@Component({
	selector: 'ns-signup',
	templateUrl: './signup.component.html',
	styleUrls: ['./signup.component.css'],
	moduleId: module.id,
})
export class SignupComponent implements OnInit {

	constructor(private routerExtensions: RouterExtensions,
		private page: Page) { }

	ngOnInit() {
		this.page.actionBarHidden = true;
	}

	gotologin(){
		this.routerExtensions.navigate(['/login']);
	}

	onFocus(args: any,labelObj) {
		// console.log(args)
		const textField = <TextField>args.object;

		// animate the label sliding up and less transparent.
		labelObj.animate({
			translate: { x: 0, y: - 25 },
			opacity: 1,
		}).then(() => { }, () => { });

		// set the border bottom color to green to indicate focus
		textField.borderBottomColor = new Color('#4CAF50');
	}

	onBlur(args: any, labelObj) {
		// const label = this.label.nativeElement;
		const textField = <TextField>args.object;

		// if there is text in our input then don't move the label back to its initial position.
		if (!textField.text) {
			labelObj.animate({
				translate: { x: 0, y: 0 },
				opacity: 0.4
			}).then(() => { }, () => { });
		}
		// reset border bottom color.
		textField.borderBottomColor = new Color('#A9A9A9');
	}

}
