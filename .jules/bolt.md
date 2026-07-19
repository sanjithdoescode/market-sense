## 2023-10-27 - Pre-Tokenization in Clustering Loops
**Learning:** O(N^2) string operations, such as tokenization, inside nested loops can cause severe performance bottlenecks on large datasets.
**Action:** When performing complex comparisons across many elements, pre-compute expensive parsing or object creation (like token arrays or Sets) outside the loop to reduce complexity from O(N^2) to O(N).
