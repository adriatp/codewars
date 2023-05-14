#include <iostream>
#include <algorithm>
#include <vector>

using namespace std;

int score(const std::vector<int>& dice) {
    int ret = 0;
    for (int i=1; i<=6; i++) {
        int trio = std::count(dice.begin(), dice.end(), i) / 3;
        ret += trio * i * (i == 1 ? 1000 : 100);
    }
    ret += (std::count(dice.begin(), dice.end(), 1) % 3) * 100;
    ret += (std::count(dice.begin(), dice.end(), 5) % 3) * 50;
    return ret;
}

int main() {
    cout << score({2, 3, 4, 6, 2}) << endl; // 0
    cout << score({2, 4, 4, 5, 4}) << endl; // 450
    cout << score({5, 1, 3, 4, 1}) << endl; // 250
    cout << score({1, 1, 1, 3, 1}) << endl; // 1100
    cout << score({2, 4, 4, 5, 4}) << endl; // 450
    return 0;
}
