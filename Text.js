let id = 0

export default class Text {
	constructor(text) {
		this.id = ++id
		this.text = text
	}
	onClick() {}
	bind() {
		return `[data-key="${this.id}"]`
	}
	view() {
		return `
			<h1 class="js-value value" data-key="${this.id}">${this.text}</h1>
		`
	}
}