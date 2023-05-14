#include <iostream>

using namespace std;

unsigned int countBits(unsigned long long n){
    unsigned int res = 0;
    while (n != 0) {
        res += (n % 2);
        n /= 2;
    }
    return res;
}

int main() {
    cout << countBits(0) << endl;
    cout << countBits(1) << endl;
    cout << countBits(1234) << endl;
    return 0;
}
