# Bee Assembly 🐝

## An education-driven REPL assembly language

```
  ,-.        eval
  \ /  read .' `. print
>(8||} .    .   .     .
  / \   `- - ` ' - - '
  `-'
```

![LGTM Grade](https://img.shields.io/lgtm/grade/javascript/github/splch/bee-asm)
![Snyk Vulnerabilities for GitHub Repo](https://img.shields.io/snyk/vulnerabilities/github/splch/bee-asm)

The goal of Bee Assembly is to ease the transition from using higher-level languages to learning assembly. Bee Assembly is interpreted with JavaScript, but shares the most common features (syntax, directives, instructions, etc.) of the most common languages.

The language and its interpreter are designed to be as readable as possible. Not only should the language be easy to use, but it should be a good reference for basic interpreter design.

## Example

Bee Assembly follows the conventional syntax of assembly language, but takes a strong inspiration from the design of RISC-V and accessibility of 6502.

Here is a `hello, world` example in Bee Assembly:

```asm
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;                                                                             ;
;         _            _  _                                  _      _         ;
;        | |          | || |                                | |    | |        ;
;        | |__    ___ | || |  ___     __      __ ___   _ __ | |  __| |        ;
;        | '_ \  / _ \| || | / _ \    \ \ /\ / // _ \ | '__|| | / _` |        ;
;        | | | ||  __/| || || (_) |_   \ V  V /| (_) || |   | || (_| |        ;
;        |_| |_| \___||_||_| \___/( )   \_/\_/  \___/ |_|   |_| \__,_|        ;
;                                 |/                                          ;
;                                                                             ;
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;    data section     ;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

.data                         ; the data directive defines a data section

hello:                        ; the CPU can jump to the hello label in memory
	.string "hello, world\n", ; the label points to a string with a new line


;;;;;;;;;;;;;;;;;;;;;;;;;;;;;    code section     ;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

.text                         ; the text directive defines where assembly code
							  ; is run

.global start                 ; the global directive is used to declare a
                              ; global label

start:                        ; the label for the start of the program
	mov rax, 1                ; instruct the system to write
	mov rdi, 1                ; output to stdout
	mov rsi, hello            ; address of string to output
	mov rdx, 13               ; number of bytes of the string
	ecall                     ; call kernel to write string

	mov rax, 60               ; instruct the system to exit
	mov rdi, 0                ; exit code 0
	ecall                     ; return 0
```

## Syntax

Each line of Bee Assembly will take the following form:

```
label:	operation operand ; comment
```

- A label is a string of characters that starts a line and ends at a colon. (optional)

- An operation is a string of characters that either begins after a tab or label. (required)

- An operand is a string of characters that follow an operation or comma. (optional)

- A comment is everything after a hashtag. (optional)

## Directives

| directive | description     | usage                  |
| --------- | --------------- | ---------------------- |
| `.data`   | data block      | read and write         |
| `.text`   | assembly block  | read and execute       |
|           |                 |                        |
| `.global` | global label    | `.global label`        |
|           |                 |                        |
| `.string` | character array | `.string "characters"` |
| `.bits`   | bit array       | `.bits 1010`           |

## Instructions

This table uses some keys for conciseness. `d` is `d`estination, `s` is `s`ource, `pc` is `p`rogram `c`ounter, and `n` is a`n`y address or value. Addresses can be relative or absolute.

| function   | opcode      | action              |
| ---------- | ----------- | ------------------- |
| arithmetic | mov d, s    | d = s               |
|            | add d, s    | d = d + s           |
|            | sub d, s    | d = d - s           |
|            | mul d, s    | d = d \* s          |
|            | div d, s    | d = d / s           |
| logic      | and d, s    | d = d & s           |
|            | or d, s     | d = d \| s          |
|            | xor d, s    | d = d ^ s           |
| branch     | beq d, s, n | if (d == s) pc += n |
|            | bne d, s, n | if (d != s) pc += n |
|            | bgt d, s, n | if (d > s) pc += n  |
|            | blt d, s, n | if (d < s) pc += n  |
|            | jmp n       | pc = n              |
|            | brk         | pc = 60             |
|            | nop         |                     |
| shift      | sll d, n    | d = d << n          |
|            | srl d, n    | d = d >> n          |
|            | sla d, n    | d = d << n          |
|            | sra d, n    | d = d >> n          |
