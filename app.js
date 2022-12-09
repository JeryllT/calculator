class Calculator {
    constructor(previousOperandTextEle, currentOperandTextEle) {
        this.previousOperandTextEle = previousOperandTextEle
        this.currentOperandTextEle = currentOperandTextEle
        this.clear()
    }

    clear() {
        this.previous = ""
        this.current = ""
        this.operation = undefined
        
    }
    
    appendNumber(number) {
        if (number === "." && this.current.includes('.')) return
        this.current += number.toString()
    }

    selectOperation(operator) {
        if(this.current === "") return
        else if (this.previous !== "") {
            this.compute()
        }
        this.operation = operator
        this.previous = this.current
        this.previous += " " + this.operation
        this.current = ""
    }

    signChange() {
        console.log(this.current.slice(0,1))
        if (this.current.slice(0,1) === "-") {
            console.log(this.current.slice(1))
            this.current = this.current.slice(1)
        } else {
            this.current = "-" + this.current
        }
    }

    compute() {
        let computation
        const prev = parseFloat(this.previous)
        const current = parseFloat(this.current)
        if (isNaN(prev) || isNaN(current)) return
        switch(this.operation) {
            case "+":
                computation = prev + current
                break
            case "-":
                computation = prev - current
                break
            case "×":
                computation = prev * current
                break
            case "÷":
                computation = prev / current
                break
            default:
                return
        }
        this.current = computation
        this.operation = undefined
        this.previous = ""
    }

    getDisplayNumber(num) {
        return num
    }

    updateDisplay() {
        this.previousOperandTextEle.textContent = this.getDisplayNumber(this.previous)
        this.currentOperandTextEle.textContent = this.getDisplayNumber(this.current)
        
    }
}



const nums = document.querySelectorAll('[data-number]')
const ops = document.querySelectorAll('[data-operation]')
const previous = document.querySelector('[data-previous]')
const current = document.querySelector('[data-current]')
const clear = document.querySelector('[data-clear]')
const percent = document.querySelector('[data-percent]')
const equal = document.querySelector('[data-equals]')
const sign = document.querySelector('[data-sign]')

const calculator = new Calculator(previous, current)

nums.forEach(button => {
    button.addEventListener("click", () => {
        calculator.appendNumber(button.textContent)
        calculator.updateDisplay()
    })
})

clear.addEventListener("click", () =>{
    calculator.clear()
    calculator.updateDisplay()
})

ops.forEach(button => {
    button.addEventListener("click", () => {
        calculator.selectOperation(button.textContent)
        calculator.updateDisplay()
    })
})

equal.addEventListener("click", () =>{
    calculator.compute()
    calculator.updateDisplay()
})

sign.addEventListener("click", () => {
    calculator.signChange()
    calculator.updateDisplay()
})