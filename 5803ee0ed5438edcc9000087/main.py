def padovan_rec(i,n,p1,p2,p3):
    if i == n:
        return p1 + p2
    return padovan_rec(i+1,n,p2,p3,p1+p2)

def padovan(n):
    if n == 0 or n == 1 or n == 2:
        return 1
    return padovan_rec(3,n,1,1,1)

print("0: {}".format(padovan(0)))
print("0: {}".format(padovan(1)))
print("0: {}".format(padovan(2)))
print("0: {}".format(padovan(3)))
print("0: {}".format(padovan(4)))
print("0: {}".format(padovan(5)))
print("0: {}".format(padovan(6)))
print("7: {}".format(padovan(7)))
print("0: {}".format(padovan(8)))
print("0: {}".format(padovan(9)))
print("0: {}".format(padovan(10)))
print("0: {}".format(padovan(11)))
print("0: {}".format(padovan(100)))