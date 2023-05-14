def next_number(n):
    ret = 0
    while (n):
        ret = ret + (n % 10)**2 
        n = n // 10
    return ret

def is_happy_rec(n, rep_set):
    if n in rep_set:
        return n
    next_n = next_number(n)
    rep_set.add(n)
    return is_happy_rec(next_n,rep_set)

def is_happy(n):
    return is_happy_rec(n,{1}) == 1

print(is_happy(1))
print(is_happy(7))
print(is_happy(901))
print(is_happy(16))
print(is_happy(37))