# Sources of this project

## Assembly Design

1. https://users.ece.utexas.edu/~valvano/assmbly/

2. https://www.tutorialspoint.com/assembly_programming/assembly_basic_syntax.htm

3. https://blog.mgechev.com/2017/09/16/developing-simple-interpreter-transpiler-compiler-tutorial/

## Instruction Set

1. https://www.masswerk.at/6502/6502_instruction_set.html

2. https://developer.arm.com/documentation/dui0068/b/ARM-Instruction-Reference

3. http://sparksandflames.com/files/x86InstructionChart.html

4. https://pastraiser.com/cpu/i8080/i8080_opcodes.html

5. https://mathcs.holycross.edu/~csci226/MIPS/summaryHO.pdf

6. https://mark.theis.site/riscv/

# Syntax

```asm
label: operation operand ; comment
label: operation operand, operand ; comment
label: operation operand
label: operation operand, operand
label: operation ; comment
label: operation
label:
; comment
;comment
    operation operand ; comment
    operation operand, operand ; comment
    operation operand
    operation operand, operand
    operation ; comment
    operation ;comment
    operation

```

## The grammar from this example is:

1. The label is the start of the line to the first space
2. The operation is the first word after the first space
3. The operands are the number of words specified by the operation after the operation
4. The comments are everything following the final operand

## Converting to Regex

1. Match and remove comments: `;.*`
2. Match and remove labels: `^.*:`
3. Match and remove operations: `^\s*\w+`
4. Match and remove operands: `\w+`

```js
let comments = new RegExp(/;.*/g);
let labels = new RegExp(/^.*:/g);
let operations = new RegExp(/^\s*\w+/g);
let operands = new RegExp(/\w+/g);
```
