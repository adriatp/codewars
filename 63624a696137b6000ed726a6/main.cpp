#include <utility>
#include <vector>
#include <iostream>

using namespace std;

std::pair<int, int> minimum_amount(const std::vector<int>& moves) {
    int boxes_f = 0, boxes_s = 0;
    int min_boxes_f = 0, min_boxes_s = 0;
    for (int i=0; i<moves.size(); i++) {
        if (i % 2 == 0) {
            if (boxes_f < moves[i]) min_boxes_f += moves[i] - boxes_f;
            boxes_f -= moves[i];
            boxes_s += moves[i];
            if (boxes_f < 0) boxes_f = 0;
        }
        else {
            if (boxes_s < moves[i]) min_boxes_s += moves[i] - boxes_s;
            boxes_s -= moves[i];
            boxes_f += moves[i];
            if (boxes_s < 0) boxes_s = 0;
        }
    }
    return {min_boxes_f, min_boxes_s};
}

int main() {
    std::pair<int, int> a = minimum_amount({});
    cout << a.first << " " << a.second << endl;
    a = minimum_amount({0});
    cout << a.first << " " << a.second << endl;
    a = minimum_amount({3});
    cout << a.first << " " << a.second << endl;
    a = minimum_amount({0, 2});
    cout << a.first << " " << a.second << endl;
    a = minimum_amount({1, 2, 3, 4});
    cout << a.first << " " << a.second << endl;
    a = minimum_amount({4, 3, 2, 1});
    cout << a.first << " " << a.second << endl;
    a = minimum_amount({3, 0, 3});
    cout << a.first << " " << a.second << endl;
    a = minimum_amount({3, 1, 3});
    cout << a.first << " " << a.second << endl;
    return 0;
}
