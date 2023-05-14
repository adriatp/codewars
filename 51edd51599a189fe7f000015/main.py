from statistics import mean

def solution(array_a, array_b):
    ret_list = []
    for i in range(len(array_a)):
        ret_list.append((array_a[i] - array_b[i])**2)
    if len(ret_list) == 0:
        return 0
    return mean(ret_list)


a1 = [1,2,3]
a2 = [4,5,6]
print("{}".format(solution(a1, a2)))

a1 = [10, 20, 10, 2]
a2 = [10, 25, 5, -2]
print("{}".format(solution(a1, a2)))

a1 = [0, -1]
a2 = [-1, 0]
print("{}".format(solution(a1, a2)))

a1 = [10, 10]
a2 = [10, 10]
print("{}".format(solution(a1, a2)))

a1 = []
a2 = []
print("{}".format(solution(a1, a2)))