def disemvowel(string_):
    return ''.join(c for c in string_ if c not in 'aeiouAEIOU')

print(disemvowel("This website is for losers LOL!"))