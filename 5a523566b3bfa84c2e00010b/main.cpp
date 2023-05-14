#include <iostream>
#include <vector>
#include <bits/stdc++.h>

using namespace std;

int minSum (vector<int> passed) {
    int sum = 0;
    sort(passed.begin(), passed.end());
    for (int i=0; i<passed.size()/2; i++) {
        sum += passed[i] * passed[passed.size()-i-1];
    }
    return sum;
}

int main() {
    vector<int> vect;
    vect.push_back(10);
    vect.push_back(20);
    vect.push_back(30);
    vect.push_back(40);
    cout << minSum(vect) << endl;
    return 0;
}