# JavaScript K-Means Clustering Algorithm
## Overview
This repository contains a JavaScript implementation of the K-Means clustering algorithm. K-Means is an unsupervised machine learning algorithm that groups data points into k distinct clusters based on feature similarity, making it useful for data segmentation, image compression, and pattern recognition.

## Features
- Pure JavaScript implementation
- Euclidean distance calculation for 2D points
- Random centroid initialization
- Iterative refinement of clusters
- Convergence detection
- Maximum iteration limit
- Input validation and error handling
- ASCII visualization of clusters
- Comprehensive test suite

## Algorithm Background
The K-Means algorithm, first proposed by Stuart Lloyd in 1957, is widely used in:
- Customer segmentation
- Image compression
- Feature engineering
- Anomaly detection
- Data preprocessing

The algorithm works by iteratively assigning data points to the nearest centroid and then recalculating centroids based on the mean of all points in each cluster until convergence.

## Installation and Setup

1. Clone the repository

2. Install dependencies (for running tests):

```bash
npm install
```

## Usage / Examples

### Basic Example
```javascript
const KMeans = require('./src/kmeans');

// Define your data points
const points = [
    { x: 1, y: 2 }, { x: 2, y: 2 }, { x: 3, y: 3 },
    { x: 10, y: 10 }, { x: 11, y: 10 }, { x: 12, y: 11 }
];

// Create KMeans instance with 2 clusters
const kmeans = new KMeans(2);

// Fit the model to the data
kmeans.fit(points);

// Get the resulting clusters
const clusters = kmeans.getClusters();
console.log('Clusters:', clusters);

// Get the final centroids
const centroids = kmeans.getCentroids();
console.log('Centroids:', centroids);

// Visualize the results
kmeans.printVisualization();
```

### Advanced Example with Custom Iterations
```javascript
// Create KMeans with 3 clusters and 50 max iterations
const kmeans = new KMeans(3, 50);

// Generate random points
const points = [];
for (let i = 0; i < 100; i++) {
    points.push({
        x: Math.random() * 20,
        y: Math.random() * 20
    });
}

kmeans.fit(points);
kmeans.printVisualization();
```

## Visual Representation
The `printVisualization()` method creates an ASCII visualization of the clusters. Here's an example of what it might look like with three distinct clusters:

```
Visualization (ASCII Art):
                                        
                C C                     
              C C C                     
                C C                     
              ⦿
                              B         
                            B B B       
                            B B B       
                            ⦿ B
          A                             
        A A A                           
        A A                             
        ⦿                               
```

In this visualization:
- Letters (A, B, C) represent data points belonging to different clusters
- ⦿ symbols mark the position of each cluster's centroid
- Empty spaces indicate areas with no data points

For a more concrete example with actual data points, consider these three clusters:

```javascript
const points = [
    // Cluster A - bottom left
    { x: 2, y: 2 }, { x: 3, y: 3 }, { x: 2, y: 3 }, { x: 3, y: 2 }, { x: 1, y: 2 }, { x: 2, y: 1 },
    
    // Cluster B - bottom right
    { x: 12, y: 4 }, { x: 13, y: 5 }, { x: 14, y: 4 }, { x: 13, y: 3 }, { x: 12, y: 5 }, { x: 14, y: 5 },
    
    // Cluster C - top middle
    { x: 7, y: 15 }, { x: 8, y: 14 }, { x: 9, y: 15 }, { x: 8, y: 16 }, { x: 7, y: 14 }, { x: 9, y: 16 }
];

const kmeans = new KMeans(3);
kmeans.fit(points);
kmeans.printVisualization();
```

This would produce an ASCII visualization like:

```
                                        
                C C                     
              C C C                     
                C C                     
              ⦿
                          B B B         
                          B ⦿ B         
                          B            
    A A                                 
    A ⦿ A                               
    A A                                 
                                        
```

The visualization helps to:
1. Quickly identify the distribution of data points
2. See the relationship between points and their centroids
3. Assess the quality of clustering (compactness, separation)
4. Identify potential outliers or imbalanced clusters

Note that in a real-world scenario with many data points or very close coordinates, some points might overlap in the ASCII representation. The actual clustering in memory remains accurate regardless of visualization limitations.

## API Reference

### KMeans Class

#### Constructor
```javascript
new KMeans(k, maxIterations = 100)
```

##### Parameters
- `k`: Number of clusters (positive integer)
- `maxIterations`: Maximum number of iterations (default: 100)

#### Methods
- `fit(points)`: Trains the model on the provided points
- `getClusters()`: Returns the final clusters
- `getCentroids()`: Returns the final centroid positions
- `printVisualization()`: Prints an ASCII visualization of the clusters

## How It Works
The algorithm follows these steps:

1. Initialize k centroids randomly from the data points
2. Repeat until convergence or maximum iterations:
   a. Assign each point to the nearest centroid
   b. Update centroids by calculating the mean of all points in each cluster
   c. Check if centroids have changed; if not, exit loop
3. Return the final clusters and centroids

## Testing
The implementation includes comprehensive Jest tests:

```bash
npm test
```

Test cases cover:
- Initialization with different k values
- Error handling for invalid inputs
- Clustering of pre-grouped points
- Clustering of randomly scattered points
- Edge cases (k equal to number of points)
- Convergence detection
- Maximum iteration handling
- Duplicate point handling
- Performance with large datasets

## Performance
- Time Complexity: O(n × k × i) where n is the number of points, k is the number of clusters, and i is the number of iterations
- Space Complexity: O(n + k) for storing points and centroids

## Limitations
- Only supports 2D points (x, y coordinates)
- Uses random initialization, which may lead to suboptimal results
- Sensitive to initial centroid placement
- Assumes spherical clusters of similar size

## Future Improvements
- Implement K-Means++ initialization
- Add support for n-dimensional data
- Add silhouette score calculation for cluster quality assessment
- Implement elbow method for optimal k determination
- Add support for different distance metrics

## Contributing
Contributions are welcome! Please feel free to submit a Pull Request.