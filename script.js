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
    compute(){
        let computation
        const prev=parseFloat(this.previousOperand)
        const curr=parseFloat(this.currentOperand)

        if(isNaN(prev)||isNaN(curr)) return

        switch(this.operation){
            case '+' :
                computation=prev+curr
                break
            case '*' :
                    computation=prev*curr
                break
            case '-' :
                computation=prev-curr
                break
            case '÷' :
                computation=prev/curr
                break
            default:
                return
        }
        this.currentOperand=computation
        this.operation=undefined
        this.previousOperand=''
    }
    appendNumber(number){
        if(number==='.' && this.currentOperand.includes('.')) return
        this.currentOperand=this.currentOperand.toString() + number.toString()
    }
    chooseOperation(operation){
        if (this.currentOperand==='') return 
        if(this.previousOperand!=''){
            this.compute()
        }
        this.operation=operation
        this.previousOperand=this.currentOperand + this.operation
        this.currentOperand=''
        
    }
    getDisplayNumber(number){
        const stringNumber=number.toString()
        const integerDigits=parseFloat(stringNumber.split('.')[0])
        const decimalDigits=stringNumber.split('.')[1]
        let integerDisplay
        if(isNaN(integerDigits)){
            integerDisplay=''
        }
        else{
            integerDisplay=integerDigits.toLocaleString('en',{maximumFractionDigits: 0})
        }
        if(decimalDigits!=null){
            return `${integerDisplay}.${decimalDigits}`
        }
        else{
            return integerDisplay
        }
        return number
    }
    updateDisplay(){
        this.currentOperandTextElement.innerText=this.getDisplayNumber(this.currentOperand)
        this.previousOperandTextElement.innerText=this.getDisplayNumber(this.previousOperand)
    }
    delete(){
        if(this.currentOperand==='')return

    this.currentOperand=this.currentOperand.slice(0,-1)
    }
}

const numbersButtons=document.querySelectorAll('[data-number]')
const operandsButtons=document.querySelectorAll('[data-operation]')
const deleteButton=document.querySelector('[data-delete]')
const acButton=document.querySelector('[data-ac]')
const equalsButton=document.querySelector('[data-equals]')
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
acButton.addEventListener('click',()=>{
    calculator.clear()
    calculator.updateDisplay()
})

equalsButton.addEventListener('click',()=>{
    calculator.compute()
    calculator.updateDisplay()
})
deleteButton.addEventListener('click',()=>{
    calculator.delete()
    calculator.updateDisplay()
})