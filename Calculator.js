export class Null {
    constructor(){}
    execute(current){
        return current
    }
}

export class Addition {
    constructor(value) {
        this.value = value
    }
    execute(current) {
        return current + this.value
    }
}

export class Substraction {
    constructor(value) {
        this.value = value
    }
    execute(current) {
        return current - this.value
    }
}

export class Multiplication {
    constructor(value) {
        this.value = value
    }
    execute(current) {
        return current * this.value
    }
}

export class Division {
    constructor(value) {
        this.value = value
    }
    execute(current) {
        return current / this.value
    }
}

export class Calculator {
    constructor() {
        this.current = null
    }
    view() {
        if (this.current === null) return "0"
        return this.current.toString()
    }
    execute(operation) {
        this.current = operation.execute(this.current)
    }
}