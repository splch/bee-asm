###############################################################################
#                                                                             #
#         _            _  _                                  _      _         #
#        | |          | || |                                | |    | |        #
#        | |__    ___ | || |  ___     __      __ ___   _ __ | |  __| |        #
#        | '_ \  / _ \| || | / _ \    \ \ /\ / // _ \ | '__|| | / _` |        #
#        | | | ||  __/| || || (_) |_   \ V  V /| (_) || |   | || (_| |        #
#        |_| |_| \___||_||_| \___/( )   \_/\_/  \___/ |_|   |_| \__,_|        #
#                                 |/                                          #
#                                                                             #
###############################################################################

#############################    data section     #############################

section .data                 # the section directive is used to define a data
                              # section

hello:                        # the CPU can jump to the hello label in memory
    .string "hello, world\n", # the message is a string with a new line

#############################    code section     #############################

section .text                 # the section directive is used to declare a
                              # section of code

global start                  # the global directive is used to declare a
                              # global label

start:                        # the label for the start of the program
    mov rax, 1                # system call for write
    mov rdi, 1                # file handle 1 is stdout
    mov rsi, hello            # address of string to output
    mov rdx, 13               # number of bytes
    syscall                   # invoke operating system to do the write
    mov rax, 60               # system call for exit
    xor rdi, rdi              # exit code 0
    syscall                   # invoke operating system to exit