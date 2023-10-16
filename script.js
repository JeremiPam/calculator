class Calculator{
    constructor(previousOperandTextElement,currentOperandTextElement){
        this.previousOperandTextElement=previousOperandTextElement
        this.currentOperandTextElement=currentOperandTextElement
        this.clear()
    }

    clear(){
        this.currentOperand=''
        this.previousOperand=''
        this.operation=undefined
    }
    appendNumber(number){
        if(number==='.' && this.currentOperand.includes('.')) return
        this.currentOperand=this.currentOperand.toString() + number.toString()
    }
    chooseOperation(operation){
        if (this.currentOperand==='') return 
        this.operation=operation
        this.previousOperand=this.currentOperand
        this.currentOperand=''
        
    }

    updateDisplay(){
        this.currentOperandTextElement.innerText=this.currentOperand
        this.previousOperandTextElement.innerText=this.previousOperand + this.operation.toString()
    }
}

const numbersButtons=document.querySelectorAll('[data-number]')
const operandsButtons=document.querySelectorAll('[data-operation]')
const deleteButton=document.querySelector('[data-delete]')
const acButton=document.querySelector('[data-ac]')
const previousOperandTextElement=document.querySelector('[data-previous-operand]')
const currentOperandTextElement=document.querySelector('[data-current-operand]')

const calculator=new Calculator(previousOperandTextElement,currentOperandTextElement)

numbersButtons.forEach(button => {
    button.addEventListener('click',()=>{
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})
operandsButtons.forEach(button=>{
    button.addEventListener('click',()=>{
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})