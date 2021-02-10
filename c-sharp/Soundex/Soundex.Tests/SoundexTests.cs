using System.Collections.Generic;
using NUnit.Framework;

namespace Soundex.Tests
{
    public class SoundexTests
    {
        private Soundex sut;

        [SetUp]
        public void Setup() => sut = new Soundex();


        public static IEnumerable<TestCaseData> EncodingPermutations() => new List<TestCaseData>()
        {
            new("robert", "r163"),
            new("rupert", "r163"),
            new("rubin", "r150"),
            new("ashcraft", "a226"),
            new("ashcroft", "a226"),
            new("tymczak", "t522"),
            new("pfister", "p236"),
            new("honeyman", "h555"),
        };

        [Test]
        [TestCaseSource(nameof(EncodingPermutations))]
        public void EncodingShouldReturnCorrectCode(string input, string expected) =>
            Assert.That(sut.Encode(input), Is.EqualTo(expected));

        public static IEnumerable<TestCaseData> ConsonantPermutations => new List<TestCaseData>()
        {
            new("a", "0"),
            new("e", "0"),
            new("i", "0"),
            new("o", "0"),
            new("u", "0"),
            new("y", "0"),
            new("h", "0"),
            new("w", "0"),
            new("b", "1"),
            new("f", "1"),
            new("p", "1"),
            new("v", "1"),
            new("c", "2"),
            new("g", "2"),
            new("j", "2"),
            new("k", "2"),
            new("q", "2"),
            new("s", "2"),
            new("x", "2"),
            new("z", "2"),
            new("d", "3"),
            new("t", "3"),
            new("l", "4"),
            new("m", "5"),
            new("n", "5"),
            new("r", "6"),
            new("the quick brown fox jumped over the lazy dog", "300 20022 16005 102 205103 0106 300 4020 302"),
        };

        [Test]
        [TestCaseSource(nameof(ConsonantPermutations))]
        public void LettersShouldBeReplacedWithCorrectNumber(string input, string expected) =>
            Assert.That(sut.MapLetters(input), Is.EqualTo(expected));

        public static IEnumerable<TestCaseData> AdjacentPermutations() => new List<TestCaseData>()
        {
            new("1123", "123"),
            new("1111143", "143"),
            new("2358843", "235843"),
            new("abdardd", "abdard"),
            new("abdardert", "abdardert"),
        };

        [Test]
        [TestCaseSource(nameof(AdjacentPermutations))]
        public void AdjacentCharactersShouldBeRemoved(string input, string expected) =>
            Assert.That(sut.FilterAdjacent(input), Is.EqualTo(expected));

        public static IEnumerable<TestCaseData> ZerosPermutations() => new List<TestCaseData>()
        {
            new("012345", "12345"),
            new("120345", "12345"),
            new("12345", "12345"),
            new("03402300", "3423"),
            new("340506", "3456"),
        };

        [Test]
        [TestCaseSource(nameof(ZerosPermutations))]
        public void ZerosShouldBeRemoved(string input, string expected) =>
            Assert.That(sut.FilterZeros(input), Is.EqualTo(expected));

        public static IEnumerable<TestCaseData> SizePermutations() => new List<TestCaseData>()
        {
            new("2345", "234"),
            new("123", "123"),
            new("12", "120"),
            new("2", "200"),
            new("", "000"),
        };

        [Test]
        [TestCaseSource(nameof(SizePermutations))]
        public void SizeShouldBeAdjustedToThreeCharacters(string input, string expected) =>
            Assert.That(sut.AdjustSize(input), Is.EqualTo(expected));

        public static IEnumerable<TestCaseData> LetterNumberPermutations() => new List<TestCaseData>()
        {
            new("a", "00", "0"),
            new("b", "10", "0"),
            new("g", "20", "0"),
            new("t", "30", "0"),
            new("l", "40", "0"),
        };

        [Test]
        [TestCaseSource(nameof(LetterNumberPermutations))]
        public void ShouldDeduplicateWhenFirstLetterHasSameValueAsFirstNumber(string firstLetter, string input, string expected) =>
            Assert.That(sut.DeduplicateFirstLetter(firstLetter, input), Is.EqualTo(expected));
    }
}