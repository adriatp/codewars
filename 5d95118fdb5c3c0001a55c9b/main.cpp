/*
    Co-authored: codesectarian
*/

#include <bits/stdc++.h>

using namespace std;

unsigned long long prog_ari(unsigned long long f, unsigned long long l) {
    return (f + l) * (l-f+1) / 2;
}

unsigned long long jump_value(unsigned long long m) {
    return 4*m-5;
}

unsigned long long spiral_column(unsigned long long n, unsigned long long col) {
    unsigned long long pa_f, pa_l, diff;
    unsigned long long res = 0;
    unsigned long long sig = col;
    unsigned long long m = n;
    unsigned long long pa;

    if (n == 1 and col == 1) return 1;
    if (col <= ((n-n%2)/2)) {
        pa_f = col;
        pa_l = n-col;
        diff = pa_l-pa_f;
    }
    else {
        pa_f = n-col;
        pa_l = col-1;
        diff = pa_l-pa_f;
    }
    for (unsigned long long i=0; i<n; i++) {
        if (i == pa_f) {
            if (col < (n + (n % 2))/2) {
                res += prog_ari(sig - diff, sig);
                sig -= diff;
            }
            else {
                res += prog_ari(sig, sig + diff);
                sig += diff;
            }
            i = pa_l;
            m = 3 - (n % 2) + (i - ((n - (n % 2)) / 2)) * 2;
            sig -= jump_value(m);
        }
        else {
            res += sig;
            if (i<(n-(n%2))/2) {
                m = n - 2 * i;
                sig += jump_value(m);
            }
            else {
                m = 3 - (n % 2) + (i - ((n - (n % 2)) / 2)) * 2;
                sig -= jump_value(m);
            }
        } 
    }
    return res;
}

int main() {
    unsigned int n, c;

    for (int i=1; i<=6; i++) {
        for (int j=1; j<=i; j++) {
            n = i;
            c = j;
            cout << "n: " << n << " c: " << c << " res: " << spiral_column(n,c) << endl;
        }
    }

    return 0;
}
