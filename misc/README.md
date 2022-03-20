# Sources of this project

## Assembly Design

1. https://users.ece.utexas.edu/~valvano/assmbly/

2. https://www.tutorialspoint.com/assembly_programming/assembly_basic_syntax.htm

3. https://blog.mgechev.com/2017/09/16/developing-simple-interpreter-transpiler-compiler-tutorial/

4. https://dannyqiu.me/mips-interpreter/

5. https://github.com/mewmew/dissection

6. https://cs.lmu.edu/~ray/notes/nasmtutorial/

7. https://docs.oracle.com/cd/E26502_01/html/E28388/eqbsx.html

## Instruction Set

1. https://www.masswerk.at/6502/6502_instruction_set.html

2. https://developer.arm.com/documentation/dui0068/b/ARM-Instruction-Reference

3. http://sparksandflames.com/files/x86InstructionChart.html

4. https://pastraiser.com/cpu/i8080/i8080_opcodes.html

5. https://mathcs.holycross.edu/~csci226/MIPS/summaryHO.pdf

6. https://mark.theis.site/riscv/

7. https://five-embeddev.com/riscv-isa-manual/latest/c.html

# Syntax

Each term (label, operation, operand) must take the form `[^\s:,#]+`. Meaning that terms must not contain spaces, colons, comas, or hashtags.

```asm
label:operation operand#comment, comment: comment
label: operation operand,operand #  comment, :# comment
label: operation  operand,  operand#
label: operation operand
label: operation operand, operand
label: operation # comment, : comment
label: operation#
label: operation
label:
# comment, : comment
#comment:, : comment
    operation operand # comment, : comment
    operation operand, operand # comment, : comment
    operation operand
    operation operand, operand
    operation # comment, : comment
    operation #comment, : comment
    operation

```

## The grammar from this example is:

1. The label is the start of the line to the colon

2. The operation is the first term after the colon

3. The operands are the terms after the operation

4. The comments are everything following a semicolon

## Converting to Regex

1. Labels: `^[^\s:,#]+(?=:)`

2. Operations: `(?<!#.*)(?<=:\s*|^\s+)[^\s:,#]+`

3. Operands: `(?<!#.*)(?<=([^\s:]+\s+|,))[^\s:,#]+`

4. Comments: `(?<=#).*`

https://github.com/splch/bee-asm/blob/6f5cdcddcefe4743a0b6de1bdeaa120a49e85f11/docs/script.js#L2-L5
