module Soundex
    ( soundex
    , mapVowels
    , mapConsonants
    , mapAdjacent
    , removeZeros
    , compareFirst
    , trimSize
    ) where


soundex :: String -> String
soundex (a:as) = a : ((trimSize . compareFirst a . removeZeros . mapAdjacent . mapConsonants . mapVowels) as)


mapVowels :: String -> String
mapVowels str = concat $ map go str
    where go :: Char -> String
          go v 
            | v `elem` "aeiouyhwAEIOUYHW" = "0"
            | otherwise                   = [v]


mapConsonants :: String -> String
mapConsonants str = concat $ map go str
    where go v
            | v `elem` "bfpvBFPV"         = "1"
            | v `elem` "cgjkqsxzCGJKQSXZ" = "2"
            | v `elem` "dtDT"             = "3"
            | v `elem` "lL"               = "4"
            | v `elem` "mnMN"             = "5"
            | v `elem` "rR"               = "6"
            | otherwise                   = [v]

mapAdjacent :: String -> String
mapAdjacent (a:as) = reverse $ foldl (\acc x -> if x == (head acc) then acc else x : acc) [a] as


removeZeros :: String -> String
removeZeros = filter (/='0')

compareFirst :: Char -> String -> String
compareFirst letter (num:nums)
    | mapVowels [letter] == [num]     = nums
    | mapConsonants [letter] == [num] = nums
    | otherwise                       = num:nums

trimSize :: String -> String
trimSize as
    | length as > 3 = take 3 as
    | length as < 3 = as ++ replicate (3 - length as) '0'
    | otherwise     = as
