import { Calculator, Null, Addition, Substraction, Multiplication, Division } from "./Calculator.js"
import Button from "./Button.js"
import Text from "./Text.js"

class ButtonTrigger {
	constructor(view, selector, handleClick) {
		this.view = view
		this.selector = selector
		this.bind = $(selector)
		this.handleClick = handleClick
		this.bind.on("click", () => {
			this.handleClick()
			this.update()
		})
	}
	
	event(eventName) {
		if (eventName !== "update" && eventName !== "display") return
		this.bind = $(this.selector)
		this.bind.on("click", () => {
			this.handleClick()
			this.update()
		})
	}
	update() {
		this.view.update()
	}
}

class UpdateTrigger {
	constructor(updater) {
		this.updater = updater
	}
	event(eventName) {
		if (eventName === "update") this.update()
	} 
	update() {
		this.updater.update()
	}
}

class View {
	constructor(root) {
		this.root = root
		this.triggers = []
		this.components = []

	}
	addComponent(component) {
		this.trigger("addComponent")
		this.components.push(component)
	}

	addTrigger(trigger) {
		this.trigger("addTriggers")
		this.triggers.push(trigger)
	}

	trigger(eventName) {
		this.triggers.forEach(t => t.event(eventName))
	}

	update() {
		this.root.empty()
		this.display()
		this.trigger("update")
	}

	display() {
		this.trigger("display")
		this.components.forEach(c => this.root.append(c(this).view()))
	}
}
let operation = new Null(), calculator = new Calculator()

function handleClick(action) {
	return () => {
		console.log("hello")
		if (action === "C") {
			reset()
			return
		}
		if (action === "+" || action === "-" || action === "/" || action === "*") {
			calculator.execute(operation)
			operation = textToOperation(action, calculator.current)
			calculator.current = 0
			return
		}
		if (action === "=") {
			calculator.execute(operation)
			return
		}

		calculator.current = parseInt(`${calculator.current || ""}${action}`)

	}
}

function textToOperation(text, value) {
	switch (text) {
		case "+":   return new Addition(value)
		case "-":   return new Substraction(value)
		case "/":   return new Division(value)
		case "*":   return new Multiplication(value)
		default:    return new Null()
	}
}

function reset() {
	calculator.current = 0
	operation = new Null()
}

$(document).ready(() => {
	const result = new View($(".js-content"))
	result.addComponent(() => new Text(calculator.view()))
	result.display()
	const buttons = new View($(".js-buttons"))
	buttons.root.data("buttons").split(" ").forEach(button => {
		const c = () => new Button(button, handleClick)
		buttons.addComponent(c)
	})
	buttons.addTrigger(new UpdateTrigger(result))
	buttons.display()
	buttons.root.data("buttons").split(" ").forEach(button => {
		const c = () => new Button(button, handleClick)
		buttons.addTrigger(new ButtonTrigger(buttons, c(buttons).bind(), () => c(buttons).onClick()))
	})
})