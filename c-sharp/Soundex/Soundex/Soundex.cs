using System;
using System.Collections.Generic;
using System.Linq;

namespace Soundex
{
    public class Soundex
    {
        private static readonly Dictionary<string, char?> LetterMappings = new()
        {
            ["aeiouyhw"] = '0',
            ["bfpv"] = '1',
            ["cgjkqsxz"] = '2',
            ["dt"] = '3',
            ["l"] = '4',
            ["mn"] = '5',
            ["r"] = '6',
        };

        public string Encode(string input) =>
            input[0] +
            AdjustSize(
            DeduplicateFirstLetter(input.Substring(0, 1),
                    FilterZeros(
                        FilterAdjacent(
                            MapLetters(input.Substring(1))))));

        public string MapLetters(string input) =>
            string.Concat(input.Select(c =>
                LetterMappings.SingleOrDefault(kv => kv.Key.Contains(c)).Value ?? c));

        public string FilterAdjacent(string input) =>
            input.Aggregate("", (acc, c) => acc.LastOrDefault() == c ? acc : acc + c);

        public string FilterZeros(string input) => input.Replace("0", "");

        public string AdjustSize(string input) =>
            input.PadRight(3, '0').Substring(0, 3);

        public string DeduplicateFirstLetter(string firstLetter, string input) =>
            input.StartsWith(MapLetters(firstLetter)) ? input.Substring(1) : input;
    }
}