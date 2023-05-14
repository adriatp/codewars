#include <iostream>
#include <math.h>

using namespace std;

long long get_sum(unsigned int n) {
    return (pow(n+1,2) + (n+1) / 2) * pow(-1,n);
}

int main() {
    long long n = get_sum(0);
    cout << n << endl;
    n = get_sum(1);
    cout << n << endl;
    n = get_sum(2);
    cout << n << endl;
    n = get_sum(3);
    cout << n << endl;
    n = get_sum(4);
    cout << n << endl;
    n = get_sum(5);
    cout << n << endl;
    return 0;
}
