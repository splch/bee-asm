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

# Grammar

```asm
label operation operand comment
label operation operand, operand comment
label operation operand
label operation operand, operand
label operation
label
    operation operand comment
    operation operand, operand comment
    operation operand
    operation operand, operand
    operation

```

Each line needs to be parsed in the following format:

```js
{
  label: '',
  operation: '',
  operand: [],
  comment: ''
}
```

## The rules from this example are:

1. The label is the start of the line to the first space
2. The operation is the first word after the first space
3. The operands are the number of words specified by the operation after the operation
4. Ignore the comments

## Converting to JavaScript

```js
let instructions = {
  operation0: 0,
  operation1: 1,
  operation2: 2,
};

function parse(line) {
  let label_flag = true;
  let indent_flag = false;
  let operation_flag = false;
  let operand_flag = false;
  let comment_flag = false;

  let label = "";
  let operation = "";
  let operand = "";
  let operands = [];
  let comment = "";

  for (let i = 0; i < line.length; i++) {
    let char = line[i];
    if (char !== " ") {
      if (label_flag) label += char;
      else if (operation_flag || indent_flag) {
        indent_flag = false;
        operation_flag = true;
        operation += char;
      } else if (operand_flag && operands.length < instructions[operation]) {
        operand += char;
        if (i === line.length - 1) {
          operands.push(operand);
          operand = "";
        }
      } else {
        comment += char;
      }
    } else {
      if (label_flag) {
        label_flag = false;
        if (i === 0) {
          indent_flag = true;
        } else {
          operation_flag = true;
        }
      } else if (operation_flag) {
        operation_flag = false;
        if (instructions[operation] === 0) {
          comment_flag = true;
        } else {
          operand_flag = true;
        }
      } else if (operand_flag) {
        operands.push(operand);
        operand = "";
        if (operands.length === instructions[operation]) {
          operand_flag = false;
          comment_flag = true;
        }
      } else if (comment_flag) {
        comment += char;
      }
    }
  }

  return {
    label,
    operation,
    operands,
    comment,
  };
}
```

We'll use a similar assembly string to test our parser:

```js
`label operation1 operand comment
label operation2 operand, operand comment
label operation1 operand
label operation2 operand, operand
label operation0
label
    operation1 operand comment
    operation2 operand, operand comment
    operation1 operand
    operation2 operand, operand
    operation0
`
  .split("\n")
  .forEach((line) => console.log(parse(line)));
```
