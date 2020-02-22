import re


def soundex(name):
    first_char = name[0]
    previous_code = ""
    result = first_char
    for index, char in enumerate(name.lower()):
        current_code = ""
        if char in "bfpv":
            current_code = "1"
        if char in "cgjkqsxz":
            current_code = "2"
        if char in "dt":
            current_code = "3"
        if char in "l":
            current_code = "4"
        if char in "mn":
            current_code = "5"
        if char in "r":
            current_code = "6"

        if index > 0 and current_code == result[-1]:
            # two letters with the same number separated by 'h' or 'w' are coded as a single number
            if name[index - 1] in "hw":
                continue
        if current_code != previous_code and index > 0:
            result += current_code
        if current_code == previous_code and index == 1:
            continue

        if len(result) == 4:
            break

        previous_code = current_code

    if len(result) < 4:
        result = result.ljust(4, "0")
    return result

