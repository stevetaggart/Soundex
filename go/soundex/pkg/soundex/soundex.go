package soundex

import (
	"strings"
	"unicode"
)

func soundex(input string) string {
	head := string(input[0])
	tail := input[1:]

	return trimSize(compareFirst(head + removeZeros(mapAdjacent(mapConsonants(mapVowelLikes(tail))))))
}

var consonantMap = map[rune]rune {
	'b': '1',
	'f': '1',
	'p': '1',
	'v': '1',
	'c': '2',
	'g': '2',
	'j': '2',
	'k': '2',
	'q': '2',
	's': '2',
	'x': '2',
	'z': '2',
	'd': '3',
	't': '3',
	'l': '4',
	'm': '5',
	'n': '5',
	'r': '6',
}

func mapVowelLikes(input string) string {
	return strings.Map(func(r rune) rune {
		for _, val := range []rune{'a', 'e', 'i', 'o', 'u', 'y', 'h', 'w'} {
			if unicode.ToLower(r) == val {
				return '0'
			}
		}

		return r
	}, input)
}

func mapConsonants(input string) string {
	return strings.Map(func(r rune) rune {
		if val, ok := consonantMap[unicode.ToLower(r)]; ok {
			return val
		}

		return r
	}, input)
}

func mapAdjacent(input string) string {
	result := string(input[0])
	for i := range input {
		if i > 0 && input[i] != input[i-1] {
			result += string(input[i])
		}
	}

	return result
}

func removeZeros(input string) (result string) {
	return strings.Map(func(r rune) rune {
		if r == '0' {
			return -1
		}
		return r
	}, input)
}

func trimSize(input string) (result string) {
	for i := 0; i < 4; i++ {
		if i >= len(input) {
			result += "0"
		} else {
			result += string(input[i])
		}
	}

	return
}

func compareFirst(input string) string {
	var first = string(input[0])
	var second = string(input[1])

	if mapVowelLikes(first) == second || mapConsonants(first) == second {
		return first + input[2:]
	}

	return input
}
