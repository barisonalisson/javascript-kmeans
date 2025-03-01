class KMeans {
  constructor(k, maxIterations = 100) {
    if (typeof k !== 'number' || k <= 0 || !Number.isInteger(k)) {
      throw new Error('The number of clusters (k) must be a positive integer.');
    }

    this.k = k;
    this.maxIterations = maxIterations;
    this.centroids = [];
    this.clusters = [];
  }

  distance(p1, p2) {
    return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
  }

  initializeCentroids(points) {
    const centroids = [];
    const chosenIndices = new Set();

    while (centroids.length < this.k) {
      const index = Math.floor(Math.random() * points.length);
      if (!chosenIndices.has(index)) {
        centroids.push(points[index]);
        chosenIndices.add(index);
      }
    }

    return centroids;
  }

  assignClusters(points) {
    const clusters = Array(this.k).fill().map(() => []);

    points.forEach(point => {
      let closestCentroidIndex = 0;
      let minDistance = this.distance(point, this.centroids[0]);

      for (let i = 1; i < this.k; i++) {
        const dist = this.distance(point, this.centroids[i]);
        if (dist < minDistance) {
          closestCentroidIndex = i;
          minDistance = dist;
        }
      }

      clusters[closestCentroidIndex].push(point);
    });

    return clusters;
  }

  updateCentroids(clusters) {
    const newCentroids = [];

    for (let i = 0; i < this.k; i++) {
      const cluster = clusters[i];
      if (cluster.length > 0) {
        const meanX = cluster.reduce((sum, point) => sum + point.x, 0) / cluster.length;
        const meanY = cluster.reduce((sum, point) => sum + point.y, 0) / cluster.length;
        newCentroids.push({ x: meanX, y: meanY });
      }
    }

    return newCentroids;
  }

  fit(points) {
    if (!Array.isArray(points) || points.length === 0) {
      throw new Error('The dataset cannot be empty.');
    }

    if (points.length < this.k) {
      throw new Error('The number of points must be greater than or equal to the number of clusters (k).');
    }

    this.centroids = this.initializeCentroids(points);

    let iterations = 0;
    let clusters;

    while (iterations < this.maxIterations) {
      clusters = this.assignClusters(points);
      const newCentroids = this.updateCentroids(clusters);

      if (newCentroids.some(c => isNaN(c.x) || isNaN(c.y))) {
        throw new Error('Invalid centroids detected. Calculation failed.');
      }

      if (JSON.stringify(newCentroids) === JSON.stringify(this.centroids)) {
        break;
      }

      this.centroids = newCentroids;
      iterations++;
    }

    this.clusters = clusters;
  }

  getCentroids() {
    return this.centroids;
  }

  getClusters() {
    return this.clusters;
  }

  printVisualization() {
    let minX = Math.min(...this.centroids.map(c => c.x), ...this.clusters.flat().map(p => p.x));
    let minY = Math.min(...this.centroids.map(c => c.y), ...this.clusters.flat().map(p => p.y));
    let maxX = Math.max(...this.centroids.map(c => c.x), ...this.clusters.flat().map(p => p.x));
    let maxY = Math.max(...this.centroids.map(c => c.y), ...this.clusters.flat().map(p => p.y));

    minX = Math.floor(minX);
    minY = Math.floor(minY);
    maxX = Math.ceil(maxX);
    maxY = Math.ceil(maxY);

    const gridWidth = maxX - minX + 1;
    const gridHeight = maxY - minY + 1;
    const grid = Array(gridHeight).fill().map(() => Array(gridWidth).fill(' '));

    this.clusters.forEach((cluster, clusterIndex) => {
      const symbol = String.fromCharCode(65 + clusterIndex);

      cluster.forEach(point => {
        const x = Math.round(point.x) - minX;
        const y = Math.round(point.y) - minY;

        if (x >= 0 && x < gridWidth && y >= 0 && y < gridHeight) {
          grid[y][x] = symbol;
        }
      });
    });

    this.centroids.forEach(centroid => {
      const x = Math.round(centroid.x) - minX;
      const y = Math.round(centroid.y) - minY;

      if (x >= 0 && x < gridWidth && y >= 0 && y < gridHeight) {
        grid[y][x] = '⦿';
      }
    });

    console.log('Visualization (ASCII Art):');
    grid.forEach(row => {
      console.log(row.join(''));
    });
  }
}

module.exports = KMeans;
