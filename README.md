# Bee Assembly 🐝

## An education-driven REPL assembly language

The goal of Bee Assembly is to ease the transition from higher-level languages to assembly. Bee Assembly is interpreted with JavaScript, but shares the most common features (instructions, directives, syntax, etc.) of the most popular languages.

The interpreter, exportation, and language is designed to be as readable as possible.

## Instructions

This table uses some keys for conciseness. `d` is `d`estination, `s` is `s`ource, `pc` is `p`rogram `c`ounter, and `n` is a`n`y address or value. Addresses can be relative or absolute.

| function       | opcode      | action              |
| -------------- | ----------- | ------------------- |
| arithmetic     | add d, s    | d = d + s           |
|                | sub d, s    | d = d - s           |
|                | mul d, s    | d = d \* s          |
|                | div d, s    | d = d / s           |
| logic          | and d, s    | d = d & s           |
|                | or d, s     | d = d \| s          |
|                | xor d, s    | d = d ^ s           |
| branch         | beq d, s, n | if (d == s) pc += n |
|                | bne d, s, n | if (d != s) pc += n |
|                | bgt d, s, n | if (d > s) pc += n  |
|                | blt d, s, n | if (d < s) pc += n  |
|                | brk         | pc = 60             |
|                | jmp n       | pc = n              |
| load and store | lb d, n     | d = \*(char \*)(n)  |
|                | lw d, n     | d = \*(int \*)(n)   |
|                | sb s, n     | \*(char \*)(n) = s  |
|                | sw s, n     | \*(int \*)(n) = s   |
| shift          | sll d, n    | d = d << n          |
|                | srl d, n    | d = d >> n          |
|                | sla d, n    | d = d << n          |
|                | sra d, n    | d = d >> n          |
