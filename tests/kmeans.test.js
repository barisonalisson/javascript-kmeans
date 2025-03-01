const KMeans = require('../src/kmeans');

describe('KMeans Algorithm', () => {

    test('should initialize correctly with k clusters', () => {
        const kmeans = new KMeans(3);
        expect(kmeans.k).toBe(3);
        expect(kmeans.centroids).toHaveLength(0);
        expect(kmeans.clusters).toHaveLength(0);
    });

    test('should throw an error for invalid k (non-positive integer)', () => {
        expect(() => new KMeans(-1)).toThrow('The number of clusters (k) must be a positive integer.');
        expect(() => new KMeans(0)).toThrow('The number of clusters (k) must be a positive integer.');
        expect(() => new KMeans(3.5)).toThrow('The number of clusters (k) must be a positive integer.');
    });

    test('should throw an error if the number of points is less than k', () => {
        const points = [{ x: 1, y: 2 }];
        const kmeans = new KMeans(3);
        expect(() => kmeans.fit(points)).toThrow('The number of points must be greater than or equal to the number of clusters (k).');
    });

    test('should identify clusters in already grouped points', () => {
        const points = [
            { x: 1, y: 2 }, { x: 2, y: 2 }, { x: 3, y: 3 },
            { x: 10, y: 10 }, { x: 11, y: 10 }, { x: 12, y: 11 }
        ];

        const kmeans = new KMeans(2);
        kmeans.fit(points);

        const clusters = kmeans.getClusters();

        expect(clusters[0].length).toBeGreaterThan(0);
        expect(clusters[1].length).toBeGreaterThan(0);
    });

    test('should group randomly scattered points', () => {
        const points = [
            { x: 1, y: 1 }, { x: 5, y: 5 }, { x: 9, y: 9 },
            { x: 10, y: 2 }, { x: 4, y: 4 }, { x: 8, y: 8 }
        ];

        const kmeans = new KMeans(2);
        kmeans.fit(points);

        const clusters = kmeans.getClusters();

        expect(clusters.length).toBe(2);
        expect(clusters[0].length).toBeGreaterThan(0);
        expect(clusters[1].length).toBeGreaterThan(0);
    });

    test('should handle k equal to number of points', () => {
        const points = [
            { x: 1, y: 1 }, { x: 2, y: 2 }, { x: 3, y: 3 }
        ];

        const kmeans = new KMeans(3);
        kmeans.fit(points);

        const clusters = kmeans.getClusters();

        expect(clusters.length).toBe(3);
        expect(clusters[0].length).toBe(1);
        expect(clusters[1].length).toBe(1);
        expect(clusters[2].length).toBe(1);
    });

    test('should stop iteration when centroids no longer change', () => {
        const points = [
            { x: 1, y: 1 }, { x: 2, y: 2 }, { x: 3, y: 3 },
            { x: 8, y: 8 }, { x: 9, y: 9 }, { x: 10, y: 10 }
        ];

        const kmeans = new KMeans(2);
        kmeans.fit(points);

        const finalCentroids = kmeans.getCentroids();
        expect(finalCentroids).toHaveLength(2);
    });

    test('should stop after reaching max iterations', () => {
        const points = [
            { x: 1, y: 1 }, { x: 2, y: 2 }, { x: 3, y: 3 },
            { x: 8, y: 8 }, { x: 9, y: 9 }, { x: 10, y: 10 }
        ];

        const kmeans = new KMeans(2, 3);
        kmeans.fit(points);

        const iterations = kmeans.maxIterations;
        expect(iterations).toBeLessThanOrEqual(3);
    });

    test('should handle duplicate points correctly', () => {
        const points = [
            { x: 1, y: 1 }, { x: 2, y: 2 }, { x: 2, y: 2 }, { x: 3, y: 3 }
        ];

        const kmeans = new KMeans(2);
        kmeans.fit(points);

        const clusters = kmeans.getClusters();

        expect(clusters[0].length).toBeGreaterThan(0);
        expect(clusters[1].length).toBeGreaterThan(0);

        const centroids = kmeans.getCentroids();
        centroids.forEach(centroid => {
            expect(centroid).toBeDefined();
            expect(isNaN(centroid.x)).toBe(false);
            expect(isNaN(centroid.y)).toBe(false);
        });
    });

    test('should handle small inputs (e.g., 2 points)', () => {
        const points = [
            { x: 1, y: 1 }, { x: 2, y: 2 }
        ];

        const kmeans = new KMeans(2);
        kmeans.fit(points);

        const clusters = kmeans.getClusters();
        expect(clusters.length).toBe(2);
        expect(clusters[0].length).toBe(1);
        expect(clusters[1].length).toBe(1);
    });

    test('should be efficient with large datasets', () => {
        const points = [];
        for (let i = 0; i < 1000; i++) {
            points.push({ x: Math.random() * 100, y: Math.random() * 100 });
        }

        const kmeans = new KMeans(5);
        kmeans.fit(points);

        const clusters = kmeans.getClusters();
        expect(clusters.length).toBe(5);
    });

    test('should not have invalid centroids (NaN or undefined)', () => {
        const points = [
            { x: 1, y: 1 }, { x: 2, y: 2 }, { x: 3, y: 3 }, { x: 4, y: 4 }, { x: 5, y: 5 }
        ];

        const kmeans = new KMeans(2);
        kmeans.fit(points);

        const centroids = kmeans.getCentroids();
        centroids.forEach(centroid => {
            expect(centroid).toBeDefined();
            expect(isNaN(centroid.x)).toBe(false);
            expect(isNaN(centroid.y)).toBe(false);
        });
    });
});
