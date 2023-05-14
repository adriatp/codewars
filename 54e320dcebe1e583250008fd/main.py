def dec_2_fact_string(nb):
    fact = 1
    i = 1

    while nb >= fact:
        i += 1
        fact *= i
    
    fact //= i 
    i -= 1

    ret_str = ""
    while i > 0:
        code = nb // fact
        if code != 0:
            nb -= code * fact
        fact //= i
        i -= 1
        if code < 10:
            ret_str += str(code)
        else:
            ret_str += chr(ord('A') + code - 10)
    
    ret_str += "0" 
    return ret_str

def fact_string_2_dec(string):
    if string == "":
        return ""
    ret = 0
    fact = 1
    i=1
    for s in string[::-1][1::]:
        if s >= '0' and s <= '9':
            ret += (ord(s) - ord('0')) * fact
        else:
            ret += (ord(s) - ord('A') + 10) * fact
        i += 1
        fact *= i
    return ret


print("{}".format(dec_2_fact_string(0)))
print("{}".format(dec_2_fact_string(1)))
print("{}".format(dec_2_fact_string(2)))
print("{}".format(dec_2_fact_string(3))) 
print("{}".format(dec_2_fact_string(4))) 
print("{}".format(dec_2_fact_string(5))) 
print("{}".format(dec_2_fact_string(6)))
print("{}".format(dec_2_fact_string(463)))
print("{}".format(dec_2_fact_string(2982)))
print("{}".format(dec_2_fact_string(36288000)))
print("{}".format(dec_2_fact_string(0)))

print("{}".format(fact_string_2_dec("0"))) 
print("{}".format(fact_string_2_dec("10")))
print("{}".format(fact_string_2_dec("100")))
print("{}".format(fact_string_2_dec("110"))) 
print("{}".format(fact_string_2_dec("200"))) 
print("{}".format(fact_string_2_dec("210"))) 
print("{}".format(fact_string_2_dec("1000")))
print("{}".format(fact_string_2_dec("341010"))) 
print("{}".format(fact_string_2_dec("4042100")))
print("{}".format(fact_string_2_dec("A0000000000")))
print("{}".format(fact_string_2_dec("")))