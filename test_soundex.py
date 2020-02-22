from soundex import *


def test_soundex_retains_first_letter():
    name = "Steve"
    assert soundex(name)[0] == "S"


def test_soundex_drops_all_occurrences_of_aeiouyhw():
    name = "Sohawtievuye"
    assert soundex(name) == "S310"


def test_soundex_replaces_bfpv_with_1():
    name = "Steve"
    assert soundex(name) == "S310"


def test_soundex_replaces_cgjkqsxz_with_2():
    name = "Stevecgjkqsxz"
    assert soundex(name) == "S312"


def test_soundex_replaces_dt_with_3():
    name = "Steved"
    assert soundex(name) == "S313"


def test_soundex_replaces_l_with_4():
    name = "Lamarl"
    assert soundex(name) == "L564"


def test_soundex_replaces_mn_with_5():
    name = "Quincy"
    assert soundex(name) == "Q520"


def test_soundex_replaces_r_with_6():
    name = "Richard"
    assert soundex(name) == "R263"


def test_soundex_robert_rupert():
    name1 = "Robert"
    name2 = "Rupert"
    assert soundex(name1) == "R163"
    assert soundex(name1) == soundex(name2)


def test_soundex_ashcraft_ashcroft():
    name1 = "Ashcraft"
    name2 = "Ashcroft"
    assert soundex(name2) == "A261"
    assert soundex(name1) == soundex(name2)


def test_soundex_Tymczak():
    name = "Tymczak"
    assert soundex(name) == "T522"


def test_soundex_Pfister():
    name = "Pfister"
    assert soundex(name) == "P236"


def test_honeyman():
    name = "Honeyman"
    assert soundex(name) == "H555"


def test_Rubin():
    name = "Rubin"
    assert soundex(name) == "R150"


def test_Ha():
    name = "Ha"
    assert soundex(name) == "H000"


def test_Mmoneyman():
    name = "Mmoneyman"
    assert soundex(name) == "M555"
