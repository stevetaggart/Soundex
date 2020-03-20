package soundex

import (
	"fmt"
	"strings"
	"testing"
	"unicode"
)

type testStruct struct {
	input    string
	expected string
}

func baseTest(testFunc func(string) string, tests []testStruct, t *testing.T) {
	for _, test := range tests {
		t.Run(fmt.Sprintf("should map %s to %s", test.input, test.expected), func(t *testing.T) {
			actual := testFunc(test.input)
			if actual != test.expected {
				t.Errorf("expected: %s, actual: %s", test.expected, actual)
			}
		})
	}
}

func TestSoundex_WhenMappingVowelLikes(t *testing.T) {
	var tests = []testStruct {
		{
			"the quick brown fox jumped over the lazy dog",
			"t00 q00ck br00n f0x j0mp0d 0v0r t00 l0z0 d0g",
		}, {
			"THE QUICK BROWN FOX JUMPED OVER THE LAZY DOG",
			"T00 Q00CK BR00N F0X J0MP0D 0V0R T00 L0Z0 D0G",
		},
	}
	for _, val := range []string{"a", "e", "i", "o", "u", "y", "h", "w"} {
		tests = append(tests, testStruct{val, "0"})
		tests = append(tests, testStruct{strings.Map(unicode.ToUpper, val), "0"})
	}
	baseTest(mapVowelLikes, tests, t)
}

func TestSoundex_WhenMappingConsonants(t *testing.T) {
	tests := []testStruct{
		{"b", "1"},
		{"f", "1"},
		{"p", "1"},
		{"v", "1"},
		{"c", "2"},
		{"g", "2"},
		{"j", "2"},
		{"k", "2"},
		{"q", "2"},
		{"s", "2"},
		{"x", "2"},
		{"z", "2"},
		{"d", "3"},
		{"t", "3"},
		{"l", "4"},
		{"m", "5"},
		{"n", "5"},
		{"r", "6"},
		{ "the quick brown fox jumped over the lazy dog", "3he 2ui22 16ow5 1o2 2u51e3 o1e6 3he 4a2y 3o2" },
	}
	for _, v := range tests{
		tests = append(tests, testStruct{strings.ToUpper(v.input), strings.ToUpper(v.expected)})
	}
	baseTest(mapConsonants, tests, t)
}

func TestSoundex_WhenMappingAdjacent(t *testing.T) {
	tests := []testStruct {
		{"1123", "123"},
		{"1111143", "143"},
		{"2358843", "235843"},
		{"abdardd", "abdard"},
		{"abdardert", "abdardert"},
	}
	for _, v := range tests{
		tests = append(tests, testStruct{strings.ToUpper(v.input), strings.ToUpper(v.expected)})
	}
	baseTest(mapAdjacent, tests, t)
}

func TestSoundex_WhenRemovingZeros(t *testing.T) {
	tests := []testStruct {
		{"012345", "12345"},
		{"120345", "12345"},
		{"12345", "12345"},
		{"03402300", "3423"},
		{"340506", "3456"},
	}
	for _, v := range tests{
		tests = append(tests, testStruct{strings.ToUpper(v.input), strings.ToUpper(v.expected)})
	}
	baseTest(removeZeros, tests, t)
}

func TestSoundex_WhenTrimmingSize(t *testing.T) {
	tests := []testStruct {
		{"34567", "3456"},
		{"2345", "2345"},
		{"123", "1230"},
		{"12", "1200"},
		{"2", "2000"},
		{"", "0000"},
	}
	for _, v := range tests{
		tests = append(tests, testStruct{strings.ToUpper(v.input), strings.ToUpper(v.expected)})
	}
	baseTest(trimSize, tests, t)
}

func TestSoundex_WhenComparingFirst(t *testing.T) {
	tests := []testStruct {
		{"a00", "a0"},
		{"b10", "b0"},
		{"g20", "g0"},
		{"t30", "t0"},
		{"l40", "l0"},
		{"m50", "m0"},
		{"r60", "r0"},
		{"a10", "a10"},
		{"b20", "b20"},
		{"g30", "g30"},
		{"t40", "t40"},
		{"l60", "l60"},
		{"m60", "m60"},
		{"r10", "r10"},
	}
	baseTest(compareFirst, tests, t)
}

func TestSoundex_Soundex(t *testing.T) {
	tests := []testStruct {
		{"robert", "r163"},
		{"rupert", "r163"},
		{"rubin", "r150"},
		{"ashcraft", "a226"},
		{"ashcroft", "a226"},
		{"tymczak", "t522"},
		{"pfister", "p236"},
		{"honeyman", "h555"},
	}
	for _, v := range tests{
		tests = append(tests, testStruct{strings.ToUpper(v.input), strings.ToUpper(v.expected)})
	}
	baseTest(soundex, tests, t)
}
