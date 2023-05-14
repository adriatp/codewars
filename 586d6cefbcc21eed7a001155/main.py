def longest_repetition(chars):
    if chars == "":
        return ("", 0)
    max_length = 1
    act_length = 1
    max_letter = chars[0]
    for i in range(1, len(chars)):
        if chars[i] == chars[i-1]:
            act_length += 1
        else:
            act_length = 1
        if act_length > max_length:
            max_length = act_length
            max_letter = chars[i]
    return (max_letter, max_length)

a,b = longest_repetition("aaaabb")
print("{} {}".format(a,b))
a,b = longest_repetition("bbbaaabaaaa")
print("{} {}".format(a,b))
a,b = longest_repetition("cbdeuuu900")
print("{} {}".format(a,b))
a,b = longest_repetition("abbbbb")
print("{} {}".format(a,b))
a,b = longest_repetition("aabb")
print("{} {}".format(a,b))
a,b = longest_repetition("ba")
print("{} {}".format(a,b))
a,b = longest_repetition("")
print("{} {}".format(a,b))
