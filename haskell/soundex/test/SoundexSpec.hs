module SoundexSpec where

import Soundex
import Data.Char
import Test.Hspec
import Test.Validity


baseTest f str expected = do
    let testName = "should map " ++ str ++ " to " ++ expected
    it testName $ do
       (f str) `shouldBe` expected 

baseTestWithUpper f str expected = do
    let upperStr = map (toUpper) str
    let upperExpected = map (toUpper) expected
    baseTest f str expected
    baseTest f upperStr upperExpected


vowelTest = baseTestWithUpper mapVowels

consonantTest = baseTestWithUpper mapConsonants

adjacentTest = baseTestWithUpper mapAdjacent

removeZerosTest = baseTestWithUpper removeZeros

trimSizeTest = baseTestWithUpper trimSize

soundexTest = baseTestWithUpper soundex

compareFirstTest letter str expected = do
    let testName = "should map " ++ [letter] ++ str ++ " to " ++ expected
    it testName $ do
       (compareFirst letter str) `shouldBe` expected 


spec :: Spec
spec = do
    describe "when mapping vowell-like" $ do
        vowelTest "a" "0"
        vowelTest "e" "0"
        vowelTest "i" "0"
        vowelTest "o" "0"
        vowelTest "u" "0"
        vowelTest "y" "0"
        vowelTest "h" "0"
        vowelTest "w" "0"
        vowelTest "the quick brown fox jumped over the lazy dog" "t00 q00ck br00n f0x j0mp0d 0v0r t00 l0z0 d0g"

    describe "when mapping consonants" $ do
        consonantTest "b" "1"
        consonantTest "f" "1"
        consonantTest "p" "1"
        consonantTest "v" "1"
        consonantTest "c" "2"
        consonantTest "g" "2"
        consonantTest "j" "2"
        consonantTest "k" "2"
        consonantTest "q" "2"
        consonantTest "s" "2"
        consonantTest "x" "2"
        consonantTest "z" "2"
        consonantTest "d" "3"
        consonantTest "t" "3"
        consonantTest "l" "4"
        consonantTest "m" "5"
        consonantTest "n" "5"
        consonantTest "r" "6"
        consonantTest "a" "a"
        consonantTest "the quick brown fox jumped over the lazy dog" "3he 2ui22 16ow5 1o2 2u51e3 o1e6 3he 4a2y 3o2"

    describe "when mapping adjacent" $ do
        adjacentTest "1123" "123"
        adjacentTest "1111143" "143"
        adjacentTest "2358843" "235843"
        adjacentTest "abdardd" "abdard"
        adjacentTest "abdardert" "abdardert"

    describe "when removing zeros" $ do
        removeZerosTest "012345" "12345"
        removeZerosTest "120345" "12345"
        removeZerosTest "12345" "12345"
        removeZerosTest "03402300" "3423"
        removeZerosTest "340506" "3456"

    describe "when trimming size" $ do
        trimSizeTest "2345" "234"
        trimSizeTest "123" "123"
        trimSizeTest "12" "120"
        trimSizeTest "2" "200"
        trimSizeTest "" "000"

    describe "when comparing first number to first letter" $ do
        compareFirstTest 'a' "00" "0"
        compareFirstTest 'b' "10" "0"
        compareFirstTest 'g' "20" "0"
        compareFirstTest 't' "30" "0"
        compareFirstTest 'l' "40" "0"
        compareFirstTest 'm' "50" "0"
        compareFirstTest 'r' "60" "0"
        compareFirstTest 'a' "10" "10"
        compareFirstTest 'b' "20" "20"
        compareFirstTest 'g' "30" "30"
        compareFirstTest 't' "40" "40"
        compareFirstTest 'l' "60" "60"
        compareFirstTest 'm' "60" "60"
        compareFirstTest 'r' "10" "10"

    describe "when running soundex" $ do
        soundexTest "robert" "r163"
        soundexTest "rupert" "r163"
        soundexTest "rubin" "r150"
        soundexTest "ashcraft" "a226"
        soundexTest "ashcroft" "a226"
        soundexTest "tymczak" "t522" 
        soundexTest "pfister" "p236" 
        soundexTest "honeyman" "h555"
        
        
