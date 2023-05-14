#include <iostream>
#include <cmath>
#include <string> 

using namespace std;

bool is_prime(unsigned int n) {
    if (n == 2 || n == 3) return true;
    if (n % 2 == 0 || n % 3 == 0) return false;
    for (unsigned int i = 6; i <= (unsigned int) std::ceil(std::sqrt(n)) + 1; i+=6) {
        if (n % (i-1) == 0) return false;
        if (n % (i+1) == 0) return false;
    }
    return true;
}

unsigned int even_digits(unsigned int n) {
    unsigned int count = 0;
    for (unsigned int i=0; i<to_string(n).size(); i++) {
        if (to_string(n)[i] == '0' || to_string(n)[i] == '2' || to_string(n)[i] == '4' || to_string(n)[i] == '6' || to_string(n)[i] == '8') count ++;
    }
    return count;
}

unsigned int f(unsigned int n) {
    unsigned int max_possible_even_digits = n < 10 ? 1 : to_string(n).size() - 1;
    unsigned int max_even_digits_found = 0;
    unsigned int best_number_found = 0;

    if (n < 24) return 2;
    unsigned int start = n - (n % 6);

    if (start == n || start == n - 1) {
        if (is_prime(start-1)) {
            best_number_found = start-1;
            max_even_digits_found = even_digits(start-1);
        }
        start -= 6;
    }
    
    for (unsigned int i=start; true; i-=6) {
        max_possible_even_digits = n < 10 ? 1 : to_string(i).size() - 1;
        if (max_possible_even_digits <= max_even_digits_found) return best_number_found;
        if (max_even_digits_found < 1 && i < 23) return 2;
        if (is_prime(i+1) && even_digits(i+1) > max_even_digits_found) {
            best_number_found = i+1;
            max_even_digits_found = even_digits(i+1);
        }
        if (is_prime(i-1) && even_digits(i-1) > max_even_digits_found) {
            best_number_found = i-1;
            max_even_digits_found = even_digits(i-1);
        }
    }

    return 0;
}

int main() {
    unsigned int p = f(1000);
    cout << p << endl;
    p = f(1210);
    cout << p << endl;
    p = f(1210);
    cout << p << endl;
    p = f(10000);
    cout << p << endl;
    p = f(500);
    cout << p << endl;
    p = f(487);
    cout << p << endl;
    p = f(7234);
    cout << p << endl;

    cout << is_prime(6889) << endl;
    return 0;
}