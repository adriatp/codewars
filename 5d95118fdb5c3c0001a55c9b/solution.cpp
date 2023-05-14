#include <bits/stdc++.h>

using namespace std;

unsigned long long spiral_column(unsigned long long n, unsigned long long col) {
  unsigned long long sum = 0;
  while (n != col) {
    sum += col + (n * 2 - 1) * (n - 1);
    col = n - col;
    n = n - 1;
    cout << sum << endl;
  }
  sum += n * (n * 3 - 1) / 2;
  return sum;
}


int main() {
    unsigned long long n,c;
    n=5; c=3;
    unsigned long long res = spiral_column(n,c);
    cout << res << endl;
}