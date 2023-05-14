#include <bits/stdc++.h>

using namespace std;

int count_different_matrices(const vector<array<int, 4>> &matrices) {
    vector<array<int, 4>> diff_vectors;
    for (int i=0; i<matrices.size(); i++) {
        bool found = false;
        int j = 0;
        while (j < diff_vectors.size() && !found) {
            if (
                (matrices[i][0] == diff_vectors[j][0] && matrices[i][1] == diff_vectors[j][1] && matrices[i][2] == diff_vectors[j][2] && matrices[i][3] == diff_vectors[j][3]) ||
                (matrices[i][0] == diff_vectors[j][2] && matrices[i][1] == diff_vectors[j][0] && matrices[i][2] == diff_vectors[j][3] && matrices[i][3] == diff_vectors[j][1]) ||
                (matrices[i][0] == diff_vectors[j][3] && matrices[i][1] == diff_vectors[j][2] && matrices[i][2] == diff_vectors[j][1] && matrices[i][3] == diff_vectors[j][0]) ||
                (matrices[i][0] == diff_vectors[j][1] && matrices[i][1] == diff_vectors[j][3] && matrices[i][2] == diff_vectors[j][0] && matrices[i][3] == diff_vectors[j][2])
            )
                found = true;
            j++;
        }
        if (!found)
            diff_vectors.push_back(matrices[i]);
    }
    return diff_vectors.size();
}


int main() {
    vector<array<int, 4>> ms;
    ms = {
        {1, 2, 3, 4},
        {3, 1, 4, 2},
        {4, 3, 2, 1},
        {2, 4, 1, 3}
    };
    cout << count_different_matrices(ms) << endl;
      
    ms = {
        {3, 1, 2, 3},
        {3, 1, 2, 3},
        {1, 3, 3, 2},
        {3, 2, 1, 3}
    };
    cout << count_different_matrices(ms) << endl;

    ms = {
        {5, 1, 2, 6},
        {5, 4, 3, 5},
        {2, 5, 6, 1}
    };
    cout << count_different_matrices(ms) << endl ;

    return 0;
}