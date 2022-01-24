export default class Button {
	constructor(button, clickEvent) {
		this.button = button
		this.clickEvent = clickEvent(button)
	}
	bind() {
		return `.js-button[data-key='${this.button}']`
	}
	onClick() {
		return this.clickEvent()
	}
	view() {
		return `
			<div>
				<button class="button js-button" data-key="${this.button}">${this.button}</button>
			</div>
		`
	}
}